const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
  let result = {};
  showSpinner();
  return fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }else{
      throw Error(response.statusText);
    }
  })
  .then(function(response) {
    result.status = 'ok';
    result.data = response;
    hideSpinner();
    return result;
  })
  .catch(function(error) {
    result.status = 'error';
    result.data = error;
    hideSpinner();
    return result;
  });
}

function ShowUsernameInNav()
{
  const usuario = JSON.parse(sessionStorage.getItem("loggedUser"));
  const nombreUsuario = usuario.username;
  
  const valorUsuario = document.getElementById("UserMenu");
  valorUsuario.textContent = nombreUsuario; 
}

function LoadNav()
{
  let navHTML = `<nav class="navbar navbar-expand-lg navbar-dark bg-dark p-1">
  <div class="container">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav w-100 justify-content-between">
      <li class="nav-item">
        <a class="nav-link active" href="index.html">Inicio</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="categories.html">Categorías</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="sell.html">Vender</a>
      </li>
      
      <form id="search-form" action="search-results.html" class="d-flex mx-3">
        <input name="q" type="seatch" class="form-control me-2" placeholder="Buscar..." aria-label="Buscar" id="search-input"/>
        <button class="btn btn-primary" type="submit">Buscar</button>
      </form>
      
      <li class="nav-item">
        <!-- Se creo este id -->
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="UserMenu" data-bs-toggle="dropdown" aria-expanded="false">
          </button>
          <ul class="dropdown-menu" aria-labelledby="UserMenu">
            <li><a class="dropdown-item" href="cart.html">Mi Carrito</a></li>
            <li><a class="dropdown-item" href="my-profile.html">Mi Perfil </a></li>
            <li><a id="logout-button" class="dropdown-item" href="">Cerrar Sesion</a></li>
            <button id="change-theme-button" class="btn rounded-fill"><i id="current-mode-icon" class="user-select-none fa-regular fa-sun"></i></button>
          </ul>
        </div>
      </li>

    </ul>
  </div>
</div>
</nav>`;

let navBarContainer = document.getElementById("navBar");
let navElement = document.createElement("div");
navElement.innerHTML = navHTML;
navBarContainer.appendChild(navElement);
}

document.addEventListener("DOMContentLoaded", e => {
  LoadNav();
  ShowUsernameInNav();

  // Funciones para cambiar de tema
  const temaOscuro = () => {
    document.querySelector("body").setAttribute("data-bs-theme", "dark");
    document.querySelector("#current-mode-icon").setAttribute("class", "user-select-none fa-regular fa-moon");
    console.log("oscuro");
  }
  
  const temaClaro = () => {
    document.querySelector("body").setAttribute("data-bs-theme", "light");
    document.querySelector("#current-mode-icon").setAttribute("class", "user-select-none fa-regular fa-sun");
  }
  
  if(localStorage.getItem("darkmode") === null)
  {
    localStorage.setItem("darkmode", JSON.stringify(false));
  }

  const cambiarTema = () => {
    console.log("cambiando tema");
    let valorActual = JSON.parse(localStorage.getItem("darkmode"));
    valorActual = !valorActual;
    localStorage.setItem("darkmode", JSON.stringify(valorActual));
  }

  const aplicarTema = () => {
    JSON.parse(localStorage.getItem("darkmode")) === true?
    temaOscuro() : temaClaro();
  }

  // se aplica el tema guardado al cargar la pagina
  aplicarTema();

  // botón para cambiar tema
  const themeButton = document.getElementById("change-theme-button");
  themeButton.addEventListener("click", ev=>{
    cambiarTema();
    aplicarTema();
  });

  // boton de cerrar sesión
  document.getElementById("logout-button").addEventListener("click", ev=>{
    ev.preventDefault();
    sessionStorage.removeItem("loggedUser");
    window.location = "login.html";
  })
})

/* Esta funcion nos devuelve una cadena de texto representando la estructura html que representa un producto.
Lo que devuele esta función es lo que escribiríamos dentro del contenedor para crear un elemento producto.
La funcion toma como parametro los datos que se deben tomar de la API. */
function GetProductCard(image, name, precio, currency, description, soldCount)
{
    result = `
    <div class="product-object p-3 mt-5">
    <div class="product-image-container p-1">
    <img class="product-image" src="${image}">
    </div>
    
    <div class="info-container ms-4">
    <h3 class="product-name">${name} - <b><u> ${currency}${precio}</b></u></h3>
    <p class="product-description">${description}</p>
    </div>
    
    <div class="sold-count-container">
    <p class="sold-count">${soldCount} Vendidos</p>
    </div>
    </div>
    `;
    return result;
}