let estaLogeado = false;

const btnSignIn = document.getElementById("sign-in");
const btnSignUp = document.getElementById("sign-up");
const formRegister = document.querySelector(".register");
const formLogin = document.querySelector(".login");

const loginForm = document.getElementById("loginForm");

btnSignUp.addEventListener("click", e => {
    

    formLogin.classList.add("hide");
    formRegister.classList.remove("hide")
});

btnSignIn.addEventListener("click", e => {
    
    formRegister.classList.add("hide");
    formLogin.classList.remove("hide")
});


loginForm.addEventListener("submit", e => {
    const user = document.getElementById("usuario").value;
    

    if(user !== ""){
        estaLogeado = true;
    if(estaLogeado){
        sessionStorage.setItem("estado", estaLogeado);
        window.location.href = "./index.html";
    }
    }else{
        alert("Completa el Usuario");
    }
    
});
