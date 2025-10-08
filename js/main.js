/*
array de productos
*/

const frutas = [
    { id : 1, nombre: "arandano", precio: 5000, ruta_img:"img/arandano.jpg" },
    { id: 2, nombre: "banana", precio: 1000, ruta_img:"img/banana.jpg" },
    { id: 3, nombre: "frambuesa", precio: 4000, ruta_img:"img/frambuesa.png" },
    { id: 4, nombre: "frutilla", precio: 3000, ruta_img:"img/frutilla.jpg" },
    { id: 5, nombre: "kiwi", precio: 2000, ruta_img:"img/kiwi.jpg" },
    { id: 6, nombre: "mandarina", precio: 800, ruta_img:"img/mandarina.jpg" },
    { id : 7, nombre: "manzana", precio: 1500, ruta_img:"img/manzana.jpg" },
    { id: 8, nombre: "naranja", precio: 9000, ruta_img:"img/naranja.jpg" },
    { id: 9, nombre: "pera", precio: 2500, ruta_img:"img/pera.jpg" },
    { id: 10, nombre: "anana", precio: 3000, ruta_img:"img/anana.jpg" },
    { id: 11, nombre: "pomelo-amarillo", precio: 2000, ruta_img:"img/pomelo-amarillo.jpg" },
    { id: 12, nombre: "pomelo-rojo", precio: 2000, ruta_img:"img/pomelo-rojo.jpg" },
    { id: 13, nombre: "sandia", precio: 1800, ruta_img:"img/sandia.jpg"}
]
//inicializo frutas como una constante ya que sus valores no van a cambiar en ningun momento



let contenedorFrutas = document.querySelector("#contenedorFrutas");
let contenedorCarrito = document.querySelector("#contenedorCarrito");
let barraBusqueda = document.querySelector("#barraBusqueda");
//variables que inicializo fuera que cualquier funcion, ya que posteriormente les daré uso dentro de ciertas
//funciones especificas, para generar codigo html, utilizo querySelector para obtenerlas, también podria utilizar getElementById()


function mostrarProductos(array){
    let cardProductos = "";
    array.forEach((fruta) => {
        cardProductos +=
        `
        <div class="card-producto">
            <img src="${fruta.ruta_img}" alt="${fruta.nombre}"/>
            <h3>${fruta.nombre}</h3>
            <p>${fruta.precio}</p>
            <button class="boton-agregarcarrito" onclick="agregarACarrito(${fruta.id})">Agregar al carrito</button>
        </div>
        `;

        contenedorFrutas.innerHTML = cardProductos;
    })
}
/*
la funcion mostrarProductos tendrá como parametro un array de, en este caso frutas, que entraran una por una gracias al forEach,
y cada una se construirá en la variable cardProductos codigo html con el nombre y el precio de la fruta, asi como su id para que
cada una sea unica, luego se insertará el codigo html en una variable con el metodo de document: innerHTML
*/


barraBusqueda.addEventListener("keyup", () => {
    filtrarProductos();
});
/*
addEventListener es el metodo que se encarga de gestionar qué interaccion tenemos con la pagina, en este
caso, que guarde cada vez que dejo de apretar una tecla
*/


function filtrarProductos(){
    let valorBusqueda = barraBusqueda.value;

    let productosFiltrados = frutas.filter(f => f.nombre.includes(valorBusqueda));

    mostrarProductos(productosFiltrados);

}
/*
obtenemos en una variable el valor de lo que el usuario vaya escribiendo en la barra de busqueda,
despues seleccionamos los elementos que cumplan una condicion para mandarlos a un nuevo array con .filter
y si los caracteres que escribimos en la barra de busqueda coinciden con el nombre de alguna fruta, esta se agregará
a la variable productos filtrados y serán mostradas en el main
*/


let carrito = [];

