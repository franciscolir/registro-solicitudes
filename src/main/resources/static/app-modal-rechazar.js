
var idGlobal = captar;
/*
//SELECT de solicitudes pendientes

$('#rechazarModal').on('show.bs.modal', function (e) {
    axios.get('http://localhost:8080/solicitudes/pendientes')
        .then(function(response) {
        
            if (response && Array.isArray(response.data.content)) {
                llenarSelect(response.data.content);
            } else {
                console.error('Datos inesperados del servidor:', response.data);
                alert('Hubo un problema con los datos recibidos del servidor.');
            }
        })
        .catch(function(error) {
            console.error('Error al obtener solicitudes:', error);
            alert('No se pudo obtener la lista de solicitudes. Intenta nuevamente.');
        });
});

function llenarSelect(solicitudes) {
    const select = document.getElementById('numeroRechazar');
    select.innerHTML = '<option value="" disabled selected></option>';
    solicitudes.forEach(solicitud => {
        const option = document.createElement('option');
        option.value = solicitud.id;
        option.textContent = solicitud.numeroSolicitud;
        select.appendChild(option);
    });
}
*/

function enviarFormularioRechazar() {

    // Obtener datos del formulario
    const formData = {

        id: document.getElementById('inputId').value,
        comentario: document.getElementById('comentarioRechazar').value,
    };

    // Elemento de alerta
    const alertMessage = document.getElementById('alertMessageRechazar');

    // Enviar datos al servidor
    axios.put('http://localhost:8080/solicitudes/declinar', formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(function(response) {
        if (response.status === 200) {
        // Manejar la respuesta exitosa
        alertMessage.className = 'alert alert-success';
        alertMessage.textContent = 'Respuesta enviada exitosamente';
        alertMessage.style.display = 'block';

        // Ocultar el mensaje después de 2 segundos
        setTimeout(function() {
            alertMessage.style.display = 'none';
            $('#rechazarModal').modal('hide'); // Cerrar modal si existe
            window.location.reload();
        }, 1800)
    } else {
        console.error('Error:', response.status, response.statusText);
        // Handle non-200 status codes here
      }
    })
    .catch(function(error) {

        // Manejar el error
        let errorMessage = 'Hubo un error al enviar la solicitud. Intenta nuevamente.';
        
        if (error.response && error.response.status === 400 && error.response.data) {
            // Si hay un mensaje de error en la respuesta del servidor, usarlo
            errorMessage = `Error: ${error.response.data}`;

        }

        alertMessage.className = 'alert alert-danger';
        alertMessage.textContent = errorMessage;
        alertMessage.style.display = 'block';

        // Ocultar el mensaje después de 2 segundos
        setTimeout(function() {
            alertMessage.style.display = 'none';
        }, 3000);
    });
}

a();