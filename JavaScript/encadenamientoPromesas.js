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

// Encadenamiento de promesas
obtenerDatosUsuario(1) // Llama a la función para obtener datos del usuario con ID 1
    .then(usuario => {
        console.log('Usuario:', usuario); // Imprime los datos del usuario
        return obtenerPostsUsuario(usuario.id); // Llama a la función para obtener los posts del usuario
    })
    .then(posts => {
        console.log('Posts:', posts); // Imprime los posts del usuario
        return obtenerComentariosPost(posts[0].id); // Llama a la función para obtener los comentarios del primer post
    })
    .then(comentarios => {
        console.log('Comentarios:', comentarios); // Imprime los comentarios del post
    })
    .catch(error => {
        console.error('Error en la cadena:', error); // Captura e imprime cualquier error en la cadena de promesas
    });

