//SELECT de solicitudes pendientes

$('#respuestaModal').on('show.bs.modal', function (e) {
    axios.get('http://localhost:8080/solicitudes/pendientes')
        .then(function(response) {
        
            if (response && Array.isArray(response.data.content)) {
                llenarSelectSolicitudes(response.data.content);
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

function llenarSelectSolicitudes(solicitudes) {
    const select = document.getElementById('numeroSolicitudR');
    select.innerHTML = '<option value="" disabled selected></option>';
    solicitudes.forEach(solicitud => {
        const option = document.createElement('option');
        option.value = solicitud.id;
        option.textContent = solicitud.numeroSolicitud;
        select.appendChild(option);
    });
}

//SELECT de usuarios

$('#respuestaModal').on('show.bs.modal', function (e) {
    axios.get('http://localhost:8080/usuarios')
        .then(function(response) {
            if (response && Array.isArray(response.data.content)) {
                llenarSelectInvitados(response.data.content);
           
            } else {
                console.error('Datos inesperados del servidor:', response.data);
                alert('Hubo un problema con los datos-usuario recibidos del servidor.');
            }
        })
        .catch(function(error) {
            console.error('Error al obtener usuarios:', error);
            alert('No se pudo obtener la lista de usuarios. Intenta nuevamente.');
        });
});

function llenarSelectInvitados(usuarios) {
    const select = document.getElementById('funcionario');
    select.innerHTML = '<option value="" disabled selected></option>';
    usuarios.forEach(usuario => {
     
        const option = document.createElement('option');
        option.value = usuario.id;
        option.textContent = usuario.nombre;
        select.appendChild(option);
    });
}

function enviarFormularioRespuesta() {
    // Obtener datos del formulario
    const formData = {

        solicitudId: document.getElementById('numeroSolicitudR').value,
        numeroRespuesta: document.getElementById('numeroRespuesta').value,
        usuario: document.getElementById('funcionario').value,
        titulo: document.getElementById('tituloRespuesta').value,
        descripcion: document.getElementById('descripcionRespuesta').value,
        comentario: document.getElementById('comentarioRespuesta').value,
        fechaRespuesta: document.getElementById('fechaRespuesta').value
    };

    // Elemento de alerta
    const alertMessage = document.getElementById('alertMessageRespuesta');

    // Enviar datos al servidor
    axios.post('http://localhost:8080/respuestas', formData, {
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
            $('#respuestaModal').modal('hide'); // Cerrar modal si existe
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

