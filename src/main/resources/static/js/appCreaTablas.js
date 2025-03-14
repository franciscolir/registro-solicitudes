const API_URL = 'http://localhost:8080'; 


// Función para mostrar el main y ocultar la tabla
function resetView() {
    document.getElementById("mainContent").classList.remove("d-none");
    document.getElementById("tableSection").classList.add("d-none");
    cerrarFormularioExistente();
}

let data = []; // Variable global para almacenar los datos obtenidos
let ultimoNumeroRespuesta;
let unidad;



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
            solicitud: document.getElementById("filterNumeroSolicitud")?.value,
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
    loadDataUltimaRespuesta2();

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
    if (headers && Array.isArray(headers)) {
        headers.forEach(header => {
            const th = document.createElement("th");
            th.innerText = header;
            tableHeaders.appendChild(th);
        });
    } else {
        console.warn('Headers no está definido o no es un array');
    }
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
    const ultimoNUmero = ultimoNumeroRespuesta
 

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
            config.apiUrl = `${baseUrl}movimientos/solicitudes${paginacionUrl}&sort=fechaIngreso,desc`;
            config.headers = ["N°", "Emisor", "Titulo", "Descripcion", "Fecha Solicitud", "Ingreso", "Estado","Archivo"];
            config.title = "Solicitudes";
            config.formatRow = (registro) => `
                <td>${registro.solicitud}</td>
                <td>${registro.emisor}</td>
                <td>${registro.titulo}</td>
                <td>${registro.descripcion}</td>
                <td>${registro.fechaSolicitud}</td>
                <td>${registro.fechaIngreso}</td>
                <td>${formatText(registro.estado)}</td>
                 <td>
                 <div id="alertContainer${registro.id}"></div>
                    <button id="archivoSolicitudes" class="btn btn-link" type="button" onclick="fetchFiles('solicitud', ${registro.id});">ver imagenes</button>
                </td>
            `;
            config.buttonHtml = `
                <button type="button" class="btn btn-primary" id="abrirFormSolicitud" data-form="0">Ingresar Solicitud</button>
            `;
            config.filtroHtml = filtroSolicitudes;
            break;

        case "respuestas":
            config.apiUrl = `${baseUrl}movimientos/respuestas${paginacionUrl}&sort=respuesta,desc`;
            config.headers = ["N° Memo", "Titulo", "Descripcion", "Fecha Respuesta", "Salida de departamento", "N° de Solicitud respondida","Archivo"];
            config.title = "Respuestas";
            config.formatRow = (registro) => {
                 // Verificar si 'numeroRespuesta' no está definido o es null
        if (!registro.numeroRespuesta) {
            return ''; // Si no hay numeroRespuesta, no renderizamos la fila
        }
                return `
                <td>${registro.numeroRespuesta}</td>
                <td>${registro.titulo}</td>
                <td>${registro.descripcion}</td>
                <td>${registro.fechaRespuesta}</td>
                <td>${registro.fechaEnvio}</td>
                <td>${registro.numeroSolicitud}</td>
                 <td><div id="alertContainer${registro.id}"></div>
                    <button id="archivoRespuestas" class="btn btn-link" type="button" onclick="fetchFiles('respuesta', ${registro.id});">ver imagenes</button>
                </td>
            `;
        };
            config.buttonHtml = /*`

    <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"> Ingresar Respuesta </button>
    <ul class="dropdown-menu">
        
        <li class="dropdown-item"><a class="dropdown-link text-primary" id="abrirFormRespuesta"  data-movimiento="0" data-ultimaRespuesta ="${ultimoNUmero}" onclick="">Proceso interno</a></li>       
        <li class="dropdown-item"><a class="dropdown-link text-primary"  onclick="resetView();">Solicitud Pendiente</a></li>
        
    </ul>
            `*/"";// agregar boton cuando este operartiva l atabla solicitudes internas
            config.filtroHtml = filtroRespuesta;
            break;

        case "eventos":
            config.apiUrl = `${baseUrl}eventos${paginacionUrl}&sort=fecha,desc`;
            config.headers = ["Evento","Fecha", "Descripción", "Establecimiento", "Invitado"];
            config.title = "Eventos";
            config.formatRow = (registro) => `
                <td>${formatText(registro.categoria)}</td>
                <td>${registro.fecha}</td>
                <td>${registro.descripcion}</td>
                <td>${registro.establecimiento}</td>
                <td>${registro.invitado.replace(/[\[\]']+/g, "")}</td>
            `;
            config.buttonHtml = `
           <button type="button" class="btn btn-primary" id="abrirFormEvento" data-form="0">Agendar</button>
     
                
            `;
            config.filtroHtml = filtroEvento;
            break;

        case "certificados":
            config.apiUrl = `${baseUrl}certificados${paginacionUrl}&sort=fechaCertificado,desc`;
            config.headers = ["Numero", "Unidad", "Titulo", "Descripcion", "Fecha", "Archivo"];
            config.title = "Certificados";
            config.formatRow = (registro) => `
                <td>${registro.numeroCertificado}</td>
                <td>${registro.unidad}</td>
                <td>${registro.titulo}</td>
                <td>${registro.descripcion}</td>
                <td>${registro.fechaCertificado}</td>
                <td><div id="alertContainer${registro.id}"></div>
                    <button id="archivoCertificado" class="btn btn-link" type="button" onclick="fetchFiles('certificado', ${registro.id});">ver imagenes</button>
                </td>


            `;
            config.buttonHtml =/* `
            <button id="ingresarCertificadoBtn" class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" onclick="loadUnidades();"> Ingresar Certificado </button>
           <ul class="dropdown-menu">
                <li class="dropdown-item">
                    <div id="formDropdown" class="dropdown-form">
                        <form id="selectUnidadForm">
                            <div class="mb-3">
                                <select class="form-control" id="selectUnidad">
                                    <option value="" disabled selected>Seleccione una unidad</option>
                                    <!-- Opciones dinámicas aquí -->
                                </select>
                            </div>
                            <div class="modal-footer">
                                <button id="abrirFormCertificado" type="button" data-unidad="">Seleccionar</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </form>
                    </div>
                </li>
            </ul>
        `*/"";// agregar boton cuando este operartiva l atabla solicitudes internas
           
            config.filtroHtml = filtroCertificado;
            break;

        default:
            return { apiUrl: "", headers: [], title: "", formatRow: () => "", buttonHtml: "", filtroHtml: "" };

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
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" onclick="applyFilters('solicitudes')">Buscar</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </form>
            </div>
        </li>
    </ul>`;

    const filtroRespuesta = `

    <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"> Filtro </button>
    <ul class="dropdown-menu">
        <li class="dropdown-item">
            <button type="button" class="btn btn-success" onclick="clearFilters('respuestas')">Limpiar</button>
        </li>
        <li class="dropdown-item">
            <div id="filtroDropdown" class="dropdown-filtro">
                        <form id="filterFormSolicitudes">
                            <div class="mb-3">
                                <input type="number" class="form-control" id="filterNumeroRespuesta" placeholder="Buscar por N°">
                            </div>
                            <div class="mb-3">
                                <input type="text" class="form-control" id="filterTituloRespuesta" placeholder="Buscar por título">
                            </div>
                            <div class="mb-3">
                                <input type="number" class="form-control" id="filterSolicitudRespuesta" placeholder="Buscar por N°">
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" onclick="applyFilters('respuestas')">Buscar</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </form>
            </div>
        </li>
    </ul>`;


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

const filtroEvento = `
    <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"> Filtro </button>
    <ul class="dropdown-menu">
        <li class="dropdown-item">
            <button type="button" class="btn btn-success" onclick="clearFilters('eventos')">Limpiar</button>
        </li>
        <li class="dropdown-item">
            <div id="filtroDropdown" class="dropdown-filtro">
                <form id="filterFormSolicitudes">
                    <div class="mb-3">
                        <select class="form-control" id="filterEvento"></select>
                            <option value="" disabled selected>Seleccione un tipo de evento</option>
                            <!-- Opciones dinámicas aquí -->
                        </select>
                    </div>
                     <div class="mb-3">
                        <input type="text" class="form-control" id="filterDescripcionEvento" placeholder="Buscar por descripción">
                    </div>
                    <div class="mb-3">
                        <select class="form-control" id="filterEstablecimiento">
                            <option value="" disabled selected>Seleccione un establecimiento</option>
                            <!-- Opciones dinámicas aquí -->
                        </select>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" onclick="applyFilters('eventos')">Buscar</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </form>
            </div>
        </li>
    </ul>`;

document.addEventListener('DOMContentLoaded', function() {
    const filterForm = document.getElementById('dropdown-menu');

    if (filterForm) {
        filterForm.addEventListener('click', function(event) {
            event.stopPropagation(); // Evita que el clic en el formulario cierre el dropdown
        });
    }
});


// Cargar la última respuesta
const loadDataUltimaRespuesta2 = async () => {
    try {
        const response = await axios.get('http://localhost:8080/respuestas?size=1&sort=id,desc');
        const data = response.data.content; // Asegúrate de que 'content' exista

        if (Array.isArray(data) && data.length > 0) {
            const item = data[0];
            
            // Almacenar el número obtenido
            ultimoNumeroRespuesta = item.numeroRespuesta + 1;
           
        } else {
            console.error('La propiedad `content` no es un array o está vacío.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('No se pudo cargar los datos. Verifica la URL y la conexión a Internet.');
    }
};

// Renderizar el formulario
function renderFormUnidad() {
    const selectUnidad = document.getElementById('selectUnidad');
    const boton = document.getElementById('abrirFormCertificado');

    // Limpiar eventos anteriores
    selectUnidad.removeEventListener('change', handleSelectChange);
    selectUnidad.addEventListener('change', handleSelectChange);

    function handleSelectChange(event) {
        const unidadSeleccionada = event.target.value;
        boton.setAttribute('data-unidad', unidadSeleccionada); // Asignar el valor seleccionado
        console.log(`Unidad seleccionada: ${unidadSeleccionada}`);
    }
}

const loadUnidades = async () => {
    try {
        const response = await axios.get('http://localhost:8080/unidades');
        
        // Validar que response.data exista y contenga content
        const data = response.data.content;
      

        if (Array.isArray(data) && data.length > 0) {
            const selectUnidad = document.getElementById('selectUnidad');
            selectUnidad.innerHTML = `<option value="" disabled selected>Seleccione una unidad</option>`; // Opción por defecto

            data.forEach(item => {
                const option = document.createElement("option");
                option.value = item.id; // Usar item.id
                option.textContent = item.nombre; // Usar item.nombre
                selectUnidad.appendChild(option);
            });

              // Al final, renderizamos el formulario
              renderFormUnidad();
             // Agregar evento para actualizar el botón cuando se selecciona una unidad
  
    
            
        } else {
            console.error('La propiedad `content` no es un array o está vacío.');
        }
    } catch (error) {
        console.error(error);
        alert('No se pudo cargar los datos. Verifica la URL y la conexión a Internet.');
    }
};



// Asignar el evento al botón de "Ingresar Certificado"
//document.getElementById("ingresarCertificadoBtn").addEventListener('click', loadUnidades);


// Inicializa la tabla al cargar la página
resetView();




function setupFileFormListener() {
    const fileForm = document.getElementById('fileForm');
    const fileInput = document.getElementById('fileInput');

    if (fileForm && fileInput) {
        fileForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Evitar el envío tradicional del formulario

            // Obtener el archivo seleccionado
            const file = fileInput.files[0];

            // Verificar si se ha seleccionado un archivo
            if (file) {
                handleFile(file);
            } else {
                alert('Por favor selecciona un archivo.');
            }
        });
    } else {
        console.error('No se encontró el formulario o el input de archivo en el DOM.');
    }
}

// Llamar a la función en el contexto adecuado, por ejemplo, después de que el DOM haya sido completamente cargado
document.addEventListener('DOMContentLoaded', setupFileFormListener);





function handleFile(file) {
    const previewContainer = document.getElementById('imagePreview');
    const downloadContainer = document.getElementById('fileDownload');

    // Limpiar los contenedores de vista previa y descarga
    previewContainer.innerHTML = '';
    downloadContainer.innerHTML = '';

    // Si es una imagen, mostrar vista previa
    if (file.type.startsWith('image')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.classList.add('img-fluid', 'm-2'); // Bootstrap clases para imagenes
            previewContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
    }

    // Crear enlace para descarga
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(file);
    downloadLink.download = file.name;
    downloadLink.textContent = 'Descargar archivo';
    downloadContainer.appendChild(downloadLink);
}



// Función para obtener los archivos desde la API con parámetros dinámicos
async function fetchFiles(tipoDoc, id) {

    console.log("tipoDoc = "+ tipoDoc)
    console.log("id = "+ id)
    try {
      
        // Aquí construimos la URL usando los parámetros dinámicos
        const response = await axios.get(`${API_URL}/archivos/download/${tipoDoc}/${id}`);

        console.log(response.data)
        if (response.data == null || response.data.length === 0){
           fileListElement.innerHTML = '<p>Error: la respuesta no es un arreglo de archivos.</p>';
        }

        displayFiles(response.data);  // Pasamos los datos obtenidos a la función para mostrarlos
    } catch (error) {
        console.error('Error al obtener los archivos:', error);
        //displayError('Error al cargar los archivos');
        showAlert2('No se encontraron archivos.', 'danger', id);
    }
}

// Función para mostrar los archivos en la página
function displayFiles(files) {


    //document.getElementById("mainContent").classList.remove("d-none");
    document.getElementById("tableSection").classList.add("d-none");
    const fileListElement = document.getElementById('file-list');
    fileListElement.innerHTML = '';  // Limpiar contenido previo
                  // Crear el botón de cierre
                  const closeButton = document.createElement('button');
                  closeButton.textContent = 'Cerrar'; // Texto del botón de cierre
                  closeButton.classList.add('close-button'); // Añadir una clase para estilo
                  closeButton.addEventListener('click', () => {
                      ; // Eliminar el contenedor de la vista previa cuando se haga clic en el botón
                      document.getElementById("mainContent").classList.remove("d-none");
                      document.getElementById("file-list").classList.add("d-none");
                  });
                   
                    // Añadir el botón de cierre al contenedor
                    fileListElement.appendChild(closeButton);

        // Comprobamos que `files` sea un arreglo antes de intentar acceder a su propiedad `length`
        if (!Array.isArray(files)) {
            //console.error('Se esperaba un arreglo de archivos, pero se recibió:', files);
            
        showAlert2('No se encontraron archivos.', 'danger', files.content.id);
            //fileListElement.innerHTML = '<p>Error: la respuesta no es un arreglo de archivos.</p>';
            console.log(files+" files archivos recibidos")
            return;
        }

    if (files.length === 0) {
        //fileListElement.innerHTML = '<p>No se encontraron archivos.</p>';
        showAlert2('No se encontraron archivos.', 'danger', 1);
    } else {
        files.forEach(file => {
            const fileItemElement = createFileItem(file);
            fileListElement.appendChild(fileItemElement);
        });
    }
}

// Función para mostrar un mensaje de error
function displayError(message) {
    const fileListElement = document.getElementById('file-list');
    fileListElement.innerHTML = `<p>${message}</p>`;
}

// Función para crear un ítem de archivo (vista previa y opción de descarga)
function createFileItem(file) {
    const fileItem = document.createElement('div');
    fileItem.classList.add('file-item');

    // Crear la vista previa del archivo
    const filePreview = createFilePreview(file);
    fileItem.appendChild(filePreview);

    return fileItem;
}

// Función para crear la vista previa de cada archivo
function createFilePreview(file) {
    const previewContainer = document.createElement('div');
    previewContainer.classList.add('file-preview');



    const fileExtension = file.nombre.split('.').pop().toLowerCase();
    console.log('Extensión del archivo:', fileExtension);

    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
        const imgElement = document.createElement('img');
        //imgElement.src = file.downloadUrl;
        imgElement.src = file.ruta;
        imgElement.alt = file.name;
        imgElement.width = 200;
        previewContainer.appendChild(imgElement);
    } else if (fileExtension === 'pdf') {
        const embedElement = document.createElement('embed');
        embedElement.src = file.downloadUrl;
        embedElement.type = 'application/pdf';
        embedElement.width = 200;
        embedElement.height = 200;
        previewContainer.appendChild(embedElement);
    } else {
        const downloadLink = document.createElement('a');
        downloadLink.href = file.downloadUrl;
        downloadLink.download = file.name;
        downloadLink.textContent = `Descargar ${file.name}`;
        previewContainer.appendChild(downloadLink);
    }

    return previewContainer;
}



function showAlert2(message, type, id) {
    const alertContainer = document.getElementById(`alertContainer${id}`);
    const alertDiv = document.createElement('div');

    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `${message} <div type="button" class="close" aria-label="Close">
        <span aria-hidden="true"></span>
    </div>`;

    alertContainer.appendChild(alertDiv);

    // Cerrar la alerta después de 3 segundos
    setTimeout(() => {
        alertDiv.remove(); // Eliminar el elemento
    }, 2000);

    // Cerrar la alerta al hacer clic en el botón
    alertDiv.querySelector('.close').onclick = () => {
        alertDiv.remove();
    };
};
