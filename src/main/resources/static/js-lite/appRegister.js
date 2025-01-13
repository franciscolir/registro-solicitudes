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

