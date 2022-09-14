const divProductos = document.querySelector("#vistaPrevia");

fetch("datos2.json")
    .then((response) => response.json())
    .then((data) => {
        data.forEach((element) => {
            divProductos.innerHTML += `
            <div class="card text-white bg-primary mb-3" style="width: 20rem; margin: 32px; padding:5px;margin:auto;">
            <a href="productos.html">
<img src="${element.imagen}"class="card-img-top" alt="imagen"> </a>
<div class="card-body">

    <h5  class="nombre text-white">"${element.nombre}"</h5>
    <p class="stock" style:"color:white">Stock: ${element.stock}</p>
    <p class="precio">Precio: ${element.precio}</p> 
</div>
</div>

        `;
        });
    })