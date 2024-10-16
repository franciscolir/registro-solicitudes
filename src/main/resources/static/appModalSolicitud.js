
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



/*
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
}*/

// Función para mostrar alertas
// Función para mostrar alertas
function mostrarAlerta(mensaje, tipo) {
    const alertMessage = document.getElementById('alertMessage');
    alertMessage.className = `alert alert-${tipo}`;
    alertMessage.textContent = mensaje;
    alertMessage.style.display = 'block';

    // Ocultar el mensaje después de un tiempo
    setTimeout(() => {
        alertMessage.style.display = 'none';
        $('#myModal').modal('hide'); // Cerrar modal si existe
        window.location.reload();
    }, 1800);
}

// Función para obtener datos del formulario original
function obtenerDatosFormulario() {
    return {
        providenciaId: document.getElementById('providencia').value,
        emisor: document.getElementById('emisor').value,
        numeroSolicitud: document.getElementById('numeroSolicitudForm').value,
        titulo: document.getElementById('titulo').value,
        descripcion: document.getElementById('descripcion').value,
        fechaSolicitud: document.getElementById('fechaSolicitud').value
    };
}

// Función para obtener datos adicionales para el segundo endpoint
function obtenerDatosParaMovimiento() {
    return {
        solicitud: document.getElementById('numeroSolicitudForm').value,
        emisor: document.getElementById('emisor').value,
        // Agrega más campos según sea necesario
    };
}

// Función para enviar datos a un endpoint
function enviarFormulario(endpoint, formData) {
    return axios.post(`http://localhost:8080/${endpoint}`, formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
// Función para enviar la solicitud y luego el movimiento
async function enviarFormularios() {
    const datosFormulario = obtenerDatosFormulario();
    const datosAdicionales = obtenerDatosParaMovimiento();

    try {
        // Enviar la solicitud y esperar su respuesta
        await enviarFormulario('solicitudes', datosFormulario);
        mostrarAlerta('Solicitud enviada exitosamente', 'success');

        // Esperar un poco (opcional) antes de enviar el movimiento
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1 segundo de espera

        // Enviar el movimiento
        await enviarFormulario('movimientos', datosAdicionales);
        mostrarAlerta('Movimiento enviado exitosamente', 'success');
    } catch (error) {
        // Manejar el error
        mostrarAlerta('Hubo un error al enviar las solicitudes. Intenta nuevamente.', 'danger');
    }
}
