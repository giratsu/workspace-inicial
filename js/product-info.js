document.addEventListener('DOMContentLoaded', async function() {
    const productID = localStorage.getItem('prodID');
    const button = document.getElementById("enviar");
    
    // Realiza una solicitud a la API para obtener la información del producto
    const response = await fetch(`https://japceibal.github.io/emercado-api/products/${productID+EXT_TYPE}`);
    const productData = await response.json();
    
    // Encuentra el elemento donde se mostrará la información del producto
    const productInfoDiv = document.getElementById('product-info');
    
    // Rellena el contenido con la información del producto
    productInfoDiv.innerHTML = productHTML(productData);
    
    // Mostrar comentarios
    MostrarComentarios(productID);
    
    button.addEventListener("click", function () {
        const texto_comentario = document.getElementById("comentarioUser").value;
        const puntuacion = document.getElementById("estrellas").value;
        const currentDate = new Date();
        const anio = currentDate.getFullYear();
        const mes = currentDate.getMonth() + 1; // Agregar 1 a mes ya que los meses van de 0 a 11
        const dia = currentDate.getDate();
        const hora = currentDate.getHours();
        const min = currentDate.getMinutes();
        const seg = currentDate.getSeconds();
    
        const jsonUsuario = localStorage.getItem("userdata");
        const objetoUsuario = JSON.parse(jsonUsuario);
        const usuario = objetoUsuario.username;

        const fecha = anio + "-" + mes + "-" + dia + " " + hora + ":" + min + ":" + seg;
        
        
        ShowComment(usuario, fecha, puntuacion, texto_comentario);
        // se vacía el input del comentario y se resetea el valor de puntuación
        document.getElementById("comentarioUser").value = "";
        document.getElementById("estrellas").value = 5;
    });
  });

/* -------------------------------------------------------------- */

function productHTML(productData)
{
    return `
    <div id="product-info" class="container d-flex flex-column">
    <h1>${productData.name}.</h1>
    <hr>
    
    <h3>Precio</h3>
    <p>${productData.currency + " " +productData.cost}</p>
    
    <h3>Descripción</h3>
    <p>${productData.description}</p>
    
    <h3>Categoría</h3>
    <p>${productData.category}</p>
    
    <h3>Cantidad de vendidos</h3>
    <p>${productData.soldCount}</p>
    
    <h3>Imágenes</h3>
    <div id="productImageContainer" class="d-flex flex-row">
    ${productImagesHTML(productData)}
    </div>
    
    </div>
    `
}

function productImagesHTML(productData)
{
    let result = "";
    for(let i=0; i<productData.images.length; i++)
    {
        result+= `<img src="${productData.images[i]}">`;
    }
    return result;
}

/*----------------------------------------------------------------*/

async function MostrarComentarios(prodID)
{
    const comentariosList = document.getElementById("boxComentarios"); /* ??? */
    comentariosList.innerHTML += `<h1>Comentarios de usuarios</h1>`;
    let response = await fetch(PRODUCT_INFO_COMMENTS_URL + prodID + EXT_TYPE);
    let comentarios = await response.json();

    comentarios.forEach(comentario => {
        console.log(comentario);
        const puntuacion = comentario.score;
        const usuario = comentario.user;
        const fecha = comentario.dateTime;
        const texto_comentario = comentario.description;
        ShowComment(usuario, fecha, puntuacion, texto_comentario);
    })
}      

function StarsHTML(puntuacion) {
    const filledStars = `<i class="fa-solid fa-star"></i>`;
    const emptyStars = `<i class="fa-regular fa-star"></i>`;
    const totalStars = 5; 
    
    let result = '';
    for (let i = 1; i <= totalStars; i++) {
        if (i <= puntuacion) {
            result += filledStars;
        } else {
            result += emptyStars;
        }
    }
    
    return result;
}

/*------------------------------------------------------------------*/

function ShowComment(usuario, fecha, puntuacion, texto_comentario)
{
    const comentariosList = document.getElementById("boxComentarios"); /* ??? */
    // Crear un elemento para mostrar el comentario
    const comentarioItem = document.createElement("div");
    comentarioItem.innerHTML = `
    <p> <b>${usuario} </b>- ${fecha} - ${StarsHTML(puntuacion)}  </p>
    <p>Comentario: ${texto_comentario}</p>
    <hr />
    `;
    // Agregar el elemento de lista al contenedor de comentarios
    comentariosList.appendChild(comentarioItem)
}