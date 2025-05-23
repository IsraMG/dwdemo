const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const bcrypt = require('bcryptjs');
const session = require('express-session');
const multer = require('multer'); // Para subir imagenes
 
const app = express();
const port = 3000;

// Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public', 'uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Error: Solo se permiten imágenes (JPEG, JPG, PNG, GIF)'));
    }
});

// Configurar middleware para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Configurar el middleware de sesiones en Express.js
// Usar paquete express-session 
/*app.use(session({
    secret: process.env.SESSION_SECRET || 'secret-key-12345', // En producción usar: process.env.SESSION_SECRET
    resave: false, // Evita que la sesión se guarde en el almacenamiento si no hubo cambios.
    saveUninitialized: false, // (Antes true) Crea una sesión nueva incluso si no se le agregan datos.
    cookie: { 
        // La cookie se envía sobre HTTP (para desarrollo)
        secure: false, // Cambiar a true en producción con HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 1 día
        // maxAge: 30 * 60 * 1000, // 30 minutos en milisegundos
    }
}));*/

app.use(session({
    secret: process.env.SESSION_SECRET || 'secret-key-12345',
    resave: true,                   // Fuerza guardar incluso si no hubo cambios
    saveUninitialized: false,        // No guardar sesiones vacías
    rolling: true,                   // Renueva el tiempo de vida con cada request
    cookie: { 
        secure: false,               // En producción cambiar a true con HTTPS
        maxAge: 24 * 60 * 60 * 1000, // 1 día de duración
        httpOnly: true               // Protección adicional contra XSS
    }
}));

// Middleware de seguridad para cabeceras
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

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

// Ruta para productos 
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
})

// Ruta para productos 
app.get('/registrar.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'registrar.html'));
})

// Ruta para administrador 
app.get('/carrito.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'carrito.html'));
})

// Ruta para administrador 
app.get('/admin.html', esAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin.html'));
})

// Middleware para verificar administrador
function esAdmin(req, res, next) {
    if (req.session.user && req.session.user.rol === 'admin') {
        return next();
    }
    res.status(403).send('Acceso denegado. Se requieren privilegios de administrador');
}

// Middleware para verificar autenticación
function esAutenticado(req, res, next) {
    if (req.session.user) {
        return next();
    }
    //res.status(401).json({ error: 'No autenticado' });
    res.status(401).json({ error: 'Debes iniciar sesión' });
}

