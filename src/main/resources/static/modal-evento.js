/*
const url = 'http://localhost:8080'



document.addEventListener('DOMContentLoaded', function() {
    // Cargar opciones para el campo "tipo"
    axios.get(url+'/eventos')
        .then(response => response.json())
        .then(data => {
            const tipoSelect = document.getElementById('tipo');
            data.forEach(tipo => {
                const option = document.createElement('option');
                option.value = tipo.id;
                option.textContent = tipo.nombre;
                tipoSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error:', error));
    // Cargar opciones para el campo "establecimiento"
    
    axios.get(url+'/emisores')
        .then(response => response.json())
        .then(data => {
            const establecimientoSelect = document.getElementById('establecimiento');
            data.forEach(establecimiento => {
                const option = document.createElement('option');
                option.value = establecimiento.id;
                option.textContent = establecimiento.nombre;
                establecimientoSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error:', error));

    // Cargar opciones para el campo "invitados"
    fetch(url+'/usuarios')
        .then(response => response.json())
        .then(data => {
            const invitadosSelect = document.getElementById('invitados');
            data.forEach(usuario => {
                const option = document.createElement('option');
                option.value = usuario.id;
                option.textContent = usuario.nombre;
                invitadosSelect.appendChild(option);
            });
        });
});

function registrarEvento() {
    const eventoData = {
        tipo: document.getElementById('tipo').value,
        descripcion: document.getElementById('descripcion').value,
        fecha: document.getElementById('fecha').value,
        establecimiento: document.getElementById('establecimiento').value
    };

    // Elemento de alerta
    const alertMessage = document.getElementById('eventAlertMessage');

    // Enviar el evento al servidor
    axios.post(url+'/eventos', eventoData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(function(response) {
        const eventoId = response.data.id; // Extraer el ID del evento registrado
        const invitados = Array.from(document.getElementById('invitados').selectedOptions).map(option => option.value);

            })
        
    .then(function(data) {
        alertMessage.className = 'alert alert-success';
        alertMessage.textContent = 'Evento registrado exitosamente';
        alertMessage.style.display = 'block';

        // Ocultar el mensaje después de 2 segundos
        setTimeout(function() {
            alertMessage.style.display = 'none';
            $('#eventModal').modal('hide'); // Cerrar modal
            document.getElementById('eventForm').reset(); // Limpiar formulario
        }, 2000);
    })
    .catch(function(error) {
        alertMessage.className = 'alert alert-danger';
        alertMessage.textContent = 'Hubo un error al registrar el evento. Intenta nuevamente.';
        alertMessage.style.display = 'block';

        // Ocultar el mensaje después de 2 segundos
        setTimeout(function() {
            alertMessage.style.display = 'none';
        }, 2000);
    });
}*/



$('#eventModal').on('show.bs.modal', function (e) {
    axios.get('http://localhost:8080/emisores')
        .then(function(response) {
            if (response && Array.isArray(response.data.content)) {
                const elementoById = "establecimiento";
                const descripcionSelect = " recinto";
                llenarSelect(response.data.content,elementoById,descripcionSelect);
            } else {
                console.error('Datos inesperados del servidor:', response.data);
                alert('Hubo un problema con los datos recibidos del servidor.');
            }
        })
        .catch(function(error) {
            console.error('Error al obtener emisores:', error);
            alert('No se pudo obtener la lista de emisores. Intenta nuevamente.');
        });
        axios.get('http://localhost:8080/tipo')
        .then(function(response) {
            if (response && Array.isArray(response.data.content)) {
                const elementoById = "tipo";
                const descripcionSelect = " tipo de evento";
                llenarSelect(response.data.content,elementoById,descripcionSelect);
               
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

function llenarSelect(dato, elementoById, descripcionSelect) {
    const select = document.getElementById(elementoById);
    select.innerHTML = `<option value="" disabled selected>Seleccione un ${descripcionSelect} </option>`;
    emisores.forEach(dato => {
        const option = document.createElement('option');
        option.value = dato.id;
        option.textContent = dato.establecimiento;
        select.appendChild(option);
    });
}


