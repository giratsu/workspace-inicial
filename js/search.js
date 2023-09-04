let searchResults;
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('product-container');

const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get("q");

const rangeFilterPrice = document.getElementById("rangeFilterPrice");
const clearRangeFilter = document.getElementById("clearRangeFilter");
const sortAsc = document.getElementById("sortAsc");
const sortDesc = document.getElementById("sortDesc");
const sortByCount = document.getElementById("sortByCount");


let minPrice = 0;
let maxPrice = 9999999;

window.addEventListener("load", async function () {
    searchResults = await getSearchProducts();
    showProducts(query);
})

async function getCategories()
{
    const response = await fetch(CATEGORIES_URL);
    const datos = await response.json();
    return datos;
}

async function getSearchProducts(){
    let categories= await getCategories();
    const products=[];
    
    for(const cat of categories)
    {
        const response = await fetch(PRODUCTS_URL+cat.id+EXT_TYPE);
        const category = await response.json();
        
        products.push(...category.products);
    }
    
    return products;
}

function filterProductsBySearch(array, query)
{
    return array.filter(prod => (prod.name.toLowerCase().includes(query.toLowerCase()) || prod.description.toLowerCase().includes(query.toLowerCase())))
}

async function showProducts(query)
{
    let filteredResults = filterProductsBySearch(searchResults, query)
    resultsContainer.innerHTML = "";
    for(const product of filteredResults)
    {
        // Se verifica si el precio del elemento está dentro de los valores del filtro.
        if(( isNaN(minPrice) || product.cost >= minPrice) && (isNaN(maxPrice) || product.cost <= maxPrice))
        {
            // Si se cumple la condición se mostrará el producto, de lo contrario no.
            resultsContainer.innerHTML+=GetProductCard(product.image, product.name, product.cost, product.currency, product.description, product.soldCount)
        }
    }
}

// constantes para los tipos de orden.
// estas constantes simplemente se crean para poder definir con un nombre a los tipos de orden.
const ORDER_ASC_BY_COST = "1";
const ORDER_DESC_BY_COST = "2";
const ORDER_BY_PROD_COUNT = "3";
// funcion para ordenar productos que toma como parámetro un criterio de orden y un arreglo.
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

// Asociar evento al botón de filtrar por rango de precios
rangeFilterPrice.addEventListener("click", function () {
    minPrice = parseFloat(document.getElementById("rangeFilterPriceMin").value);
    maxPrice = parseFloat(document.getElementById("rangeFilterPriceMax").value);
    showProducts(query);
});

// Asociar evento al botón de limpiar filtro de rango de precios
clearRangeFilter.addEventListener("click", function () {
    // se obtienen los inputs donde se ingresó el precio mínimo y máximo
    document.getElementById("rangeFilterPriceMin").value = "";
    document.getElementById("rangeFilterPriceMax").value = "";
    minPrice = 0;
    maxPrice = 9999999;
    showProducts(query);
});

// Asociar evento al los botones de orden
// luego de ejecutar la funcion que ordena el arreglo de productos, se ejecuta showProducts para que los productos actualicen
sortAsc.addEventListener("click", function(){
    sortProducts(ORDER_ASC_BY_COST, searchResults);
    showProducts(query);
});
sortDesc.addEventListener("click", function(){
    sortProducts(ORDER_DESC_BY_COST, searchResults);
    showProducts(query);
});
sortByCount.addEventListener("click", function(){
    sortProducts(ORDER_BY_PROD_COUNT, searchResults);
    showProducts(query);
});