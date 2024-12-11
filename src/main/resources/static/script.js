/*
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
*/

/*
async function enviarFormulario2(form, endpoint, formularioDiv ) {
  // Crear un objeto para almacenar los datos del formulario
  const formData = new FormData(form);
  const formJson = {};

  // Recopilar los datos del formulario en un objeto
  formData.forEach((value, key) => {
    formJson[key] = value;
  });

 
    documentoTipo = endpoint;  // Almacenar el value de "id"
    console.log("tipo capturado:", documentoTipo);  // Opcional, solo para depuración
  

  // Verificar si el campo de invitados es múltiple
  const invitadosField = form.querySelector('select[name="invitados"]');
  if (invitadosField) {
    // Convertir los valores seleccionados a un array de enteros
    const invitados = Array.from(invitadosField.selectedOptions)
      .map(option => parseInt(option.value, 10)) // Convertimos cada opción seleccionada a número
      .filter(value => !isNaN(value)); // Filtrar valores no numéricos

    // Asignamos el array de invitados al objeto formJson
    formJson.invitados = invitados;
  }

  // Mostrar el objeto formJson en la consola para depuración
  console.log("FormJson:", formJson);

  // Elemento de alerta
  const alertMessage = document.getElementById('mensaje');

  try {
    // Enviar los datos como JSON utilizando axios
    const response = await axios.post(`http://localhost:8080/${endpoint}`, formJson, {
      headers: {
        'Content-Type': 'application/json' // Indicamos que estamos enviando JSON
      }
    });

    // Manejo de la respuesta exitosa
    if (response.status === 200) {
      
      alertMessage.className = 'alert alert-success';
      alertMessage.textContent = 'Documento enviado exitosamente';
      alertMessage.style.display = 'block';




// Supongamos que response es el objeto JSON recibido
if (typeof response === 'object' && response !== null) {
  const responseDiv = document.getElementById('responseDiv');
  const form = document.getElementById('formulario-contenido');
  // Limpiar cualquier contenido previo del div
  responseDiv.innerHTML = ''; 
  
  // Si 'data' existe en la respuesta, asignar los datos
  const item = response.data || response;

  // Crear el contenido que se agregará al div
  let content = '<table class="table table-striped">';
  
  // Iniciar la tabla
  content += `<thead>
                  <tr>
                    <th>
                    <h1 class = > 
                        ${
                            endpoint === "certificados" ? `<strong>Certificado registrado: </strong>` : 
                            endpoint === "respuestas" ? `<strong>Respuesta registrada: </strong>`:
                            endpoint === "solicitudes" ? `<strong>Solicitud registrada: </strong>`:
                            `<strong>Evento registrado : </strong>`
                        }
                    </h1>
                    </th>
                  </tr>
              </thead>
              <tbody class="table-group-divider">
  `;
  
  // Recorrer las propiedades del objeto y agregarlas a la tabla
  for (let key in item) {
      if (item.hasOwnProperty(key)) {
          let value = item[key];
          
          // Eliminar corchetes en caso de que el valor sea una lista o cadena con corchetes
          if (typeof value === 'string') {
              value = value.replace(/\[|\]/g, '');  // Eliminar los corchetes
          }
          
          // Almacenar el valor de "id" en la variable documentoId
      // Almacenar el valor de "id" en la variable documentoId
      if (key === "id") {
        documentoId = value;  // Almacenar el value de "id"
        console.log("ID capturado:", documentoId);  // Opcional, solo para depuración
      }
          // Añadir una fila por cada clave-valor
          // formatea campo invitado y elimina valor de id
          content += `
          
                <tr>
                  <td>
                      ${
                        key === "invitado" ? `<strong>Invitados: </strong>${value}` :
                        key === "numeroSolicitud" ? `<strong>Solicitud N° </strong>${value}` :
                        key === "numeroCertificado" ? `<strong>Certificado N° </strong>${value}` :
                        key === "numeroRespuesta" ? `<strong>Respuesta N° </strong>${value}` :
                        key === "id" ? "" :value
                      }
                  </td>
                </tr>
                  `;
      }
  }
  //agregar form de imagenes
  content +=  ` <tr>
                  <td>
                    <div class="container__uploadForm">
                      <h2>Guardar respaldo diguital</h2>
                      <p>Subir imagen de documentos</p>
                      <form id="uploadForm">
                        <input type="file" id="filesInput" name="files" multiple accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"> <br>
                        <button type="submit" class="btn btn-outline-success ms-auto">Subir Archivos</button>
                      </form>
                      <div id="message"></div>
                    </div>
                  </td>
                </tr>
                   `;*//*

  content += `
                <tr>
                  <td>
                    <h2>Guardar respaldo diguital</h2>
                    <button type="" class="btn btn-primary ms-auto" onclick= enviarFormularioArchivo();>Subir Archivos</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button type="close" class="btn btn-secondary ms-auto" onclick= resetView(); loadData();>Cerrar</button>
                  </td>
                </tr>
                
                `;
  // Cerrar la tabla
  content += '</tbody> </table>';
      
  // Agregar el contenido al div
  setTimeout(() => {
    alertMessage.style.display = 'none';
    //resetView();  // Ocultar formulario y volver al inicio
    document.getElementById("tableSection").classList.add("d-none");
    //document.getElementById("mainContent").classList.add("d-none");
    //document.getElementById("responseDiv").style.display ="block";
    formularioDiv.remove();
    responseDiv.innerHTML = content;
    //loadData();   // Recargar solo la tabla
  }, 1800);
  ;
} else {
  console.error("Response is not a valid object");
}

setTimeout(() => {
  alertMessage.style.display = 'none';
  //resetView();  // Ocultar formulario y volver al inicio
  //document.getElementById("tableSection").classList.add("d-none");
  document.getElementById("formularioContainer").classList.add("d-none");
  document.getElementById("responseDiv").classList.add("d-none");
  //loadData();   // Recargar solo la tabla
}, 1800);

    } else {
      console.error('Error:', response.status, response.statusText);
    }
    return response
  } catch (error) {
    console.error("Error al enviar el formulario:", error);
    let errorMessage = 'Hubo un error al enviar el formulario. Intenta nuevamente.';

    // Si el servidor responde con un error 400, mostrar el mensaje de error
    if (error.response && error.response.status === 400 && error.response.data) {
      errorMessage = `Error: ${error.response.data}`;
    }

    alertMessage.className = 'alert alert-danger';
    alertMessage.textContent = errorMessage;
    alertMessage.style.display = 'block';

    setTimeout(() => {
      alertMessage.style.display = 'none';
    }, 3000);
    return error
  }
}

*/