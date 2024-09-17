let data = []; // Variable global para almacenar los datos obtenidos

//###############################################################################

// Función para mostrar el main y ocultar la tabla
function resetView() {
  document.getElementById("mainContent").classList.remove("d-none");
  document.getElementById("tableSection").classList.add("d-none");
}

function clearFilters() {
  // Limpiar los campos de entrada de los filtros
  document.getElementById("filterNumeroSolicitud").value = "";
  document.getElementById("filterEmisor").value = "";
  document.getElementById("filterTitulo").value = "";

  // Limpiar los filtros aplicados
  const filters = {
    numeroSolicitud: "",
    emisor: "",
    titulo: "",
  };

  // Aplicar filtros vacíos (que efectivamente no aplican filtros)
  applyFilters();
}

// Función para mostrar una tabla dependiendo del tipo y la página actual
//function showTable(type, page = 0) {
function showTable(type) {
  document.getElementById("mainContent").classList.add("d-none");
  document.getElementById("tableSection").classList.remove("d-none");

  const tableTitle = document.getElementById("tableTitle");
  const tableHeaders = document.getElementById("tableHeaders");
  const tableBody = document.querySelector("#dataTable tbody");
  const buttonContainer = document.getElementById("buttonContainer");
  //const paginationContainer = document.getElementById('pagination-container');
  //const pagination = document.getElementById('pagination');
  const filtersContainer = document.getElementById("filterContainer");

  // Limpia el contenido anterior
  tableHeaders.innerHTML = "";
  tableBody.innerHTML = "";
  buttonContainer.innerHTML = "";
  //pagination.innerHTML = '';
  filtersContainer.innerHTML = ""; //agregado

  const { apiUrl, headers, title, formatRow, buttonHtml, filter } =
    getTableConfig(type); //,page);

  if (!apiUrl) {
    console.error("Tipo de tabla no reconocido:", type);
    return;
  }

  tableTitle.innerText = title;

  // Genera los headers dinámicamente
  headers.forEach((header) => {
    const th = document.createElement("th");
    th.innerText = header;
    tableHeaders.appendChild(th);
  });

  // Añadir el botón en el encabezado
  buttonContainer.innerHTML = buttonHtml;
  filtersContainer.innerHTML = filter; //agregado
  // Llamada para obtener los datos y renderizar la tabla
  fetchData(apiUrl, formatRow, tableBody); //, page, paginationContainer);
}

