let estaLogeado = false;

const btnSignIn = document.getElementById("sign-in");
const btnSignUp = document.getElementById("sign-up");
const formRegister = document.querySelector(".register");
const formLogin = document.querySelector(".login");

const loginForm = document.getElementById("loginForm");

btnSignUp.addEventListener("click", e => {
    

    formLogin.classList.add("hide");
    formRegister.classList.remove("hide");
});

btnSignIn.addEventListener("click", e => {
    
    formRegister.classList.add("hide");
    formLogin.classList.remove("hide")
});


loginForm.addEventListener("submit", e => {
    e.preventDefault();

    const user = document.getElementById("usuario").value;
    let logged = (user!=null && user!="");
    sessionStorage.setItem("logged", logged);

    if(logged){
        window.location.href = "./index.html";
    }else{
        alert("Completa el Usuario");
    }
});
