//SELECT de tipos de eventos

$('#eventModal').on('show.bs.modal', function (e) {
    axios.get('http://localhost:8080/tipo')
        .then(function(response) {
            if (response && Array.isArray(response.data)) {
                llenarSelectTipos(response.data);
            } else {
                console.error('Datos inesperados del servidor:', response.data);
                alert('Hubo un problema con los datos tipos recibidos del servidor.');
            }
        })
        .catch(function(error) {
            console.error('Error al obtener tipos:', error);
            alert('No se pudo obtener la lista de tipos. Intenta nuevamente.');
        });
});

function llenarSelectTipos(tipos) {
    const select = document.getElementById('tipo');
    select.innerHTML = '<option value="" disabled selected>Seleccione un tipo de evento</option>';
    tipos.forEach(tipo => {

        const tipoFormatted = tipo.tipoEvento
        .toLowerCase()                  // Convierte todo el texto a minúsculas
        .replace(/_/g, ' ')             // Reemplaza guiones bajos con espacios
        .replace(/^(.)/, (match, p1) => p1.toUpperCase()); // Convierte la primera letra a mayúscula

        const option = document.createElement('option');
        option.value = tipo.tipoEvento; // Usa `tipo.tipoEvento` para el valor del option
        option.textContent = tipoFormatted; // Usa `tipo.tipoEvento` para el texto del option
        select.appendChild(option);
    });
}

//SELECT de establecimientos

$('#eventModal').on('show.bs.modal', function (e) {
    axios.get('http://localhost:8080/emisores')
        .then(function(response) {
            if (response && Array.isArray(response.data.content)) {
                llenarSelectEstablecimiento(response.data.content);
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

function  llenarSelectEstablecimiento(emisores) {
    const select = document.getElementById('establecimiento');
    select.innerHTML = '<option value="" disabled selected>Seleccione un establecimiento </option>';
    emisores.forEach(emisor => {
        const option = document.createElement('option');
        option.value = emisor.id;
        option.textContent = emisor.establecimiento;
        select.appendChild(option);
    });
}

//SELECT de usuarios

$('#eventModal').on('show.bs.modal', function (e) {
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
    const select = document.getElementById('invitados');
    select.innerHTML = '<option value="" disabled selected>Seleccione un invitado(s)</option>';
    usuarios.forEach(usuario => {
     
        const option = document.createElement('option');
        option.value = usuario.id;
        option.textContent = usuario.nombre;
        select.appendChild(option);
    });
}


//Enviar formulario GET


function enviarFormularioEvent() {

      // Obtener los valores seleccionados en el select
      const select = document.getElementById('invitados');
      const selectedOptions = Array.from(select.selectedOptions);

    // Convertir los valores a números y asegurarse de que sea un array
      const selectedValues = selectedOptions.map(option => parseInt(option.value, 10));

      const valuesArray = Object.values(selectedValues);

   // Crear objeto de datos para enviar
   const formData = {
    tipo: document.getElementById('tipo').value,
   descripcion : document.getElementById('descripcionEvent').value,
    fecha: document.getElementById('fecha').value,
    establecimiento: document.getElementById('establecimiento').value,
    invitados: valuesArray
    };

    // Elemento de alerta
    const alertMessage = document.getElementById('eventAlertMessage');

    // Enviar datos al servidor
    axios.post('http://localhost:8080/eventos', formData, {
        headers: {
            'Content-Type': 'application/json'
        }
        
    })
     
    .then(function(response) {
        if (response.status === 200) {
        // Manejar la respuesta exitosa
        alertMessage.className = 'alert alert-success';
        alertMessage.textContent = 'Solicitud enviada exitosamente';
        alertMessage.style.display = 'block';

        // Ocultar el mensaje después de 2 segundos
        setTimeout(function() {
            alertMessage.style.display = 'none';
            $('#eventModal').modal('hide'); // Cerrar modal si existe
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
        alertMessage.textContent = 'Hubo un error al enviar la solicitud. Intenta nuevamente.';
        alertMessage.style.display = 'block';

        // Ocultar el mensaje después de 2 segundos
        setTimeout(function() {
            alertMessage.style.display = 'none';
        }, 2000);
    });
}