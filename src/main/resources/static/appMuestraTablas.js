// Función para mostrar el main y ocultar la tabla
function resetView() {
    document.getElementById('mainContent').classList.remove('d-none'); // Muestra el main
    document.getElementById('tableSection').classList.add('d-none');   // Oculta la tabla
}

// Función general para mostrar una tabla dependiendo del tipo
function showTable(type) {
    document.getElementById('mainContent').classList.add('d-none');  // Oculta el main
    document.getElementById('tableSection').classList.remove('d-none');  // Muestra la tabla

    const tableTitle = document.getElementById('tableTitle');
    const tableHeaders = document.getElementById('tableHeaders');
    const tableBody = document.querySelector('#dataTable tbody');

    // Limpia el contenido anterior
    tableHeaders.innerHTML = '';
    tableBody.innerHTML = '';

    // Determina los datos a cargar según el tipo
    let apiUrl = '';
    let headers = [];
    let formatted ;
    let row;
    
    switch (type) {
        case 'solicitudes':
            apiUrl = 'http://localhost:8080/solicitudes';
            headers = ['N° Solicitud', 'Emisor', 'Titulo', 'Descripcion', 'Fecha Solicitud', 'Fecha Ingreso', 'Estado'];
            tableTitle.innerText = 'Solicitudes';
            formatted = registro.estado
            .toLowerCase()                  // Convierte todo el texto a minúsculas
            .replace(/_/g, ' ')             // Reemplaza guiones bajos con espacios
            //.replace(/^(.)/, (match, p1) => p1.toUpperCase()); // Convierte la primera letra a mayúscula
            .replace(/\b\w/g, letra => letra.toUpperCase());
            r =  `
            <td>${registro.numeroSolicitud}</td>
            <td>${registro.emisor}</td>
            <td>${registro.titulo}</td>
            <td>${registro.descripcion}</td>
            <td>${registro.fechaSolicitud}</td>
            <td>${registro.fechaIngresoDepartamento}</td>
            <td>${estadoFormatted}</td>
            `;
            break;
        case 'respuestas':
            apiUrl = 'http://localhost:8080/respuestas';
            headers = ['N° Respuestas', 'Titulo', 'Descripcion', 'Fecha Respuesta', 'Fecha Ingreso', 'Solicitud respondida'];
            tableTitle.innerText = 'Respuestas';
            break;
        case 'eventos':
            apiUrl = 'http://localhost:8080/eventos';
            headers = ['Evento', 'Descripción', 'Establecimiento', 'Fecha', 'Invitado'];
            tableTitle.innerText = 'Eventos';
            break;
        case 'proyectos':
            apiUrl = 'http://localhost:8080/proyectos';
            headers = ['ID', 'Descripción', 'Fecha', 'Responsable', 'Resultado'];
            tableTitle.innerText = 'Proyectos';
            break;
    }

    // Genera los headers dinámicamente
    headers.forEach(header => {
        const th = document.createElement('th');
        th.innerText = header;
        tableHeaders.appendChild(th);
    });

    // Llamada Axios para obtener los datos del backend
    fetchData(apiUrl, headers, tableBody, formatted, r);
}

// Función genérica para obtener datos y renderizar la tabla
function fetchData(apiUrl, headers, tableBody) {
    axios.get(apiUrl)
        .then(response => {
            const registros = response.data.content;

            tableBody.innerHTML = '';
            registros.forEach(registro => {
               let format = formatted;

               const row = document.createElement('tr');
                    row.innerHTML = r;
                    tableBody.appendChild(row);
                });
             
            })
        
        .catch(error => {
            console.error('Error al cargar los datos:', error);
        });
}
/*function fetchData(apiUrl, headers, tableBody) {
    axios.get(apiUrl)
        .then(response => {
            const registros = response.data.content;

            registros.forEach(item => {
                const row = document.createElement('tr');
                headers.forEach(header => {
                    const cell = document.createElement('td');
                    const field = header.toLowerCase().replace(/ /g, ''); // Limpia los espacios en los nombres de los campos
                    cell.innerText = item[field] || '-';
                    row.appendChild(cell);
                });
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
        });
}*/

// Función para manejar la paginación y mostrar/ocultar tablas
function setupTableWithPagination(type, toggleBtnId, tableId, paginationContainerId, paginationId, fetchDataFunc) {
    document.addEventListener('DOMContentLoaded', () => {
        const toggleBtn = document.getElementById(toggleBtnId);
        const table = document.getElementById(tableId);
        const tableBody = table.querySelector('tbody');
        const paginationContainer = document.getElementById(paginationContainerId);
        const pagination = document.getElementById(paginationId);

        let isTableVisible = false;
        let currentPage = 0;
        const pageSize = 10;

        function fetchData(page) {
            const apiUrl = `http://localhost:8080/${type}?page=${page}&size=${pageSize}`;
            fetchDataFunc(apiUrl, tableBody);
        }

        function fetchPage(page) {
            currentPage = page;
            fetchData(page);
        }

    

        pagination.addEventListener('click', function(event) {
            const target = event.target;
            if (target && target.matches('a.page-link')) {
                event.preventDefault();
                const page = target.getAttribute('data-page');
                const pageNumber = page.replace(/[()]/g, '');
                if (!isNaN(pageNumber)) {
                    fetchPage(pageNumber);
                } else {
                    console.error('Invalid page number:', page);
                }
            }
        });

        // Inicializar la tabla cuando la página se carga
        fetchData(currentPage);
    });
}

// Configurar tablas con paginación
setupTableWithPagination('solicitudes', 'toggleTableBtn', 'solicitudes-table', 'pagination-container', 'pagination', fetchData);
setupTableWithPagination('eventos', 'toggleEventBtn', 'eventos-table', 'pagination-evento-container', 'pagination-evento', fetchData);
setupTableWithPagination('respuestas', 'toggleRespuestaBtn', 'respuestas-table', 'pagination-respuesta-container', 'pagination-respuesta', fetchData);
