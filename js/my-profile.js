document.addEventListener('DOMContentLoaded', function() {
    cargarDatosGuardados();
    
    document.getElementById('saveButton').addEventListener('click', function() {
        
        let isValid = true;
        
        // Validaciones de campos requeridos
        if (!validarCampo('inputFirstName', 'errorFirstName')) isValid = false;
        if (!validarCampo('inputLastName', 'errorLastName')) isValid = false;
        if (!validarCampo('inputEmail', 'errorEmail')) isValid = false;
        if (!validarCampo('inputPhone', 'errorPhone')) isValid = false;
        
        if (isValid) {
            // Guardar datos en el almacenamiento local
            const _nombre = document.getElementById('inputFirstName').value;
            const _nombre2 = document.getElementById('inputSecondName').value;
            const _apellido = document.getElementById('inputLastName').value;
            const _apellido2 = document.getElementById('inputSecondLastName').value;
            const _email = document.getElementById('inputEmail').value;
            const _telefono = document.getElementById('inputPhone').value;
            
            const userdata_string = localStorage.getItem("userdata");
            const userdata = JSON.parse(userdata_string);

            userdata.nombre = _nombre;
            userdata.nombre2 = _nombre2;
            userdata.apellido = _apellido;
            userdata.apellido2 = _apellido2;
            userdata.email = _email;
            userdata.telefono = _telefono;

            localStorage.setItem("userdata", JSON.stringify(userdata));
            // sessionStorage.setItem("loggedUser", JSON.stringify(userdata)) // quitar en el futuro si es posible.
            
            alert('Datos guardados con éxito.');
        }
    });
    
    // Manejo de la carga y visualización de la imagen de perfil
    const userdata_string = localStorage.getItem("userdata");
    const userdata = JSON.parse(userdata_string);
    
    document.getElementById('profileImage').addEventListener('change', function(event) {
        const reader = new FileReader();
        reader.onload = function(e) {
            userdata.image = e.target.result;
            sessionStorage.setItem("loggedUser", JSON.stringify(userdata)); // quitar en el futuro si es posible.
            localStorage.setItem("userdata", JSON.stringify(userdata));
            mostrarImagenPerfil();
        };
        reader.readAsDataURL(event.target.files[0]);
    });
    
    mostrarImagenPerfil();
});

function validarCampo(campoId, errorDivId) {
    const campo = document.getElementById(campoId);
    const errorDiv = document.getElementById(errorDivId);
    if (campo.value.trim() === '') {
        campo.classList.add('is-invalid');
        errorDiv.textContent = 'Este campo es obligatorio.';
        return false;
    } else {
        campo.classList.remove('is-invalid');
        errorDiv.textContent = '';
        return true;
    }
}

function cargarDatosGuardados() {
    const userdata_string = localStorage.getItem("userdata");
    const userdata = JSON.parse(userdata_string);
    
    document.getElementById('inputFirstName').value = userdata.nombre || '';
    document.getElementById('inputSecondName').value =  userdata.nombre2 || '';
    document.getElementById('inputLastName').value = userdata.apellido || '';
    document.getElementById('inputSecondLastName').value = userdata.apellido2 || '';
    document.getElementById('inputEmail').value = userdata.email || '';
    document.getElementById('inputPhone').value = userdata.telefono || '';
    const savedImage = userdata.image;
    mostrarImagenPerfil();
  }

function mostrarImagenPerfil()
{
    const userdata_string = localStorage.getItem("userdata");
    const userdata = JSON.parse(userdata_string);
    
    const savedImage = userdata.image;
    if (savedImage) {
        document.getElementById('displayProfileImage').src = savedImage;
    } else {
        document.getElementById('displayProfileImage').src = 'img/img_perfil.png';
    }
}