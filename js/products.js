let minPrice = 0;
let maxPrice = 9999999;

/* Esta funcion nos devuelve una cadena de texto representando la estructura html que representa un producto.
Lo que devuele esta función es lo que escribiríamos dentro del contenedor para crear un elemento producto.
La funcion toma como parametro los datos que se deben tomar de la API. */

/* Se obtienen los elementos del documento html */
const productContainer = document.getElementById("product-container");
const rangeFilterPrice = document.getElementById("rangeFilterPrice");
const clearRangeFilter = document.getElementById("clearRangeFilter");
const sortAsc = document.getElementById("sortAsc");
const sortDesc = document.getElementById("sortDesc");
const sortByCount = document.getElementById("sortByCount");

// variable que guarda todos los productos de la categoría
let categoryProducts;

async function getCategoryProducts()
{
  const SELECTED_ID = localStorage.getItem("catID");
  const response = await fetch(PRODUCTS_URL + SELECTED_ID + EXT_TYPE);
  const category = await response.json();
  categoryProducts = category.products;
}

// Función para mostrar productos
async function showCategoryProducts(sortCrit = null) {
  productContainer.innerHTML = ""; // Limpiar los productos actuales en el contenedor
  if(sortCrit)
  {
    sortProducts(sortCrit, categoryProducts);
  }
  /* Se recorre cada elemendo del arreglo de productos, 
  se obtiene el elemento del producto con la funcion GetProductCard, 
  y se agrega el resultado al contenedor*/
  
  for(let i=0; i<categoryProducts.length; i++)
  {
    let currentProduct = categoryProducts[i];
    if(( isNaN(minPrice) || currentProduct.cost >= minPrice) && (isNaN(maxPrice) || currentProduct.cost <= maxPrice))
    {
      productContainer.innerHTML+=GetProductCard(currentProduct.image, currentProduct.name, currentProduct.cost, currentProduct.currency, currentProduct.description, currentProduct.soldCount)
    }
  }
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
      let aCount = a.soldCount;
      let bCount = b.soldCount;
      
      if ( aCount > bCount ){ return -1; }
      if ( aCount < bCount ){ return 1; }
      return 0;
    });
  }
  
  return result;
}

document.addEventListener("DOMContentLoaded", async function () {
  await getCategoryProducts();
  showCategoryProducts(ORDER_BY_PROD_COUNT);
});

// Asociar evento al botón de filtrar por rango de precios
  rangeFilterPrice.addEventListener("click", function () {
    minPrice = parseFloat(document.getElementById("rangeFilterPriceMin").value);
    maxPrice = parseFloat(document.getElementById("rangeFilterPriceMax").value);
    showCategoryProducts(ORDER_BY_PROD_COUNT);
  });

  // Asociar evento al botón de limpiar filtro de rango de precios
  clearRangeFilter.addEventListener("click", function () {
    document.getElementById("rangeFilterPriceMin").value = "";
    document.getElementById("rangeFilterPriceMax").value = "";
    minPrice = 0;
    maxPrice = 9999999;
    showCategoryProducts(ORDER_BY_PROD_COUNT);
    });
  
  // Asociar evento al los botones de orden
  sortAsc.addEventListener("click", function(){
    showCategoryProducts(ORDER_ASC_BY_COST);
  });
  sortDesc.addEventListener("click", function(){
    showCategoryProducts(ORDER_DESC_BY_COST);
  });
  sortByCount.addEventListener("click", function(){
    showCategoryProducts(ORDER_BY_PROD_COUNT);
  });
