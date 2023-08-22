document.addEventListener("DOMContentLoaded", function(){
    if(sessionStorage.getItem("loggedUser") == null)
    {
        window.location = "login.html";
    }else{
        const usuario = sessionStorage.getItem("loggedUser");
        const nombreUsuario = usuario.split('@')[0]; 

        const valorUsuario = document.getElementById("usuario-logeado");
        valorUsuario.textContent = nombreUsuario; 
    }

    //  pense en crear un slipt para que solo muestre la parte anterior del @
    
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
