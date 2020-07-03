// PRUEBA FINAL ->
// Defino variables de estado
var JobLocation = document.getElementById("JobLocation");
var JobDescription = document.getElementById("JobDescription");
var JobButton = document.getElementById("JobButton");
var JobShow = document.getElementById("JobShow");
// Escucho evento click en botón Buscar...
JobButton.addEventListener("click", JobSearch);

function JobSearch() {
  // Limpiar búsqueda previa
  JobShow.innerHTML = ""
  async function llamada() {
    
    var call = await axios.get(
      `https://corsanywhere.herokuapp.com/https://jobs.github.com/positions.json?description=${JobDescription.value}&location=${JobLocation.value}`
    );
    if (call.data.length === 0) {
      $("#JobShow").append(
        `<div class="col-12 py-2 d-flex align-item-center justify-content-center">
          <h4>Not found</h4>
        </div>`
      )
    }
    
    var job = call.data.forEach((el) => {
      var tipo = el.type;
      var logo = el.company_logo;
      var creado = el.created_at;
      var aplicar = el.how_to_apply;
      var lugar = el.location;
      var titulo = el.title;

      $("#JobShow").append(
        `<div class="col-12 py-2 mt-2">
          <div class="row">
            <div class="col-1 d-flex flex-column justify-content-center"><img class="w-100" src="${logo}" /></div>
            <div class="col-6 d-flex flex-column">
              <p class="lead">${tipo}</p>
              <h3>${titulo}</h3>
              <p class="lead">${lugar}</p>
              <p class="lead">Publicado el ${creado}</p>
            </div>
            <div class="col-5 d-flex flex-column justify-content-center">${aplicar}</div>
          </div>
          <hr />
        </div>`
      );

    });
  }
  llamada();
}
