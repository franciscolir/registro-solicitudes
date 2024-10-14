let data = []; // Variable global para almacenar los datos obtenidos



// Función para mostrar la tabla
function showModal(type) {
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
          config.apiUrl = `${baseUrl}movimientos${paginacionUrl}&sort=fechaIngreso,desc`;
          config.headers = ["N° Solicitud", "Emisor", "Titulo", "Descripcion", "Fecha Solicitud", "Fecha Ingreso", "Estado"];
          config.title = "Solicitudes";
          config.formatRow = (registro) => `
              <td>${registro.solicitud}</td>
              <td>${registro.emisor}</td>
              <td>${registro.titulo}</td>
              <td>${registro.descripcion}</td>
              <td>${registro.fechaSolicitud}</td>
              <td>${registro.fechaIngreso}</td>
              <td>${formatText(registro.estado)}</td>
          `
        
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
    console.log('Datos recibidos tabla Solicitudes:', data);
    data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = formatRow(item);
        tableBody.appendChild(row);
    });

}


// Función para mostrar un mensaje si no hay resultados
function renderNoResultsMessage() {
  const tableBody = document.querySelector("#dataTable tbody");
  tableBody.innerHTML = "<tr><td colspan='7' class='text-center'>No se encontraron resultados.</td></tr>"; // Ajusta el colspan según tu tabla
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
