const titPrincipalContent = document.querySelector('#titulo-principal');
const contenedorProductos = document.querySelector('#contenedor-productos');
const botonesCategorias = document.querySelectorAll('.boton-categoria');
let botonesAgregar = document.querySelectorAll('.producto-agregar');
const cantidadCarritoText = document.querySelector('#numerito');

function cargarProductos(productosElegidos) {
  // Limpiar contenido anterior
  contenedorProductos.innerHTML = '';

  productosElegidos.forEach((producto) => {
    const div = document.createElement('div');
    div.classList.add('producto');
    div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}" />
        <div class="producto-detalles">
        <h2 class="producto-titulo">${producto.titulo}</h2>
        <p class="producto-precio">$${producto.precio}</p>
        <button class="producto-agregar"  data-Uno='2'  id="${producto.id}">Agregar</button>
        </div>`;
    contenedorProductos.appendChild(div);
  });

  actualizarBtnAgregar();
}

//rellenamos productos por defecto al cargar la página
cargarProductos(productos);

botonesCategorias.forEach((boton) => {
  boton.addEventListener('click', (e) => {
    //le quitamos y agregamos la clase active para el efecto de selección
    botonesCategorias.forEach((boton) => boton.classList.remove('active'));
    e.currentTarget.classList.add('active');

    if (e.currentTarget.id !== 'todos') {
      const productCategoria = productos.find(
        (producto) => producto.categoria.id === e.currentTarget.id
      );
      titPrincipalContent.innerText = productCategoria.categoria.nombre;

      //Productos por categoría: abrigos, camisetas, pantalones
      const productsBtn = productos.filter(
        (producto) => producto.categoria.id === e.currentTarget.id
      );
      cargarProductos(productsBtn);
    } else {
      titPrincipalContent.innerText = 'Todos los productos';
      cargarProductos(productos);
    }
  });
});

function actualizarBtnAgregar() {
  botonesAgregar = document.querySelectorAll('.producto-agregar');
  botonesAgregar.forEach((boton) => {
    boton.addEventListener('click', agregarAlCarrito);
  });
}
//array de productos carrito
let productosCarrito;
const productosCarritoLS = localStorage.getItem('productos-en-carrito');

if (productosCarritoLS) {
  productosCarrito = JSON.parse(productosCarritoLS);
  actualizarNumCarr();
} else {
  productosCarrito = [];
}

function mostrarAlertaAdd(mensaje) {
  // Selecciona el contenedor de alertas
  const alertContainer = document.getElementById('alert-container');

  // Crea la alerta
  const alerta = document.createElement('div');
  alerta.classList.add('alert', 'alert-add');
  alerta.textContent = mensaje;

  // Agrega la alerta al contenedor
  alertContainer.appendChild(alerta);
  // Elimina la alerta después de 4 segundos
  setTimeout(() => {
    alerta.remove();
  }, 4000);
}


function agregarAlCarrito(e) {
  const idBoton = e.currentTarget.id;
  const productoAgregado = productos.find((prod) => prod.id === idBoton);
  if (productosCarrito.some((producto) => producto.id === idBoton)) {
    const index = productosCarrito.findIndex((producto) => producto.id === idBoton);
    productosCarrito[index].cantidad++;
  } else {
    productoAgregado.cantidad = 1;
    productosCarrito.push(productoAgregado);
  }

  actualizarNumCarr();
  mostrarAlertaAdd('Producto agregado exitosamente');
  localStorage.setItem('productos-en-carrito', JSON.stringify(productosCarrito));
}

function actualizarNumCarr() {
  const numCantCarrito = productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  cantidadCarritoText.textContent = numCantCarrito;
}

