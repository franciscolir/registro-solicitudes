/*

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
 document.getElementById("filterDescripcion").value = "";
document.getElementById("filterFechaSolicitud").value = "";
document.getElementById("filterFechaIngreso").value = "";
document.getElementById("filterEstado").value = "";

  // Limpiar los filtros aplicados
  const filterIds = [
    "filterNumeroSolicitud",
    "filterEmisor",
    "filterTitulo",
    "filterDescripcion",
    "filterFechaSolicitud",
    "filterFechaIngreso",
    "filterEstado"
  ];

  filterIds.forEach(id => document.getElementById(id).value = "");

  // Aplicar filtros vacíos (que efectivamente no aplican filtros)
  applyFilters();
}

// Función para mostrar una tabla dependiendo del tipo y la página actual
function showTable(type) {
  document.getElementById("mainContent").classList.add("d-none");
  document.getElementById("tableSection").classList.remove("d-none");

  const tableTitle = document.getElementById("tableTitle");
  const tableHeaders = document.getElementById("tableHeaders");
  const tableBody = document.querySelector("#dataTable tbody");
  const buttonContainer = document.getElementById("buttonContainer");
  const filtersContainer = document.getElementById("filterContainer");

  // Limpia el contenido anterior
  tableHeaders.innerHTML = "";
  tableBody.innerHTML = "";
  buttonContainer.innerHTML = "";
  filtersContainer.innerHTML = ""; //agregado

  const { apiUrl, headers, title, formatRow, buttonHtml, filter } =  getTableConfig(type); 

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
      config.filter = generateFilterInputs([
        { id: "filterNumeroSolicitud", placeholder: "Buscar por N°", type: "number" },
        { id: "filterEmisor", placeholder: "Seleccionar establecimiento", type: "select", options: ["Seleccione un establecimiento"] },
        { id: "filterTitulo", placeholder: "Buscar por título", type: "text" },
        { id: "filterDescripcion", placeholder: "Buscar por descripción", type: "text" },
        { id: "filterFechaSolicitud", placeholder: "dd/mm/aaaa", type: "text" },
        { id: "filterFechaIngreso", placeholder: "dd/mm/aaaa", type: "text" },
        { id: "filterEstado", placeholder: "Seleccionar estado", type: "select", options: ["Seleccione un estado"] }
      ]);
      
      
      /*`
                <td><input type="number" class="form-control" id="filterNumeroSolicitud" placeholder = "buscar por N°"></td>
                <td> <select class="form-control" id="filterEmisor" placeholder = "buscar por emisor"><option value="" disabled selected>Seleccione un establecimiento</option></select></td>
                <td><input type="text" class="form-control" id="filterTitulo" placeholder = "buscar por titulo"></td>
                <td><input type="text" class="form-control" id="filterDescripcion" placeholder = "buscar por descripcion"></td>
                <td><input type="text" class="form-control" id="filterFechaSolicitud" placeholder = "dd/mm/aaaa"></td>
                <td><input type="text" class="form-control" id="filterFechaIngreso" placeholder = "dd/mm/aaaa"></td>
                <td> <select class="form-control" id="filterEstado" placeholder = "buscar por estado"><option value="" disabled selected>Seleccione un estado</option></select></td>
            `;*/ /*
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

// Función para generar inputs de filtro
function generateFilterInputs(filters) {
  return filters.map(filter => {
    if (filter.type === "select") {
      return `<td><select class="form-control" id="${filter.id}"><option value="" disabled selected>${filter.placeholder}</option>${filter.options.map(option => `<option value="${option}">${option}</option>`).join("")}</select></td>`;
    }
    return `<td><input type="${filter.type}" class="form-control" id="${filter.id}" placeholder="${filter.placeholder}"></td>`;
  }).join("");
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
    descripcion: document.getElementById("filterDescripcion").value.toLowerCase(),
    fechaSolicitud: document.getElementById("filterFechaSolicitud").value,
    fechaIngreso: document.getElementById("filterFechaIngreso").value,
    estado: document.getElementById("filterEstado").value,

    // Agrega otros filtros aquí
  };

  // Filtrar los datos almacenados
  const filteredData = data.filter((item) => {
    return (
      (!filters.numeroSolicitud ||item.numeroSolicitud == filters.numeroSolicitud) &&
      (!filters.emisor || item.emisor == filters.emisor) &&
      (!filters.titulo || item.titulo.toLowerCase().includes(filters.titulo)) &&
      (!filters.descripcion || item.descripcion.toLowerCase().includes(filters.descripcion)) &&
      (!filters.fechaSolicitud || item.fechaSolicitud === filters.fechaSolicitud) &&
      (!filters.fechaIngreso || item.fechaIngreso === filters.fechaIngreso) &&
      (!filters.estado || item.estado === filters.estado)
    );
  });

  // Renderizar la tabla con los datos filtrados
  const formatRow = getTableConfig(document.getElementById("tableTitle").innerText.toLowerCase()).formatRow;
  const tableBody = document.querySelector("#dataTable tbody");
  renderTable(filteredData, formatRow, tableBody);
}


// Inicializa la tabla al cargar la página
resetView();

//###############################################################################



*/


