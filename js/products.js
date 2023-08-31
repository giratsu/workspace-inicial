let minPrice = 0;
let maxPrice = 99999;

/* Esta funcion nos devuelve una cadena de texto representando la estructura html que representa un producto.
Lo que devuele esta función es lo que escribiríamos dentro del contenedor para crear un elemento producto.
La funcion toma como parametro los datos que se deben tomar de la API. */

/* Se obtienen los elementos del documento html */
let productContainer = document.getElementById("product-container");
let sortAsc = document.getElementById("sortAsc");
let sortDesc = document.getElementById("sortDesc");
let sortByCount = document.getElementById("sortByCount");

// Función para mostrar productos
function showCategoryProducts(sortCrit = null) {
  productContainer.innerHTML = ""; // Limpiar los productos actuales en el contenedor
  const SELECTED_ID = localStorage.getItem("catID");
  
  fetch(PRODUCTS_URL + SELECTED_ID + EXT_TYPE)
  .then(response => response.json())
  .then(data => {
    let productArray = data.products;
    if(sortCrit)
    {
      sortProducts(sortCrit, productArray);
    }
    /* Se recorre cada elemendo del arreglo de productos, 
    se obtiene el elemento del producto con la funcion GetProductCard, 
    y se agrega el resultado al contenedor*/
    
    for(let i=0; i<productArray.length; i++)
    {
      let currentProduct = productArray[i];
      if(( isNaN(minPrice) || currentProduct.cost >= minPrice) && (isNaN(maxPrice) || currentProduct.cost <= maxPrice))
      {
        productContainer.innerHTML+=GetProductCard(currentProduct.image, currentProduct.name, currentProduct.cost, currentProduct.currency, currentProduct.description, currentProduct.soldCount)
      }
    }
  })
}

// funcion para ordenar productos
const ORDER_ASC_BY_COST = "1";
const ORDER_DESC_BY_COST = "2";
const ORDER_BY_PROD_COUNT = "3";
function sortProducts(criteria, array){
  let result = [];
  if (criteria === ORDER_ASC_BY_COST)
  {
      result = array.sort(function(a, b) {
          if ( a.cost < b.cost ){ return -1; }
          if ( a.cost > b.cost ){ return 1; }
          return 0;
      });
  }else if (criteria === ORDER_DESC_BY_COST){
      result = array.sort(function(a, b) {
          if ( a.cost > b.cost ){ return -1; }
          if ( a.cost < b.cost ){ return 1; }
          return 0;
      });
  }else if (criteria === ORDER_BY_PROD_COUNT){
      result = array.sort(function(a, b) {
          let aCount = parseInt(a.productCount);
          let bCount = parseInt(b.productCount);

          if ( aCount > bCount ){ return -1; }
          if ( aCount < bCount ){ return 1; }
          return 0;
      });
  }

  return result;
}

// Asociar evento al botón de filtrar por rango de precios
document.addEventListener("DOMContentLoaded", function () {
  showCategoryProducts(ORDER_BY_PROD_COUNT);
  
  document.getElementById("rangeFilterPrice").addEventListener("click", function () {
    minPrice = parseFloat(document.getElementById("rangeFilterPriceMin").value);
    maxPrice = parseFloat(document.getElementById("rangeFilterPriceMax").value);
    showCategoryProducts(ORDER_BY_PROD_COUNT);
  });
  
  // Asociar evento al botón de limpiar filtro de rango de precios
  document.getElementById("clearRangeFilter").addEventListener("click", function () {
    document.getElementById("rangeFilterPriceMin").value = "";
    document.getElementById("rangeFilterPriceMax").value = "";
    minPrice = 0;
    maxPrice = 99999;
    showCategoryProducts(ORDER_BY_PROD_COUNT);
    });

  // Asociar evento al los botones de orden
  sortAsc.addEventListener("click", function(){
    showCategoryProducts(ORDER_ASC_BY_COST);
  })
  sortDesc.addEventListener("click", function(){
    showCategoryProducts(ORDER_DESC_BY_COST);
  })
  sortByCount.addEventListener("click", function(){
    showCategoryProducts(ORDER_BY_PROD_COUNT);
  })
});
