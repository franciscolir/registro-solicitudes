document.getElementById('solicitudForm').addEventListener('submit', function(event) {
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
  
});


function enviarFormularioComoJson() {
    // Obtener el formulario
    const form = document.getElementById('solicitudForm');

    // Crear un objeto a partir de los datos del formulario
    const formData = {
        emisor: document.getElementById('emisor').value,
        numeroSolicitud: document.getElementById('numeroSolicitud').value,
        titulo: document.getElementById('titulo').value,
        descripcion: document.getElementById('descripcion').value,
        fechaSolicitud: document.getElementById('fechaSolicitud').value
    };

    // Enviar la solicitud POST con Axios
    axios.post('http://localhost:8080/solicitudes', formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(function (response) {
        // Manejar la respuesta exitosa
        console.log('Respuesta del servidor:', response.data);
        alert('Solicitud registrada exitosamente',mostrarDatosEnTabla(response.data));
        mostrarDatosEnTabla(response.data)
    })
    .catch(function (error) {
        // Manejar el error
        console.error('Error al registrar la solicitud:', error.response.data);
        alert('Hubo un error al registrar la solicitud');
    });
    document.getElementById('solicitudForm').removeAttribute;
}

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
    document.getElementById('solicitudForm').reset();
}

// cambiar funcion de archivo cuando se haga push dede equipo daem

document.addEventListener('DOMContentLoaded', function() {
    // Obtener la lista de emisores cuando el documento esté listo
    axios.get('http://localhost:8080/emisores')
        .then(function(response) {
            // Verifica que `response` y `response.data` están definidos
            if (response && response.data.content) {
                llenarSelectEmisores(response.data.content);
            } else {
                console.error('Respuesta inesperada del servidor:', response);
                alert('Hubo un problema con la respuesta del servidor.');
            }
        })
        .catch(function(error) {
            console.error('Error al obtener emisores:', error);
            alert('No se pudo obtener la lista de emisores. Intenta nuevamente.');
        });
});

function llenarSelectEmisores(emisores) {
    const select = document.getElementById('emisor');
    
    // Limpia las opciones existentes (excepto la primera opción de selección)
    select.innerHTML = '<option value="" disabled selected>Seleccione un emisor</option>';
    
    // Añade nuevas opciones
    emisores.forEach(emisor => {
        const option = document.createElement('option');
        option.value = emisor.id;  // o emisor.id si es el valor del emisor
        option.textContent = emisor.establecimiento;  // o emisor.nombre si es el nombre del emisor
        select.appendChild(option);
    });
}