// Función auxiliar para leer archivos JSON
async function readJsonFile(filename) {
    try {
        const data = await fs.readFile(path.join(__dirname, 'data', filename));
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

// Función auxiliar para escribir en archivos JSON
async function writeJsonFile(filename, data) {
    try {
        await fs.writeFile(
            path.join(__dirname, 'data', filename),
            JSON.stringify(data, null, 2)
        );
        return true;
    } catch (err) {
        console.error('Error escribiendo archivo:', err);
        return false;
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

// API para añadir productos (Solo administrador)
app.post('/api/productos', esAdmin, upload.single('imagen'), async (req, res) => {
    try {
        const productos = await readJsonFile('productos.json');
        
        const nuevoProducto = {
            id: Date.now().toString(),
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: parseFloat(req.body.precio),
            categoria: req.body.categoria,
            imagen: req.file ? `/uploads/${req.file.filename}` : '/img/default-producto.png',
            stock: parseInt(req.body.stock)
        };
        
        productos.push(nuevoProducto);
        await writeJsonFile('productos.json', productos);
        
        res.status(201).json(nuevoProducto);
    } catch (err) {
        res.status(500).json({ error: 'Error al agregar el producto' });
    }
});

// API de Usuarios
app.post('/api/registrar', async (req, res) => {
    try{
        const usuarios = await readJsonFile('usuarios.json');
        const { nombre, email, password } = req.body; 

        // Verificar si el usuario ya existe
        const existeEmail = usuarios.some(u => u.email.toLowerCase() === email.trim().toLowerCase());

        if(existeEmail) {
            return res.status(409).json({
                error: 'El correo electrónico ya está registrado' // Mensaje exacto
            });
        }
        
        // Hashear password
        const hashedPassword = await bcrypt.hash(password, 10);

        const nuevoUsuario = {
            id: Date.now().toString(),
            nombre: nombre.trim(),
            email: email.trim().toLowerCase(),
            password: hashedPassword,
            rol: 'usuario',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            cart: [] // Inicializar carrito vacio
        };

        usuarios.push(nuevoUsuario);
        await writeJsonFile('usuarios.json', usuarios);

        res.status(201).json({ 
            success: true,
            usuario: {
                id: nuevoUsuario.id,
                nombre: nuevoUsuario.nombre,
                email: nuevoUsuario.email,
                rol: nuevoUsuario.rol
            }
        });

    } catch(err) {
        console.error('Error al registrar usuario:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.get('/api/usuario', (req, res) => {
    if (req.session.user) {
        res.json({ 
            usuario: {
                nombre: req.session.user.nombre,
                rol: req.session.user.rol, 
            }
        });
    } else {
        res.status(401).json({ error: 'No autenticado' });
    }
});

app.post('/api/login', async (req, res) => {
    try {        
        const usuarios = await readJsonFile('usuarios.json');
     
        const usuario = usuarios.find(u => u.email === req.body.email);
        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        
        const passwordValido = await bcrypt.compare(req.body.password, usuario.password);
        if (!passwordValido) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        
        // Crea un objeto req.session único para cada usuario
        req.session.user = {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol,
            cart: usuario.cart || [] // Cargar carrito desde la base de datos
        };
        
        res.json({ 
            success: true, 
            usuario: {
                nombre: usuario.nombre,
                rol: usuario.rol
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
}); 

// Nueva ruta para verificar sesión
app.get('/api/check-session', (req, res) => {
    if (req.session.user) {
        res.json({ autentificado: true, usuario: req.session.user });
    } else {
        res.status(401).json({ autentificado: false });
    }
});

app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al destruir la sesión:', err);
            return res.status(500).json({ 
                success: false,
                error: 'Error interno al cerrar sesión'
            });
        }
    });

    res.json({ 
        success: true,
        mensaje: 'Sesion cerrada correctamente' 
    });
});

// API para editar productos (Solo administrador)
app.put('/api/productos/:id', esAdmin, upload.single('imagen'), async (req, res) => {
    try {
       const productos = await readJsonFile('productos.json'); 
       const idProducto = req.params.id;

        const indice = productos.findIndex(p => p.id === idProducto);
        if (indice === -1) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const { nombre, descripcion, precio, categoria, stock } = req.body;
        const actualizarProducto = {
            ...productos[indice],
            nombre: nombre || productos[indice].nombre,
            descripcion: descripcion || productos[indice].descripcion,
            precio: precio ? parseFloat(precio) : productos[indice].precio,
            categoria: categoria || productos[indice].categoria,
            stock: stock ? parseInt(stock) : productos[indice].stock,
            updatedAt: new Date().toISOString()
        };

        if (req.file) {
            actualizarProducto.imagen = `/uploads/${req.file.filename}`;
        }

        productos[indice] = actualizarProducto;
        await writeJsonFile('productos.json', productos);
        
        res.json(actualizarProducto);
    } catch(err) {
        console.error('Error al actualizar producto:', err);
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});

// API para borrar productos (Solo administrador)
app.delete('/api/productos/:id', esAdmin, async (req, res) => {
    try {
        let productos = await readJsonFile('productos.json');
        const idProducto = req.params.id;
        
        productos = productos.filter(p => p.id !== idProducto);
        await writeJsonFile('productos.json', productos);
        
        res.json({ success: true });
    } catch (err) {
        console.error('Error al eliminar producto:', err);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});

// API de Carrito (Lectura)
app.get('/api/cart', esAutenticado, async (req, res) => {
    try {
        const productos = await readJsonFile('productos.json');
        const usuarioCart = req.session.user.cart || [];

        const carritoConDetalles = usuarioCart.map(item => {
            const producto = productos.find(p => p.id === item.idProducto);
            return {
                ...item,
                producto: producto || null
            };
        }).filter(item => item.producto !== null); // Filtrar productos no encontrados

        res.json(carritoConDetalles);
    } catch(error) {
        console.error('Error al obtener el carrito:', error);
        res.status(500).json({ error: 'Error al obtener el carrito' });
    }
});

// API de Carrito (Escritura)
app.post('/api/cart', esAutenticado, async (req, res) => {
    try {
        const productos = await readJsonFile('productos.json');
        const {idProducto, cantidad = 1} = req.body;

        if(!idProducto) {
            return res.status(400).json({error: 'ID de producto es requerido'});
        }

        const producto = productos.find(p => p.id === idProducto);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        if (!req.session.user.cart) {
            req.session.user.cart = [];
        }

        const itemExistente = req.session.user.cart.find(item => item.id === idProducto);
        if (itemExistente) {
            itemExistente.cantidad += parseInt(cantidad);
            // Guardar cambios en el archivo y actualizar sesión también cuando se actualiza cantidad
        } else {
            req.session.user.cart.push({
                idProducto,
                cantidad: parseInt(cantidad) || 1
            });

            res.json({ success: true });
        }
    } catch (error) {
        console.error('Error al agregar al carrito:', error);
        res.status(500).json({ error: 'Error al agregar al carrito' });
    }
});

app.put('/api/cart/:idProducto', esAutenticado, async (req, res) => {
    try {
        const { cantidad } = req.body;
        const { idProducto } = req.params;
        
        if (!cantidad || cantidad < 1) {
            return res.status(400).json({ error: 'Cantidad inválida' });
        }
        
        const item = req.session.user.cart.find(item => item.idProducto === idProducto);
        if (!item) {
            return res.status(404).json({ error: 'Ítem no encontrado en el carrito' });
        }
        
        item.cantidad = parseInt(cantidad);

        res.json({ success: true });
    } catch (err) {
        console.error('Error al actualizar el carrito:', err);
        res.status(500).json({ error: 'Error al actualizar el carrito' });
    }
});

app.delete('/api/cart/:idProducto', esAutenticado, async (req, res) => {
    try {
        const { idProducto } = req.params;
        
        req.session.user.cart = req.session.user.cart.filter(item => item.idProducto !== idProducto);
        
        res.json({ success: true });
    } catch (err) {
        console.error('Error al eliminar del carrito:', err);
        res.status(500).json({ error: 'Error al eliminar del carrito' });
    }
});

// Middleware para verificar autenticación solo en rutas privadas
app.use((req, res, next) => {
    const rutasPublicas = ['/', '/index.html', '/contacto.html', '/productos.html', '/login.html', '/registro.html'];
    
    if (rutasPublicas.includes(req.path)) {
        return next();
    }
    
    // Verificar autenticación para rutas privadas
    if (!req.session.user) {
        return res.redirect('/login.html');
    }
    
    next();
});

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

// Iniciar el servidor
app.listen(port, () =>{
    console.log(`Servidor corriendo en http://localhost:${port}`);
    console.log('Recursos estáticos en /public');
})