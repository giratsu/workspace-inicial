const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('product-container');

document.addEventListener("DOMContentLoaded", e => {
    searchInput.addEventListener("search", e => {
        sessionStorage.setItem("pendingSearch", "true");
        sessionStorage.setItem("searchQuery", searchInput.value);
        window.location = "products.html";
    })
})

window.addEventListener("load", e => {
    const currentPath = window.location.pathname; // Obtiene la ruta y el nombre del archivo
    const fileName = currentPath.split("/").pop(); // Obtiene el nombre del archivo de la ruta
    if(fileName === "products.html" && sessionStorage.getItem("pendingSearch") === "true")
    {
        showProducts(sessionStorage.getItem("searchQuery"));
        console.log("XD");
        sessionStorage.setItem("pendingSearch", "false");
    }
})

function GetProductCard(image, name, precio, description, soldCount)
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

async function getCategories()
{
    const response = await fetch(CATEGORIES_URL);
    const datos = await response.json();
    return datos;
}

async function getProducts(){
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

async function showProducts(query)
{
    let products = await getProducts();
    let results = filterProductsBySearch(products, query)
    resultsContainer.innerHTML = "";
    for(const result of results)
    {
        resultsContainer.innerHTML+=GetProductCard(result.image, result.name, result.cost, result.description, result.soldCount)
    }
}

function filterProductsBySearch(array, query)
{
    return array.filter(prod => prod.name.includes(query))
}