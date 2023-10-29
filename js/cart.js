let productoAPIeliminado = false;

document.addEventListener('DOMContentLoaded', async function () {
    await showProducts();
    await metodoDePago();
    
    cargarSubTotal();
});

async function showProducts()
{
    // Obtener los productos del carrito de la API, se sabe que solo hay un producto y es fijo.
    const response = await fetch(`${CART_INFO_URL}25801${EXT_TYPE}`);
    const APIcart = await response.json();
    const APIproduct = APIcart.articles[0];
    
    // se crea un objeto, el cual es una copia del producto obtenido de la api, pero con el formato correcto para que sea idéntico a los demás productos obtenidos desde la API.
    const APIproduct_formatted = {
        id: APIproduct.id,
        name: APIproduct.name,
        soldCount: APIproduct.count,
        cost: APIproduct.unitCost,
        currency: APIproduct.currency,
        images: [APIproduct.image]
    };
    // si no existe la variable "cart" en localStorage, la crea como un arreglo vacío.
    if(localStorage.getItem("cart") == null || localStorage.getItem("cart") == undefined || localStorage.getItem("cart") == "")
    {
        localStorage.setItem("cart", JSON.stringify([]));
    }
    // se obtiene el carrito del localStorage
    let _localCart = localStorage.getItem("cart");
    let localCart = JSON.parse(_localCart);
    // se agrega al inicio del carrito, el producto obtenido anteriormente desde la API.
    localCart.unshift(APIproduct_formatted);
    
    // se busca el contenedor HTML de los productos del carrito.
    const container = document.getElementById("cart-product-container");
    // se vacía el contenedor antes de cargar los elementos.
    container.innerHTML = "";
    // se recorre el arreglo y se agrega cada producto.
    for(let i=0; i<localCart.length; i++)
    {
        // Si el producto NO es el primero (cargado desde el localStorage), se agrega el elemento.
        // De lo contrario, si es el primero (cargado desde la API), se agrega solamente si "productoAPIeliminado" es false,
        // que significa que no se ha eliminado el primer elemento en esta sesión
        // (la única forma de saberlo es creando el bool "productoAPIeliminado" que se activa al hacer click en eliminar).
        if (i!=0 || (productoAPIeliminado == false))
        {
            container.appendChild(linea(localCart[i]));
        }
    }
    
    // Agregar evento a cada input con la clase "cantidadDeProducto"
    const inputDeCantidad = document.getElementsByClassName("cantidadDeProducto");
    for (let i = 0; i < inputDeCantidad.length; i++) {
        const idInput = inputDeCantidad[i].id;
        inputDeCantidad[i].addEventListener("input", () => { cambioDePrecio(idInput, localCart.find((p) => p.id == idInput)) });
        inputDeCantidad[i].addEventListener("input", () => { cargarSubTotal() });
    }
}

