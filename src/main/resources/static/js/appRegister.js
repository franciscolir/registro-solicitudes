
  // Cargar los datos para los selects desde el backend al cargar la página
  document.addEventListener("DOMContentLoaded", function() {
    // Cargar perfiles
    axios.get('/usuarios/perfiles') // Endpoint en el backend que devuelve los perfiles
      .then(function (response) {
        const perfilSelect = document.getElementById('perfil');
        response.data.forEach(function(perfil) {
          const option = document.createElement('option');
          option.value = perfil.id;
          option.textContent = perfil.nombre;
          perfilSelect.appendChild(option);
        });
      })
      .catch(function (error) {
        console.error('Error al cargar los perfiles:', error);
        document.getElementById('error-message').classList.remove('d-none');
        document.getElementById('error-text').textContent = 'Error al cargar los perfiles.';
      });

    // Cargar unidades
    axios.get('/unidades') // Endpoint en el backend que devuelve las unidades
      .then(function (response) {
        const unidadSelect = document.getElementById('unidad');
        response.data.forEach(function(unidad) {
          const option = document.createElement('option');
          option.value = unidad.id;
          option.textContent = unidad.nombre;
          unidadSelect.appendChild(option);
        });
      })
      .catch(function (error) {
        console.error('Error al cargar las unidades:', error);
        document.getElementById('error-message').classList.remove('d-none');
        document.getElementById('error-text').textContent = 'Error al cargar las unidades.';
      });
  });