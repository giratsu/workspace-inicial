function createUser(_nombre, _nombre2, _apellido, _apellido2, _email, _telefono, _password, _image)
{
    let userdata = {
        nombre: _nombre,
        nombre2: _nombre2,
        apellido: _apellido,
        apellido2: _apellido2,
        email: _email,
        telefono: _telefono,
        password: _password,
        image: _image
    }

    console.log("user created");
    console.log(userdata);
    return userdata;
}

function saveUser(user)
{
    localStorage.setItem("userdata", JSON.stringify(user));
    console.log("user saved");
}