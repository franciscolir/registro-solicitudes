$('#searchModal').on('show.bs.modal', function (e) {
    axios.get('http://localhost:8080/emisores')
        .then(response => {
            if (response.data && Array.isArray(response.data.content)) {
                llenarSelectEmisoresBuscador(response.data.content);
            } else {
                alert('Hubo un problema con los datos recibidos del servidor.');
            }
        })
        .catch(() => {
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
    const numeroSolicitud = document.getElementById('numberInput').value.trim();
    const emisor = document.getElementById('emisorSelect').value;

    if (!numeroSolicitud || !emisor) {
        mostrarError('Por favor, complete todos los campos requeridos.');
        return;
    }

    axios.get(`http://localhost:8080/solicitudes/${numeroSolicitud}/${emisor}`)
        .then(response => {
            const data = response.data;
            const estado = data.estado;

                // Formatear la fecha de ingreso
        const fechaIngresoFormateada = formatFecha(data.fechaIngreso);

            let modalContent = `
                
                <p><strong>Número de Solicitud:</strong> ${data.numeroSolicitud}</p>
                <p><strong>Fecha de Ingreso:</strong> ${fechaIngresoFormateada}</p>
                <p><strong>Emisor:</strong> ${data.emisor}</p>
                <p><strong>Título:</strong> ${data.titulo}</p>
                <p><strong>Descripción:</strong> ${data.descripcion}</p>
                <p><strong>Fecha de Solicitud:</strong> ${data.fechaSolicitud}</p>
                <p><strong>Estado:</strong> ${estado}</p>
            `;

            document.getElementById('modalContentOficio').innerHTML = modalContent;
            $('#infoModal').modal('show');
            $('#searchModal').modal('hide'); // Cerrar el modal de búsqueda
        
/*
            // Verificar el estado y agregar información adicional si es necesario
            if (estado === "RESUELTO") {
                return axios.get(`http://localhost:8080/respuestas/respuesta/${numeroSolicitud}/${emisor}`)
                    .then(response2 => {
                        const data2 = response2.data;
                        modalContent += `
                            <p><strong>Número de Respuesta:</strong> ${data2.numeroRespuesta}</p>
                            <p><strong>Fecha de Respuesta:</strong> ${data2.fechaRespuesta}</p>
                        `;
                        document.getElementById('modalContentOficio').innerHTML = modalContent;
                        $('#infoModal').modal('show');
                        $('#searchModal').modal('hide'); // Cerrar el modal de búsqueda
                    });
            }  else if (estado === "CERRADO") {
                return axios.get(`http://localhost:8080/respuestas/respuesta/${numeroSolicitud}/${emisor}`)
                    .then(response2 => {
                        const data2 = response2.data;
                        modalContent += `
                            <p><strong>Número de Respuesta:</strong> ${data2.numeroRespuesta}</p>
                            <p><strong>Fecha de Respuesta:</strong> ${data2.fechaRespuesta}</p>
                        `;
                        document.getElementById('modalContentOficio').innerHTML = modalContent;
                        $('#infoModal').modal('show');
                        $('#searchModal').modal('hide'); // Cerrar el modal de búsqueda
                    });
            } else if (estado === "RECHAZADO") {
                return axios.get(`http://localhost:8080/respuestas/respuesta/${numeroSolicitud}/${emisor}`)
                    .then(response2 => {
                        const data2 = response2.data;
                        modalContent += `
                            <p><strong>Número de Respuesta:</strong> ${data2.numeroRespuesta}</p>
                            <p><strong>Fecha de Respuesta:</strong> ${data2.fechaRespuesta}</p>
                        `;
                        document.getElementById('modalContentOficio').innerHTML = modalContent;
                        $('#infoModal').modal('show');
                        $('#searchModal').modal('hide'); // Cerrar el modal de búsqueda
                    });
            }else {
                // Si no se cumple la condición, mostrar el modal con la información básica
                document.getElementById('modalContentOficio').innerHTML = modalContent;
                $('#infoModal').modal('show');
                $('#searchModal').modal('hide'); // Cerrar el modal de búsqueda
            }*/
        })
        .catch(() => {
            mostrarError('No se encuentra el registro.');
        });
}

function mostrarError(mensaje) {
    const alertMessage = document.getElementById('alertMessageSearch');
    alertMessage.className = 'alert alert-danger';
    alertMessage.textContent = mensaje;
    alertMessage.style.display = 'block';

    setTimeout(() => {
        alertMessage.style.display = 'none';
    }, 2000);
}


// Función para formatear la fecha en formato dd/mm/yyyy
function formatFecha(fecha) {
    const date = new Date(fecha);
    const day = String(date.getDate()).padStart(2, '0');  // Asegura que el día sea de 2 dígitos
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Mes (getMonth() devuelve el mes entre 0 y 11)
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