// Función para configurar la tabla según el tipo
function getTableConfig(type) {
  //, page) {
  const baseUrl = "http://localhost:8080/";
  const pageSize = 100;
  const page = 0;
  const paginacionUrl = `?page=${page}&size=${pageSize}`;

  let config = {
    apiUrl: "",
    headers: [],
    title: "",
    filter: "",
    formatRow: () => "",
    buttonHtml: "",
  };

  switch (type) {
    case "solicitudes":
      config.apiUrl = `${baseUrl}solicitudes${paginacionUrl}&sort=fechaIngresoSolicitud,desc`;
      config.headers = [
        "N° Solicitud",
        "Emisor",
        "Titulo",
        "Descripcion",
        "Fecha Solicitud",
        "Fecha Ingreso",
        "Estado",
      ];
      config.title = "Solicitudes";
      config.formatRow = (registro) => `
                <td>${registro.numeroSolicitud}</td>
                <td>${registro.emisor}</td>
                <td>${registro.titulo}</td>
                <td>${registro.descripcion}</td>
                <td>${registro.fechaSolicitud}</td>
                <td>${registro.fechaIngresoDepartamento}</td>
                <td>${formatText(registro.estado)}</td>
            `;
      config.filter = `
                <td><input type="number" class="form-control" id="filterNumeroSolicitud" placeholder = "buscar por N°"></td>
                <td> <select class="form-control" id="filterEmisor" placeholder = "buscar por emisor"><option value="" disabled selected>Seleccione un establecimiento</option></select></td>
                <td><input type="text" class="form-control" id="filterTitulo" placeholder = "buscar por titulo"></td>
                <td><input type="text" class="form-control" id="filterDescripcion" placeholder = "buscar por descripcion"></td>
                <td><input type="text" class="form-control" id="filterFechaSolicitud" placeholder = "dd/mm/aaaa"></td>
                <td><input type="text" class="form-control" id="filterFechaIngreso" placeholder = "dd/mm/aaaa"></td>
                <td> <select class="form-control" id="filterEstado" placeholder = "buscar por estado"><option value="" disabled selected>Seleccione un estado</option></select></td>
            `;
      config.buttonHtml = `
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
                    Ingresar Solicitud
                </button>
            `;
      break;
    case "respuestas":
      config.apiUrl = `${baseUrl}respuestas${paginacionUrl}&sort=numeroRespuesta,desc`;
      config.headers = [
        "N° Memo",
        "Titulo",
        "Descripcion",
        "Fecha Respuesta",
        "Ingreso a departamento",
        "N° de Solicitud respondida",
      ];
      config.title = "Respuestas";
      config.formatRow = (registro) => `
                <td>${registro.numeroRespuesta}</td>
                <td>${registro.titulo}</td>
                <td>${registro.descripcion}</td>
                <td>${registro.fechaRespuesta}</td>
                <td>${registro.fechaEnvio}</td>
                <td>${registro.solicitudId}</td>
            `;
      config.filter = `
                <td><input type="number" class="form-control" id="filterNumeroRespuesta" placeholder = "ingrese N°"></td>
                <td><input type="text" class="form-control" id="filterTitulo" placeholder = "titulo o palabra"></td>
                <td><input type="text" class="form-control" id="filterDescripcion" placeholder = "ingrese palabra"></td>
                <td><input type="text" class="form-control" id="filterFechaRespuesta" placeholder = "dd/mm/aaaa"></td>
                <td><input type="text" class="form-control" id="filterFechaIngreso" placeholder = "dd/mm/aaaa"></td>
                <td><input type="number" class="form-control" id="filterNumeroSolicitud" placeholder = "ingrese N°"></td>
            `;
      config.buttonHtml = `
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#respuestaModal">
                    Ingresar Respuesta
                </button>
            `;
      break;
    case "eventos":
      config.apiUrl = `${baseUrl}eventos${paginacionUrl}&sort=fecha,desc`;
      config.headers = [
        "Evento",
        "Descripción",
        "Establecimiento",
        "Fecha",
        "Invitado",
      ];
      config.title = "Eventos";
      config.formatRow = (registro) => `
                <td>${formatText(registro.tipo)}</td>
                <td>${registro.establecimiento}</td>
                <td>${registro.descripcion}</td>
                <td>${registro.fecha}</td>
                <td>${registro.invitado.replace(/[\[\]']+/g, "")}</td>
            `;
            config.filter = `
            <td><input type="number" class="form-control" id="filterNumeroRespuesta" placeholder = "ingrese N°"></td>
            <td><input type="text" class="form-control" id="filterTitulo" placeholder = "titulo o palabra"></td>
            <td><input type="text" class="form-control" id="filterDescripcion" placeholder = "ingrese palabra"></td>
            <td><input type="text" class="form-control" id="filterFechaRespuesta" placeholder = "dd/mm/aaaa"></td>
            <td><input type="text" class="form-control" id="filterFechaIngreso" placeholder = "dd/mm/aaaa"></td>
            <td><input type="number" class="form-control" id="filterNumeroSolicitud" placeholder = "ingrese N°"></td>
        `;
      config.buttonHtml = `
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#eventModal">
                    Agendar
                </button>`;
      break;
    case "proyectos":
      config.apiUrl = `${baseUrl}proyectos${paginacionUrl}`;
      config.headers = [
        "ID",
        "Descripción",
        "Fecha",
        "Responsable",
        "Resultado",
      ];
      config.title = "Proyectos";
      config.formatRow = (registro) => `
                <td>${registro.titulo}</td>
                <td>${registro.descripcion}</td>
            `;
      break;
    default:
      return null;
  }

  return config;
}

// Función para formatear texto
function formatText(text) {
  return text
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letra) => letra.toUpperCase());
}

//###############################################################################

function fetchData(apiUrl, formatRow, tableBody) {
  //, page, paginationContainer) {
  axios
    .get(apiUrl)
    .then((response) => {
      data = response.data.content; // Almacena los datos en la variable global
      renderTable(data, formatRow, tableBody); // Renderiza la tabla con los datos iniciales
      //renderPagination(page, response.data.totalPages, paginationContainer);
    })
    .catch((error) => {
      console.error("Error al cargar los datos:", error);
    });
}

function renderTable(data, formatRow, tableBody) {
  tableBody.innerHTML = ""; // Limpia la tabla existente

  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = formatRow(item);
    tableBody.appendChild(row);
  });
}