let data = []; // Variable global para almacenar los datos obtenidos

// Función para mostrar el main y ocultar la tabla
function resetView() {
    document.getElementById("mainContent").classList.remove("d-none");
    document.getElementById("tableSection").classList.add("d-none");
}

// Función para limpiar filtros
function clearFilters(modalType) {
    const filterIds = {
        solicitudes: [
            "filterNumeroSolicitud",
            "filterEmisor",
            "filterTitulo",
            "filterDescripcion",
            "filterEstado"
        ],
        respuestas: [
            "filterNumeroRespuesta",
            "filterTituloRespuesta",
            "filterDescripcionRespuesta",
            "filterSolicitudRespuesta"
        ],
        eventos: [
            "filterEvento",
            "filterDescripcionEvento",
            "filterEstablecimiento",
            "filterInvitado"
        ]
    };

    const idsToClear = filterIds[modalType] || [];
    
    idsToClear.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.value = "";
        }
    });
    applyFilters(modalType);
}

// Función para aplicar filtros
function applyFilters(modalType) {
    const filters = getFilterValues(modalType);
    const filteredData = filterData(data, filters);
    renderTable(filteredData, getTableConfig(modalType).formatRow);
}

// Función para obtener los valores de los filtros
function getFilterValues(modalType) {
    const filterIds = {
        solicitudes: {
            numeroSolicitud: document.getElementById("filterNumeroSolicitud")?.value,
            emisor: document.getElementById("filterEmisor")?.value,
            titulo: document.getElementById("filterTitulo")?.value.toLowerCase(),
            descripcion: document.getElementById("filterDescripcion")?.value.toLowerCase(),
            estado: document.getElementById("filterEstado")?.value
        },
        respuestas: {
            numeroRespuesta: document.getElementById("filterNumeroRespuesta")?.value,
            titulo: document.getElementById("filterTituloRespuesta")?.value.toLowerCase(),
            descripcion: document.getElementById("filterDescripcionRespuesta")?.value.toLowerCase(),
            solicitudRespuesta: document.getElementById("filterSolicitudRespuesta")?.value
        },
        eventos: {
            titulo: document.getElementById("filterEvento")?.value.toLowerCase(),
            descripcion: document.getElementById("filterDescripcionEvento")?.value.toLowerCase(),
            establecimiento: document.getElementById("filterEstablecimiento")?.value,
            invitado: document.getElementById("filterInvitado")?.value.toLowerCase()
        }
    };

    return filterIds[modalType] || {};
}

// Función para filtrar los datos
function filterData(data, filters) {
    return data.filter(item => {
        return Object.keys(filters).every(key => {
            if (!filters[key]) return true; // Si no hay filtro, permite el item
            return item[key]?.toString().toLowerCase().includes(filters[key]);
        });
    });
}

// Función para mostrar la tabla
function showTable(type) {
    document.getElementById("mainContent").classList.add("d-none");
    document.getElementById("tableSection").classList.remove("d-none");

    const tableConfig = getTableConfig(type);
    const { title, headers, formatRow, buttonHtml } = tableConfig;

    document.getElementById("tableTitle").innerText = title;
    renderTableHeaders(headers);
    renderTableButtons(buttonHtml);
    fetchData(tableConfig.apiUrl, formatRow);
}

