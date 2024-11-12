let formattedText = '';
let logMessages = [];
let errorMessages = [];
let errorCount = 0;
let correctedCount = 0;
let omittedQuestionsCount = 0;

// Maneja la carga del archivo y el formateo
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            document.getElementById('processButton').disabled = false;
            document.getElementById('processErrorButton').disabled = false; // Habilita los botones de procesar
        };
        reader.readAsText(file, 'UTF-8');
    }
});

// Maneja el botón de procesar con todos los detalles
document.getElementById('processButton').addEventListener('click', function() {
    const file = document.getElementById('fileInput').files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            formatAiken(content);
            displayLogMessages(logMessages);
            document.getElementById('downloadButton').disabled = false; // Habilita el botón de descarga
        };
        reader.readAsText(file, 'UTF-8');
    }
});

// Maneja el botón de procesar solo errores
document.getElementById('processErrorButton').addEventListener('click', function() {
    const file = document.getElementById('fileInput').files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            formatAiken(content);
            displayLogMessages(errorMessages);
            document.getElementById('downloadButton').disabled = false; // Habilita el botón de descarga
        };
        reader.readAsText(file, 'UTF-8');
    }
});

// Función para formatear el texto en formato Aiken
function formatAiken(text) {
    formattedText = ''; // Reiniciar el texto formateado
    logMessages = []; // Reiniciar los mensajes de log
    errorMessages = []; // Reiniciar los mensajes de error
    errorCount = 0;
    correctedCount = 0;
    omittedQuestionsCount = 0;
    const questionsArray = []; // Arreglo para almacenar las preguntas procesadas

    // Divide el contenido en líneas
    const lines = text.trim().split('\n');

    let question = '';
    let options = [];
    let answer = '';
    let waitingForOptions = false;
    let waitingForAnswer = false;

    lines.forEach((line, index) => {
        line = line.trim();
        const lineMessage = `Lectura de la línea ${index + 1}: "${line}"`;
        logMessages.push(lineMessage);

        // Maneja líneas en blanco entre preguntas
        if (line === '') {
            logMessages.push(`Línea ${index + 1}: Línea en blanco detectada, se permite como separación entre preguntas.`);
            return;
        }

        // Detecta el comienzo de una pregunta (con o sin número)
        if (/^\d*\.\s*/.test(line) || (/^[A-Za-z¿]/.test(line) && !/^[A-D]\./.test(line) && !/^ANSWER:/i.test(line) && question === '')) {
            if (question && options.length > 0 && answer) {
                questionsArray.push({ question, options, answer });
                logMessages.push(`Pregunta completada y guardada en el arreglo. Pregunta: "${question}".`);
            }

            // Quita el número (si lo hay) y establece la nueva pregunta
            question = line.replace(/^\d*\.\s*/, '').trim();
            logMessages.push(`Línea ${index + 1}: Pregunta detectada: "${question}".`);
            options = [];
            answer = '';
            waitingForOptions = true;
            waitingForAnswer = false;
        }
        // Detecta y corrige las opciones de respuesta
        else if (waitingForOptions && /^[a-dA-D]\./.test(line)) {
            let optionLetter = line.charAt(0).toUpperCase();
            let optionText = line.slice(2).trim();
            if (!optionText) {
                const errorMsg = `Error en la línea ${index + 1}: Se esperaba un texto después de la opción. Se corrigió agregando 'Texto faltante'.`;
                logMessages.push(errorMsg);
                errorMessages.push(errorMsg);
                optionText = 'Texto faltante';
                errorCount++;
                correctedCount++;
            }
            let correctedOption = `${optionLetter}. ${optionText}`;
            options.push(correctedOption);
            logMessages.push(`Línea ${index + 1}: Opción detectada y corregida si fue necesario: "${correctedOption}".`);
            waitingForAnswer = true;
        }
        // Detecta y corrige la respuesta correcta
        else if (/^answer\s*[:\-]?\s*/i.test(line)) {
            let answerLetter = line.replace(/^answer\s*[:\-]?\s*/i, '').toUpperCase().trim().replace(/\.$/, '');
            if (!/^[A-D]$/.test(answerLetter)) {
                const errorMsg = `Error en la línea ${index + 1}: La respuesta debe ser una letra entre A y D. Se corrigió a 'A'.`;
                logMessages.push(errorMsg);
                errorMessages.push(errorMsg);
                answerLetter = 'A';
                errorCount++;
                correctedCount++;
            }
            answer = "ANSWER: " + answerLetter;
            logMessages.push(`Línea ${index + 1}: Respuesta correcta detectada: "${answer}".`);

            // Guarda la pregunta si se detecta la respuesta
            if (question && options.length > 0) {
                questionsArray.push({ question, options, answer });
                logMessages.push(`Pregunta completada y guardada en el arreglo. Pregunta: "${question}".`);
                question = '';
                options = [];
                answer = '';
                waitingForOptions = false;
                waitingForAnswer = false;
            }
        } else {
            const errorMsg = `Error en la línea ${index + 1}: Formato no reconocido. Se intentará corregir.`;
            logMessages.push(errorMsg);
            errorMessages.push(errorMsg);
            errorCount++;

            // Intentar corregir el formato incorrecto
            if (/^[a-dA-D][^\.]/.test(line) && waitingForOptions) {
                let correctedLine = line.charAt(0).toUpperCase() + '. ' + line.slice(1).trim();
                options.push(correctedLine);
                logMessages.push(`Línea ${index + 1}: Se corrigió opción sin punto a: "${correctedLine}".`);
                correctedCount++;
                waitingForAnswer = true;
            }
        }
    });

    // Guardar la última pregunta si no fue guardada
    if (question && options.length > 0 && answer) {
        questionsArray.push({ question, options, answer });
        logMessages.push(`Pregunta completada y guardada en el arreglo. Pregunta: "${question}".`);
    }

    // Formatear las preguntas para exportar
    formattedText = questionsArray.map(item => {
        return `${item.question}\n${item.options.join('\n')}\n${item.answer}\n`;
    }).join('\n');

    // Agregar el total de preguntas volcadas y errores detectados al final del log
    const summary = `Total de preguntas volcadas al archivo: ${questionsArray.length}\nTotal de errores detectados: ${errorCount}\nTotal de errores corregidos: ${correctedCount}\nTotal de preguntas omitidas: ${omittedQuestionsCount}`;
    logMessages.push(summary);
    errorMessages.push(summary);
}

// Función para mostrar los mensajes de log
function displayLogMessages(messages) {
    const logContainer = document.getElementById('logContainer');
    logContainer.innerHTML = ''; // Limpiar mensajes anteriores
    messages.forEach((message, index) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('log-line');
        messageElement.textContent = `${index + 1}: ${message}`;
        logContainer.appendChild(messageElement);
    });
}

// Función para descargar el archivo formateado
document.getElementById('downloadButton').addEventListener('click', function() {
    const blob = new Blob([formattedText.trim()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Encuesta_Aiken_Formateada.txt';
    link.click();
    URL.revokeObjectURL(url); // Libera el recurso
});
