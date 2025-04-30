// Importar modulos
const http = require('http');
const fs = require('fs'); // Modulo para trabajar con archivos

const servidor = http.createServer((req, res) => {
    // Sólo respondemos a la ruta principal
    if(req.url === '/' || req.url === '/index.html'){
        // Leer el archivo HTML
        fs.readFile('index.html', (err, data) => {
            if(err){
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Error interno del servidor');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
        });
    } else{
        // Para cualquier otra ruta, mostrar error 404
        fs.readFile('404.html', (err, data) => {
            if(err){
                // Si no existen el archivo 404.html, mostrar un mensaje básico
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>404 No encontrado</title>
                    </head>
                    <body>
                        <h1>Error 404</h1>
                        <p>La página que buscas no existe</p>
                    </body>
                    </html>
                `);
            } else {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end(data);
            }
        });
    }
});

const puerto = 3000;
const host = 'localhost';
// Inicia el servidor
servidor.listen(puerto, host, () => {
    console.log(`Servidor corriendo en http://${host}:${puerto}/`);
})