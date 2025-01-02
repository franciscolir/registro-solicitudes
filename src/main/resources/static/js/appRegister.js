function cargarSelects() {
  const url = "http://localhost:8080/unidades";

  axios.get(url)
    .then(response => {
      const unidadSelect = document.getElementById('unidad');
      if (response.data && Array.isArray(response.data.content)) {
        unidadSelect.innerHTML = '<option value="">Seleccionar Unidad</option>';
        response.data.content.forEach(unidad => {
          const option = document.createElement('option');
          option.value = unidad.id;
          option.textContent = unidad.nombre;
          unidadSelect.appendChild(option);
        });
      } else {
        console.error('La respuesta no contiene un array de unidades válido:', response.data);
      }
    })
    .catch(error => {
      console.error('Error al cargar las unidades:', error);
    });
}

// Ejecutamos la función cargarSelects cuando se cargue la página
document.addEventListener('DOMContentLoaded', function() {
  cargarSelects();
});

/*
// Llamada al servidor y manejo de la respuesta
document.getElementById('registerForm').onsubmit = function (event) {
  event.preventDefault(); // Evitar envío del formulario tradicional

  // Obtener los datos del formulario
  const formData = new FormData(this);

  // Enviar los datos del formulario al servidor usando axios
  axios.post('/registrar', formData)
    .then(response => {
      // Si el registro es exitoso (código 200)
      if (response.status === 200) {
        document.getElementById('success-text').innerText = 'Registro exitoso!';
        document.getElementById('success-message').classList.remove('d-none');
        document.getElementById('error-message').classList.add('d-none');
      }
    })
    .catch(error => {
      // Manejo de error según el código de estado
      let errorMessage = 'Error desconocido';
      
      // Si el error tiene una respuesta
      if (error.response) {
        // Cualquier código de estado que no sea 200 se considera error
        if (error.response.status !== 200) {
          errorMessage = `Error ${error.response.status}: ${error.response.data.message || 'Registro fallido'}`;
        }
      } else if (error.request) {
        // Si no hay respuesta del servidor
        errorMessage = 'No se pudo contactar con el servidor.';
      } else {
        errorMessage = `Error en la solicitud: ${error.message}`;
      }

      // Mostrar mensaje de error
      document.getElementById('error-text').innerText = errorMessage;
      document.getElementById('error-message').classList.remove('d-none');
      document.getElementById('success-message').classList.add('d-none');
    });
};*/