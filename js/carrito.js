let productosCarrito = JSON.parse(localStorage.getItem('productos-en-carrito'));
const contenedorCarritoVacio = document.querySelector('#carrito-vacio');
const contenedorCarritoComprado = document.querySelector('#carrito-comprado');
const contenedorProductos = document.querySelector('#contenedor-carrito-productos');
const contenedorCarritoAcciones = document.querySelector('#carrito-acciones');
let btnEliminar = document.querySelectorAll('.carrito-producto-eliminado');
let btnEVaciarCarrito = document.querySelector('#carrito-acciones-vaciar');
let btnComprarCarrito = document.querySelector('#carrito-acciones-comprar');
let totalCantidad = document.getElementById('total');

function cargarProductsCarrito() {
  contenedorProductos.innerHTML = '';
  if (productosCarrito && productosCarrito.length > 0) {
    contenedorCarritoVacio.classList.add('disabled');
    contenedorCarritoComprado.classList.add('disabled');
    contenedorProductos.classList.remove('disabled');
    contenedorCarritoAcciones.classList.remove('disabled');

    productosCarrito.forEach((producto) => {
      const div = document.createElement('div');
      div.classList.add('carrito-producto');
      div.innerHTML = `
                      <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${
        producto.titulo
      }" />
                      <div class="carrito-producto-titulo">
                          <small>Titulo</small>
                          <h3>${producto.titulo}</h3>
                      </div>
                      <div class="carrito-producto-cantidad">
                          <small>Cantidad</small>
                          <p>${producto.cantidad}</p>
                      </div>
                      <div class="carrito-producto-precio">
                          <small>Precio</small>
                          <p>${producto.precio}</p>
                      </div>
                      <div class="carrito-producto-subtotal">
                          <small>Subtotal</small>
                          <p>$${producto.precio * producto.cantidad}</p>
                      </div>
                      
                          <button class="carrito-producto-eliminado" id="${
                            producto.id
                          }"><i class="bi bi-trash-fill"></i></button>
                      `;
      contenedorProductos.appendChild(div);
    });
  } else {
    contenedorCarritoVacio.classList.remove('disabled');
    contenedorCarritoComprado.classList.add('disabled');
    contenedorProductos.classList.add('disabled');
    contenedorCarritoAcciones.classList.add('disabled');
  }
  actualizarBtnEliminar();
  actualizarTotalPrecio();
}

cargarProductsCarrito();
actualizarBtnEliminar();

function mostrarAlertaEliminar(mensaje) {
  // Selecciona el contenedor de alertas
  const alertContainer = document.getElementById('alert-container');

  // Crea la alerta
  const alerta = document.createElement('div');
  alerta.classList.add('alert', 'alert-delete');
  alerta.textContent = mensaje;

  // Agrega la alerta al contenedor
  alertContainer.appendChild(alerta);
  // Elimina la alerta después de 4 segundos
  setTimeout(() => {
    alerta.remove();
  }, 4000);
}

function mostrarCompra(mensaje) {
  // Selecciona el contenedor de alertas
  const alertContainer = document.getElementById('alert-container');

  // Crea la alerta
  const alerta = document.createElement('div');
  alerta.classList.add('alert', 'alert-buy');
  alerta.textContent = mensaje;

  // Agrega la alerta al contenedor
  alertContainer.appendChild(alerta);
  // Elimina la alerta después de 4 segundos
  setTimeout(() => {
    alerta.remove();
  }, 4000);
}

function actualizarBtnEliminar() {
  btnEliminar = document.querySelectorAll('.carrito-producto-eliminado');

  btnEliminar.forEach((boton) => {
    boton.addEventListener('click', eliminarDelCarrito);
  });
}

function eliminarDelCarrito(e) {
  const idBoton = e.currentTarget.id; // Obtener el id del producto a eliminar
  const index = productosCarrito.findIndex((producto) => producto.id === idBoton); // Buscar el índice del producto

  if (index !== -1) {
    productosCarrito.splice(index, 1);

    mostrarAlertaEliminar('Producto eliminado exitosamente');

    localStorage.setItem('productos-en-carrito', JSON.stringify(productosCarrito));
    cargarProductsCarrito();
  } else {
    console.error('Producto no encontrado en el carrito');
  }
}

//totalCantidad

function actualizarTotalPrecio() {
  totalCantidad.innerText = productosCarrito.reduce(
    (acc, producto) => acc + (producto.precio * producto.cantidad),0
  );
}


//vaciar carrito
btnEVaciarCarrito.addEventListener('click', vaciarCarrito);
function vaciarCarrito() {
  productosCarrito.length = 0;
  localStorage.setItem('productos-en-carrito', JSON.stringify(productosCarrito));

  cargarProductsCarrito();
  mostrarAlertaEliminar('Carrito vacío');
}

//comprar carrito

btnComprarCarrito.addEventListener('click', comprarCarrito);
function comprarCarrito() {
  mostrarCompra('Comprando carrito');
  productosCarrito.length = 0;
  localStorage.setItem('productos-en-carrito', JSON.stringify(productosCarrito));

  contenedorCarritoVacio.classList.add('disabled');
  contenedorProductos.classList.add('disabled');
  contenedorCarritoAcciones.classList.add('disabled');
  contenedorCarritoComprado.classList.remove('disabled');
  mostrarCompra('Compra de carrito exitosamente');
}
