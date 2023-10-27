let productoAPIeliminado = false;

document.addEventListener('DOMContentLoaded', async function () {
    await showProducts();
    await metodoDePago();
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
    }
}

function linea(product) {
    // se crea el botón de eliminar
    let deleteButton = document.createElement("div");
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
    });
    
    // elemento final del producto que se agregará al contenedor
    let resultElement = document.createElement("tr");
    resultElement.innerHTML = 
    `
    <td class="w-25"><img src="${product.images[0]}" class="w-75"></td>
    <td class="w-25">${product.name}</td>
    <td class="w-25">${product.currency} ${product.cost}</td>
    <td><input value="1" id="${product.id}" type="number"  min="1" class="cantidadDeProducto"></td>
    <td class="w-25" id="precioPorCantidad${product.id}" >${product.currency} ${product.cost}</td>
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