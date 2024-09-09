

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