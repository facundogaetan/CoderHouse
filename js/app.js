$(document).ready(function () {
    const almacenados = JSON.parse(localStorage.getItem("Carrito"))
    for (const objeto of almacenados) {
        arrayCarritoConDescripcion.push(objeto);
    }
});
$(document).ready(function () {
    const almacenados = JSON.parse(localStorage.getItem("montoACobrar"))
    for (const objeto of almacenados) {
        arrayCarrito.push(objeto);
    }
    const montoCarrito = document.getElementById('montoACobrar');
    montoCarrito.innerHTML = `${sumarCarrito()}`;
});
function cambiarNombreCliente() {
    $("#nombreCliente").html(`${document.formCliente.nombre.value}`)
}


const listaProductos = [
    {
        id: 1,
        producto: "Cheese Burguer",
        precio: 120,
        image: "./img/cheeseBurguer.jpg"
    },
    {
        id: 2,
        producto: "Double Cheese Burguer",
        precio: 170,
        image: "./img/doubleCheeseBurguer.jpg"
    },
    {
        id: 3,
        producto: "Triple Cheese Burguer",
        precio: 240,
        image: "./img/tripleCheeseBurguer.jpg"
    },
    {
        id: 4,
        producto: "Fries",
        precio: 100,
        image: "./img/fries.jpg"
    },
    {
        id: 5,
        producto: "Soda",
        precio: 100,
        image: "./img/soda.jpg"
    },
    {
        id: 6,
        producto: "Ice Cream",
        precio: 50,
        image: "./img/iceCream.jpg"
    },
    {
        id: 7,
        producto: "Chocolate Sundae",
        precio: 100,
        image: "./img/chocolateSundae.png"
    },
    {
        id: 7,
        producto: "Strawberry Sundae",
        precio: 100,
        image: "./img/strawberrySundae.png"
    }
        
];



let arrayCarrito = [];
let arrayCarritoConDescripcion = [];

function sumarCarrito() {
    let suma = 0;
    for (let i = 0; i < arrayCarrito.length; i++) {
        suma += arrayCarrito[i];
    }
    return suma;
}

function vaciarCarrito() {
    arrayCarrito.splice(0, arrayCarrito.length)
    arrayCarritoConDescripcion.splice(0, arrayCarritoConDescripcion.length)
    $("#montoACobrar").html(arrayCarrito);
    $("#ordenActual").html(``)
    $("#botonGenerarOrden").hide();
    $("#checkMedioPago").hide();

}

function verCarrito() {
    for (let i = 0; i < arrayCarritoConDescripcion.length; i++) {
        const ordenActual = document.getElementById('ordenActual');
        const itemDeLaLista = document.createElement('li');
        itemDeLaLista.setAttribute("class", "list-group-item")
        itemDeLaLista.innerHTML = `${arrayCarritoConDescripcion[i]}`
        ordenActual.appendChild(itemDeLaLista);
        console.log("Mostrando carrito...")
    }
    const itemDeLaLista = document.getElementById('ordenActual')
    const montoACobrar = document.createElement('p');
    montoACobrar.setAttribute("class", "list-group-item list-group-item-danger")
    montoACobrar.innerHTML = `Total a cobrar $${sumarCarrito()}`;
    itemDeLaLista.appendChild(montoACobrar);

    $("#botonGenerarOrden").show();
    $("#checkMedioPago").show();

    //localStorage
    guardarEnLocal("Carrito", JSON.stringify(arrayCarritoConDescripcion))
    guardarEnLocal("montoACobrar", JSON.stringify(arrayCarrito))
}

function generarOrden() {
    $("#listaItems").hide();
    const divCheckout = document.getElementById('checkout')

    if (document.getElementById('opcion1').checked == true) {
        mensajeEfvo = document.createElement('h3');
        mensajeEfvo.setAttribute("id", "mensajeCheckout")
        mensajeEfvo.setAttribute("class", "btn btn-success me-2 fs-1")
        mensajeEfvo.innerHTML = `Abriendo caja registradora... Sonria al cliente! ;)`
        divCheckout.append(mensajeEfvo)
    } else if (document.getElementById('opcion2').checked == true) {
        mensajeTarj = document.createElement('h3');
        mensajeTarj.setAttribute("id", "mensajeCheckout")
        mensajeTarj.setAttribute("class", "btn btn-success me-2 fs-1")
        mensajeTarj.innerHTML = `Deslice tarjeta por el POSNET... Sonria al cliente! ;)`
        divCheckout.append(mensajeTarj)
    }
}

function aplicarDescuento() {
    let suma = 0;
    for (let i = 0; i < arrayCarrito.length; i++) {
        suma += arrayCarrito[i];
    }
    valorFinal = suma - (suma * 0.30)
    $("#montoACobrar").html(valorFinal);
    console.log("Descuento aplicado");
}

function mostrarProductos() {
    for (let i = 0; i < listaProductos.length; i++) {
        const listaItems = document.getElementById('listaItems');
        const divPadre = document.createElement('div');
        divPadre.setAttribute("class", "card");
        divPadre.setAttribute("style", "width: 18rem;");
        divPadre.setAttribute("id", listaProductos[i].producto);

        listaItems.appendChild(divPadre);

        const divHijo = document.createElement('div');
        divHijo.setAttribute("class", "card-body");
        const tituloProducto = document.createElement('h4');
        tituloProducto.setAttribute("class", "card-title");
        tituloProducto.innerHTML = `${listaProductos[i].producto}`;

        divPadre.appendChild(divHijo);
        divHijo.appendChild(tituloProducto);

        const descripcionProducto = document.createElement('p');
        descripcionProducto.setAttribute("class", "card-text");
        descripcionProducto.innerHTML = `$${listaProductos[i].precio}`

        divHijo.appendChild(descripcionProducto);

        //bloque para inyectar imagen del producto
        const imagenProducto = document.createElement('img');
        imagenProducto.setAttribute("class", "card-img-top")
        imagenProducto.setAttribute("src", listaProductos[i].image)


        divPadre.appendChild(imagenProducto);

        //funcionalidad que suma los productos
        let botonAgregar = document.getElementById(listaProductos[i].producto)
        botonAgregar.addEventListener("click", () => {
            parseInt(arrayCarrito.push(listaProductos[i].precio))
            const montoCarrito = document.getElementById('montoACobrar');
            montoCarrito.innerHTML = `${sumarCarrito()}`;
            console.log(arrayCarrito);

            arrayCarritoConDescripcion.push(listaProductos[i].producto + " $" + listaProductos[i].precio)
            console.log(arrayCarritoConDescripcion);
        })
    }
}

const JSON_URL = "/data/datos.json";

$("#listaEmpleados").click(() => {
    $.getJSON(JSON_URL, (respuesta) => {
        console.log(respuesta)
    });
});

mostrarProductos();

const guardarEnLocal = (clave, valor) => { localStorage.setItem(clave, valor) };




