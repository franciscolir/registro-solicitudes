/*
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
    const buttonContainer = document.getElementById('buttonContainer');


    // contenido agregado para paginacion ______________________________________
    const paginationContainer = document.getElementById('pagination-container');
    const pagination = document.getElementById('pagination');
//___________________________________________________________________________
   

// Limpia el contenido anterior
    tableHeaders.innerHTML = '';
    tableBody.innerHTML = '';
    buttonContainer.innerHTML = '';


        // contenido agregado para paginacion ______________________________________
        let currentPage = 0;
        const pageSize = 10;
        //___________________________________________________________________________

    // Configuración de la tabla según el tipo
    let baseUrl = 'http://localhost:8080/';
    let paginacionUrl = `?page=${page}&size=${pageSize}`;
    let apiUrl = '';
    let headers = [];
    let formatRow = () => ''; // Función por defecto que no hace nada
    let title = '';
    let buttonHtml = '';



    
    
    switch (type) {
        case 'solicitudes':
            apiUrl = `${baseUrl}solicitudes${paginacionUrl}`;
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
            apiUrl = `${baseUrl}respuestas${paginacionUrl}`;
            headers = ['N° Memo', 'Titulo', 'Descripcion', 'Fecha Respuesta', 'Ingreso a departamento', 'N° de Solicitud respondida'];
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
            apiUrl = `${baseUrl}eventos${paginacionUrl}`;
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
            apiUrl = `${baseUrl}proyectos${paginacionUrl}`;
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

//// contenido agregado para paginacion ____page__________________________________
function fetchData(page,apiUrl, formatRow, tableBody) {
    axios.get(apiUrl)
        .then(response => {
            const registros = response.data.content;

            tableBody.innerHTML = '';
            registros.forEach(registro => {
                const row = document.createElement('tr');
                row.innerHTML = formatRow(registro);
                tableBody.appendChild(row);
            });

            // contenido agregado para paginacion ______________________________________
               // Render pagination
               pagination.innerHTML = '';
               for (let i = 0; i < totalPages; i++) {
                   const pageItem = document.createElement('li');
                   pageItem.className = 'page-item' + (i === page ? ' active' : '');
                   pageItem.innerHTML = `<a class="page-link" href="#" data-page="(${i})">${i + 1}</a>`;
                   pagination.appendChild(pageItem);
               }
            //___________________________________________________________________________________



        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
        });
}

 // contenido agregado para paginacion ______________________________________
function fetchPage(page) {
    currentPage = page;
    fetchData(page);
}

pagination.addEventListener('click', function(event) {
    const target = event.target;
    if (target && target.matches('a.page-link')) {
        event.preventDefault(); // Evita el desplazamiento
        const page = target.getAttribute('data-page');
        const pageNumber = page.replace(/[()]/g, '')   
  
        if (!isNaN(pageNumber)) { // Verifica que la página sea un número válido
            fetchPage(pageNumber);
        } else {
            console.error('Invalid page number:', page);
        }
    }
});


 // Inicializar la tabla cuando la página se carga
 fetchData(currentPage);

 //___________________________________________________________________________________

*/// Función para mostrar el main y ocultar la tabla
// Función para mostrar el main y ocultar la tabla
function resetView() {
    document.getElementById('mainContent').classList.remove('d-none');
    document.getElementById('tableSection').classList.add('d-none');
}

// Función para mostrar una tabla dependiendo del tipo y la página actual
function showTable(type, page = 0) {
    document.getElementById('mainContent').classList.add('d-none');
    document.getElementById('tableSection').classList.remove('d-none');

    const tableTitle = document.getElementById('tableTitle');
    const tableHeaders = document.getElementById('tableHeaders');
    const tableBody = document.querySelector('#dataTable tbody');
    const buttonContainer = document.getElementById('buttonContainer');
    const paginationContainer = document.getElementById('pagination-container');
    const pagination = document.getElementById('pagination');

    // Limpia el contenido anterior
    tableHeaders.innerHTML = '';
    tableBody.innerHTML = '';
    buttonContainer.innerHTML = '';
    pagination.innerHTML = '';

    const { apiUrl, headers, title, formatRow, buttonHtml } = getTableConfig(type, page);

    if (!apiUrl) {
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

    // Llamada para obtener los datos y renderizar la tabla
    fetchData(apiUrl, formatRow, tableBody, page, paginationContainer);
}

// Función para configurar la tabla según el tipo
function getTableConfig(type, page) {
    const baseUrl = 'http://localhost:8080/';
    const pageSize = 20;
    const paginacionUrl = `?page=${page}&size=${pageSize}`;
   

    let config = {
        apiUrl: '',
        headers: [],
        title: '',
        formatRow: () => '',
        buttonHtml: ''
    };

    switch (type) {
        case 'solicitudes':
            config.apiUrl = `${baseUrl}solicitudes${paginacionUrl}&sort=fechaIngresoSolicitud,desc`;
            config.headers = ['N° Solicitud', 'Emisor', 'Titulo', 'Descripcion', 'Fecha Solicitud', 'Fecha Ingreso', 'Estado'];
            config.title = 'Solicitudes';
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
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
                    Ingresar Solicitud
                </button>
            `;
            break;
        case 'respuestas':
            config.apiUrl = `${baseUrl}respuestas${paginacionUrl}`;
            config.headers = ['N° Memo', 'Titulo', 'Descripcion', 'Fecha Respuesta', 'Ingreso a departamento', 'N° de Solicitud respondida'];
            config.title = 'Respuestas';
            config.formatRow = (registro) => `
                <td>${registro.numeroRespuesta}</td>
                <td>${registro.titulo}</td>
                <td>${registro.descripcion}</td>
                <td>${registro.fechaRespuesta}</td>
                <td>${registro.fechaEnvio}</td>
                <td>${registro.solicitudId}</td>
            `;
            config.buttonHtml = `
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#respuestaModal">
                    Ingresar Respuesta
                </button>
            `;
            break;
        case 'eventos':
            config.apiUrl = `${baseUrl}eventos${paginacionUrl}`;
            config.headers = ['Evento', 'Descripción', 'Establecimiento', 'Fecha', 'Invitado'];
            config.title = 'Eventos';
            config.formatRow = (registro) => `
                <td>${formatText(registro.tipo)}</td>
                <td>${registro.establecimiento}</td>
                <td>${registro.descripcion}</td>
                <td>${registro.fecha}</td>
                <td>${registro.invitado.replace(/[\[\]']+/g, '')}</td>
            `;
            console.log(config.formatRow,"formatrow#########");
            config.buttonHtml = `
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#eventModal">
                    Agendar
                </button>`;
            break;
        case 'proyectos':
            config.apiUrl = `${baseUrl}proyectos${paginacionUrl}`;
            config.headers = ['ID', 'Descripción', 'Fecha', 'Responsable', 'Resultado'];
            config.title = 'Proyectos';
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
        .replace(/_/g, ' ')
        .replace(/\b\w/g, letra => letra.toUpperCase());
}

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