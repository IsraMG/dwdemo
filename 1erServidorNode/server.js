// Importando módulos
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Determinar el tipo de contenido según la extensión del archivo
    const extension = path.extname(req.url);
    let contentType = 'text/html';
    let rutaArchivo = '';

    switch(extension){
        case '.js':
            contentType = 'text/javascript';
            rutaArchivo = path.join(__dirname, 'public', 'js', path.basename(req.url));
            break;
        case '.css':
            contentType = 'text/css';
            rutaArchivo = path.join(__dirname, 'public', 'css', path.basename(req.url));
            break;
        case '.png':
            contentType = 'image/png';
            rutaArchivo = path.join(__dirname, 'public', 'images', path.basename(req.url));
            break;
        case '.jpg':
            contentType = 'image/jpg';
            rutaArchivo = path.join(__dirname, 'public', 'images', path.basename(req.url));
            break;
        case '.jpeg':
            contentType = 'image/jpeg';
            rutaArchivo = path.join(__dirname, 'public', 'images', path.basename(req.url));
            break; 
        case '.webp':
            contentType = 'image/webp';
            rutaArchivo = path.join(__dirname, 'public', 'images', path.basename(req.url));
            break; 
        case '/':
            rutaArchivo = path.join(__dirname, 'views', 'index.html');
            break; 
        case '.html':
            rutaArchivo = path.join(__dirname, 'views', path.basename(req.url));
            break;
        default:
            // Si no es un archivo conocido, verificar si es la ruta principal
            if(req.url === '/'){
                rutaArchivo = path.join(__dirname, 'views', 'index.html');
            } else{
                // Mostrar página 404 para rutas desconocidas
                rutaArchivo = path.join(__dirname, 'views', '404.html');
            }                     
    }

    // Leer y servir el archivo
    fs.readFile(rutaArchivo, (err, content) => {
        if(err){
            if(err.code === 'ENOENT'){
                // Archivo no encontrado
                fs.readFile(path.join(__dirname, 'views', '404.html'), (err, content) => {
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.end(content, 'utf-8');
                });
            } else{
                // Error del servidor
                res.writeHead(500);
                res.end(`Error del servidor: ${err.code}`);
            }
        } else{
            // Exito - servir el archivo
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content, 'utf-8');
        }
    });
});

// Corriendo el servidor
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/`);
});