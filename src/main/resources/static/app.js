

var urlRespuestas = 'respuestas';
var urlSolicitudes = 'solicitudes';
  var url ='http://localhost:8080/';  


function getButtom (url) {
    axios.get('http://localhost:8080/eventos') // Cambia la URL si tu backend está en otro lugar
    .then(response => {
        const data = response.data.content; // Extraer el array 'content'
        const tableHtml = buildTable(data);
        document.getElementById('result').innerHTML = tableHtml;
    })
    .catch(error => {
        document.getElementById('result').innerHTML = `Error: ${error.message}`;
    });

}


//SOLICITUDES PENDIENTES
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
                                                    - Id ${item.id} <br>
                                                    - Numero de solicitud ${item.numeroSolicitud}<br>
                                                    - Emisor ${item.emisor} <br>
                                                    - Descripcion: ${item.descripcion} <br>
                                                    - Fecha Solicitud ${item.fechaSolicitud} <br>
                                            </div>
                                            <div class="accordion-buttoms">
                                                <div class = "buttom">
                                                    <button type="button" class = "buttom" id="aceptarButton">
                                                        Aceptar
                                                    </button>
                                                </div>
                                                <div class = "buttom">
                                                    <button type="button" class = "buttom" id="declinarButton">
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

//RESUMEN EVENTOS
document.addEventListener('DOMContentLoaded', () => {
        const tableBody = document.querySelector('#registros-table tbody');
    
        const loadData2 = () => {
        // Reemplaza esta URL con la URL de tu API
        const apiUrl = 'http://localhost:8080/eventos?size=3';
    
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
                    console.log(registro)
                    const row = document.createElement('table');
                    const tipoFormatted = registro.tipo
                        .toLowerCase()                  // Convierte todo el texto a minúsculas
                        .replace(/_/g, ' ')             // Reemplaza guiones bajos con espacios
                        .replace(/^(.)/, (match, p1) => p1.toUpperCase()); // Convierte la primera letra a mayúscula

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
                console.log(registro)
                const row = document.createElement('tr');

                row.innerHTML = `
                
                    <td>${registro.numeroSolicitud}</td>
                   
                    <td>${registro.emisor}</td>
                    <td>${registro.titulo}</td>
                    <td>${registro.descripcion}</td>
                    <td>${registro.fechaSolicitud}</td>
                    <td>${registro.fechaIngresoDepartamento}</td>
                    <td>${registro.estado}</td>
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


document.addEventListener('DOMContentLoaded', () => {
    const divMemo = document.querySelector('#ultimo-memo');
     const divMemoInfo = document.querySelector('#ultimo-memo-info');
     const espaccio = "<br>";

    const loadData4 = () => {
    // Reemplaza esta URL con la URL de tu API
    const apiUrl = 'http://localhost:8080/respuestas?size=1';

    // Solicitar datos usando Axios
    axios.get(apiUrl)
        .then(response => {
            // La respuesta contiene los datos en response.data
            const registros = response.data.content;
            console.log('Datos recibidos memo:', response); espaccio

            
            divMemo.innerHTML = registros[0].numeroRespuesta; 
            
            divMemoInfo.innerHTML = registros[0].fechaRespuesta  +  registros[0].titulo;
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
}

loadData4();
});

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
                console.log(registro)
                const row = document.createElement('tr');

                row.innerHTML = `
                
                            <td>${registro.tipo}</td>
                            <td>${registro.establecimiento}</td>
                            <td>${registro.descripcion}</td>
                            <td>${registro.fecha}</td>
                            <td>${registro.invitado}</td>
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

$('#myModal').on('show.bs.modal', function (e) {
    axios.get('http://localhost:8080/emisores')
        .then(function(response) {
            if (response && Array.isArray(response.data.content)) {
                llenarSelectEmisores(response.data.content);
            } else {
                console.error('Datos inesperados del servidor:', response.data);
                alert('Hubo un problema con los datos recibidos del servidor.');
            }
        })
        .catch(function(error) {
            console.error('Error al obtener emisores:', error);
            alert('No se pudo obtener la lista de emisores. Intenta nuevamente.');
        });
});

function llenarSelectEmisores(emisores) {
    const select = document.getElementById('emisor');
    select.innerHTML = '<option value="" disabled selected>Seleccione un emisor</option>';
    emisores.forEach(emisor => {
        const option = document.createElement('option');
        option.value = emisor.id;
        option.textContent = emisor.establecimiento;
        select.appendChild(option);
    });
}



