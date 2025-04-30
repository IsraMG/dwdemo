// Definimos una función que acepta un callback
function saludar(nombre, callback) {
    console.log(`Hola, ${nombre}`); // Imprime un saludo con el nombre
    // Llamamos al callback después de saludar
    callback(); // Ejecuta la función callback
}
  
// Definimos nuestra función callback
function despedir() {
    console.log("Adiós!"); // Imprime "Adiós!"
}
  
// Usamos la función con el callback
saludar("Juan", despedir); // Llama a la función saludar y pasa "despedir" como callback

// Función que simula una operación asíncrona para obtener datos de un usuario
function obtenerDatosUsuario(id, callback) {
    // Simulamos una operación asíncrona (como una petición a una API)
    setTimeout(() => {
        const usuarios = { // Objeto con datos de usuarios
            1: { nombre: 'Juan', edad: 30 },
            2: { nombre: 'María', edad: 25 }
        };
        const usuario = usuarios[id]; // Busca el usuario por ID
        if (usuario) {
            callback(null, usuario); // Llama al callback con null (sin error) y el usuario
        } else {
            callback('Usuario no encontrado', null); // Llama al callback con un error
        }
    }, 1000); // Simula un retraso de 1 segundo
}

// Uso del callback
obtenerDatosUsuario(5, (error, usuario) => {
    if (error) {
        console.error('Error:', error); // Si hay un error, lo imprime en la consola
    } else {
        console.log('Usuario:', usuario); // Si encuentra el usuario, imprime sus datos
    }
});