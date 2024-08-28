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