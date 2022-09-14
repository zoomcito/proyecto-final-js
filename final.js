const divProductos = document.querySelector("#divProductos");
const divCarrito = document.querySelector("#carrito")
let carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];
let productos = [{
        id: 1,
        nombre: "Los Angeles Lakers local 2021/2022",
        precio: "120 USD",
        stock: 18,
        imagen: "imagenes/lakers1.png"

    },
    {
        id: 2,
        nombre: "Los Angeles Lakers visitante 2021/2022",
        precio: "100 USD",
        stock: 15,
        imagen: "imagenes/lakers2.png"

    },
    {
        id: 3,
        nombre: "Los Angeles Lakers alternativa 2021/2022",
        precio: "80 USD",
        stock: 5,
        imagen: "imagenes/lakers3.png"

    },
    {
        id: 4,
        nombre: "Cleveland Cavaliers local 2021/2022",
        precio: "120 USD",
        stock: 5,
        imagen: "imagenes/cavs1.png"

    },
    {
        id: 5,
        nombre: "Cleveland Cavaliers visitante 2021/2022",
        precio: "100 USD",
        stock: 8,
        imagen: "imagenes/cavs2.png"

    },
    {
        id: 6,
        nombre: "Cleveland Cavaliers alternativa 2021/2022",
        precio: "80 USD",
        stock: 21,
        imagen: "imagenes/cavs3.png"

    },
    {
        id: 7,
        nombre: "Philadephia 76ers local 2021/2022",
        precio: "120 USD",
        stock: 14,
        imagen: "imagenes/sixers1.png"

    },
    {
        id: 8,
        nombre: "Philadephia 76ers visitante 2021/2022",
        precio: "100 USD",
        stock: 23,
        imagen: "imagenes/sixers2.png"

    },
    {
        id: 9,
        nombre: "Philadephia 76ers alternativa 2021/2022",
        precio: "80 USD",
        stock: 19,
        imagen: "imagenes/sixers3.png"

    },
    {
        id: 10,
        nombre: "Chicago Bulls local 2021/2022",
        precio: "120 USD",
        stock: 13,
        imagen: "imagenes/bulls1.png"

    },
    {
        id: 11,
        nombre: "Chicago Bulls visitante 2021/2022",
        precio: "100 USD",
        stock: 17,
        imagen: "imagenes/bulls2.png"

    },
    {
        id: 12,
        nombre: "Chicago Bulls alternativa 2021/2022",
        precio: "80 USD",
        stock: 9,
        imagen: "imagenes/bulls3.png"

    },
    {
        id: 13,
        nombre: "Nike Zoom Freak 1",
        precio: "160 USD",
        stock: 15,
        imagen: "imagenes/zapas1.png"

    },
    {
        id: 14,
        nombre: "Nike Zoom Freak 2",
        precio: "110 USD",
        stock: 11,
        imagen: "imagenes/zapas2.png"

    },
    {
        id: 15,
        nombre: "Nike Kobe",
        precio: "145 USD",
        stock: 12,
        imagen: "imagenes/zapas3.png"

    },
    {
        id: 16,
        nombre: "Nike Zoom Kobe B Side",
        precio: "133 USD",
        stock: 22,
        imagen: "imagenes/zapas4.png"

    },
    {
        id: 17,
        nombre: "Nike Kyrie Irving",
        precio: "100 USD",
        stock: 14,
        imagen: "imagenes/zapas5.png"

    },
    {
        id: 18,
        nombre: "Nike Paranoid Zoom",
        precio: "120 USD",
        stock: 9,
        imagen: "imagenes/zapas6.png"

    },
    {
        id: 19,
        nombre: "Nike Nbarg",
        precio: "180 USD",
        stock: 23,
        imagen: "imagenes/zapas7.png"

    }
]

