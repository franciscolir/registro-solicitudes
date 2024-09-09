//VALORES POR API #####################################
document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#valores');
    const fechaDiv = document.getElementById('fecha');
    const fecha = fechaDiv.textContent || fechaDiv.innerText;

    const loadData9 = () => {
    // Reemplaza esta URL con la URL de tu API
    
    const apiUrl = `https://mindicador.cl/api/utm/${fecha}`;


    // Solicitar datos usando Axios
    axios.get(apiUrl)
   
        .then(response => {
            // La respuesta contiene los datos en response.data
            const nombre = response.data.codigo
            const registros = response.data.serie;
            console.log('Datos recibidos tabla:', response);
         
            // Limpiar el cuerpo de la tabla
            tableBody.innerHTML = '';

            // Crear filas para cada 
            
            registros.forEach(registro => {
                console.log(registro)
                const row = document.createElement('table');

                row.innerHTML = `

                        <th>
                        INDICADOR | valor 
                        </th>
                        <tr> 
                        ${nombre}
                        </tr>
                            <th>
                        ${registro.valor}
                        </tr>
                `;

                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
        // Solicitar datos usando Axios
}

loadData9();
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
let inputOculto =  document.createElement("input");
inputOculto.type = "hidden";
inputOculto.id = "inputId";
inputOculto.value = id;

//asigna a modal especifico
$respuestaModal.appendChild(inputOculto);

}

//SOLICITUDES PENDIENTES #######################################################
document.addEventListener('DOMContentLoaded', () => {
    const accordionContainer = document.getElementById('accordionExample');


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
                                <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#accordionExample">    
                                    
                                    <div class="accordion-body">
                                            <div class="accordion-items">
                                                    - Numero de solicitud ${item.numeroSolicitud}<br>
                                                    - Emisor ${item.emisor} <br>
                                                    - Descripcion: ${item.descripcion} <br>
                                                    - Fecha Solicitud ${item.fechaSolicitud} <br>
                                            </div>
                                            <div class="accordion-buttoms">
                                                <div class = "buttom">
                                                    <button type="button" id="aceptar" class="btn btn-primary" data-toggle="modal" data-target="#respuestaModal" onclick="captarParametros(${item.id},${item.numeroSolicitud},'respuestaModal','numeroSolicitudR')">
                                                        Aceptar
                                                    </button>

                                                </div>
                                                <div class = "buttom">
                                                    <button type="button" id="rechazar" class="btn btn-danger" data-toggle="modal" data-target="#rechazarModal" onclick="captarParametros(${item.id},${item.numeroSolicitud},'rechazarModal','numeroRechazar')">
                                                        Rechazar
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
        const apiUrl = 'http://localhost:8080/eventos?size=4';
    
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
                    console.log(registro)
                    const row = document.createElement('table');
             
                    const tipoFormatted = registro.tipo
                        .toLowerCase()                  // Convierte todo el texto a minúsculas
                        .replace(/_/g, ' ')             // Reemplaza guiones bajos con espacios
                        //.replace(/^(.)/, (match, p1) => p1.toUpperCase()); // Convierte la primera letra a mayúscula
                        .replace(/\b\w/g, letra => letra.toUpperCase());


                    const invitadosString = registro.invitado.replace(/[\[\]']+/g, ''); // Elimina corchetes
    
                    row.innerHTML = `
                    
                    
                            <th>
                            ${tipoFormatted}  |  ${registro.fecha}
                            <th>
                            <tr> 
                            ${registro.descripcion}<br>
                            Recinto: ${registro.establecimiento}<br>
                            Invitados: ${invitadosString}
                            </tr>
          
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
    const accordionContainer = document.getElementById('accordionUltimaRespuesta');
    const loadData = () => {
  
    // Solicitar datos usando Axios y los ordena con desc y limita la selecion a 1
    axios.get('http://localhost:8080/respuestas?size=1&sort=id,desc')
        .then(response => {
            // La respuesta contiene los datos en response.data

                // Asegúrate de que los datos son un objeto y contiene `items`
                const data = response.data;
               console.log('Datos recibidos ultimo memo:', data.content);

                // Accede al array `items` dentro del objeto
                const items = data.content;

                if (Array.isArray(items)) {
                    accordionContainer.innerHTML = '';

                    items.forEach((item, index) => {
                      
                        const accordionItem = `
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="heading${index}">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseA${index}" aria-expanded="true" aria-controls="collapse${index}">
                                        ${item.numeroRespuesta} 
                                    </button>
                                </h2>
                                <div id="collapseA${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#accordionUltimaRespuesta">    
                                    
                                    <div class="accordion-body">
                                            <div class="accordion-items">
                                                    - ${item.titulo}<br>
                                                    - Fecha ${item.fechaRespuesta} <br>
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

//CALENDAR##############################################

const obtenerFechaHoy = () => {
    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, '0');
    const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Mes es 0-11
    const anio = hoy.getFullYear();
    return `${dia}-${mes}-${anio}`;
};
document.getElementById('fecha').textContent = obtenerFechaHoy();








//TABLA SOLICITUDES#########################################
document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#solicitudes-table tbody');

    const loadData3 = () => {
    // Reemplaza esta URL con la URL de tu API
    const apiUrl = 'http://localhost:8080/solicitudes?size=10';

    // Solicitar datos usando Axios
    axios.get(apiUrl)
        .then(response => {
            // La respuesta contiene los datos en response.data
            const registros = response.data.content;
            console.log('Datos recibidos tabla:', response);

            // Limpiar el cuerpo de la tabla
            tableBody.innerHTML = '';

            // Crear filas para cada registro
            registros.forEach(registro => {
                const estadoFormatted = registro.estado
                .toLowerCase()                  // Convierte todo el texto a minúsculas
                .replace(/_/g, ' ')             // Reemplaza guiones bajos con espacios
                //.replace(/^(.)/, (match, p1) => p1.toUpperCase()); // Convierte la primera letra a mayúscula
                .replace(/\b\w/g, letra => letra.toUpperCase());

                console.log(registro)
                const row = document.createElement('tr');

                row.innerHTML = `
                
                    <td>${registro.numeroSolicitud}</td>
                   
                    <td>${registro.emisor}</td>
                    <td>${registro.titulo}</td>
                    <td>${registro.descripcion}</td>
                    <td>${registro.fechaSolicitud}</td>
                    <td>${registro.fechaIngresoDepartamento}</td>
                    <td>${estadoFormatted}</td>
                `;

                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
}

loadData3();
});

// TABLA EVENTOS#########################################
document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#eventos-table tbody');

    const loadData5 = () => {
    // Reemplaza esta URL con la URL de tu API
    const apiUrl = 'http://localhost:8080/eventos?size=10';

    // Solicitar datos usando Axios
    axios.get(apiUrl)
        .then(response => {
            // La respuesta contiene los datos en response.data
            const registros = response.data.content;
            console.log('Datos recibidos tabla:', response);

            // Limpiar el cuerpo de la tabla
            tableBody.innerHTML = '';

            // Crear filas para cada registro
            registros.forEach(registro => {

                const tipoFormatted = registro.tipo
                .toLowerCase()                  // Convierte todo el texto a minúsculas
                .replace(/_/g, ' ')             // Reemplaza guiones bajos con espacios
                //.replace(/^(.)/, (match, p1) => p1.toUpperCase()); // Convierte la primera letra a mayúscula
                .replace(/\b\w/g, letra => letra.toUpperCase());


            const invitadosString = registro.invitado.replace(/[\[\]']+/g, ''); // Elimina corchetes

                console.log(registro)
                const row = document.createElement('tr');

                row.innerHTML = `
                
                            <td>${tipoFormatted}</td>
                            <td>${registro.establecimiento}</td>
                            <td>${registro.descripcion}</td>
                            <td>${registro.fecha}</td>
                            <td>${invitadosString}</td>
                `;

                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
}

loadData5();
});



