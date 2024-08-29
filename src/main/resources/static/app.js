/*
document.getElementById('fetchButton').addEventListener('click', function() {
    fetch('http://localhost:8080/respuestas') // Cambia la URL si tu backend está en otro lugar
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => {

             // Convertir el objeto JSON a una cadena JSON formateada
             const jsonFormatted = JSON.stringify(data, null, 2);
             document.getElementById('result').textContent = jsonFormatted;
        })
        .catch(error => {
            document.getElementById('result').innerHTML = `<p>Error: ${error.message}</p>`;
        });
});
*/

var urlRespuestas = 'respuestas';
var urlSolicitudes = 'solicitudes';
  var url ='http://localhost:8080/';  


document.getElementById('fetchButton1').addEventListener('click', function() { getButtom ( url + urlRespuestas)});
document.getElementById('fetchButton2').addEventListener('click', function() { getButtom(url+urlSolicitudes)});




function getButtom (url) {
    axios.get(url) // Cambia la URL si tu backend está en otro lugar
    .then(response => {
        const data = response.data.content; // Extraer el array 'content'
        const tableHtml = buildTable(data);
        document.getElementById('result').innerHTML = tableHtml;
    })
    .catch(error => {
        document.getElementById('result').innerHTML = `Error: ${error.message}`;
    });

}

document.addEventListener('DOMContentLoaded', () => {
    const loadDataButton = document.getElementById('loadData');
    const accordionContainer = document.getElementById('accordionExample');

    loadDataButton.addEventListener('click', () => {
        axios.get('http://localhost:8080/solicitudes')  // Reemplaza con tu URL de API
            .then(response => {
                // Asegúrate de que los datos son un objeto y contiene `items`
                const data = response.data;
                console.log('Datos recibidos:', data);

                // Accede al array `items` dentro del objeto
                const items = data.content;

                if (Array.isArray(items)) {
                    accordionContainer.innerHTML = '';

                    items.forEach((item, index) => {
                        const accordionItem = `
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="heading${index}">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                                        ${item.titulo}
                                    </button>
                                </h2>
                                <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        - id ${item.id} <br>
                                        - numero de solicitud ${item.numeroSolicitud}
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
    });
});









function buildTable(data) {
            if (!Array.isArray(data) || data.length === 0) {
                return '<p>No hay datos para mostrar.</p>';
            }
        
            // Crear la tabla HTML
            let table = '<table><thead><tr>';
        
            // Crear encabezados de la tabla basados en las claves del primer objeto
            const headers = Object.keys(data[0]);
            headers.forEach(header => {
                table += `<th>${capitalizeFirstLetter(header)}</th>`;
            });
        
            table += '</tr></thead><tbody>';
        
            // Crear filas de la tabla basadas en los objetos del array
            data.forEach(item => {
                table += '<tr>';
                headers.forEach(header => {
                    table += `<td>${item[header]}</td>`;
                });
                table += '</tr>';
            });
        
            table += '</tbody></table>';
            return table;
        }
        
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }