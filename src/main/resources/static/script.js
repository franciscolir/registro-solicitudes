/*document.getElementById('uploadForm').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const files = document.getElementById('filesInput').files;
    const maxSize = 2 * 1024 * 1024; // Tamaño máximo de archivo en bytes (2 MB)
    const allowedExtensions = /\.(jpg|jpeg|png|pdf|doc|docx)$/i;
  
    if (files.length === 0) {
      document.getElementById('message').textContent = 'Por favor selecciona al menos un archivo.';
      return;
    }
  
    // Verificar cada archivo por tamaño y extensión
    for (let file of files) {
      if (!allowedExtensions.test(file.name)) {
        document.getElementById('message').textContent = `El archivo ${file.name} tiene un tipo no permitido.`;
        return;
      }
      if (file.size > maxSize) {
        document.getElementById('message').textContent = `El archivo ${file.name} supera el límite de 2 MB.`;
        return;
      }
    }
  
    const formData = new FormData();
    for (let file of files) {
      formData.append('files', file);
    }
  
    try {
      const response = await fetch("http://localhost:8080/archivos/up", {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
  
      if (response.ok) {
        document.getElementById('message').textContent = `Archivos subidos exitosamente: ${result.filenames.join(', ')}`;
      } else {
        document.getElementById('message').textContent = result.message || 'Error al subir los archivos.';
      }
    } catch (error) {
      document.getElementById('message').textContent = 'Error al conectar con el servidor.';
    }
  });
  */
  document.getElementById('fileForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Evitar que el formulario se envíe de manera tradicional

    // Crear un objeto FormData
    const formData = new FormData();

    // Obtener los valores de los inputs
    const id = document.getElementById('id').value;
    const archivoA = document.getElementById('archivoA').files[0];  // Obtener el primer archivo
    const archivoB = document.getElementById('archivoB').files[0];  // Obtener el segundo archivo
    const archivoC = document.getElementById('archivoC').files[0];  // Obtener el tercer archivo

    // Agregar los archivos y el id al objeto FormData
    formData.append('id', id);
    formData.append('archivoA', archivoA);
    formData.append('archivoB', archivoB);
    formData.append('archivoC', archivoC);

    // Enviar la solicitud con Axios
    axios.post('/ruta/del/servidor', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(response => {
        console.log('Respuesta del servidor:', response.data);
        alert('Archivos enviados correctamente');
    })
    .catch(error => {
        console.error('Error al enviar los archivos:', error);
        alert('Ocurrió un error al enviar los archivos');
    });
});
