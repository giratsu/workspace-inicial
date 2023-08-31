let minPrice = 0;
let maxPrice = 99999;

/* Esta funcion nos devuelve una cadena de texto representando la estructura html que representa un producto.
Lo que devuele esta función es lo que escribiríamos dentro del contenedor para crear un elemento producto.
La funcion toma como parametro los datos que se deben tomar de la API. */

function GetProductCard(image, name, cost, description, soldCount) {
  return `
    <div class="product-object p-3 mt-5">
      <div class="product-image-container p-1">
        <img class="product-image" src="${image}">
      </div>
      <div class="info-container ms-4">
        <h3 class="product-name">${name} - U$D ${cost}</h3>
        <p class="product-description">${description}</p>
      </div>
      <div class="sold-count-container">
        <p class="sold-count">${soldCount} Vendidos</p>
      </div>
    </div>
  `;
}

// Función para mostrar productos
function showProducts() {
  productContainer.innerHTML = ""; // Limpiar los productos actuales en el contenedor
  
  if(true) // Más adelante cambiar por if(sessionStorage.getItem("pendingSearch") === "false")
  {
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
        if(( isNaN(minPrice) || currentProduct.cost >= minPrice) && (isNaN(maxPrice) || currentProduct.cost <= maxPrice))
        {
          productContainer.innerHTML+=GetProductCard(currentProduct.image, currentProduct.name, currentProduct.cost, currentProduct.description, currentProduct.soldCount)
        }
      }
    })
  }
}

/*function updateProductContainer(products) {
  productContainer.innerHTML = "";
 
  for (let i = 0; i < products.length; i++) {
    let currentProduct = products[i];
    productContainer.innerHTML += GetProductCard(currentProduct.image,currentProduct.name,currentProduct.cost,currentProduct.description,currentProduct.soldCount);
  }
 }*/

/* Se obtiene el elemento que va a contener los productos. */
let productContainer = document.getElementById("product-container");

// Asociar evento al botón de filtrar por rango de precios
document.addEventListener("DOMContentLoaded", function () {
  showProducts();

  document.getElementById("rangeFilterPrice").addEventListener("click", function () {
    minPrice = parseFloat(document.getElementById("rangeFilterPriceMin").value);
    maxPrice = parseFloat(document.getElementById("rangeFilterPriceMax").value);
    showProducts();
  });
  
  // Asociar evento al botón de limpiar filtro de rango de precios
  document.getElementById("clearRangeFilter").addEventListener("click", function () {
    document.getElementById("rangeFilterPriceMin").value = "";
    document.getElementById("rangeFilterPriceMax").value = "";
    minPrice = 0;
    maxPrice = 99999;
    });
});