// Función para renderizar los encabezados de la tabla
function renderTableHeaders(headers) {
    const tableHeaders = document.getElementById("tableHeaders");
    tableHeaders.innerHTML = "";
    headers.forEach(header => {
        const th = document.createElement("th");
        th.innerText = header;
        tableHeaders.appendChild(th);
    });
}

// Función para renderizar los botones de la tabla
function renderTableButtons(buttonHtml) {
    document.getElementById("buttonContainer").innerHTML = buttonHtml;
}

// Función para obtener la configuración de la tabla
function getTableConfig(type) {
    const baseUrl = "http://localhost:8080/";
    const pageSize = 100;
    const page = 0;
    const paginacionUrl = `?page=${page}&size=${pageSize}`;

    let config = {
        apiUrl: "",
        headers: [],
        title: "",
        formatRow: () => "",
        buttonHtml: "",
    };

    switch (type) {
        case "solicitudes":
            config.apiUrl = `${baseUrl}solicitudes${paginacionUrl}&sort=fechaIngresoSolicitud,desc`;
            config.headers = ["N° Solicitud", "Emisor", "Titulo", "Descripcion", "Fecha Solicitud", "Fecha Ingreso", "Estado"];
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
            config.buttonHtml = `
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">Ingresar Solicitud</button>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#filterModal">Aplicar Filtros</button>
                <button type="button" class="btn btn-secondary" onclick="clearFilters('solicitudes')">Limpiar Filtros</button>
            `;
            break;

        case "respuestas":
            config.apiUrl = `${baseUrl}respuestas${paginacionUrl}&sort=numeroRespuesta,desc`;
            config.headers = ["N° Memo", "Titulo", "Descripcion", "Fecha Respuesta", "Ingreso a departamento", "N° de Solicitud respondida"];
            config.title = "Respuestas";
            config.formatRow = (registro) => `
                <td>${registro.numeroRespuesta}</td>
                <td>${registro.titulo}</td>
                <td>${registro.descripcion}</td>
                <td>${registro.fechaRespuesta}</td>
                <td>${registro.fechaEnvio}</td>
                <td>${registro.solicitudId}</td>
            `;
            config.buttonHtml = `
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#respuestaModal">Ingresar Respuesta</button>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#filterModalRespuestas">Aplicar Filtros</button>
                <button type="button" class="btn btn-secondary" onclick="clearFilters('respuestas')">Limpiar Filtros</button>
            `;
            break;

        case "eventos":
            config.apiUrl = `${baseUrl}eventos${paginacionUrl}&sort=fecha,desc`;
            config.headers = ["Evento", "Descripción", "Establecimiento", "Invitado"];
            config.title = "Eventos";
            config.formatRow = (registro) => `
                <td>${formatText(registro.tipo)}</td>
                <td>${registro.descripcion}</td>
                <td>${registro.establecimiento}</td>
                <td>${registro.invitado.replace(/[\[\]']+/g, "")}</td>
            `;
            config.buttonHtml = `
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#eventModal">Agendar</button>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#filterModalEventos">Aplicar Filtros</button>
                <button type="button" class="btn btn-secondary" onclick="clearFilters('eventos')">Limpiar Filtros</button>
            `;
            break;

        default:
            return null;
    }

    return config;
}

// Función para renderizar la tabla
function renderTable(data, formatRow) {
    const tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = ""; // Limpia la tabla existente

    data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = formatRow(item);
        tableBody.appendChild(row);
    });
}

// Función para obtener y mostrar los datos
function fetchData(apiUrl, formatRow) {
    axios
        .get(apiUrl)
        .then(response => {
            data = response.data.content; // Almacena los datos en la variable global
            renderTable(data, formatRow);
        })
        .catch(error => {
            console.error("Error al cargar los datos:", error);
        });
}

// Función para formatear texto
function formatText(text) {
    return text
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (letra) => letra.toUpperCase());
}

// Inicializa la tabla al cargar la página
resetView();
