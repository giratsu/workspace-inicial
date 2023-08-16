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

    sessionStorage.setItem("userdata", userdata);
}