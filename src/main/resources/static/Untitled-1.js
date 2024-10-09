document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('tableIngreso');

    const loadData = async () => {
        try {
            const solicitudesResponse = await axios.get('http://localhost:8080/solicitudes/pendientes?size=10');
            const solicitudes = solicitudesResponse.data.content;

            if (Array.isArray(solicitudes)) {
                tableBody.innerHTML = ''; // Limpiar el cuerpo de la tabla

                // Iterar sobre cada solicitud
                for (const item of solicitudes) {
                    // Hacer consulta individual para la columna 2
                    const consulta2Response = await axios.get(`http://localhost:8080/consulta2/${item.id}`); // Consulta para la columna 2
                    const consulta2 = consulta2Response.data; // Ajusta según la estructura de tu respuesta

                    const tableRow = `
                        <tr>
                            <th id="numeroSolicitud" scope="row">${item.numeroSolicitud}</th>
                            <td class="fila d-md-table-cell d-none">
                                <ul>
                                    <li>${item.emisor}</li> 
                                    <li>${item.titulo}</li>  
                                    <li>${item.fechaSolicitud}</li> 
                                </ul>
                                <div class="btn-group">
                                    <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"> Opciones </button>
                                    <ul class="dropdown-menu">
                                        <li class="dropdown-item"><a class="dropdown-link text-success" onclick="">ver</a></li>
                                        <li class="dropdown-item"><a class="dropdown-link" onclick="">asignar unidad</a></li>
                                        <li class="dropdown-item"><a class="dropdown-link text-danger" onclick="captarParametros(${item.id}, ${item.numeroSolicitud}, 'rechazarModal', 'numeroRechazar')">rechazar</a></li>
                                    </ul>
                                </div>
                            </td>
                            <td class="fila d-md-table-cell d-none">
                                ${consulta2 ? `
                                    <ul>
                                        <li>${consulta2.nombreUsuario || 'No hay datos'}</li> 
                                        <li>${consulta2.fechaAsignacion || 'No hay datos'}</li>  
                                        <li>${consulta2.comentarioAsignacion || 'No hay datos'}</li> 
                                        <li>${consulta2.estado || 'No hay datos'}</li> 
                                    </ul>
                                    <div class="btn-group">
                                        <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"> Opciones </button>
                                        <ul class="dropdown-menu">
                                            <li class="dropdown-item"><a class="dropdown-link text-success" onclick="">ver</a></li>
                                            <li class="dropdown-item"><a class="dropdown-link" onclick="">ingresar respuesta</a></li>
                                            <li class="dropdown-item"><a class="dropdown-link text-danger" onclick="captarParametros(${item.id}, ${item.numeroSolicitud}, 'rechazarModal', 'numeroRechazar')">rechazar</a></li>
                                        </ul>
                                    </div>
                                ` : '<div>No hay datos</div>'}
                            </td>
                            <td class="d-md-none">
                                <div>
                                    <strong>Emisor:</strong> ${item.emisor} <br>
                                    <strong>Título:</strong> ${item.titulo} <br>
                                    <strong>Fecha Solicitud:</strong> ${item.fechaSolicitud} <br>
                                    <strong>Nombre:</strong> ${consulta2 ? consulta2.nombreUsuario || 'No hay datos' : 'No hay datos'} <br>
                                    <strong>Estado:</strong> ${consulta2 ? consulta2.estado || 'No hay datos' : 'No hay datos'} <br>
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

                    tableBody.innerHTML += tableRow;
                }
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








//SOLICITUDES PENDIENTES #######################################################
document.addEventListener('DOMContentLoaded', () => {
    const accordionContainer = document.getElementById('accordionResumen');


   const loadData = () => {
        axios.get('http://localhost:8080/solicitudes/pendientes?size=10')  // Reemplaza con tu URL de API
            .then(response => {
                // Asegúrate de que los datos son un objeto y contiene `items`
                const data = response.data;
               // console.log('Datos recibidos:', data);

                // Accede al array `items` dentro del objeto
                const items = data.content;

                if (Array.isArray(items)) {
                    accordionContainer.innerHTML = '';

                    items.forEach((item, index) => {
                      
                        const accordionItem = `
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="heading${index}">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                                        ${item.titulo}  ---  ${item.fechaSolicitud}
                                    </button>
                                </h2>
                                <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#accordionResumen">    
                                    
                                    <div class="accordion-body">
                                            <div class="accordion-items">
                                                    - Numero de solicitud ${item.numeroSolicitud}<br>
                                                    - Emisor ${item.emisor} <br>
                                                    - Descripcion: ${item.descripcion} <br>
                                                    - Fecha Solicitud ${item.fechaSolicitud} <br>
                                            </div>
                                            <div class="accordion-buttoms">
                                                <div class = "buttom">
                                                    <button type="button" id="aceptar" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#respuestaModal" onclick="captarParametros(${item.id},${item.numeroSolicitud},'respuestaModal','numeroSolicitudR')">
                                                        Responder Solicitud
                                                    </button>

                                                </div>
                                                <div class = "buttom">
                                                    <button type="button" id="rechazar" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#rechazarModal" onclick="captarParametros(${item.id}, ${item.numeroSolicitud}, 'rechazarModal', 'numeroRechazar')">
                                                        Rechazar Solicitud
                                                    </button>

                                                </div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        `;

                        accordionContainer.innerHTML += accordionItem;
                    });
                } else {
                    console.error('La propiedad `items` no es un array.');
                }
                
            })
        
            .catch(error => {
                console.error('Error:', error);
                alert('No se pudo cargar los datos. Verifica la URL y la conexión a Internet.');
            });
        }
    
        loadData();

});