function generarCards() {
    const mostrarCards = productos.map((element) => {
        const {
            imagen,
            nombre,
            precio,
            id,
            stock
        } = element;
        if (stock >= 1) {
            return `<div class="card text-white bg-primary mb-3" style="width: 20rem;margin:auto; margin: 32px; padding:5px;">
            <img src="${imagen}" class="card-img-top" alt="imagen">
            <div class="card-body">
                <h5 class="nombre text-white">"${nombre}"</h5>
                <p class="precio">Precio: ${precio}</p>
                <p class="stock">Stock: ${stock}</p>
                <button id="agregar${id}" class="btn btn-outline-light">Añadir al carrito</button>
            </div>
            </div>`;
        } else {
            return `<div class="card text-white bg-primary mb-3" style="width: 20rem;margin:auto; margin: 32px; padding:5px;">
            <img src="${imagen}" class="card-img-top" alt="imagen">
            <div class="card-body">
                <h5 class="nombre text-white">"${nombre}"</h5>
                <p class="precio">Precio: ${precio}</p>
                <p class="stock">Stock: ${stock}</p>
                <button disabled="true" id="agregar${id}" class="btn btn-outline-light">Añadir al carrito</button>
            </div>
            </div>`;
        }
    });
    divProductos.innerHTML = mostrarCards.join("")
    botonAgregar();
}

function botonAgregar() {
    productos.forEach((producto) => {
        document.querySelector(`#agregar${producto.id}`).addEventListener("click", () => {
            mandarAlCarrito(producto);
        })
    })
}

function mandarAlCarrito(producto) {
    const existe = carrito.some((element) => element.id === producto.id);
    productos.map((element) => {
        if (element.id === producto.id) {
            element.stock--;
            return element;
        }
    });

    const productoAlCarrito = {
        ...producto,
        cantidad: 1
    };
    delete productoAlCarrito.stock;
    if (existe) {
        carrito.map((element) => {
            if (element.id === producto.id) {
                element.cantidad++;
                return element;
            }
        })
    } else {
        Toastify({
            text: "Producto agregado al carrito",
            duration: 2500,
            style: {
                color: "#FFFFFF",
                background: "linear-gradient(to right, #999999, #454545)"
            },
            close: true,
        }).showToast();
        carrito.push(productoAlCarrito);
        localStorage.setItem("carrito", JSON.stringify(carrito));

    }
    pintarCarrito();
    generarCards();

}

function pintarCarrito() {
    divCarrito.innerHTML = "";
    carrito.forEach((element) => {
        divCarrito.innerHTML += `<div class="card text-white bg-primary mb-3">
        <img src="${element.imagen}" class="card-img-top" alt="imagen">
        <div class="card-body">
            <h5 class="nombre text-white">"${element.nombre}"</h5>
            <p class="precio">Precio: ${element.precio}</p>
            <p class="stock">Cantidad: ${element.cantidad}</p>
            <div class="btnBorrar"><button  class="btn btn-outline-light" id="${element.id}">Eliminar</button></div>
        </div>
        </div>
        `;
    });
    borrarProducto();
}

function borrarProducto() {
    let btnBorrar = document.querySelectorAll(".btnBorrar");
    btnBorrar.forEach((element) => {
        element.addEventListener("click", (e) => {
            let id = parseInt(e.target.id);
            let prod = carrito.find((element) => element.id === id);
            let cantidad = prod.cantidad;
            carrito = carrito.filter((element) => element.id !== id);
            let prodCarrito = productos.find((element) => element.id === id);
            prodCarrito.stock += cantidad;


            pintarCarrito();
            generarCards();
        });
    });
}
const terminarCompra = () => {
    carrito = []
    divCarrito.innerHTML = ''
    Swal.fire({
        title: 'Gracias por su compra',
        text: "Un mail con todos los detalles se esta enviando",
        imageUrl: 'imagenes/fotoFinal.jpg',
        imageWidth: 800,
        imageHeight: 600,
        imageAlt: 'fotofinal',
    })
}



generarCards();