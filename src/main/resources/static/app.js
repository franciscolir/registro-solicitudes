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

document.getElementById('fetchButton2').addEventListener('click', function() {
    fetch('http://localhost:8080/solicitudes') // Cambia la URL si tu backend está en otro lugar
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