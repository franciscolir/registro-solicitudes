
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
        ]
    };

    const idsToClear = filterIds[modalType] || [];
    
    idsToClear.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.value = "";
        }
    });

    // Llenar selects al limpiar
    if (modalType === 'solicitudes') {
        fillEmisorSelect();
        fillEstadoSelect();
    } else if (modalType === 'eventos') {
        fillEventoSelect();
        fillEstablecimientoSelect();
    }

    applyFilters(modalType);
}

// Función para aplicar filtros
function applyFilters(modalType) {
  const filters = getFilterValues(modalType);
  const filteredData = filterData(data, filters);

  // Mostrar tabla o mensaje si no hay coincidencias
  if (filteredData.length > 0) {
      renderTable(filteredData, getTableConfig(modalType).formatRow);
  } else {
      renderNoResultsMessage();
  }
}

// Función para obtener los valores de los filtros
function getFilterValues(modalType) {
    const filterIds = {
        solicitudes: {
            numeroSolicitud: document.getElementById("filterNumeroSolicitud")?.value,
            emisor: document.getElementById("filterEmisor")?.value.toLowerCase(),
            titulo: document.getElementById("filterTitulo")?.value.toLowerCase(),
            descripcion: document.getElementById("filterDescripcion")?.value.toLowerCase(),
            estado: document.getElementById("filterEstado")?.value.toLowerCase()
        },
        respuestas: {
            numeroRespuesta: document.getElementById("filterNumeroRespuesta")?.value,
            titulo: document.getElementById("filterTituloRespuesta")?.value.toLowerCase(),
            descripcion: document.getElementById("filterDescripcionRespuesta")?.value.toLowerCase(),
            solicitudId: document.getElementById("filterSolicitudRespuesta")?.value
        },
        eventos: {
            tipo: document.getElementById("filterEvento")?.value.toLowerCase(),
            descripcion: document.getElementById("filterDescripcionEvento")?.value.toLowerCase(),
            establecimiento: document.getElementById("filterEstablecimiento")?.value.toLowerCase(),
      
        }
    };

    return filterIds[modalType] || {};
}

function filterData(data, filters) {
  return data.filter(item => {
      return Object.keys(filters).every(key => {
          const filterValue = filters[key]?.toString().trim().toLowerCase(); // Asegúrate de que sea una cadena y recorta espacios
          const itemValue = item[key]; // No convertimos itemValue a string aquí, solo lo obtenemos
          
          if (!filterValue) return true; // Si no hay filtro, permite el item
          
          // Asegúrate de que itemValue no sea undefined
          if (itemValue === undefined) return false; // Si el valor del item es undefined, no hay coincidencia
          
          // Realiza la comparación
          return itemValue.toString().trim().toLowerCase().includes(filterValue);
      });
  });
}



// Función para mostrar la tabla
function showTable(type) {
    document.getElementById("mainContent").classList.add("d-none");
    document.getElementById("tableSection").classList.remove("d-none");

    const tableConfig = getTableConfig(type);
    const { title, headers, formatRow, buttonHtml, filtroHtml } = tableConfig;

    document.getElementById("tableTitle").innerText = title;
    renderTableHeaders(headers);
    renderTableButtons(buttonHtml);
    renderTableFiltro(filtroHtml)
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

// Función para renderizar el boton de registro
function renderTableButtons(buttonHtml) {
    document.getElementById("buttonContainer").innerHTML = buttonHtml;
}

// Función para renderizar los botones del filtro
function renderTableFiltro(filtroHtml) {
  document.getElementById("filtroContainer").innerHTML = filtroHtml;
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
        filtroHtml:""
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
          `;
          config.filtroHtml = `
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
                 `;
          config.filtroHtml = `
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
                 `;
          config.filtroHtml = `
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
/*
    if (data.length > 0) {
        fillEmisorSelect();
        fillEstadoSelect();
        fillEventoSelect();
        fillEstablecimientoSelect();
        fillInvitadoSelect();
    }*/
}


// Función para mostrar un mensaje si no hay resultados
function renderNoResultsMessage() {
  const tableBody = document.querySelector("#dataTable tbody");
  tableBody.innerHTML = "<tr><td colspan='7' class='text-center'>No se encontraron resultados.</td></tr>"; // Ajusta el colspan según tu tabla
}


function fillEmisorSelect() {
  const emisorSelect = document.getElementById("filterEmisor");
  if (!emisorSelect) return; // Verifica si el select existe

  const emisores = [...new Set(data.map(item => item.emisor).filter(Boolean))]; // Filtra valores undefined

  emisorSelect.innerHTML = `<option value="">Seleccione un emisor</option>`; // Opción vacía
  emisores.forEach(emisor => {
      const option = document.createElement("option");
      option.value = emisor;
      option.textContent = formatText(emisor); // Formatea el texto
      emisorSelect.appendChild(option);
  });
}

function fillEstadoSelect() {
  const estadoSelect = document.getElementById("filterEstado");
  if (!estadoSelect) return; // Verifica si el select existe

  const estados = [...new Set(data.map(item => item.estado).filter(Boolean))]; // Filtra valores undefined

  estadoSelect.innerHTML = `<option value="">Seleccione un estado</option>`; // Opción vacía
  estados.forEach(estado => {
      const option = document.createElement("option");
      option.value = estado;
      option.textContent = formatText(estado); // Formatea el texto
      estadoSelect.appendChild(option);
  });
}

function fillEventoSelect() {
  const eventoSelect = document.getElementById("filterEvento");
  if (!eventoSelect) return; // Verifica si el select existe

  const eventos = [...new Set(data.map(item => item.tipo).filter(Boolean))]; // Filtra valores undefined

  eventoSelect.innerHTML = `<option value="">Seleccione un evento</option>`; // Opción vacía
  eventos.forEach(evento => {
      const option = document.createElement("option");
      option.value = evento;
      option.textContent = formatText(evento); // Formatea el texto
      eventoSelect.appendChild(option);
  });
}

function fillEstablecimientoSelect() {
  const establecimientoSelect = document.getElementById("filterEstablecimiento");
  if (!establecimientoSelect) return; // Verifica si el select existe

  const establecimientos = [...new Set(data.map(item => item.establecimiento).filter(Boolean))]; // Filtra valores undefined

  establecimientoSelect.innerHTML = `<option value="">Seleccione un establecimiento</option>`; // Opción vacía
  establecimientos.forEach(establecimiento => {
      const option = document.createElement("option");
      option.value = establecimiento;
      option.textContent = formatText(establecimiento); // Formatea el texto
      establecimientoSelect.appendChild(option);
  });
}



// Función para obtener y mostrar los datos
function fetchData(apiUrl, formatRow) {
  axios
      .get(apiUrl)
      .then(response => {
          data = response.data.content; // Almacena los datos en la variable global
          renderTable(data, formatRow);
          fillEmisorSelect();
          fillEstadoSelect();
          fillEventoSelect();
          fillEstablecimientoSelect();
          
      })
      .catch(error => {
          console.error("Error al cargar los datos:", error);
      });
}

function formatText(text) {
  if (!text) return ""; // Manejo de caso donde el texto es undefined o vacío
  return text
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (letra) => letra.toUpperCase());
}


// Inicializa la tabla al cargar la página
resetView();
