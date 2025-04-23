let producto = {
    id: 101,
    nombre: "Laptop",
    precio: 999.99,
    stock: 50
}

let producto2 = {
    id: 102,
    nombre: "Telefono",
    precio: 699.99,
    stock: 30
}

let producto3 = {
    id: 103,
    nombre: "Tablet",
    precio: 349.99,
    stock: 20
}

let productos = [
    producto,
    producto2,
    producto3,
];

//Acceder al primer elemento del arreglo
let prod1= productos[0];
console.log(prod1);

//Desestructuración de objetos
let [,,prod3] = productos;
console.log(prod3);
let {nombre, precio} = prod3;
console.log(`nombre: ${nombre}, precio: ${precio}`);

//Acceder al ultimo producto usando length
let ultimoProducto = productos[productos.length - 1];
console.log(ultimoProducto);

//Obtener de los productos

//1. Producto con precio mayor a 500
let productosCaros = productos.filter(function(producto){
    return producto.precio > 500;
});
console.log(productosCaros);

//Productos que empiezan con la letra "T"
let productosT = productos.filter(function(producto){
    return producto.nombre.toUpperCase().startsWith("T");
});
console.log(productosT.length>0?productosT:"No hay productos que empiecen con T");

//3. Retonar solo el nombre de los productos
let nombresProductos = productos.map(function(producto){
    return producto.nombre;
});
console.log(nombresProductos);

//4. Agregar IVA del 16% a cada producto
let productosConIVA = [];
productos.map(producto => {
    productosConIVA.push({
            ...producto,
            precio: parseFloat(producto.precio * 1.16).toFixed(2)
        })
});
console.log(`Agregando IVA del 16% a cada producto:`); 
console.log(productosConIVA);

//5. Descontar a cada producto el 10%
let productosConDescuento = [];
productos.map(producto => {
    productosConDescuento.push({
            ...producto,
            precio: parseFloat(producto.precio * 0.9).toFixed(2)
        })
});
console.log(`Descontando el 10% a cada producto:`);
console.log(productosConDescuento);