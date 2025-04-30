// Función que simula obtener datos de un usuario por su ID
function obtenerDatosUsuario(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => { // Simula un retraso de 1 segundo
            const usuarios = { // Objeto con datos de usuarios
                1: { nombre: 'Juan', edad: 30 },
                2: { nombre: 'María', edad: 25 }
            };
            const usuario = usuarios[id]; // Busca el usuario por ID
            if (usuario) {
                resolve(usuario); // Resuelve la promesa con los datos del usuario
            } else {
                reject('Usuario no encontrado'); // Rechaza la promesa si el usuario no existe
            }
        }, 1000);
    });
}

// Función que simula obtener los posts de un usuario por su ID
function obtenerPostsUsuario(id) {
    return new Promise((resolve) => {
        setTimeout(() => { // Simula un retraso de 1 segundo
            resolve([
                { id: 101, titulo: 'Post 1' },
                { id: 102, titulo: 'Post 2' }
            ]); // Resuelve la promesa con un arreglo de posts
        }, 1000);
    });
}

// Función que simula obtener los comentarios de un post por su ID
function obtenerComentariosPost(postId) {
    return new Promise((resolve) => {
        setTimeout(() => { // Simula un retraso de 1 segundo
            resolve([
                { id: 1, texto: 'Buen post' },
                { id: 2, texto: 'Gracias por compartir' }
            ]); // Resuelve la promesa con un arreglo de comentarios
        }, 1000);
    });
}

// Función asíncrona que muestra los datos completos del usuario, sus posts y comentarios
async function mostrarDatosCompletos() {
    try {
        // Obtener datos del usuario
        const usuario = await obtenerDatosUsuario(1);
        console.log('Usuario:', usuario); // Imprime los datos del usuario
        
        // Obtener los posts del usuario
        const posts = await obtenerPostsUsuario(usuario.id);
        console.log('Posts:', posts); // Imprime los posts del usuario
        
        // Obtener los comentarios del primer post
        const comentarios = await obtenerComentariosPost(posts[0].id);
        console.log('Comentarios:', comentarios); // Imprime los comentarios del post
    } catch (error) {
        // Manejar errores
        console.error('Error:', error); // Imprime el error si ocurre
    }
}

// Llamar a la función para mostrar los datos completos
mostrarDatosCompletos();