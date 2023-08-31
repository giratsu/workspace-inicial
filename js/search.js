let searchResults;
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('product-container');

document.addEventListener("DOMContentLoaded", async function () {
    // Obtener parámetro de búsqueda de la url
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("q");

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
    for(const result of filteredResults)
    {
        resultsContainer.innerHTML+=GetProductCard(result.image, result.name, result.cost, result.currency, result.description, result.soldCount)
    }
}