const contenedor = document.getElementById("productos");
const lista = document.getElementById("listaCarrito");
const totalSpan = document.getElementById("total");
const contador = document.getElementById("contador");
const vaciarBtn = document.getElementById("vaciar");
const btnCarrito = document.getElementById("btnCarrito");
const panelCarrito = document.getElementById("panelCarrito");
const btnFinalizar = document.getElementById("Finalizar");
const exito = document.getElementById("exito");


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

btnCarrito.onclick = (e) => {
    e.stopPropagation();
    panelCarrito.classList.toggle("hidden");
};


document.onclick = (e) => {
    if (!panelCarrito.contains(e.target) && e.target !== btnCarrito) {
        panelCarrito.classList.add("hidden");
    }
};


btnFinalizar.onclick = () => {
    if (carrito.length === 0) return;

    carrito = [];
    actualizar();

    panelCarrito.classList.add("hidden");

    mostrarExito("Compra relizada con éxito");
}


/* ========= Cargar JSON ========= */
fetch("../public/data/productos.json")
    .then(r => r.json())
    .then(data => pintarProductos(data));


function pintarProductos(productos) {

    productos.forEach(p => {

        const card = document.createElement("div");

        card.className = "bg-white rounded shadow p-4 flex flex-col";

        card.innerHTML = `
      <img src="${p.imagen}" class="h-80 object-cover rounded mb-2">
      <h3 class="font-semibold">${p.nombre}</h3>
      <p class="text-blue-600 font-bold">$${p.precio}</p>
      <button class="mt-auto bg-blue-600 text-white py-2 rounded">
        Añadir al carrito
      </button>
    `;

        card.querySelector("button")
            .onclick = () => agregar(p);

        contenedor.appendChild(card);
    });
}



function agregar(prod) {

    const existe = carrito.find(x => x.id === prod.id);

    if (existe) existe.cantidad++;
    else carrito.push({ ...prod, cantidad: 1 });

    actualizar();
}


function eliminar(id) {
    carrito = carrito.filter(p => p.id !== id);
    actualizar();
}


function actualizar() {

    lista.innerHTML = "";

    let total = 0;
    let cant = 0;

    carrito.forEach(p => {

        total += p.precio * p.cantidad;
        cant += p.cantidad;

        const li = document.createElement("li");

        li.className = "flex justify-between bg-gray-100 p-2 rounded";

        li.innerHTML = `
        <span>
      ${p.nombre} (${p.cantidad}) - $${p.precio * p.cantidad}
      </span>
      <button class="text-blue-600">X</button>
    `;

        li.querySelector("button")
            .onclick = (e) => {
                e.stopPropagation();
                eliminar(p.id);
            };

        lista.appendChild(li);
    });

    totalSpan.textContent = total;
    contador.textContent = cant;

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarExito(mensaje) {
    exito.textContent = "✔ " + mensaje;

    exito.classList.remove("hidden");
    exito.classList.add("show");

    setTimeout(() => {
        exito.classList.remove("show");
        exito.classList.add("hidden");
    }, 2500);

}

vaciarBtn.onclick = () => {
    carrito = [];
    actualizar();
};


actualizar();

