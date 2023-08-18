document.addEventListener("DOMContentLoaded", ()=>{
    let estaLogeado = false;
    
    /*contenedores de los formularios de registro y de login*/
    const registerWindow = document.querySelector(".register");
    const loginWindow = document.querySelector(".login");
    
    /* formularios */
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    
    /*botones para intercambiar login/registro*/
    const SignInSwitchBtn = document.getElementById("sign-in-switch-button");
    const SignUpSwitchBtn = document.getElementById("sign-up-switch-button");
    
    SignUpSwitchBtn.addEventListener("click", e => {
        loginWindow.classList.add("hide");
        registerWindow.classList.remove("hide");
    });
    
    SignInSwitchBtn.addEventListener("click", e => {
        
        registerWindow.classList.add("hide");
        loginWindow.classList.remove("hide")
    });
    
    
    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        
        /*elementos del formulario de login*/
        const loginEmailInput = document.getElementById("login-user-input").value;
        const loginPasswordInput = document.getElementById("login-password-input").value;
        
        let user = JSON.parse(localStorage.getItem("userdata"));
        
        const writedEmail = loginEmailInput;
        const targetEmail = user.email;
        
        const writedPassword = loginPasswordInput;
        const targetPassword = user.password;
        
        if(targetEmail === writedEmail){
            if(targetPassword === writedPassword)
            {
                window.location.href = "./index.html";
                sessionStorage.setItem("logged", true);
            }else{
                alert("Contraseña incorrecta");
            }
        }else{
            alert("Email incorrecto");
        }
    });
    
    registerForm.addEventListener("submit", e=>{
        e.preventDefault();
        
        /*elementos del formulario de registro*/
        const usernameInput = document.getElementById("register-username-input").value;
        const nameInput = document.getElementById("register-name-input").value;
        const surnameInput = document.getElementById("register-surname-input").value;
        const emailInput = document.getElementById("register-email-input").value;
        const phoneInput = document.getElementById("register-phone-input").value;
        const passwordInput = document.getElementById("register-password-input").value;
        const countryInput = document.getElementById("register-country-input").value;
        const cityInput = document.getElementById("register-city-input").value;
        const addressInput = document.getElementById("register-address-input").value;
        
        validInfo = true; /* TODO: checkear la información para ver si es válida, por ahora es siempre true */
        
        if(validInfo)
        {
            let user = createUser(usernameInput, nameInput, surnameInput, emailInput, phoneInput, passwordInput, countryInput, cityInput, addressInput);
            saveUser(user);
        }
    })
})