function agregarACarrito(id){

    let frutaSeleccionada = frutas.find(f => f.id === id);

    carrito.push(frutaSeleccionada);

    console.log(carrito);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();
    actualizarContadorCarrito();
    actualizarTotalCarrito()
}
/*
con find busco el primer elemento que cumpla, en este caso la condicion de tener el mismo id, almaceno ese match en una variable,
despues con .push, agrego el elemento dentro del array, despues convierto el contenido del carrito en un json para guardarlo en el localStorage
y por ultimo llamo a mostrar carrito para que en la web aparezcan las furtas seleccionadas en el carrito
*/


function mostrarCarrito(){
    let cartaCarrito = "<ul>";

    carrito.forEach((elemento, indice) => {
        cartaCarrito +=
        `<li class="bloque-item">
            <p class="nombre-item">${elemento.nombre} - $${elemento.precio}</p>
            <button class="boton-eliminar" onclick="eliminarElemento(${indice})">Eliminar</button>
            </li>
        `
    })
    cartaCarrito += `</ul> <button class="boton-vaciarcarrito" onclick='vaciarCarrito()'> Vaciar carrito </button>`;
    console.log(cartaCarrito);
    contenedorCarrito.innerHTML = cartaCarrito;

}
/*
lo primero q hago es crear el contenedor de la lista y lo almaceno en una variable, despues quiero recorrer cada elemento del carrito,
y cada uno será un elemento de la lista con formato nombre y precio, y tendrá un boton eliminar para tambien poder borrarlos, algo importante a tener en cuenta
es el parametro indice, para que al borrar por ejemplo una manzana, si hay muchas manzanas en la lista de compra, solo elimine la del indice determinado
*/


function actualizarContadorCarrito() {
    let headerCarrito = document.querySelector(".header-carrito h4");
    headerCarrito.textContent = `Carrito: ${carrito.length} productos`;
}
/*
funcion para sumar la cantidad de elementos que tengo en el carrito en cada momento, inicializo una variable
que capture el h4 que tengo en el div "header-carrito" y lo transformo en texto con textContent.
esta funcion tengo que llamarla luego en todos los lugares donde el carrito cambia, para que se actualice correctamente
*/


function actualizarTotalCarrito() {
    let total = carrito.reduce((total, fruta) => total + fruta.precio, 0);
    let totalCarritoSuma = document.querySelector(".total-carrito h4");
    totalCarritoSuma.textContent = `Total: $${total}`;
}
/*
funcion similar a actualizarContadorCarrito, decidi hacerlo en funciones separadas ya que tengo entendido que es una buena practica
que una funcion no se encargue de muchas tareas, ademas si luego queremos agregarle otra cosa, podria tener errores, esta funcion utiliza
reduce que es un metodo para sumar elementos.
*/


function eliminarElemento(indice){
    console.log(`test de eliminacion ${indice}`);

    carrito.splice(indice, 1);

    mostrarCarrito();
    actualizarContadorCarrito();
    actualizarTotalCarrito()
}
/*
elimino el elemento seleccionado con el metodo splice, el cual consta de 2 parametros, el primero la posicion en el array
(indice) y el segundo es la cantidad de elementos a ser eliminados, 1 en este caso.
Luego tengo que actualizar el carrito para que se eliminen aquellos elementos que seleccioné
*/


function vaciarCarrito(){
    carrito = [];
    contenedorCarrito.innerHTML = "";
    actualizarContadorCarrito();
    actualizarTotalCarrito()
}
/*
esta funcion hace que el carrito se "transforme" en un array vacio, haciendo que no deba ver
uno por uno que elementos hay para borrarlos, directamente la inicializa vacia, lo mismo con
el contenedor del carrito, el codigo html quedará vacio
*/



function init(){
mostrarProductos(frutas);
actualizarContadorCarrito();
actualizarTotalCarrito()
}
/*
es la funcion principal del main que tendrá los metodos principales para que en el documento
aparezcan todos los objetos creados, y se vayan actualizando a medida que se interactua con la pagina.
*/

init();