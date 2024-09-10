$('#BuscadorModal').on('show.bs.modal', function (e) {
    axios.get('http://localhost:8080/emisores')
        .then(function(response) {
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
    const select = document.getElementById('emisor');
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
    axios.post(`http://localhost:8080/solicitudes/${numeroOficio}?emisorId=${emisorId}`)
    .then(function(response) {
        // Manejar la respuesta exitosa
        alertMessage.className = 'alert alert-success';
        alertMessage.textContent = 'Solicitud enviada exitosamente';
        alertMessage.style.display = 'block';

 

        // Ocultar el mensaje después de 2 segundos
        setTimeout(function() {
            alertMessage.style.display = 'none';
            $('#BuscadorModal').modal('hide'); // Cerrar modal si existe
            
        }, 100)
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



/*
document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los modales y al formulario
    const searchModal = new bootstrap.Modal(document.getElementById('searchModal'));
    const infoModal = new bootstrap.Modal(document.getElementById('infoModal'));
    const searchForm = document.getElementById('searchForm');

    // Cargar emisores cuando se abre el modal de búsqueda
    document.getElementById('searchModal').addEventListener('show.bs.modal', () => {
        axios.get('http://localhost:8080/emisores') // Ajusta la URL según tu backend
            .then(response => {


                const emisores = response.data.content; // Suponiendo que la respuesta es un array de emisores
                const emisorSelect = document.getElementById('emisorSelect');

                emisorSelect.innerHTML = ''; // Limpiar opciones anteriores

                emisores.forEach(emisor => {
                    const option = document.createElement('option');
                    option.value = emisor.id; // Ajusta según cómo lleguen los emisores
                    option.textContent = emisor.establecimiento; // Ajusta según cómo lleguen los emisores
                    emisorSelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error fetching emisores:', error);
                alert('Error al cargar los emisores.');
            });
    });

    // Manejo del formulario de búsqueda
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const numeroOficio = document.getElementById('numberInput').value;
        const emisorId = document.getElementById('emisorSelect').value;

        if (!numeroOficio || !emisorId) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        // Realizar la solicitud GET al backend con el número de oficio y el emisor
        axios.get(`http://localhost:8080/solicitudes/${numeroOficio}?emisorId=${emisorId}`)
            .then(response => {
                // Obtener la información del response
                const data = response.data;

                // Formatear el contenido del modal
                const modalContent = `
                    <p><strong>Número de Solicitud:</strong> ${data.numeroSolicitud}</p>
                    <p><strong>Emisor:</strong> ${data.emisor}</p>
                    <p><strong>Título:</strong> ${data.titulo}</p>
                    <p><strong>Descripción:</strong> ${data.descripcion}</p>
                    <p><strong>Fecha de Solicitud:</strong> ${data.fechaSolicitud}</p>
                    <p><strong>Fecha de Ingreso:</strong> ${data.fechaIngresoDepartamento}</p>
                    <p><strong>Estado:</strong> ${data.es}</p>
                `;

                // Insertar el contenido en el modal
                document.getElementById('modalContent').innerHTML = modalContent;

                // Ocultar el primer modal y mostrar el segundo modal
                searchModal.hide();
                infoModal.show();
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                document.getElementById('modalContent').innerHTML = 'Error al cargar la información.';

                // Ocultar el primer modal y mostrar el segundo modal con error
                searchModal.hide();
                infoModal.show();
            });
    });
});
tado*/