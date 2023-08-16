function createUser(username, nombre, apellido, email, password, pais, ciudad, domicilio)
{
    let userdata = {
        username,
        nombre,
        apellido,
        email,
        password,
        pais,
        ciudad,
        domicilio
    }

    return userdata;
}

function saveUser(user)
{
    sessionStorage.setItem("userdata", userdata);
}