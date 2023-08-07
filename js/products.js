let jsonResult = getJSONData(PRODUCTS_URL+"103.json")
.then(function(response) {
  if (response.status === 'ok') {
    // acceder a los datos de response
    console.log("Datos recibidos:", response.data);
    console.log(response.data.products[1].name);
  } else {
    console.error("Error en la solicitud:", response.data);
  }
})
.catch(function(error) {
  console.error("Error en la solicitud:", error);
});

// console.log(jsonResult.data.products[1].name);