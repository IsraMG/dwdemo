// Importar el módulo 'http' que viene con Node.js
const http = require('http');

// Crear el servidor
const servidor = http.createServer((req, res) => {
    // Configurar la respuesta del servidor
    res.statusCode = 200; // Código de estado HTTP (200 = OK)
    res.setHeader('Content-Type', 'text/plain'); // Tipo de contenido
    res.end('\!Hola Mundo desde mi primer servidor Node.js!\n'); // Mensaje de respuesta
})

// Definir el puerto donde escuchará el servidor
const puerto = 3000;
const host = 'localhost'; // ó 127.0.0.1

// Inicia el servidor
servidor.listen(puerto, host, () => {
    console.log(`Servidor corriendo en http://${host}:${puerto}/`);
})
