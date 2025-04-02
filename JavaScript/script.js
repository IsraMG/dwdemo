//Imprimir mensaje
console.log("Hola Mundo");

//Declarar variables
let x = 5; //Número entero
console.log(x); //Imprimir variable x
x="FES";
console.log(x); //Imprimir variable x
console.log(typeof x); //Imprimir tipo de variable x

x=true; //Booleano
console.log(x); //Imprimir variable x
console.log(typeof x); //Imprimir tipo de variable x

x=[1,2,3,4,5,6,7]; //Array
console.log(x); //Imprimir variable x
console.log("numero de elementos en el arreglo: " + x.length); //Imprimir numero de elementos en el array
console.log(typeof x); //Imprimir tipo de variable x
//Acceder a los elementos del array
let elemento = x[0]; //Acceder al primer elemento del array
console.log("Primer elemento del arreglo: " + elemento); //Imprimir elemento
elemento = x[x.length - 1]; //Acceder al último elemento del array
console.log("Ultimo elemento del arreglo: " + elemento); //Imprimir elemento

//Acceder a un indice fuera del arreglo
elemento = x[10]; //Acceder al primer elemento del array
console.log("Elemento fuera del arreglo: " + elemento); //Imprimir elemento

//Los arreglos pueden ser de cualquier tipo de dato o compuestos por otros arreglos
x=[1,3.45,true,"FES",[1,2,3]]; //Array
console.log(x); //Imprimir arreglo x
elemento = x[0]; //Acceder al primer elemento del array
console.log("Primer elemento del arreglo: " + elemento); //Imprimir elemento
elemento = x[2]; //Acceder al tercer elemento del array
console.log("Tercer elemento del arreglo: " + elemento); //Imprimir elemento
elemento = x[4]; //Acceder al quinto elemento del array
console.log("Quinto elemento del arreglo: " + elemento); //Imprimir elemento
elemento = x[4][0]; //Acceder al primer elemento del quinto elemento del array
console.log("Primer elemento del quinto elemento del arreglo: " + elemento); //Imprimir elemento

//Funciones 
function suma(a,b){ //Declarar funcion suma
    return a+b; //Retornar la suma de a y b
}
console.log("Suma: " + suma(2,3)); //Imprimir resultado de la funcion suma

//Constantes
const y=8; //Declarar constante y
console.log(y); //Imprimir constante y
//y=9; //Modificar constante y
//console.log(y); //Imprimir constante y

///Funciones Flecha
const add = (a,b) => a+b; //Declarar funcion flecha add
console.log("Suma: " + add(2,3)); //Imprimir resultado de la funcion flecha add

// Imprimir Información
const arr = [1,2,3,4,5]; //Declarar arreglo arr
const procesar = (arr) => { //Declarar funcion procesar
    //Usamos una estructura repetitiva para recorrer el arreglo
    for (let i = 0; i < arr.length; i++) { //Recorrer arreglo arr
            console.log(arr[i]); //Imprimir elemento del arreglo arr
        }
    }; // Close the function procesar

procesar(arr); //Llamar funcion procesar

//Objetos
const persona = { //Declarar objeto persona
    "nombre" : "Juan", //Propiedad nombre
    edad: 20, //Propiedad edad
    sexo: "Masculino", //Propiedad sexo
    profesion: "Estudiante", //Propiedad profesion
    calificaciones : [10,9,8,7], //Propiedad calificaciones
    info : {
        estado : "CDMX",
        pais : "Mexico",
    }
}; //Close the object persona
console.log(persona); //Imprimir objeto persona
console.log(persona.nombre); //Imprimir propiedad nombre del objeto persona
console.log(persona.calificaciones[2]); //Imprimir propiedad calificaciones del objeto persona
console.log(persona.info.pais); //Imprimir propiedad estado del objeto persona
console.log(typeof persona); //Imprimir tipo de variable persona