document.addEventListener("DOMContentLoaded", ()=>{

    let loginform = document.getElementById("login-form");
    let usernameInput = document.getElementById("username-input");
    
    loginform.addEventListener("submit", (e)=>{
        e.preventDefault();
        sessionStorage.setItem("username", usernameInput.value);
        window.location = "index.html";
    })
})