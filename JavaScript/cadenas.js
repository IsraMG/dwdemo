// 1 Concatenar cadenas

let saludo = "Hola"; //Declarar variable saludo
let nombre = "Isra"; //Declarar variable nombre
let mensaje = saludo + " " + nombre; //Concatenar cadenas
console.log(mensaje); //Imprimir mensaje

//Tambien existe el metodo concat() para concatenar cadenas
let mensaje2 = saludo.concat(" ", nombre); //Concatenar cadenas
console.log(mensaje2); //Imprimir mensaje2

// 2 Mayor y minusculas
let mayusculas = mensaje2.toUpperCase(); //Convertir a mayusculas
console.log(mayusculas); //Imprimir mayusculas
let minusculas = mensaje2.toLowerCase(); //Convertir a minusculas
console.log(minusculas); //Imprimir minusculas

// 3 Extraer informacion de una cadena
let texto = "FES Acatlan"; //Declarar variable texto
console.log(texto.substring(0, 3)); //Imprimir subcadena de texto desde 0 hasta 3
console.log(texto.slice(4,11)); //Imprimir subcadena de texto desde 5 hasta 11

// 4 Buscar una cadena
console.log(texto.includes("Acatlan")); //Buscar si existe la cadena "Acatlan" en texto

// 5 Reemplazar una cadena
let texto2 = texto.replace("Acatlan", "Cuautitlan"); //Reemplazar "Acatlan" por "Cuautitlan" en texto
console.log(texto2); //Imprimir texto2

// Añado de nuevo la palabra Cuautitlan a la cadena
texto2 = texto2 + " Cuautitlan"; //Concatenar cadenas
console.log(texto2); //Imprimir texto2

texto2 = texto2.replace("Cuautitlan", "Acatlan"); //Reemplazar "Cuautitlan" por "Acatlan" en texto2
console.log(texto2); //Imprimir texto2

// Expresiones regulares
texto2 = texto2 + " Cuautitlan"; //Concatenar cadenas
//Va a reemplazar todas las coincidencias de "Cuautitlan" por "Acatlan"
//El modificador "g" indica que se reemplazarán todas las coincidencias 
texto2 = texto2.replace(/Cuautitlan/g, "Acatlan"); //Reemplazar "Cuautitlan" por "Acatlan" en texto2 usando expresiones regulares
console.log(texto2); //Imprimir texto2

//Validaciones de correo electrónico
let email ="usuario@dominio.com"; //Declarar variable email
let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //Expresión regular para validar correo electrónico
console.log(regex.test(email)); //Validar correo electrónico usando expresiones regulares
let email2 = "usuario@dominio"; //Declarar variable email2
console.log(regex.test(email2)); //Validar correo electrónico usando expresiones regulares

console.log();