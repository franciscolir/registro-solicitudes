
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














document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('tableIngreso');

    const loadData = async () => {
        try {
            const solicitudesResponse = await axios.get('http://localhost:8080/solicitudes/pendientes?size=10');
            const solicitudes = solicitudesResponse.data.content;

            if (Array.isArray(solicitudes)) {
                tableBody.innerHTML = ''; // Limpiar el cuerpo de la tabla
                let rows = ''; // Variable para acumular las filas

                // Iterar sobre cada solicitud
                for (const item of solicitudes) {
                    let consulta2;
                    let consulta3;

                    try {
                        // Hacer consulta individual para la columna 2
                        const consulta2Response = await axios.get(`http://localhost:8080/movimientos/asignado/${item.id}`);
                        consulta2 = consulta2Response.data;

                        // Solo realizar la segunda llamada si consulta2.resuelto es true
                      
                        if (consulta2.resuelto === true) {
                            const consulta3Response = await axios.get(`http://localhost:8080/movimientos/resuelto/${item.id}`); // Cambia esto al endpoint correcto
                            consulta3 = consulta3Response.data;
                        }

                    } catch (consultaError) {
                        console.error('Error al obtener datos de movimientos:', consultaError);
                        consulta2 = null; // Manejo de error: asignar null si no se puede obtener
                        consulta3 = null; // Manejo de error para la tercera consulta
                    }

                    rows += `
                        <tr>
                            <th id="numeroSolicitud" scope="row">
                            ${item.numeroSolicitud}
                          
                            </th>
                           
                            <td class="fila d-md-table-cell d-none">
                                <ul>
                                    <li>${item.emisor}</li> 
                                    <li>${item.titulo}</li>  
                                    <li>${item.fechaSolicitud}</li> 
                                </ul>

                            </td>

                            <td class="fila d-md-table-cell d-none">
                                ${consulta2 ? `
                                    <ul>
                                        <li>${consulta2.nombreUsuario || 'No hay datos'}</li> 
                                        <li>${consulta2.fechaAsignacion || 'No hay datos'}</li>  
                                        <li>${consulta2.comentarioAsignacion || 'No hay datos'}</li> 
                                        <li>${consulta2.estado || 'No hay datos'}</li> 
                                    </ul>
                                   
                                ` : '<div>No hay datos</div>'}
                            </td>
                            <td class="fila d-md-table-cell d-none">
                            ${consulta3 ? `
                                    <ul>
                                        <li>${consulta3.certificado || 'No hay datos'}</li> 
                                        <li>${consulta3.fechaResuelto || 'No hay datos'}</li>  
                                        <li>${consulta3.comentarioResuelto || 'No hay datos'}</li> 
                                    </ul>
                        
                                ` : '<div>No hay datos</div>'

                            }</td> <!-- Nueva columna para datos del tercer endpoint -->
                                    
                            <td>
                                <div class="btn-group d-md-table-cell d-none">
                                    <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"> Opciones </button>
                                     <ul class="dropdown-menu">
                                        <li class="dropdown-item"><a class="dropdown-link text-success" onclick="">ver</a></li>
                                        <li class="dropdown-item"><a class="dropdown-link" onclick="">ingresar respuesta</a></li>
                                        <li class="dropdown-item"><a class="dropdown-link text-danger" onclick="captarParametros(${item.id}, ${item.numeroSolicitud}, 'rechazarModal', 'numeroRechazar')">rechazar</a></li>
                                    </ul>
                                </div>
                            </td> <!-- Nueva columna para datos del tercer endpoint -->
                            <td class="d-md-none">
                                <div>
                                    <strong>Emisor:</strong> ${item.emisor} <br>
                                    <strong>Título:</strong> ${item.titulo} <br>
                                    <strong>Fecha Solicitud:</strong> ${item.fechaSolicitud} <br>
                                    <strong>Asignado a:</strong> ${consulta2 ? consulta2.nombreUsuario || 'No hay datos' : 'No hay datos'} <br>
                                    <strong>Estado:</strong> ${consulta2 ? consulta2.estado || 'No hay datos' : 'No hay datos'} <br>
                                     <strong>N° Certificado:</strong> ${consulta3 ? consulta3.certificado  || 'No hay datos' : 'No hay datos'} <br>
                                    <strong>Fecha Certificado:</strong> ${consulta3 ? consulta3.fechaResuelto || 'No hay datos' : 'No hay datos'} <br>


                                </div>
                                <div class="btn-group">
                                    <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"> Opciones </button>
                                    <ul class="dropdown-menu">
                                        <li class="dropdown-item"><a class="dropdown-link text-success" onclick="">ver</a></li>
                                        <li class="dropdown-item"><a class="dropdown-link" onclick="">asignar unidad</a></li>
                                        <li class="dropdown-item"><a class="dropdown-link" onclick="">ingresar respuesta</a></li>
                                        <li class="dropdown-item"><a class="dropdown-link text-danger" onclick="captarParametros(${item.id}, ${item.numeroSolicitud}, 'rechazarModal', 'numeroRechazar')">rechazar</a></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    `;
                }

                // Asignar todas las filas acumuladas a la tabla
                tableBody.innerHTML = rows;
            } else {
                console.error('La propiedad `solicitudes` no es un array.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('No se pudo cargar los datos. Verifica la URL y la conexión a Internet.');
        }
    }

    loadData();
});
