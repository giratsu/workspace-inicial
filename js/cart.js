const container = document.getElementById("cart-product-container");


document.addEventListener('DOMContentLoaded', async function () {
    // Carga del primer producto
    
    const response = await fetch(`${CART_INFO_URL}25801${EXT_TYPE}`);
    const carritoAPI = await response.json();
    const product = carritoAPI.articles[0];
    
    let productoAPI_HTML =
    `<tr id="hola">
    <td class="w-25"><img src="${product.image}" class="w-75"></td>
    <td class="w-25">${product.name}</td>
    <td class="w-25">${product.currency} ${product.unitCost}</td>
    <td><input value="${product.count}" id="cantidadId" type="number" min="1" class="_cantidadDeProducto"></td>
    <td class="w-25" id="precioPorCantidad">${product.currency} ${product.unitCost}</td>
    <td class="w-25"><button class="btn btn-primary">Eliminar</button></td>
    </tr>`;
    
    container.innerHTML += productoAPI_HTML;
    
    //--------------------------------------------
    // Cartga de los demás productos del carrito
    
    let _localCart = localStorage.getItem("cart");
    let localCart = JSON.parse(_localCart);
    // TODO: checkear si existe la variable en localStorage
    for(let i=0; i<localCart.length; i++)
    {
        container.innerHTML += linea(localCart[i]);
    }
    // Agregar evento al botón del primer producto
    ProductoPrueba(product);
    
    // Agregar evento a cada botón con la clase "cantidadDeProducto"
    const inputDeCantidad = document.getElementsByClassName("cantidadDeProducto");
    for (let i = 0; i < inputDeCantidad.length; i++) {
        const idInput = inputDeCantidad[i].id;
        inputDeCantidad[i].addEventListener("input", () => { cambioDePrecio(idInput, localCart.find((p) => p.id == idInput)) });
    }
});

function linea(product) {
    
    return `<tr>
    <td class="w-25"><img src="${product.images[0]}" class="w-75"></td>
    <td class="w-25">${product.name}</td>
    <td class="w-25">${product.currency} ${product.cost}</td>
    <td><input value="1" id="${product.id}" type="number"  min="1" class="cantidadDeProducto"></td>
    <td class="w-25" id="precioPorCantidad${product.id}" >${product.currency} ${product.cost}</td>
    <td class="w-25"><button class="btn btn-primary">Eliminar</button></td>
    </tr>`;
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

function ProductoPrueba(product)
{
    const _inputDeCantidad = document.getElementById("cantidadId");
    const idInput = _inputDeCantidad.id;
    _inputDeCantidad.addEventListener("input", () => {
        let precioUnitario = product.unitCost;
        let moneda = product.currency;
        
        let id = product.id;
        
        const cantidadNecesaria = document.getElementById(idInput);
        
        const importe = document.getElementById(`precioPorCantidad`);
        
        const cantidad = cantidadNecesaria.value;
        
        importe.innerHTML = `${moneda} ${cantidad * precioUnitario}`;
        });
}