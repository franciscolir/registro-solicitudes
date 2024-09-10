
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




function enviarFormulario() {
    // Obtener datos del formulario
    const formData = {
        emisor: document.getElementById('emisor').value,
        numeroSolicitud: document.getElementById('numeroSolicitud').value,
        titulo: document.getElementById('titulo').value,
        descripcion: document.getElementById('descripcion').value,
        fechaSolicitud: document.getElementById('fechaSolicitud').value
    };

    // Elemento de alerta
    const alertMessage = document.getElementById('alertMessage');

    // Enviar datos al servidor
    axios.post('http://localhost:8080/solicitudes', formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(function(response) {
        // Manejar la respuesta exitosa
        alertMessage.className = 'alert alert-success';
        alertMessage.textContent = 'Solicitud enviada exitosamente';
        alertMessage.style.display = 'block';

 

        // Ocultar el mensaje después de 2 segundos
        setTimeout(function() {
            alertMessage.style.display = 'none';
            $('#myModal').modal('hide'); // Cerrar modal si existe
            window.location.reload();
        }, 1800)
    })
    .catch(function(error) {
        // Manejar el error
        alertMessage.className = 'alert alert-danger';
        alertMessage.textContent = 'Hubo un error al enviar la solicitud. Intenta nuevamente.';
        alertMessage.style.display = 'block';

        // Ocultar el mensaje después de 2 segundos
        setTimeout(function() {
            alertMessage.style.display = 'none';
        }, 2000);
    });
}