function linea(product) {
    // se crea el botón de eliminar
    let deleteButton = document.createElement("td");
    deleteButton.classList.add("ms-3");
    deleteButton.innerHTML = `<button class="btn btn-outline-danger"><i class="fa-solid fa-trash" style="color: #da3434;"></i></button>`;
    // se le agrega el evento de click
    deleteButton.addEventListener("click", ev=>{
        // si el producto no tiene la id 50924, significa que es un producto agregado por el usuario y se encuentra guardado en el localStorage.
        // por lo que se elimina de la siguiente forma:
        if(product.id != 50924)
        {
            // se obtiene el carrito del localStorage
            let _localCart = localStorage.getItem("cart");
            let localCart = JSON.parse(_localCart);
            // se obtiene el indice del elemento que se desea eliminar
            let deleteIndex = localCart.findIndex((p)=>{return p.id == product.id});
            // se elimina ese producto del carrito
            localCart.splice(deleteIndex, 1);
            // se actualiza la variable del carrito del localStorage con su nuevo valor.
            localStorage.setItem("cart", JSON.stringify(localCart));
            // se vuelven a cargar los elementos.
            showProducts();
        }else{
            // de lo contrario, si el elemento tiene la id 50924, significa que es el producto cargado desde la API.
            // este producto no se encuentra guardado en el localStorage por lo que se debe eliminar de forma diferente a los demás productos.
            // se elimina quitando el primer elemento hijo del contenedor. (se asume que el producto 50924 siempre estará en el primer lugar)
            
            productoAPIeliminado = true;
            // se busca el contenedor HTML de los productos del carrito.
            const container = document.getElementById("cart-product-container");
            if (container.firstChild) {
                // Elimina el primer hijo del contenedor, que siempre será el articulo cargado desde la API
                container.removeChild(container.firstChild);
            }
        }
        // actualiza el costo final
        cargarSubTotal();
    });
    
    // elemento final del producto que se agregará al contenedor
    let resultElement = document.createElement("tr");
    resultElement.setAttribute("valign", "middle");
    resultElement.innerHTML = 
    `
    <td class="w-25"><img src="${product.images[0]}" class="w-75"></td>
    <td class="w-25">${product.name}</td>
    <td class="w-25">${product.currency} ${product.cost}</td>
    <td><input value="1" id="${product.id}" type="number"  min="1" class="cantidadDeProducto form-control"></td>
    <td class="w-25 text-end" id="precioPorCantidad${product.id}" >${product.currency} ${product.cost}</td>
    `;
    
    // luego al elemento final se le agrega el botón
    resultElement.appendChild(deleteButton);
    // se devuelve el elemento
    return resultElement;
};

function cambioDePrecio(idInput, producto) {
    let precioUnitario = producto.cost;
    let moneda = producto.currency;
    
    let id = producto.id;
    
    const cantidadNecesaria = document.getElementById(idInput);
    
    const importe = document.getElementById(`precioPorCantidad${id}`);
    
    const cantidad = cantidadNecesaria.value;
    
    importe.innerHTML = `${moneda} ${cantidad * precioUnitario}`;
}

async function metodoDePago () {
    const divShow = document.getElementById('muestraFormaDePago');
    const tarjetaDeCredito = document.getElementById('tarjetaDeCredito');
    const transferenciaBancaria = document.getElementById('transferenciaBancaria');
    const nroTarjeta = document.getElementById('nroTarjeta');
    const codSegu = document.getElementById('codSegu');
    const vencimiento = document.getElementById('vencimiento');
    const nroCuenta = document.getElementById('nroCuenta');
    
    tarjetaDeCredito.addEventListener('change', () => {
        nroTarjeta.disabled = false;
        codSegu.disabled = false;
        vencimiento.disabled = false;
        nroCuenta.disabled = true;
        divShow.innerHTML = ``;
        divShow.innerHTML += `Tarjetas de crédito`;
    });
    
    transferenciaBancaria.addEventListener('change', () => {
        nroTarjeta.disabled = true;
        codSegu.disabled = true;
        vencimiento.disabled = true;
        nroCuenta.disabled = false;
        divShow.innerHTML = ``;
        divShow.innerHTML += `Transferencia bancaria`;
    });
}

// Obtener todos los radio buttons con name "tipoEnvio"
const envioRadios = document.querySelectorAll('input[name="tipoEnvio"]');
// Agregar un event listener a cada radio button
envioRadios.forEach((radio) => {
    radio.addEventListener("change", calcularCostoEnvio);
});

function cargarSubTotal(){
    const container = document.getElementById("cart-product-container");
    let subTotal = 0;
    
    if (container) {
        const filas = container.querySelectorAll('tr');
        
        filas.forEach(fila => {
            const columnas = fila.querySelectorAll('td'); 
            const valorColumna = columnas[4];
            const subTot = valorColumna.textContent;
            const precioFinalSubtotal = subTot.split(" ");
            subTotal += parseInt(precioFinalSubtotal[1]);
        });
        
        const contenedorSubTotalGeneral = document.getElementById("subtotalGeneral");
        contenedorSubTotalGeneral.innerHTML = `$${subTotal}` ;
        
    }
    
    calcularCostoEnvio();
}
function calcularCostoEnvio() {
    const subTotal = parseFloat(document.getElementById("subtotalGeneral").textContent.replace('$', ''));
    let costoEnvio = 0;
    envioRadios.forEach((radio) => {
        if (radio.checked) {
            const porcentaje = parseFloat(radio.value); // Obtén el porcentaje del valor del radio
            costoEnvio = (subTotal * porcentaje) / 100; // Calcula el costo de envío
        }
    });
    
    const contenedorCostoEnvio = document.getElementById("costoEnvio");
    contenedorCostoEnvio.innerHTML = `$${costoEnvio.toFixed(2)}`;
    actualizarTotal(subTotal, costoEnvio)
    
}
function actualizarTotal(subTotal, costoEnvio) {
    const total = subTotal + costoEnvio;
    const contenedorTotal = document.getElementById("total");
    contenedorTotal.innerHTML = `$${total.toFixed(2)}`;
}

