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
    
    function ShowLoginForm()
    {
        registerWindow.classList.add("hide");
        loginWindow.classList.remove("hide");
    }
    function ShowRegisterForm()
    {
        loginWindow.classList.add("hide");
        registerWindow.classList.remove("hide");
    }
    SignUpSwitchBtn.addEventListener("click", e => {
        ShowRegisterForm();
    });
    
    SignInSwitchBtn.addEventListener("click", e => {
        ShowLoginForm();
    });
    
    
    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        
        /*elementos del formulario de login*/
        const loginEmailInput = document.getElementById("login-user-input").value;
        const loginPasswordInput = document.getElementById("login-password-input").value;
        
        let user = JSON.parse(localStorage.getItem("userdata"));
     

        if(user != null)
        {
            const writedEmail = loginEmailInput;
            const targetEmail = user.email;
            
            const writedPassword = loginPasswordInput;
            const targetPassword = user.password;
            
            if(targetEmail === writedEmail){
                if(targetPassword === writedPassword)
                {
                    window.location.href = "./index.html";
                    sessionStorage.setItem("loggedUser", JSON.stringify(user));
                }else{
                    alert("Contraseña incorrecta");
                }
            }else{
                alert("Email incorrecto");
            }
        }else{
            alert("Esta cuenta no existe, Por favor primero registrate.")
            ShowRegisterForm();
        }
    });
    
    registerForm.addEventListener("submit", e=>{
        e.preventDefault();
        
        /*elementos del formulario de registro*/
        const emailInput = document.getElementById("register-email-input").value;
        const passwordInput = document.getElementById("register-password-input").value;
        
        validInfo = true; /* TODO: checkear la información para ver si es válida, por ahora es siempre true */

        if(validInfo)
        {
            let user = createUser(null, null, null, emailInput, null, passwordInput, null, null, null);
            saveUser(user);
            ShowLoginForm();
            alert("Cuenta creada exitosamente!");
        }
    })
})