function createUser(_username, _nombre, _apellido, _email, _telefono, _password, _pais, _ciudad, _domicilio)
{
    let userdata = {
        username: _username,
        nombre: _nombre,
        apellido: _apellido,
        email: _email,
        telefono: _telefono,
        password: _password,
        pais: _pais,
        ciudad: _ciudad,
        domicilio: _domicilio
    }

    console.log("user created");
    return userdata;
}

function saveUser(user)
{
    localStorage.setItem("userdata", JSON.stringify(user));
    console.log("user saved");
}