// Función para mostrar el main y ocultar la tabla
function resetView() {
    document.getElementById('mainContent').classList.remove('d-none'); // Muestra el main
    document.getElementById('tableSection').classList.add('d-none');   // Oculta la tabla
}

// Función para mostrar una tabla dependiendo del tipo
function showTable(type) {
    document.getElementById('mainContent').classList.add('d-none'); // Oculta el main
    document.getElementById('tableSection').classList.remove('d-none'); // Muestra la tabla

    const tableTitle = document.getElementById('tableTitle');
    const tableHeaders = document.getElementById('tableHeaders');
    const tableBody = document.querySelector('#dataTable tbody');

    // Limpia el contenido anterior
    tableHeaders.innerHTML = '';
    tableBody.innerHTML = '';

    // Configuración de la tabla según el tipo
    let apiUrl = '';
    let headers = [];
    let formatRow = () => ''; // Función por defecto que no hace nada
    let title = '';
    let buttonAction = () => {};

    switch (type) {
        case 'solicitudes':
            apiUrl = 'http://localhost:8080/solicitudes';
            headers = ['N° Solicitud', 'Emisor', 'Titulo', 'Descripcion', 'Fecha Solicitud', 'Fecha Ingreso', 'Estado'];
            title = 'Solicitudes';
            formatRow = (registro) => `
                <td>${registro.numeroSolicitud}</td>
                <td>${registro.emisor}</td>
                <td>${registro.titulo}</td>
                <td>${registro.descripcion}</td>
                <td>${registro.fechaSolicitud}</td>
                <td>${registro.fechaIngresoDepartamento}</td>
                <td>${formatText(registro.estado)}</td>
            `;
            buttonHtml = `
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
                    Ingresar Solicitud
                </button>
            `;
            buttonAction = () => alert('Función para agregar solicitud');
            break;

        case 'respuestas':
            apiUrl = 'http://localhost:8080/respuestas';
            headers = ['N° Respuestas', 'Titulo', 'Descripcion', 'Fecha Respuesta', 'Fecha Ingreso', 'Solicitud respondida'];
            title = 'Respuestas';
            formatRow = (registro) => `
                <td>${registro.numeroRespuesta}</td>
                <td>${registro.titulo}</td>
                <td>${registro.descripcion}</td>
                <td>${registro.fechaRespuesta}</td>
                <td>${registro.fechaEnvio}</td>
                <td>${registro.solicitudId}</td>
            `;
            buttonHtml = `
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#respuestaModal")">
                    Ingresar Respuesta
            </button>
              `;
           
            break;

        case 'eventos':
            apiUrl = 'http://localhost:8080/eventos';
            headers = ['Evento', 'Descripción', 'Establecimiento', 'Fecha', 'Invitado'];
            title = 'Eventos';
            formatRow = (registro) => `
                <td>${formatText(registro.tipo)}</td>
                <td>${registro.establecimiento}</td>
                <td>${registro.descripcion}</td>
                <td>${registro.fecha}</td>
                <td>${registro.invitado.replace(/[\[\]']+/g, '')}</td>
            `;
            buttonHtml = `
             <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#eventModal">
                            Agendar
                        </button>`;
            break;

        case 'proyectos':
            apiUrl = 'http://localhost:8080/proyectos';
            headers = ['ID', 'Descripción', 'Fecha', 'Responsable', 'Resultado'];
            title = 'Proyectos';
            formatRow = (registro) => `
                <td>${registro.titulo}</td>
                <td>${registro.descripcion}</td>
            `;
            buttonHtml = ``;
            break;

        default:
            console.error('Tipo de tabla no reconocido:', type);
            return;
    }

    tableTitle.innerText = title;

    // Genera los headers dinámicamente
    headers.forEach(header => {
        const th = document.createElement('th');
        th.innerText = header;
        tableHeaders.appendChild(th);
    });

  // Añadir el botón en el encabezado
  buttonContainer.innerHTML = buttonHtml;



    // Llamada Axios para obtener los datos del backend
    fetchData(apiUrl, formatRow, tableBody);
}

// Función para formatear texto
function formatText(text) {
    return text
        .toLowerCase()
        .replace(/_/g, ' ')
        .replace(/\b\w/g, letra => letra.toUpperCase());
}

// Función genérica para obtener datos y renderizar la tabla
function fetchData(apiUrl, formatRow, tableBody) {
    axios.get(apiUrl)
        .then(response => {
            const registros = response.data.content;

            tableBody.innerHTML = '';
            registros.forEach(registro => {
                const row = document.createElement('tr');
                row.innerHTML = formatRow(registro);
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
        });
}

// Función para manejar la paginación y mostrar/ocultar tablas
function setupTableWithPagination(type, tableId, paginationContainerId, paginationId) {
    document.addEventListener('DOMContentLoaded', () => {
        const table = document.getElementById(tableId);
        const tableBody = table.querySelector('tbody');
        const pagination = document.getElementById(paginationId);

        let currentPage = 0;
        const pageSize = 10;

        function fetchDataWithPagination(page) {
            const apiUrl = `http://localhost:8080/${type}?page=${page}&size=${pageSize}`;
            showTable(type, tableBody, apiUrl);
        }

        pagination.addEventListener('click', function(event) {
            const target = event.target;
            if (target && target.matches('a.page-link')) {
                event.preventDefault();
                const page = target.getAttribute('data-page');
                const pageNumber = parseInt(page, 10);
                if (!isNaN(pageNumber)) {
                    fetchDataWithPagination(pageNumber);
                } else {
                    console.error('Número de página inválido:', page);
                }
            }
        });

        // Inicializar la tabla cuando la página se carga
        fetchDataWithPagination(currentPage);
    });
}

// Configurar tablas con paginación
setupTableWithPagination('solicitudes', 'solicitudes-table', 'pagination-container', 'pagination');
setupTableWithPagination('eventos', 'eventos-table', 'pagination-evento-container', 'pagination-evento');
setupTableWithPagination('respuestas', 'respuestas-table', 'pagination-respuesta-container', 'pagination-respuesta');
