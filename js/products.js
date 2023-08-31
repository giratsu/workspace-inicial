/* Esta funcion nos devuelve una cadena de texto representando la estructura html que representa un producto.
Lo que devuele esta función es lo que escribiríamos dentro del contenedor para crear un elemento producto.
La funcion toma como parametro los datos que se deben tomar de la API. */
function GetProductCard(image, name,precio, description, soldCount)
{
  result = `
  <div class="product-object p-3 mt-5">
          <div class="product-image-container p-1">
            <img class="product-image" src="${image}">
          </div>

          <div class="info-container ms-4">
            <h3 class="product-name">${name} U$D${precio}</h3>
            <p class="product-description">${description}</p>
          </div>

          <div class="sold-count-container">
            <p class="sold-count">${soldCount} Vendidos</p>
          </div>
        </div>
  `;
  return result;
}

function updateProductContainer(products) {
  productContainer.innerHTML = "";
 
  for (let i = 0; i < products.length; i++) {
    let currentProduct = products[i];
    productContainer.innerHTML += GetProductCard(currentProduct.image,currentProduct.name,currentProduct.cost,currentProduct.description,currentProduct.soldCount);
  }
 }

/* Se obtiene el elemento que va a contener los productos. */
let productContainer = document.getElementById("product-container");

/* Se hace un fetch a la URL de la API. 
101 corresponde a la categoría de autos */

fetch(PRODUCTS_URL+"101.json") /* https://japceibal.github.io/emercado-api/cats_products/101.json */
.then(response => response.json())
.then(data => {
  let productArray = data.products;

  /* Se recorre cada elemendo del arreglo de productos, 
  se obtiene el elemento del producto con la funcion GetProductCard, 
  y se agrega el resultado al contenedor*/
    
  for(let i=0; i<productArray.length; i++)
  {
    let currentProduct = productArray[i];
    productContainer.innerHTML+=GetProductCard(currentProduct.image, currentProduct.name, currentProduct.cost, currentProduct.description, currentProduct.soldCount)
  }

    let ordenDescendienteButton = document.getElementById("sortDesc");
      ordenDescendienteButton.addEventListener("click", () => {
      productArray.sort((a, b) => b.cost - a.cost);
      updateProductContainer(productArray);
    });

    let ordenAcendenteButton = document.getElementById("sortAsc");
      ordenAcendenteButton.addEventListener("click", () => {
      productArray.sort((a, b) => a.cost - b.cost);
      updateProductContainer(productArray);
    });

    let ordenRelevanciaButton = document.getElementById("sortByCount");
      ordenRelevanciaButton.addEventListener("click", () => {
      productArray.sort((a, b) => a.soldCount - b.soldCount);
      updateProductContainer(productArray);
    });

}).catch(error => {
  console.error("Se ha producido un error: ")
})






