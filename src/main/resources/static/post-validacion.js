

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
