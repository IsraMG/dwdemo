// Declarar un objeto llamado "persona" con varias propiedades y métodos
let persona = {
    nombre: "Juan", // Propiedad "nombre" con valor "Juan"
    edad: 30, // Propiedad "edad" con valor 30
    ciudad: "Madrid", // Propiedad "ciudad" con valor "Madrid"
    
    // Método "saludar" que imprime un mensaje en la consola usando la propiedad "nombre"
    saludar: function(){
        console.log(`saludos de parte de ${this.nombre}`); // Imprime "saludos de parte de Juan"
    },
    
    // Propiedad "hobbies" que es un arreglo con los pasatiempos de la persona
    hobbies: ["futbol", "videojuegos", "chatear"],

    // Propiedad "contacto" que es un objeto con información de contacto
    contacto: {
        email: "imurillo@gmail.com", // Propiedad "email" con valor "imurillo@gmail.com"
        telefono: "123456789" // Propiedad "telefono" con valor "123456789"
    },

    // Propiedad "disponibilidad" que indica si la persona está disponible (valor booleano)
    disponibilidad: true, // Propiedad "disponibilidad" con valor true
    emoji: "😀", // Propiedad "emoji" con valor "😀"
}

// Imprimir todo el objeto "persona" en la consola
console.log(persona);

// Acceder a la propiedad "nombre" del objeto y mostrarla en la consola
console.log(persona.nombre); // Imprime "Juan"

// Llamar al método "saludar" del objeto "persona"
persona.saludar(); // Ejecuta la función e imprime "saludos de parte de Juan"
console.log(persona.emoji); // Imprime el emoji "😀"
console.log(persona.hobbies); // Imprime el arreglo ["futbol", "videojuegos", "chatear"]
//informacion del arreglo hobbies y acceder al segundo elemento
console.log(persona.hobbies[1]); // Imprime "videojuegos"
//tipo del objeto persona
console.log(typeof persona); // Imprime "object"

//Nuevo Objeto
let datos = {
    usuario: "jonathan", // Propiedad "usuario" con valor "jonathan"
    calificacion: 10, // Propiedad "calificacion" con valor 10
}
//Transformar objeto a formato JSON
let jsonString = JSON.stringify(datos); // Convierte el objeto "datos" a una cadena JSON
console.log(jsonString); // Imprime la cadena JSON: {"usuario":"jonathan","calificacion":10}
//Imprimir el tipo de objeto
console.log(typeof jsonString); // Imprime "string"

//Transformar JSON a objeto
let objeto = JSON.parse(jsonString); // Convierte la cadena JSON de vuelta a un objeto
console.log(objeto); // Imprime el objeto: { usuario: 'jonathan', calificacion: 10 }
//Recorrer los elementos de un objeto
for (let elemento in datos) { // Recorre cada propiedad del objeto "datos"
    console.log(`${elemento}: ${datos[elemento]}`); // Imprime el nombre de la propiedad y su valor
}
