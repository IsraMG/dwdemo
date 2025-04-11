const usuarios=[
    {id:1,nombre:"Ana",edad:25,activo:true},
    {id:2,nombre:"Isra",edad:24,activo:false},
    {id:3,nombre:"Henry",edad:24,activo:true},
    {id:4,nombre:"Aura",edad:23,activo:true}
]
//Imprimir todo el arreglo
console.log(usuarios);
//Imprimir solo un elemento del arreglo
console.log(usuarios[0]); // Imprime el primer objeto del arreglo
//Desestructuración de un objeto
const {nombre,edad}=usuarios[1]; // Extrae las propiedades del primer objeto
console.log(nombre); // Imprime "Isra"
console.log(edad); // Imprime 24
const {nombre: segundaPersonaN ,edad: segundaPersonaE}=usuarios[1]; // Extrae las propiedades del primer objeto
console.log(segundaPersonaN); // Imprime "Isra"
console.log(segundaPersonaE); // Imprime 24