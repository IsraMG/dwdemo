// Declaración de una promesa simple
const miPromesa = new Promise((resolve, reject) => {
    const operacionExitosa = true; // Cambiar a false para simular un caso de rechazo
    
    if (operacionExitosa) {
        resolve("¡La operación fue exitosa!"); // Caso exitoso
    } else {
        reject("La operación falló"); // Caso de error
    }
});
  
// Uso de la promesa
miPromesa
    .then((mensaje) => {
        console.log("Éxito:", mensaje); // Manejar el caso exitoso
    })
    .catch((error) => {
        console.error("Error:", error); // Manejar el caso de error
    });

// Función que devuelve una promesa para obtener datos de un usuario
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
        }, 1000); // Retraso de 1 segundo
    });
}

// Uso de la función obtenerDatosUsuario
obtenerDatosUsuario(1) // Llamar a la función con el ID 1
    .then(usuario => {
        console.log('Usuario:', usuario); // Caso exitoso: imprime los datos del usuario
    })
    .catch(error => {
        console.error('Error:', error); // Caso de error: imprime el mensaje de error
    });