

// Variable global para tableBody
let tableBody;

let ultimoNumeroRespuesta1;
// Importar la función para obtener el número de respuesta

let pass2;

const loadData = async () => {
    
    try {
        const solicitudesResponse = await axios.get('http://localhost:8080/movimientos/pendientes?size=10');
        const solicitudes = solicitudesResponse.data.content;
        
        if (Array.isArray(solicitudes)) {
            tableBody.innerHTML = ''; // Limpiar el cuerpo de la tabla
            let rows = ''; // Variable para acumular las filas


            // Llama a getNumero y almacena el valor
            

            // Iterar sobre cada solicitud
            solicitudes.forEach(item => {
                const botonesOpciones = getBotonesOpciones(item);
                const estadoFormatted = item.estado
                    .toLowerCase()
                    .replace(/_/g, ' ')
                    .replace(/\b\w/g, letra => letra.toUpperCase());

                rows += `
                    <tr>
                        <th id="numeroSolicitud" scope="row">${item.solicitud}</th>
                        <td class="fila d-md-table-cell d-none">
                            <ul class="list-group">
                                <h3 class="title">Solicitud</h3>
                                <li>${item.emisor}</li>
                                <li class="list-group">${item.titulo}</li>
                                <li class="list-group">${item.fechaSolicitud}</li>
                                <li class="list-group">${estadoFormatted || 'No hay datos'}</li>
                            </ul>
                        </td>
                        <td class="fila d-md-table-cell d-none">
                            <ul class="list-group">
                                <h3 class="title">Asignado a:</h3>
                                ${item.nombreUnidad ? `
                                    <li>${item.nombreUnidad}</li>
                                    <li class="list-group">${'el ' + item.fechaAsignacion}</li>
                                    <li class="list-group">${item.comentarioAsignacion}</li>
                                ` : `
                                    <li class="list-group">
                                        ${item.rechazado ? `
                                            <h5>${estadoFormatted}</h5>
                                            <li class="list-group">${item.comentarioRechazado}</li>
                                        ` : `
                                            <label>
                                                <input type="radio" name="action${item.id}" onchange="selectForm(1, ${item.id})">
                                                Asignar Unidad
                                            </label>
                                            <label>
                                                <input type="radio" name="action${item.id}" onchange="selectForm(2, ${item.id})">
                                                Rechazar
                                            </label>
                                            <div id="formContainer${item.id}"></div>
                                        `}
                                    </li>
                                `}
                            </ul>
                        </td>
                           <td class="mb-3 fila d-md-table-cell d-none">
            <ul class="mb-3 list-group">
                <h3 class="title">Certificado</h3>
                ${item.rechazado ? `
                    <li class="list-group">${estadoFormatted}</li>
                ` : `
                    <li class="list-group">${item.certificado != null ? 'Certificado N° ' + item.certificado : ` 'Pendiente'
                    `}
                    </li>
                    <li class="list-group"> ${item.fechaResuelto || ""}</li>
                    <li class="list-group">${item.comentarioResuelto || ""}</li>
                `}
            </ul>
        </td>
                        <td>${botonesOpciones}</td>
                        <td class="d-md-none">
                            <div>
                                <strong>Emisor:</strong> ${item.emisor} <br>
                                <strong>Título:</strong> ${item.titulo} <br>
                                <strong>Fecha Solicitud:</strong> ${item.fechaSolicitud} <br>
                                <strong>Asignado a:</strong> ${item.nombreUsuario || 'No hay datos'} <br>
                                <strong>Estado:</strong> ${estadoFormatted || 'No hay datos'} <br>
                                <strong>Certificado N° </strong> ${item.certificado || 'No hay datos'} <br>
                                <strong>Fecha Certificado:</strong> ${item.fechaResuelto || 'No hay datos'} <br>
                            </div>
                            <div class="btn-group">
                                <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"> Opciones </button>
                                <ul class="dropdown-menu">
                                    <li class="dropdown-item"><a class="dropdown-link text-success" onclick="" data-bs-toggle="modal" data-bs-target="#">ver</a></li>
                                    <li class="dropdown-item"><a class="dropdown-link text-primary" id="abrirFormRespuesta"  data-movimiento="${item.id}" data-ultimaRespuesta ="${ultimoNumeroRespuesta1}" onclick="">ingresar Respuesta</a></li>
                    
                                    <li class="dropdown-item"><a class="dropdown-link text-primary" id="abrirFormCertificado"  data-unidad="${item.unidad}" data-nombreUnidad="${item.nombreUnidad}" data-movimiento="${item.id}"onclick="">ingresar Certificado </a></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                `;
            });

            // Asignar todas las filas acumuladas a la tabla
            tableBody.innerHTML = rows;
        } else {
            console.error('La propiedad `solicitudes` no es un array.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('No se pudo cargar los datos. Verifica la URL y la conexión a Internet.');
    }
};

const getBotonesOpciones = (item) => {
    
    if (item.asignado === true && item.resuelto === true) {
        return `
            <div class="btn-group d-md-table-cell d-none">
                <button class="btn btn-option btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"> Opciones </button>
                <ul class="dropdown-menu">
                    <li class="dropdown-item"><a class="dropdown-link text-primary" id="abrirFormRespuesta"  data-movimiento="${item.id}" data-ultimaRespuesta ="${ultimoNumeroRespuesta1}" onclick="">ingresar Respuesta</a></li>
                    <li class="dropdown-item"><a class="dropdown-link text-success" onclick="">ver archivos</a></li>
                </ul>
            </div>
        `;
    } else if (item.asignado === true) {
        return `
            <div class="btn-group d-md-table-cell d-none">
                <button class="btn btn-option btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"> Opciones </button>
                <ul class="dropdown-menu">
                    <li class="dropdown-item"><a class="dropdown-link text-success" onclick="">ver archivos</a></li>
                    <li class="dropdown-item"><a class="dropdown-link text-primary" id="abrirFormCertificado"  data-unidad="${item.unidad}" data-nombreUnidad="${item.nombreUnidad}" data-movimiento="${item.id}"onclick="">ingresar Certificado </a></li>
                </ul>
            </div>
        `;
    } else {
        return `
            <div class="btn-group d-md-table-cell d-none">
                <button class="btn btn-option btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"> Opciones </button>
                <ul class="dropdown-menu">
                    <li class="dropdown-item"><a class="dropdown-link text-success" onclick="">ver archivos</a></li>
                </ul>
            </div>
        `;
    }

    
};



document.addEventListener('DOMContentLoaded', () => {
    tableBody = document.getElementById('tableIngreso'); // Definir tableBody al cargar la página
    loadData(); // Llama a loadData al cargar la página
});



const selectForm = (formNumber, id) => {
    const formContainer = document.getElementById(`formContainer${id}`);
    console.log(`Intentando acceder al contenedor: formContainer${id}`);

    if (formContainer) {
        if (formNumber === 1) {
            formContainer.innerHTML = getForm1(id);
            loadUnidadOptions(id); // Cargar opciones para el select
            formContainer.querySelector('#form1').addEventListener('submit', (event) => submitForm(event, 'form1', id));
        } else if (formNumber === 2) {
            formContainer.innerHTML = getForm2(id);
            formContainer.querySelector('#form2').addEventListener('submit', (event) => submitForm(event, 'form2', id));
        }
    } else {
        console.error(`No se encontró el contenedor para la solicitud ID: ${id}`);
    }
};

const getForm1 = (id) => `
<form id="form1"> 
    <div class="mb-3">
        <div id="alertContainer${id}"></div>

        <select class="form-select" id="unidad" aria-describedby="unidadHelp">
            <option value="" disabled selected>Seleccionar Unidad</option>
            <!-- Opciones del select -->
        </select>
    </div>
    <li> 
        <div class="mb-3">
            <input type="text" class="form-control" id="inputComentarioAsignar" aria-describedby="comentarioHelp" placeholder="Comentario">
        </div>
    </li>
    <input type="hidden" id="idForm1" value="${id}">
    <button type="submit" id="btnAsignar" class="btn btn-primary">Guardar</button>
</form>
`;

const getForm2 = (id) => `
<form id="form2"> 
    <div class="mb-3">
        <div id="alertContainer${id}"></div>
    </div>
    <li> 
        <div class="mb-3">
            <input type="text" class="form-control" id="inputComentarioRechazar" aria-describedby="comentarioHelp" placeholder="Comentario"> 
        </div>
    </li>
    <input type="hidden" id="idForm2" value="${id}">
    <button type="submit" id="btnRechazar" class="btn btn-warning">Rechazar</button> 
</form>
`;

// Función para cargar las opciones del select
const loadUnidadOptions = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/unidades`); // Reemplaza con tu endpoint real
        const select = document.getElementById('unidad');

        // Limpia las opciones actuales (si es necesario)
        select.innerHTML = `<option value="" disabled selected>Seleccionar Unidad</option>`;

        // Agrega las opciones al select
        response.data.content.forEach(unidad => {
            const option = document.createElement('option');
            option.value = unidad.id; // Asumiendo que tu objeto unidad tiene un campo id
            option.textContent = unidad.nombre; // Asumiendo que el nombre de la unidad está en el campo nombre
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar las unidades:', error);
        showAlert('No se pudieron cargar las unidades. Inténtalo de nuevo.', 'danger', id);
    }
};


const submitForm = async (event, formId, id) => {
    event.preventDefault();

    let data;
    const url = 'http://localhost:8080/movimientos';
    const headers = {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': pass2  // Incluir el token CSRF en el header
    };

    
    if (formId === 'form1') {
        const unidad = document.getElementById('unidad').value;
        const comentarioAsignado = document.getElementById('inputComentarioAsignar').value;

        data = {
            id,
            unidad,
            comentarioAsignado
        };

        const endpoint = `${url}/asignar`;
        
        try {
            const response = await axios.put(endpoint, data, { headers });
            console.log('Respuesta del servidor (form1):', response.data);
            showAlert('Asignacion de solicitud éxitosa!', 'success', id);
            setTimeout(() => {
                loadData(); // Recargar solo la tabla
            }, 2000);
         
        } catch (error) {
            console.error('Error al enviar el formulario 1:', error);
            showAlert('Hubo un error al Asignar. Inténtalo de nuevo.', 'danger', id);
        }
    } else if (formId === 'form2') {
        const comentarioRechazar = document.getElementById('inputComentarioRechazar').value;

        data = {
            id,
            comentarioRechazar
        };

        const endpoint = `${url}/rechazar`;

        try {
            const response = await axios.put(endpoint, data, { headers });
            console.log('Respuesta del servidor (form2):', response.data);
            showAlert('Rechazo de solicitud éxitoso!', 'success', id);
            setTimeout(() => {
                loadData(); // Recargar solo la tabla
            }, 2000);
        } catch (error) {
            console.error('Error al enviar el formulario 2:', error);
            showAlert('Hubo un error al rechazar. Inténtalo de nuevo.', 'danger', id);
        }
    } 
};


const showAlert = (message, type, id) => {
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

// Cargar la última respuesta
 const loadDataUltimaRespuesta1 = async () => {
       try {
        const response = await axios.get('http://localhost:8080/respuestas?size=1&sort=id,desc');
        const data = response.data.content;

        if (Array.isArray(data) && data.length > 0) {
            
            const item = data[0];
           
            // Almacenar el número obtenido
            ultimoNumeroRespuesta1 = item.numeroRespuesta+1;
            console.log(ultimoNumeroRespuesta1 +" ultimo numero appTablaMovimiento")
        } else {
            console.error('La propiedad `content` no es un array o está vacío.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('No se pudo cargar los datos. Verifica la URL y la conexión a Internet.');
    }
};

loadDataUltimaRespuesta1();



// Función para obtener imágenes desde el API
function obtenerImagenes(tipo, id) {
    const apiUrl = `http://localhost:8080/archivos/download/${tipo}/${id}`;  // URL del API con parámetros dinámicos
  
    // Realizamos la solicitud GET utilizando Axios
    axios.get(apiUrl)
        .then(function (response) {
            // Suponemos que la respuesta es un array de URLs de imágenes
            const imagenes = response.data; // Puede ser un array de URLs
  
            // Limpiar el contenedor de imágenes antes de agregar las nuevas
            const contenedor = document.getElementById("imagenes-container");
            contenedor.innerHTML = '';
  
            // Verificar si el array de imágenes tiene datos
            if (imagenes && imagenes.length > 0) {
                imagenes.forEach(function(imagenUrl) {
                    // Crear un elemento de imagen y agregarlo al contenedor
                    const imgElemento = document.createElement("img");
                    imgElemento.src = imagenUrl;
                    imgElemento.classList.add("img-fluid", "m-2"); // Bootstrap clases para imagenes
  
                    // Agregar la imagen al contenedor
                    contenedor.appendChild(imgElemento);
                });
            } else {
                contenedor.innerHTML = "<p>No se encontraron imágenes.</p>";
            }
        })
        .catch(function (error) {
            // Manejo de error
            console.error('Error al obtener las imágenes:', error);
            alert('Hubo un error al obtener las imágenes.');
        });
  }

      // Función para obtener el token CSRF del meta tag
      async function getCsrfToken() {
        const response = await fetch('/pass');
        const data = await response.json();
        const csrfToken = data.token;
        console.log("token " + csrfToken);
        pass2 = csrfToken;
        return csrfToken;
      }
      getCsrfToken()