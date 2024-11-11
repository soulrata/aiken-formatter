# Herramienta de Formato Aiken para Moodle

Esta herramienta fue creada para formatear correctamente archivos de preguntas en formato **Aiken** de Moodle, con un enfoque en **eliminar los números de pregunta** al inicio de cada enunciado y realizar verificaciones de formato para garantizar la compatibilidad. Es una solución útil para profesores y creadores de contenido que necesitan preparar preguntas de manera eficiente y sin errores.

## Descripción

La herramienta está diseñada para procesar archivos de texto que contienen preguntas en formato Aiken y garantizar que sigan el formato adecuado para su importación en Moodle. El formato Aiken es un estándar simple para importar preguntas de opción múltiple, pero requiere una estructura precisa para funcionar correctamente.

## Funcionalidades

- **Elimina los números de pregunta** al inicio de cada enunciado, si están presentes, sin modificar el contenido de la pregunta.
- **Verificación de formato Aiken**:
  - Las preguntas deben estar en una línea sin número al inicio.
  - Las opciones deben comenzar con "A.", "B.", etc., seguidas de un punto y un espacio.
  - La respuesta correcta debe estar en una línea aparte como "ANSWER: X", donde "X" es la letra de la opción correcta.

## Ejemplo de Entrada y Salida

### Entrada de Ejemplo
```plaintext
1. ¿Cuál es la capital de Francia?
A. Madrid
B. Berlín
C. París
ANSWER: C
