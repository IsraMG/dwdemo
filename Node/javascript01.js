let x=9;
console.log(x);

let var1 = 1; //int
console.log(typeof var1);
let var2 = 2.5 //float
console.log(typeof var2);
let var3 = true //Booleano
console.log(typeof var3);
let var4 = "Hola" //Cadena
console.log(typeof var4);
let var5 = [1,2,3] //arrelglo
console.log(typeof var5);

//Cadenas
//concatenar Cadenas
let cad1="Hola"
let cad2="Mundo"
console.log(cad1 + " " + cad2)

//Backticks
console.log(`${cad1} ${cad2}`) //Plantillas literales

//Cadenas son inmutable 
cad1[2] = 'j';
console.log(cad1) //No modifico nada por que las cadenas no se pueden modificar 

cad1= 'hoja'
console.log(cad1) //si quiero modificar la cadena tengo que volver a asignarle otro valor

//A diferencia de las cadenas los arreglos son mutables
let arr1=[1,2,3,4]
console.log()
console.log(arr1)
arr1[2] =10
console.log()
console.log(arr1)

//Arreglos 
let arr2 = arr1; //aqui el arr2 esta apuntando al mismo espacio de memoria del arr1
console.log(arr2)
console.log(arr1 === arr2) //arroja verdadero porque es como si fueran el mismo objeto
arr2.push(5) 
console.log()
console.log(arr2)
console.log(arr1) //son iguales arr1 y arr2 por que lo que le pase a 1, le pasa al otro

let arr3 = [7,8,9,10,11]
console.log()
console.log(arr3 === arr2)

let canasta =[] // inicializar vacio

//modificar elementos al arreglo
    //al principio
    canasta.unshift(5)
    canasta.unshift(9)
    console.log()
    console.log(canasta)

    //Agragar al final
    canasta.push(4)
    canasta.push(2)
    console.log()
    console.log(canasta)

    //Borrar al principio 
    canasta.shift()
    console.log()
    console.log(canasta)

    //Borrar al Final
    canasta.pop()
    console.log()
    console.log(canasta)

    canasta.push(7)
    canasta.push(3)
    canasta.push(12)
    canasta.push(-2)
    canasta.push(7)
    canasta.push(6)
    console.log()
    console.log(canasta)

    //Metodo Splice
    canasta.splice(5) //Borrara todo lo que esta en y despues de la posicion 5 
    console.log()
    console.log(canasta)

    canasta.splice(2,1) //Aqui solo borrara 1
    console.log()
    console.log(canasta)

    //Reemplazar Elementos
    canasta.splice(2,1,19) //Va cambiar el elemento que este en la posicion 2 por el numero 19
    console.log()
    console.log(canasta)

    //Añadir Elementos 
    canasta.splice(2,0,16,18,22) // no va a borrar elementos pero a partir de la pos 2 va a agregar los valores 16, 18 22
    console.log()
    console.log(canasta)

// Funciones
function fn(x){
    console.log()
    console.log(x)
}
console.log()
console.log("Implimentacion de la funcion")
fn(2)
fn(true)
fn(canasta)
console.log()
    //Callback Significa que una funcion recibe como parametro otra funcion 
    function f(func, nombre){
        func(nombre)
    }

    function saludar(nombre){
        console.log()
        console.log(`Hola ${nombre}`)
    }

    f(saludar,"Isra")

// Operador Ternario
let x1= 5 > 2?console.log("Verdadero"):console.log("Falso")
//console.log(x1)
let x2 = 5>3?console.log("Azul"):5>7?console.log("Verde"):console.log("Cafe")

// Procesar elementos del arreglo 
let arr4 = [4,7,8,2,3]
arr4.forEach(function(elemento,index){
    console.log()
    console.log(`${index} : ${elemento}`)
}) // Te va a imrpimir los elementos del arrglo, el primier parametro recible los elementos y el segundo el indice