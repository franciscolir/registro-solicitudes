//VALORES POR API #####################################
document.addEventListener('DOMContentLoaded', () => {
    const valorContainer = document.querySelector('#valores');
    const fecha = new Date();
    const day = String(fecha.getDate()).padStart(2, '0');
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const year = fecha.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    const loadData = () => {
        // Reemplaza esta URL con la URL de tu API
        const apiUrl = `https://mindicador.cl/api/utm/${formattedDate}`;

        // Solicitar datos usando Axios
        axios.get(apiUrl)
            .then(response => {
                const registros = response.data.serie;
                console.log('Datos recibidos:', response);

                // Limpiar el contenido previo
                valorContainer.innerHTML = '';

                // Mostrar solo el último registro
                if (registros.length > 0) {
                    const valor = registros[registros.length - 1].valor; // Obtiene el último valor
                    valorContainer.innerHTML = `$${valor}`;
                } else {
                    valorContainer.innerHTML = 'No hay datos disponibles';
                }
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
                valorContainer.innerHTML = 'Error al cargar datos';
            });
    }

    loadData();
});


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

