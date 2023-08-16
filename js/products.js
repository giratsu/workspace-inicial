/* Esta funcion nos devuelve una cadena de texto representando la estructura html que representa un producto.
Lo que devuele esta función es lo que escribiríamos dentro del contenedor para crear un elemento producto.
La funcion toma como parametro los datos que se deben tomar de la API. */
function GetProductCard(image, name, description, soldCount)
{
  result = `
  <div class="product-object p-3 mt-5">
          <div class="product-image-container p-1">
            <img class="product-image" src="${image}">
          </div>

          <div class="info-container ms-4">
            <h3 class="product-name">${name}</h3>
            <p class="product-description">${description}</p>
          </div>

          <div class="sold-count-container">
            <p class="sold-count">${soldCount} Vendidos</p>
          </div>
        </div>
  `;
  return result;
}

/* Se obtiene el elemento que va a contener los productos. */
let productContainer = document.getElementById("product-container");

/* Se hace un fetch a la URL de la API. 
101 corresponde a la categoría de autos */

fetch(PRODUCTS_URL+"101.json")
.then(response => response.json())
.then(data => {
  let productArray = data.products;

  /* Se recorre cada elemendo del arreglo de productos, 
  se obtiene el elemento del producto con la funcion GetProductCard, 
  y se agrega el resultado al contenedor*/
    
  for(let i=0; i<productArray.length; i++)
  {
    let currentProduct = productArray[i];
    productContainer.innerHTML+=GetProductCard(currentProduct.image, currentProduct.name, currentProduct.description, currentProduct.soldCount)
  }
}).catch(error => {
  console.error("Se ha producido un error: ")
})
