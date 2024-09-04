


/*
>>>>>>> 0720322b545361af44f13d49e8a3a8b119e42044
document.getElementById('myForm').addEventListener('submit', function(event) {
    let valid = true;

    // Limpiar mensajes de error
    document.querySelectorAll('.error-message').forEach(function(el) {
        el.textContent = '';
    });

    // Validación de Emisor
    
    const emisor = document.getElementById('emisor').value;
    if (!emisor) {
        document.getElementById('emisorError').textContent = 'Emisor es obligatorio';
        valid = false;
    }

    // Validación de Número de Solicitud
    const numeroSolicitud = document.getElementById('numeroSolicitud').value;
    if (!numeroSolicitud) {
        document.getElementById('numeroSolicitudError').textContent = 'Número de solicitud es obligatorio';
        valid = false;
    }

    // Validación de Título
    const titulo = document.getElementById('titulo').value;
    if (!titulo.trim()) {
        document.getElementById('tituloError').textContent = 'Título es obligatorio';
        valid = false;
    }

    // Validación de Fecha de Ingreso
    const fechaSolicitud = document.getElementById('fechaSolicitud').value;
    const fechaPattern = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    if (!fechaSolicitud) {
        document.getElementById('fechaSolicitudError').textContent = 'Fecha de ingreso es obligatoria';
        valid = false;
    } else if (!fechaPattern.test(fechaSolicitud)) {
        document.getElementById('fechaSolicitudError').textContent = 'Formato fecha no valido. Ejemplo \'YYYY-MM-DD\'';
        valid = false;
    }

    // Si no es válido, prevenir el envío del formulario
    if (!valid) {
        event.preventDefault();
    }
  
});*/





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

        // Mostrar los datos en la tabla
        mostrarDatosEnTabla(response.data);

        // Ocultar el mensaje después de 2 segundos
        setTimeout(function() {
            alertMessage.style.display = 'none';
            $('#myModal').modal('hide'); // Cerrar modal si existe
            document.getElementById('myForm').reset(); // Limpiar formulario
        }, 2000);
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

// Función para mostrar los datos en la tabla
function mostrarDatosEnTabla(datos) {
    const tbody = document.querySelector('#datosTable tbody');
    tbody.innerHTML = '';

    // Define el orden de los campos
    const campos = [
        { nombre: 'Emisor', valor: datos.emisor },
        { nombre: 'Número de Solicitud', valor: datos.numeroSolicitud },
        { nombre: 'Título', valor: datos.titulo },
        { nombre: 'Descripción', valor: datos.descripcion },
        { nombre: 'Fecha de Ingreso', valor: datos.fechaSolicitud }
    ];

    // Añade cada campo como una fila en la tabla
    campos.forEach(campo => {
        const fila = document.createElement('tr');
        
        const celdaNombre = document.createElement('td');
        celdaNombre.textContent = campo.nombre;
        fila.appendChild(celdaNombre);

        const celdaValor = document.createElement('td');
        celdaValor.textContent = campo.valor || 'No definido';
        fila.appendChild(celdaValor);

        tbody.appendChild(fila);
    });
}
