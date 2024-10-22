// Función para mostrar el main y ocultar la tabla
function resetView() {
    document.getElementById("mainContent").classList.remove("d-none");
    document.getElementById("tableSection").classList.add("d-none");
    cerrarFormularioExistente();
}

let data = []; // Variable global para almacenar los datos obtenidos

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
        ],
        certificados: [
            "filterNumeroCertificado",
            "filterUnidad",
            "filterTituloCertificado",
            "filterDescripcionCertificado"
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
    } else if (modalType === 'certificados') {
        fillUnidadSelect();
    }

    applyFilters(modalType);
}

// Función para aplicar filtros
function applyFilters(modalType) {
    const filters = getFilterValues(modalType);
    const filteredData = filterData(data, filters);

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
        },
        certificados: {
            numeroCertificado: document.getElementById("filterNumeroCertificado")?.value,
            unidad: document.getElementById("filterUnidad")?.value.toLowerCase(),
            titulo: document.getElementById("filterTituloCertificado")?.value.toLowerCase(),
        }
    };

    return filterIds[modalType] || {};
}

function filterData(data, filters) {
    return data.filter(item => {
        return Object.keys(filters).every(key => {
            const filterValue = filters[key]?.toString().trim().toLowerCase();
            const itemValue = item[key];

            if (!filterValue) return true;
            if (itemValue === undefined) return false;

            return itemValue.toString().trim().toLowerCase().includes(filterValue);
        });
    });
}

// Función para mostrar la tabla
function showTable(type) {
    document.getElementById("mainContent").classList.add("d-none");
    document.getElementById("tableSection").classList.remove("d-none");
    cerrarFormularioExistente();

    const tableConfig = getTableConfig(type);
    const { title, headers, formatRow, buttonHtml, filtroHtml } = tableConfig;

    document.getElementById("tableTitle").innerText = title;
    renderTableHeaders(headers);
    renderTableButtons(buttonHtml);
    renderTableFiltro(filtroHtml);
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

// Función para renderizar el botón de registro
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
        filtroHtml: ""
    };

    switch (type) {
        case "solicitudes":
            config.apiUrl = `${baseUrl}movimientos${paginacionUrl}&sort=fechaIngreso,desc`;
            config.headers = ["N°", "Emisor", "Titulo", "Descripcion", "Fecha Solicitud", "Ingreso", "Estado"];
            config.title = "Solicitudes";
            config.formatRow = (registro) => `
                <td>${registro.solicitud}</td>
                <td>${registro.emisor}</td>
                <td>${registro.titulo}</td>
                <td>${registro.descripcion}</td>
                <td>${registro.fechaSolicitud}</td>
                <td>${registro.fechaIngreso}</td>
                <td>${formatText(registro.estado)}</td>
            `;
            config.buttonHtml = `
                <button type="button" class="btn btn-primary" id="abrirFormSolicitud">Ingresar Solicitud</button>
            `;
            config.filtroHtml = filtroSolicitudes;
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
                <button id="abrirFormRespuesta">Agregar Respuesta</button>
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
            config.filtroHtml = filtroSolicitude;
            break;

        case "certificados":
            config.apiUrl = `${baseUrl}certificados${paginacionUrl}&sort=fechaCertificado,desc`;
            config.headers = ["Numero", "Unidad", "Titulo", "Descripcion", "Fecha"];
            config.title = "Certificados";
            config.formatRow = (registro) => `
                <td>${registro.numeroCertificado}</td>
                <td>${registro.unidad}</td>
                <td>${registro.titulo}</td>
                <td>${registro.descripcion}</td>
                <td>${registro.fechaCertificado}</td>
            `;
            config.buttonHtml = `
                <button id="abrirFormCertificado">Agregar Certificado</button>
            `;
            config.filtroHtml = filtroCertificado;
            break;

        default:
            return null;
    }

    return config;
}

// Función para renderizar la tabla
function renderTable(data, formatRow) {
    const tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = "";
    console.log('Datos recibidos tabla:', data);
    data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = formatRow(item);
        tableBody.appendChild(row);
    });
}

// Función para mostrar un mensaje si no hay resultados
function renderNoResultsMessage() {
    const tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = "<tr><td colspan='7' class='text-center'>No se encontraron resultados.</td></tr>";
}

// Funciones para llenar selects
function fillEmisorSelect() {
    const emisorSelect = document.getElementById("filterEmisor");
    if (!emisorSelect) return;

    const emisores = [...new Set(data.map(item => item.emisor).filter(Boolean))];
    emisorSelect.innerHTML = `<option value="">Seleccione un emisor</option>`;
    emisores.forEach(emisor => {
        const option = document.createElement("option");
        option.value = emisor;
        option.textContent = formatText(emisor);
        emisorSelect.appendChild(option);
    });
}

function fillEstadoSelect() {
    const estadoSelect = document.getElementById("filterEstado");
    if (!estadoSelect) return;

    const estados = [...new Set(data.map(item => item.estado).filter(Boolean))];
    estadoSelect.innerHTML = `<option value="">Seleccione un estado</option>`;
    estados.forEach(estado => {
        const option = document.createElement("option");
        option.value = estado;
        option.textContent = formatText(estado);
        estadoSelect.appendChild(option);
    });
}