// Validaciones

document.getElementById("finalizarCompra").addEventListener('click', function(event) {
    event.preventDefault(); // Evita el envío del formulario
  
      let todoCorrecto = true; // Asumimos que todo está correcto al inicio
  
      // 1. Validación dirección
      const calle = document.getElementById('calle').value;
      const numero = document.getElementById('numero').value;
      const esquina = document.getElementById('esquina').value;
      
      if (!calle) {
        document.getElementById('feedbackCalle').innerText = 'Ingresar una calle';
        todoCorrecto = false; // Hay un error
      } else {
        document.getElementById('feedbackCalle').innerText = '';
      }
  
      if (!numero) {
        document.getElementById('feedbackNumero').innerText = 'Ingresar un número';
        todoCorrecto = false; // Hay un error
      } else {
        document.getElementById('feedbackNumero').innerText = '';
      }
  
      if (!esquina) {
        document.getElementById('feedbackEsquina').innerText = 'Ingresar una esquina';
        todoCorrecto = false; // Hay un error
      } else {
        document.getElementById('feedbackEsquina').innerText = '';
      }
  
      // 2. Validación tipo de envío
      const tipoEnvio = document.querySelectorAll('input[name="tipoEnvio"]:checked');
      if (tipoEnvio.length === 0) {
        document.getElementById('feedbackEnvio').innerText = 'Debe seleccionar un tipo de envío.';
        todoCorrecto = false; // Hay un error
      } else {
        document.getElementById('feedbackEnvio').innerText = '';
      }
  
      // 3. Validación forma de pago
      const formaPago = document.querySelectorAll('input[name="pago"]:checked');
      if (formaPago.length === 0) {
        document.getElementById('feedbackPago').innerText = 'Debe seleccionar una forma de pago.';
        todoCorrecto = false; // Hay un error
      } else {
        if (formaPago[0].id === 'tarjetaDeCredito') {
          // Validación tarjeta de crédito
          const nroTarjeta = document.getElementById('nroTarjeta').value;
          const codSegu = document.getElementById('codSegu').value;
          const vencimiento = document.getElementById('vencimiento').value;
          if (!nroTarjeta || !codSegu || !vencimiento) {
            document.getElementById('feedbackPago').innerText = 'Todos los campos de tarjeta de crédito son obligatorios.';
            todoCorrecto = false; // Hay un error
          } else {
            document.getElementById('feedbackPago').innerText = '';
          }
        } else if (formaPago[0].id === 'transferenciaBancaria') {
          // Validación transferencia bancaria
          const nroCuenta = document.getElementById('nroCuenta').value;
          if (!nroCuenta) {
            document.getElementById('feedbackPago').innerText = 'El número de cuenta es obligatorio para transferencia bancaria.';
            todoCorrecto = false; // Hay un error
          } else {
            document.getElementById('feedbackPago').innerText = '';
          }
        }
      }
  
      // Mostrar mensaje de éxito si todo está correcto
      if (todoCorrecto) {
        const notification = document.getElementById("notification");
        const notificationText = document.getElementById("notificationText");
        
        notificationText.innerText = '¡Has comprado con éxito!';
        notification.classList.add("show");
  
        // Ocultar la notificación después de un tiempo
        setTimeout(function() {
          notification.classList.remove("show");
      }, 3000); // Ocultar después de 3 segundos
      }
  });