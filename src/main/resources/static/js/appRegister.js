//let URL = 'http://localhost:8080';

// Función para cargar perfiles y unidades
function cargarSelects(URL) {
  // Cargar perfiles
  /*
  axios.get(`http://localhost:8080/usuarios/perfiles`)
  .then(response => {
    const perfilSelect = document.getElementById('perfil');
    if (Array.isArray(response.data.content)) {
      response.data.content.forEach(perfil => {
        const option = document.createElement('option');
        option.value = perfil.id;
        option.textContent = formatText(perfil.rol);
        perfilSelect.appendChild(option);
      });
    } else {
      console.error('response.data no es un array:', response.data);
    }
  })
  .catch(error => {
    console.error('Error al cargar perfiles:', error);
  });*/


  // Cargar unidades
  axios.get(`http://localhost:8080/unidades`)
    .then(response => {
      const unidadSelect = document.getElementById('unidad');
      if (Array.isArray(response.data.content)) {
      response.data.content.forEach(unidad => {
        const option = document.createElement('option');
        option.value = unidad.id;
        option.textContent = unidad.nombre;
        unidadSelect.appendChild(option);
      });
    } else {
      console.error('response.data no es un array:', response.data);
    }
    })
    .catch(error => {
      console.error('Error al cargar unidades:', error);
    });
}

// Función para validar el formulario
function validarFormulario() {
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    mostrarError('Las contraseñas no coinciden.');
    return false;
  }
  return true;
}

// Función para mostrar mensaje de error
function mostrarError(mensaje) {
  const errorMessage = document.getElementById('error-message');
  const errorText = document.getElementById('error-text');
  errorText.textContent = mensaje;
  errorMessage.classList.remove('d-none');
}

// Manejar envío del formulario
document.getElementById('registerForm').addEventListener('submit', function (event) {
  event.preventDefault();

  if (!validarFormulario()) {
    return;
  }

  const formData = {
    nombre: document.getElementById('name').value,
    correoElectronico: document.getElementById('email').value,
    contraseña: document.getElementById('password').value,
    //perfil: document.getElementById('perfil').value,
    unidad: document.getElementById('unidad').value,
    subrogante: document.getElementById('subrogante').checked,
    encargado: document.getElementById('encargado').checked,
    comentario: document.getElementById('comentario').value
  };

  axios.post(`http://localhost:8080/usuarios/registrar`, formData)
    .then(response => {
      alert('Registro exitoso!');
      // Redirigir o limpiar el formulario
    })
    .catch(error => {
      console.error('Error al registrar usuario:', error);
      mostrarError('Ocurrió un error al registrar el usuario. Intenta nuevamente.');
    });
});

// Cargar los selects al cargar la página
window.onload = function () {
  cargarSelects();
};
function formatText(text) {
  if (!text) return "";

  return text
    .toLowerCase() // Convierte todo a minúsculas
    .replace(/\[|\]/g, "") // Elimina todos los corchetes []
    .replace(/admin/g, "administrador") // Reemplaza "Admin" por "Administrador"
    .replace(/usuario/g, "funcionario") // Reemplaza "Usuario" por "Funcionario"
    .replace(/role/g, "") // Elimina todas las ocurrencias de "role"
    .replace(/_/g, " ") // Reemplaza los guiones bajos con espacios
    .replace(/\b\w/g, (letra) => letra.toUpperCase()); // Capitaliza la primera letra de cada palabra
}

