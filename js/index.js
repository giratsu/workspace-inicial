document.addEventListener("DOMContentLoaded", function(){
    if(sessionStorage.getItem("loggedUser") == null)
    {
        window.location = "login.html";
    }
    
    // Se agregan eventos de click a las categorías del index.
    // Al hacer click se guarda la variable "catID" en el almacenamiento local, con el valor de la categoría correspondiente.
    // luego de guardar el valor, Se redirige a la página de productos, donde se cargarán segun "catID".
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    
    
    
});