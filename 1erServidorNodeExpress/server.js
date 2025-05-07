const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Configurar middleware para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

// Ruta alternativa para index
app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

// Ruta alternativa para index
app.get('/contacto.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contacto.html'));
})

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

// Iniciar el servidor
app.listen(port, () =>{
    console.log(`Servidor corriendo en http://localhost:${port}`);
    console.log('Recursos estáticos en /public');
})