function fillEventoSelect() {
    const eventoSelect = document.getElementById("filterEvento");
    if (!eventoSelect) return;

    const eventos = [...new Set(data.map(item => item.tipo).filter(Boolean))];
    eventoSelect.innerHTML = `<option value="">Seleccione un evento</option>`;
    eventos.forEach(evento => {
        const option = document.createElement("option");
        option.value = evento;
        option.textContent = formatText(evento);
        eventoSelect.appendChild(option);
    });
}

function fillEstablecimientoSelect() {
    const establecimientoSelect = document.getElementById("filterEstablecimiento");
    if (!establecimientoSelect) return;

    const establecimientos = [...new Set(data.map(item => item.establecimiento).filter(Boolean))];
    establecimientoSelect.innerHTML = `<option value="">Seleccione un establecimiento</option>`;
    establecimientos.forEach(establecimiento => {
        const option = document.createElement("option");
        option.value = establecimiento;
        option.textContent = formatText(establecimiento);
        establecimientoSelect.appendChild(option);
    });
}

// Nuevo: Función para llenar el select de unidades en certificados
function fillUnidadSelect() {
    const unidadSelect = document.getElementById("filterUnidad");
    if (!unidadSelect) return;

    const unidades = [...new Set(data.map(item => item.unidad).filter(Boolean))];
    unidadSelect.innerHTML = `<option value="">Seleccione una unidad</option>`;
    unidades.forEach(unidad => {
        const option = document.createElement("option");
        option.value = unidad;
        option.textContent = formatText(unidad);
        unidadSelect.appendChild(option);
    });
}

// Función para obtener y mostrar los datos
function fetchData(apiUrl, formatRow) {
    axios
        .get(apiUrl)
        .then(response => {
            data = response.data.content;
            renderTable(data, formatRow);
            fillEmisorSelect();
            fillEstadoSelect();
            fillEventoSelect();
            fillEstablecimientoSelect();
            fillUnidadSelect(); // Llenar unidades para certificados
        })
        .catch(error => {
            console.error("Error al cargar los datos:", error);
        });
}

function formatText(text) {
    if (!text) return "";
    return text
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (letra) => letra.toUpperCase());
}

function cerrarFormularioExistente() {
    const existingForm = document.querySelector(".formulario-oculto");
    if (existingForm) {
        existingForm.remove();
    }
}

const filtroSolicitudes = `
          <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"> Filtro </button>
    <ul class="dropdown-menu">
        <li class="dropdown-item">
            <button type="button" class="btn btn-success" onclick="clearFilters('solicitudes')">Limpiar</button>
        </li>
        <li class="dropdown-item">
            <div id="filtroDropdown" class="dropdown-filtro">
                        <form id="filterFormSolicitudes">
                            <div class="mb-3">
                                <input type="number" class="form-control" id="filterNumeroSolicitud" placeholder="Buscar por N°">
                            </div>
                            <div class="mb-3">
                                <select class="form-control" id="filterEmisor">
                                    <option value="" disabled selected>Seleccione un establecimiento</option>
                                    <!-- Opciones dinámicas aquí -->
                                </select>
                            </div>
                            <div class="mb-3">
                                <input type="text" class="form-control" id="filterTitulo" placeholder="Buscar por título">
                            </div>
                            <div class="mb-3">
                                <select class="form-control" id="filterEstado">
                                    <option value="" disabled selected>Seleccione un estado</option>
                                    <!-- Opciones dinámicas aquí -->
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                         <button type="button" class="btn btn-primary" onclick="applyFilters('solicitudes')">Buscar</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>`;

const filtroCertificado = `
                                   
    <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"> Filtro </button>
    <ul class="dropdown-menu">
        <li class="dropdown-item">
            <button type="button" class="btn btn-success" onclick="clearFilters('certificados')">Limpiar</button>
        </li>
        <li class="dropdown-item">
            <div id="filtroDropdown" class="dropdown-filtro">
                <form id="filterFromCertificados">
                    <div class="mb-3">
                        <input type="number" class="form-control" id="filterNumeroCertificado" placeholder="Buscar por N°">
                    </div>
                    <div class="mb-3">
                        <select class="form-control" id="filterUnidad">
                            <option value="" disabled selected>Seleccione Unidad</option>
                            <!-- Opciones dinámicas aquí -->
                        </select>
                    </div>
                    <div class="mb-3">
                        <input type="text" class="form-control" id="filterTituloCertificado" placeholder="Buscar por título">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" onclick="applyFilters('certificados')">Buscar</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </form>
            </div>
        </li>
    </ul>
`;





// Inicializa la tabla al cargar la página
resetView();


document.addEventListener('DOMContentLoaded', function() {
    const filterForm = document.getElementById('dropdown-menu');

    if (filterForm) {
        filterForm.addEventListener('click', function(event) {
            event.stopPropagation(); // Evita que el clic en el formulario cierre el dropdown
        });
    }
});
