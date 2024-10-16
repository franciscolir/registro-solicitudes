
//FUNCION CAPTA PARAMETROS DEL ACORDEON ####################
function captarParametros(id,numeroSolicitud,nombreModal,nombreDiv) {

   // nombreModal = "respuestaModal";
    //nombreDiv = "numeroSolicitudR";

    console.log(id,numeroSolicitud,nombreModal,nombreDiv,"##############################");
   
   let $respuestaModal = document.getElementById(nombreModal);
  
    let $numeroSolicitudR = document.getElementById(nombreDiv);

    $numeroSolicitudR.innerHTML= numeroSolicitud;

    //creando el elemento HTML en el DOM
//let inputOculto =  document.createElement("input");
//inputOculto.type = "hidden";
//inputOculto.id = "inputId";
//inputOculto.value = id;
//asigna a modal especifico
//$respuestaModal.appendChild(inputOculto);

let a = document.getElementById('numeroSolicitudR').value = numeroSolicitud;



$respuestaModal.appendChild(a);
}



//RESUMEN EVENTOS #####################################
document.addEventListener('DOMContentLoaded', () => {
        const tableBody = document.querySelector('#registros-table tbody');

        const loadData2 = () => {
        // Reemplaza esta URL con la URL de tu API
        const apiUrl = 'http://localhost:8080/eventos?size=2';
    
        // Solicitar datos usando Axios
        axios.get(apiUrl)
            .then(response => {
                // La respuesta contiene los datos en response.data
                const registros = response.data.content;
                console.log('Datos recibidos tabla:', response);

                // Limpiar el cuerpo de la tabla
                tableBody.innerHTML = '';
    
                // Crear filas para cada 
                
                registros.forEach(registro => {
                    //console.log(registro)
                    const row = document.createElement('table');
             
                    const tipoFormatted = registro.tipo
                    .toLowerCase()                  // Convierte todo el texto a minúsculas
                    .replace(/_/g, ' ')             // Reemplaza guiones bajos con espacios
                    .replace(/\b\w/g, letra => letra.toUpperCase()); // Convierte la primera letra de cada palabra a mayúscula

                       ;   
              // Determinar la cadena de invitados
 /*             const invitadosString = (registro.invitado && registro.invitado.trim())
             ? registro.invitado.replace(/[\[\]']+/g, '') // Elimina corchetes
             : "Depto. SSGG"; // Elimina corchetes y agrega texto si viene vacio;
*/
const invitadosString = (registro.invitado && registro.invitado.length > 2)
? registro.invitado.replace(/[\[\]']+/g, '') // Elimina corchetes
: "Depto. SSGG"; // Valor por defecto si está vacío o no definido




                   
    
                    row.innerHTML = `
                    
                    
                            <th class="th"> ${tipoFormatted}  |  ${registro.fecha} <th>
                            <tr> 
                                ${registro.descripcion}<br>
                                Recinto: ${registro.establecimiento}<br>
                                Invitados: ${invitadosString}
                            </td>
          
                    `;
    
                    tableBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    }

    loadData2();
});

//ULTIMA RESPUESTA###################################
document.addEventListener('DOMContentLoaded', () => {
    const ultimaRespuesta = document.getElementById('ultimaRespuesta');

    const loadDataUltimaRespuesta = () => {
        // Solicitar datos usando Axios y los ordena con desc y limita la seleccion a 1
        axios.get('http://localhost:8080/respuestas?size=1&sort=id,desc')
            .then(response => {
                // Asegúrate de que los datos son un objeto y contiene `content`
                const data = response.data.content;

                if (Array.isArray(data) && data.length > 0) {
                    // Limpiar el contenedor antes de mostrar nuevos datos
                    ultimaRespuesta.innerHTML = '';

                    // Mostrar el primer item (última respuesta)
                    const item = data[0];
                    ultimaRespuesta.innerHTML = `${item.numeroRespuesta}`;
                } else {
                    console.error('La propiedad `content` no es un array o está vacío.');
                    ultimaRespuesta.innerHTML = '<p>No se encontraron respuestas.</p>';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('No se pudo cargar los datos. Verifica la URL y la conexión a Internet.');
            });
    };

    loadDataUltimaRespuesta();
});











/*
//MOVIMIENTO DE SOLICITUDES PENDIENTES #########################################
document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('tableIngreso');

    const loadData = async () => {
        try {
            const solicitudesResponse = await axios.get('http://localhost:8080/movimientos/pendientes?size=10');
            const solicitudes = solicitudesResponse.data.content;

            if (Array.isArray(solicitudes)) {
                tableBody.innerHTML = ''; // Limpiar el cuerpo de la tabla
                let rows = ''; // Variable para acumular las filas

                // Iterar sobre cada solicitud
                solicitudes.forEach(item => {
                    const botonesOpciones = getBotonesOpciones(item);
                    const estadoFormatted = item.estado
                    .toLowerCase()                  // Convierte todo el texto a minúsculas
                    .replace(/_/g, ' ')             // Reemplaza guiones bajos con espacios
                    .replace(/\b\w/g, letra => letra.toUpperCase()); // Convierte la primera letra de cada palabra a mayúscula
                    const form1 = `<form id="form1"> 
                    <div class="mb-3">
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
                    <button type="submit" class="btn btn-primary">Guardar</button>
                </form>`;
                
                const form2 = `<form id="form2"> 
                    <div class="mb-3">
                        <!-- Aquí puedes agregar más campos si es necesario -->
                    </div>
                    <li> 
                        <div class="mb-3">
                            <input type="text" class="form-control" id="inputComentarioRechazar" aria-describedby="comentarioHelp" placeholder="Comentario"> 
                        </div>
                    </li>
                    <button type="submit" class="btn btn-warning">Rechazar</button> 
                </form>`;
                
                rows += `
                    <tr>
                        <th id="numeroSolicitud" scope="row">${item.solicitud}</th>
                        <td class="fila d-md-table-cell d-none">
                            <ul>
                                <p class="title">Solicitud</p>
                                <li>${item.emisor}</li> 
                                <li>${item.titulo}</li>  
                                <li>${item.fechaSolicitud}</li> 
                                <li>${estadoFormatted || 'No hay datos'}</li> 
                            </ul>
                        </td>
                        <td class="fila d-md-table-cell d-none">
                            <ul>
                                <p class="title">Asignado a:</p>
                                ${item.nombreUnidad ? `
                                    <li>${item.nombreUnidad}</li>
                                    <li>${'el ' + item.fechaAsignacion}</li>
                                    <li>${item.comentarioAsignacion}</li>
                                ` : `
                                    <li>
                                        ${item.rechazado ? `
                                            <p>${estadoFormatted}</p> 
                                            <li>${item.comentarioRechazado}</li>
                                        ` : `
                                            <button type="button" class="btn btn-primary" onclick="selectForm(1)">Asignar Unidad</button>
                                            <button type="button" class="btn btn-danger" onclick="selectForm(2)">Rechazar</button>
                                            <div id="formContainer${item.solicitud}"></div>
                                        `}
                                    </li>
                                `}
                            </ul>

                            </td>
                            <td class="fila d-md-table-cell d-none">
                                <ul>
                                <p class="title">salida</p>
                                ${item.rechazado ? `
                                    <li>${estadoFormatted}</li>
                                     ` : `
                                    <li>${item.certificado != null ? 'Certificado N° ' + item.certificado : 'Pendiente'}</li>
                                    <li>${item.fechaResuelto || ""}</li>  
                                    <li>${item.comentarioResuelto || ""}</li> 
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
                                        <li class="dropdown-item"><a class="dropdown-link" onclick="" data-bs-toggle="modal" data-bs-target="#">asignar unidad</a></li>
                                        <li class="dropdown-item"><a class="dropdown-link" onclick="" data-bs-toggle="modal" data-bs-target="#respuestaModal" >ingresar respuesta</a></li>
                                        <li class="dropdown-item"><a class="dropdown-link text-danger" onclick="captarParametros(${item.id}, ${item.numeroSolicitud}, 'rechazarModal', 'numeroRechazar')">rechazar</a></li>
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
    function selectForm(formNumber) {
        const formContainer = document.getElementById(`formContainer${item.solicitud}`);
        if (formNumber === 1) {
            formContainer.innerHTML = form1;
        } else if (formNumber === 2) {
            formContainer.innerHTML = form2;
        }
    }
    const getBotonesOpciones = (item) => {
        if (item.asignado == true && item.resuelto == true) {
            return `
                <div class="btn-group d-md-table-cell d-none">
                    <button class="btn btn-option btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"> Opciones </button>
                    <ul class="dropdown-menu">
                         <li class="dropdown-item"><a class="dropdown-link" onclick="" data-bs-toggle="modal" data-bs-target="#respuestaModal" >ingresar Memo</a></li>
                        <li class="dropdown-item"><a class="dropdown-link text-success" onclick="">ver archivos</a></li> 
                    </ul>
                </div>
            `;
        } else if (item.asignado == true) {
            return `
                <div class="btn-group d-md-table-cell d-none">
                    <button class="btn btn-option btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"> Opciones </button>
                    <ul class="dropdown-menu">
                        <li class="dropdown-item"><a class="dropdown-link" onclick="">ingresar Certificado</a></li>
                        <li class="dropdown-item"><a class="dropdown-link text-success" onclick="">ver archivos</a></li>
                    </ul>
                </div>
            `;
        } else {
            return `
                <div class="btn-group d-md-table-cell d-none">
                    <button class="btn btn-option btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"> Opciones </button>
                    <ul class="dropdown-menu">
                        <li class="dropdown-item"><a class="dropdown-link" onclick="">asignar Unidad</a></li>
                        <li class="dropdown-item"><a class="dropdown-link text-danger" onclick="captarParametros(${item.id}, ${item.numeroSolicitud}, 'rechazarModal', 'numeroRechazar')">rechazar</a></li>
                        <li class="dropdown-item"><a class="dropdown-link text-success" onclick="">ver archivos</a></li>     
                    </ul>
                </div>
            `;
        }
    };
 
    loadData();
});

*/

