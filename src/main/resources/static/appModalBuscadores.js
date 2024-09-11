$('#searchModal').on('show.bs.modal', function (e) {
    
    axios.get('http://localhost:8080/emisores')
        .then(function(response) {
            console.log('Respuesta del servidor:', response.data);
            if (response && Array.isArray(response.data.content)) {
                llenarSelectEmisoresBuscador(response.data.content);
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

function llenarSelectEmisoresBuscador(emisores) {
    const select = document.getElementById('emisorSelect');
    select.innerHTML = '<option value="" disabled selected>Seleccione un emisor</option>';
    emisores.forEach(emisor => {
        const option = document.createElement('option');
        option.value = emisor.id;
        option.textContent = emisor.establecimiento;
        select.appendChild(option);
    });
}




function enviarFormularioBuscador() {
    // Obtener datos del formulario

        const numeroSolicitud = document.getElementById('numberInput').value;
        const emisor = document.getElementById('emisorSelect').value;

    // Elemento de alerta
    const alertMessage = document.getElementById('alertMessage');

    // Enviar datos al servidor
    axios.get(`http://localhost:8080/solicitudes/${numeroSolicitud}/${emisor}`)

    .then(function(response) {
        console.log(response.data,"entra a funcion formulairio")
        // Manejar la respuesta exitosa

        const data = response.data;

        if (data.estado == "RESUELTO" || "DECLINADO") {
            axios.get(`http://localhost:8080/respuestas/${numeroSolicitud}/${emisor}`)


        }
        // Formatear el contenido del modal
        const modalContent = `
            <p><strong>Número de Solicitud:</strong> ${data.numeroSolicitud}</p>
            <p><strong>Emisor:</strong> ${data.emisor}</p>
            <p><strong>Título:</strong> ${data.titulo}</p>
            <p><strong>Descripción:</strong> ${data.descripcion}</p>
            <p><strong>Fecha de Solicitud:</strong> ${data.fechaSolicitud}</p>
            <p><strong>Fecha de Ingreso:</strong> ${data.fechaIngresoDepartamento}</p>
            <p><strong>Estado:</strong> ${data.estado}</p>
        `;

        // Insertar el contenido en el modal
        document.getElementById('modalContent').innerHTML = modalContent;

     
        // Ocultar el mensaje después de 2 segundos
        setTimeout(function() {
            alertMessage.style.display = 'none';
        }, 3000)

          // Mostrar el modal
          $('#infoModal').modal('show');
    })
    .catch(function(error) {
        console.error('Error al obtener la información del oficio:', error);
        // Manejar el error
        const alertMessage = document.getElementById('alertMessage');
        alertMessage.className = 'alert alert-danger';
        alertMessage.textContent = 'No encuentra el registro.';
        alertMessage.style.display = 'block';

        // Ocultar el mensaje después de 2 segundos
        setTimeout(function() {
            alertMessage.style.display = 'none';
        }, 2000);
    });
}