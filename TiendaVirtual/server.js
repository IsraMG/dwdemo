const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const app = express();
const port = 3000;

// Configurar middleware para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

// Ruta alternativa para index
app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

// Ruta de contacto
app.get('/contacto.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contacto.html'));
})

// Ruta para productos 
app.get('/productos.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'productos.html'));
})

// Función auxiliar para leer archivos JSON
async function readJsonFile(filename) {
    try {
        const data = await fs.readFile(path.join(__dirname, 'data', filename));
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

// Ruta para lista de productos
app.get('/api/productos', async (req, res) => {
    try {
        const productos = await readJsonFile('productos.json');
        res.json(productos);
    } catch (err) {
        res.status(500).json({ error: 'Error al leer los productos' });
    }
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