function applyFilters() {
  // Recoger los valores de los filtros
  const filters = {
    numeroSolicitud: document.getElementById("filterNumeroSolicitud").value,
    emisor: document.getElementById("filterEmisor").value,
    titulo: document.getElementById("filterTitulo").value.toLowerCase(),
    descripcion: document
      .getElementById("filterDescripcion")
      .value.toLowerCase(),
    fechaSolicitud: document.getElementById("filterFechaSolicitud").value,
    fechaIngreso: document.getElementById("filterFechaIngreso").value,
    estado: document.getElementById("filterEstado").value,

    // Agrega otros filtros aquí
  };

  // Filtrar los datos almacenados
  const filteredData = data.filter((item) => {
    return (
      (!filters.numeroSolicitud ||
        item.numeroSolicitud == filters.numeroSolicitud) &&
      (!filters.emisor || item.emisor == filters.emisor) &&
      (!filters.titulo || item.titulo.toLowerCase().includes(filters.titulo)) &&
      (!filters.descripcion ||
        item.descripcion.toLowerCase().includes(filters.descripcion)) &&
      (!filters.fechaSolicitud ||
        item.fechaSolicitud === filters.fechaSolicitud) &&
      (!filters.fechaIngreso || item.fechaIngreso === filters.fechaIngreso) &&
      (!filters.estado || item.estado === filters.estado)
    );
  });

  // Renderizar la tabla con los datos filtrados
  const formatRow = getTableConfig(
    document.getElementById("tableTitle").innerText.toLowerCase()
  ).formatRow;
  const tableBody = document.querySelector("#dataTable tbody");
  renderTable(filteredData, formatRow, tableBody);
}
/*
function renderPagination(currentPage, totalPages, paginationContainer) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    // Muestra la paginación si hay más de una página
    if (totalPages > 1) {
        paginationContainer.style.display = 'block';

        for (let i = 0; i < totalPages; i++) {
            const pageItem = document.createElement('li');
            pageItem.className = 'page-item' + (i === currentPage ? ' active' : '');
            pageItem.innerHTML = `<a class="page-link" href="#" data-page="${i}">${i + 1}</a>`;
            pagination.appendChild(pageItem);
        }
    } else {
        paginationContainer.style.display = 'none';
    }
}

// Manejador de eventos para la paginación
document.getElementById('pagination').addEventListener('click', function(event) {
    const target = event.target;
    if (target && target.matches('a.page-link')) {
        event.preventDefault(); // Evita el desplazamiento
        const page = parseInt(target.getAttribute('data-page'), 10);
        const type = document.getElementById('tableTitle').innerText.toLowerCase(); // Obtener tipo actual
        showTable(type, page);
    }
});

*/

// Inicializa la tabla al cargar la página
resetView();

//###############################################################################

/*
// Función genérica para obtener datos y renderizar la tabla
function fetchData(apiUrl, formatRow, tableBody, page, paginationContainer) {
    axios.get(apiUrl)
        .then(response => {
            const registros = response.data.content;
            const totalPages = response.data.totalPages;

            tableBody.innerHTML = '';
            registros.forEach(registro => {
                const row = document.createElement('tr');
                row.innerHTML = formatRow(registro);
                tableBody.appendChild(row);
            });

            renderPagination(page, totalPages, paginationContainer);
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
        });
}
        




// Función para renderizar la paginación
function renderPagination(currentPage, totalPages, paginationContainer) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    // Muestra la paginación si hay más de una página
    if (totalPages > 1) {
        paginationContainer.style.display = 'block';

        for (let i = 0; i < totalPages; i++) {
            const pageItem = document.createElement('li');
            pageItem.className = 'page-item' + (i === currentPage ? ' active' : '');
            pageItem.innerHTML = `<a class="page-link" href="#" data-page="${i}">${i + 1}</a>`;
            pagination.appendChild(pageItem);
        }
    } else {
        paginationContainer.style.display = 'none';
    }
}

// Manejador de eventos para la paginación
document.getElementById('pagination').addEventListener('click', function(event) {
    const target = event.target;
    if (target && target.matches('a.page-link')) {
        event.preventDefault(); // Evita el desplazamiento
        const page = parseInt(target.getAttribute('data-page'), 10);
        const type = document.getElementById('tableTitle').innerText.toLowerCase(); // Obtener tipo actual
        showTable(type, page);
    }
});


// Inicializa la tabla al cargar la página
//showTable('solicitudes'); // Puedes cambiar el tipo inicial si lo deseas
resetView();
*/
