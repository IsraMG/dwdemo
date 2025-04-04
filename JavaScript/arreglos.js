let arreglo = [1, 2, 3, 4, 5, 6,7, 8 , 9 ,10]; //Declarar arreglo arreglo
const arreglo2 = arreglo;

console.log(arreglo === arreglo2); //true, porque ambos apuntan al mismo objeto en memoria

// Ejemplo adicional: Comparación de arreglos con diferentes referencias
const arreglo3 = [1, 2, 3, 4, 5, 6,7, 8, 9, 10];
console.log(arreglo === arreglo3); //false, porque aunque tienen los mismos valores, son diferentes objetos en memoria

// Comparación de valores dentro de los arreglos
console.log(arreglo[0] === arreglo3[0]); //true, porque los valores en la posición 0 son iguales y del mismo tipo

let arregloNuevo = arreglo.map(function(elemento) {
    return elemento;
});
console.log(arregloNuevo); //Imprimir arreglo nuevo
console.log(arregloNuevo === arreglo); //false, porque son diferentes objetos en memoria
/*const x= 1;
const y = "1";
console.log(x==y); //true compara el valor sin importarle el tipo en el comparador doble ==
console.log(x===y); //False*/

//Plantillas literales
const nombre = "Isra"; //Declarar variable nombre
console.log("Hola " + nombre); //Imprimir variable nombre
console.log(`Hola ${nombre}`); //Imprimir variable nombre usando template literals 
console.log("Hola", nombre, "saludos"); //Imprimir variable nombre usando template literals

// foreach
arreglo.forEach(function(elemento, indice) { //Recorrer arreglo arreglo
    console.log("Elemento por dos: " + elemento*2 + ", Indice: " + indice); //Imprimir elemento e indice del arreglo
}); // Close the function forEach

arreglo.forEach(function(elemento, indice, arr) {
    arr[indice] = elemento * 2; // Modificar directamente los valores del arreglo
});
console.log(arreglo); // Imprimir arreglo modificado

let arreglo4 =arreglo.map(function(elemento, indice, arr) {
    return elemento*2; 
});
console.log(arreglo4); // Imprimir arreglo modificado


const suma = arreglo3.reduce(function(acumulador, elemento) { //Declarar funcion suma   
    return acumulador + elemento; //Retornar la suma de acumulador y elemento
}, 0); //Iniciar acumulador en 0
console.log(arreglo3); //Imprimir arreglo
console.log(suma); //Imprimir resultado de la funcion suma

const pares = arreglo3.filter(function(elemento) { //Declarar funcion pares
    return elemento % 2 == 0; //Retornar los elementos pares del arreglo
} ); // Close the function filter
console.log(pares); //Imprimir arreglo pares