# Procesador Semántico del Formato Aiken

El **Procesador Semántico del Formato Aiken** es una herramienta diseñada para corregir y procesar preguntas siguiendo el formato Aiken. Aiken es un formato ampliamente utilizado para importar preguntas tipo test a plataformas de e-learning como Moodle. Este procesador permite automatizar la detección y corrección de errores comunes, haciendo que el proceso de creación de cuestionarios sea más eficiente y menos propenso a errores.

## Características
- **Detección y Corrección de Errores**: Detecta errores en el formato de preguntas, opciones de respuesta y la respuesta correcta. Realiza correcciones automáticas para mantener el estándar del formato Aiken.
- **Procesamiento Detallado o de Errores**: Dos modos de procesamiento: uno con todos los mensajes detallados, y otro que muestra únicamente los errores encontrados y corregidos.
- **Interfaz Amigable**: Interfaz web sencilla donde se pueden cargar archivos `.txt`, procesar el contenido y descargar el archivo corregido.
- **Resumen del Proceso**: Al finalizar el procesamiento, se proporciona un resumen detallado con el número total de preguntas volcadas, errores detectados, errores corregidos y preguntas omitidas.

## Cómo Usar
1. **Cargar el Archivo**: Selecciona un archivo `.txt` que contenga preguntas en formato Aiken.
2. **Procesar el Archivo**: Puedes elegir entre dos modos:
   - **Procesar con Detalles**: Muestra todos los mensajes, incluyendo cada línea leída, detección de preguntas, opciones y respuestas correctas, así como las correcciones realizadas.
   - **Procesar Solo Errores**: Muestra únicamente los mensajes relacionados con errores de formato y sus respectivas correcciones.
3. **Descargar el Archivo Corregido**: Luego de procesar el archivo, descarga el archivo corregido haciendo clic en el botón "Descargar".

## Instalación
Para ejecutar esta aplicación en tu entorno local, sigue los siguientes pasos:

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/tu_usuario/aiken-semantic-processor.git
   ```
2. **Navega al directorio del proyecto**:
   ```bash
   cd aiken-semantic-processor
   ```
3. **Instala las dependencias necesarias** (si es necesario):
   Este proyecto utiliza Bootstrap para los estilos. Puedes instalar Bootstrap utilizando un CDN o, si prefieres, instalarlo localmente usando npm:
   ```bash
   npm install bootstrap
   ```

## Uso
1. Abre el archivo `index.html` en tu navegador.
2. Selecciona el archivo de preguntas en formato Aiken que desees procesar.
3. Elige entre procesar con todos los detalles o solo mostrar los errores.
4. Descarga el archivo corregido una vez finalizado el proceso.

## Ejemplos de Formato Aiken
El formato Aiken tiene las siguientes características:
- La **pregunta** se presenta en una línea.
- Las **opciones de respuesta** se listan con la letra (A, B, C, D…) en mayúscula, seguida de un punto y un espacio, luego el texto de la opción.
  - Ejemplo: `A. Madrid`
- La **respuesta correcta** se indica con `ANSWER: X`, donde `X` es la letra correspondiente en mayúscula.

### Ejemplo de Entrada en Formato Aiken
```
¿Cuál es la capital de Francia?
A. Madrid
B. Berlín
C. París
ANSWER: C
```

## Contribuir
¡Contribuciones son bienvenidas! Si deseas contribuir, por favor sigue estos pasos:
1. Haz un fork del repositorio.
2. Crea una rama para tu nueva característica (`git checkout -b feature/nueva-caracteristica`).
3. Haz commit de tus cambios (`git commit -m 'Agregar nueva característica'`).
4. Haz push a la rama (`git push origin feature/nueva-caracteristica`).
5. Abre un Pull Request.

## Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## Créditos
Desarrollado por Liao Miguel. Inspirado en la necesidad de facilitar la importación de preguntas en Moodle y otros LMS usando el formato Aiken.

## Contacto
Si tienes alguna pregunta o sugerencia, por favor contacta a liaomiguel@gmail.com.
