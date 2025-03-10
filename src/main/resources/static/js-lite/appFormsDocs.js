let ultimoNumeroRespuesta3;
let documentoTipo;
let documentoId;

let pass;
console.log ("token en declaracion de pass" + pass)

function getFormConfig(formType) {

  
  const commonFormatRow = (field) =>  `
  <div class="mb-3" ${field.hidden ? 'style="display:none;"' : ""}>
      ${
          field.name === "unidad"
              ? `
              ${
                  field.value
                      ? `
                      <input type="hidden" id="${field.name}" name="${field.name}" value="${field.value}">
                      `
                      : ''
              }
              `
                   : field.type === "select"
                   ? `
            <label for="${field.name}" class="form-label">${field.label}</label>
        
            <select id="${field.name}" name="${field.name}" class="form-control" ${field.required ? "required" : ""} ${field.name === "invitados" ? "multiple" : ""}>
             
                <option value="" disabled selected>
              
                      ${field.name === "categoria" ? "Seleccionar" : field.name === "invitados" ? "Seleccione uno o mas invitados" : "Seleccionar"} 
   
                </option>
                ${field.options.map(option =>
                      `<option value="${option.id}">
                          ${option.nombre || option.establecimiento || formatText(option.categoria)}
                      </option>`
                  ).join("")}
            </select>
            `
                   : field.name === "nombreUnidad"
                   ? ` <span class="form-control-plaintext">${field.value || ""}</span>
        `
                   : field.name === "numeroRespuesta"
                   ? ` <label class="form-label">Número de Respuesta</label>
                   <span class="form-control-plaintext">${field.value || ""}</span>
                   <input type="hidden" id="${field.name}" name="${field.name}" value="${field.value}">
                    
                `
                  
                   
                  : field.name === "providenciaId"
                  ? ` 
                    <label class="form-label">Número de Providencia</label>
                    <input type="text" class="form-control" id="${field.name}" name="${field.name}" value="${field.value || ""}" />
                  `
                  
                
                   : field.type === "textarea"
                   ? `
                    <label for="${field.name}" class="form-label">${field.label}</label>
                    <textarea id="${field.name}" name="${
                       field.name
                     }" class="form-control" ${
                       field.required ? "required" : ""
                     }></textarea>
        `
                   : `
            <label for="${field.name}" class="form-label">${field.label}</label>
            <input type="${field.type}" id="${field.name}" name="${
                       field.name
                     }" class="form-control" value="${field.value || ""}" ${
                       field.required ? "required" : ""
                     }>
        `
               }
    </div>
`;

  const forms = {
        solicitud: {
      url: "solicitudes",
      title: "Ingresar Solicitud",
      formatRow: commonFormatRow,
      buttonHtml: `<button type="submit" class="btn btn-primary me-3">Enviar</button>`,
      fields: [
        { label: "",type: "number", name: "providenciaId",  required: true, },
        { label: "Emisor:", type: "select", name: "emisor", required: true,options: [],}, // Opciones se llenarán dinámicamente
        { label: "Número de Solicitud:",  type: "number", name: "numeroSolicitud", required: true,},
        { label: "Título:",  type: "text",  name: "titulo",  required: true },
        { label: "Descripción:",type: "textarea", name: "descripcion", required: false, },
        { label: "Fecha de Solicitud:",  type: "date",  name: "fechaSolicitud",required: true, },
      ],
    },
    
    evento: {
      url: "eventos",
      title: "Ingresar Evento",
      formatRow: commonFormatRow,
      buttonHtml: `<button type="submit" class="btn btn-primary me-3">Enviar</button>`,
      fields: [
        { label: "Tipo:", type: "select",   name: "categoria",   required: true,  options: [],  }, // Se llenará dinámicamente
        { label: "Descripción:",type: "text", name: "descripcion", required: true, },
        { label: "Fecha y Hora:",type: "datetime-local",  name: "fecha", required: true, },
        { label: "Establecimiento:",type: "select", name: "establecimiento", required: true, options: [], }, // Se llenará dinámicamente
        { label: "Invitados:",type: "select", name: "invitados", required: false, multiple: true, options: [], }, // Se llenará dinámicamente
      ],
    },
    respuesta: {
      url: "respuestas",
      title: "Ingresar Respuesta",
      formatRow: commonFormatRow,
      buttonHtml: `<button type="submit" class="btn btn-primary me-3">Enviar</button>`,
      fields: [
        //{ label: "", type: "number", name: "numeroRespuesta", required: true },
        { label: "Funcionario:",type: "select", name: "usuario", required: true,  options: [],},
        { label: "Título:", type: "text", name: "titulo", required: true },
        { label: "Descripción:", type: "textarea", name: "descripcion", required: true, },
        { label: "", type: "number", name: "movimiento",  required: true, hidden: true,value: "", }, // Mantener oculto
        { label: "Comentario interno:", type: "textarea", name: "comentario", required: false,},
      ],
    },
  };


  return forms[formType] || null;
}

async function crearFormulario( formType, unidad = "",nombreUnidad = "", movimiento = "", respuesta = "", certificado = "") {
    
 
  cerrarFormularioExistente(); // Cerrar el formulario anterior, si existe
  
  document.getElementById("mainContent").classList.add("d-none");

  const formConfig = await getFormConfig(formType);
  if (!formConfig) return;

  const formularioDiv = document.createElement("div");
  formularioDiv.className = "formulario-oculto";

  // Asignar valores a los campos
  const unidadField = formConfig.fields.find(
    (field) => field.name === "unidad"
  );
  const nombreUnidadField = formConfig.fields.find(
    (field) => field.name === "nombreUnidad"
  );
  const movimientoField = formConfig.fields.find(
    (field) => field.name === "movimiento"
  );
  const respuestaField = formConfig.fields.find(
    (field) => field.name === "numeroRespuesta"
  );



  //if (unidadField) unidadField.value = unidad;
  if (unidadField) unidadField.value = Number(unidad);
  if (nombreUnidadField) nombreUnidadField.value = nombreUnidad;
  if (movimientoField) movimientoField.value = movimiento;
  if (respuestaField) respuestaField.value = respuesta;
  

  // Obtener funcionarios y llenar el select
  if (formType === "respuesta") {
    const funcionarios = await obtenerEncargados();
    const funcionarioField = formConfig.fields.find(
      (field) => field.name === "usuario"
    );
    if (funcionarioField) {
      funcionarioField.options = funcionarios;
    }
  }
  // Obtener emisores y llenar el select
  if (formType === "solicitud") {
    const establecimientos = await obtenerEmisores();
   
    const establecimientoField = formConfig.fields.find(
      (field) => field.name === "emisor"
    );
    if (establecimientoField) {
      establecimientoField.options = establecimientos;
    }
  }



    if (formType === "evento") {
           const tipoEventos = await obtenerTipoEvento();
        const tipoField = formConfig.fields.find(
          (field) => field.name === "categoria"
        );
    
        if (tipoField) {
          // Extrae los valores de tipoEvento y los asigna a las opciones
          tipoField.options = tipoEventos;
        }
    
  
//select establecimiento
    const establecimientos = await obtenerEmisores();
    const establecimientoField = formConfig.fields.find(
      (field) => field.name === "establecimiento"
    );
    if (establecimientoField) {
      establecimientoField.options = establecimientos;
    }
//select invitados
const invitados = await obtenerFuncionarios();
const invitadoField = formConfig.fields.find(
  (field) => field.name === "invitados"
);
if (invitadoField) {
  invitadoField.options = invitados;
}
}

  const fieldsHtml = formConfig.fields
    .map((field) => formConfig.formatRow(field))
    .join("");

  formularioDiv.innerHTML = `
        <div class="formulario-contenido">
            <h2 class="titulo-principal">${formConfig.title}</h2>
            <div id="mensaje" class="alert alert-info" style="display: none;"></div>
            <form class="${formType}Form forms">
                ${fieldsHtml}
                <div class="mb-3">
                    ${formConfig.buttonHtml}
                    <button class="btn btn-cerrar btn-secondary ms-5">Cerrar</button>
                </div>
            </form>
        </div>
    `;
    
  agregarManejadores(formularioDiv, formType, formConfig.url, movimiento );
  document.getElementById("formularioContainer").appendChild(formularioDiv);
  formularioDiv.style.display = "block";
  //cerrar tabla cuando abre form
  document.getElementById("tableSection").classList.add("d-none");
}

document.body.addEventListener("click", async (event) => {
    //loadDataUltimaRespuesta3 ();
  const target = await event.target.closest(
    "[data-unidad], [data-nombreUnidad], [data-movimiento], [data-ultimoNumeroRespuesta], [data-form]"
  );

  if (target) {
    const unidad = Number(event.target.getAttribute("data-unidad"));
    const nombreUnidad = event.target.getAttribute("data-nombreUnidad");
    const movimiento = event.target.getAttribute("data-movimiento");
    //const respuesta = event.target.getAttribute("data-ultimaRespuesta");


    switch (event.target.id) {
   

      case "abrirFormSolicitud":
        crearFormulario("solicitud");
        break;

      case "abrirFormRespuesta":
        loadDataUltimaRespuesta3();
        crearFormulario("respuesta", null, null, movimiento, ultimoNumeroRespuesta3,null);
        break;

     case "abrirFormEvento":
      //console.log("entra a case de form event")
       crearFormulario("evento");
        break;

      case "abrirFormProyecto":
        crearFormulario("proyecto");
        break;  
      default:
        break;
    }
  }
});

function cerrarFormularioExistente() {
  const existingForm = document.querySelector(".formulario-oculto");
  if (existingForm) {
    existingForm.remove();
  }
}

async function obtenerEmisores() {
  return await obtenerDatos("http://localhost:8080/emisores");
}

async function obtenerFuncionarios() {
  return await obtenerDatos("http://localhost:8080/usuarios");
}

async function obtenerEncargados() {
  return await obtenerDatos("http://localhost:8080/usuarios/encargados");
}
async function obtenerUnidades() {
  return await obtenerDatos("http://localhost:8080/unidades");
}

async function obtenerTipoEvento() {
  return await obtenerDatos("http://localhost:8080/categoria");
}

async function obtenerDatos(url) {
  try {
    const response = await axios.get(url);
    return response.data.content; // Asume que los datos son un array de objetos con { id, nombre }
  } catch (error) {
    console.error(`Error al obtener datos de ${url}:`, error);
    return [];
  }
}


// Función para mostrar mensajes
function mostrarMensaje(mensaje, tipo) {
  const mensajeDiv = document.createElement('div');
  mensajeDiv.textContent = mensaje;
  mensajeDiv.className = tipo === 'success' ? 'mensaje-exito' : 'mensaje-error';
  document.body.appendChild(mensajeDiv);

  // Ocultar el mensaje después de 2 segundos
  setTimeout(() => {
    mensajeDiv.remove();
  }, 2000);
}


// Cargar la última respuesta
const loadDataUltimaRespuesta3 = async () => {
  try {
      // Realizamos la solicitud a la API
      const response = await axios.get('http://localhost:8080/respuestas/last');
      
      // Obtener los datos de la respuesta directamente, si es un solo objeto
      const item = response.data;  

      if (item && item.numeroRespuesta !== undefined) {
          // Obtener el número de respuesta y sumarle 1
          const ultimoNumeroRespuesta3 = item.numeroRespuesta + 1;
          
          console.log(`${ultimoNumeroRespuesta3} - Último número de respuesta antes de sumarle 1`);
      } else {
          console.error('La respuesta no contiene un número de respuesta válido.');
      }
  } catch (error) {
      console.error('Error:', error);
      alert('No se pudo cargar los datos. Verifica la URL y la conexión a Internet.');
  }
};

function formatText(text) {
  if (!text) return "";
  return text
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (letra) => letra.toUpperCase());
}

function resetView() {
  document.getElementById("mainContent").classList.remove("d-none");
  document.getElementById("tableSection").classList.add("d-none");
  document.getElementById("responseDiv").classList.add("d-none");
// Si ya hay un formulario abierto, lo eliminamos
cerrarFormularioExistente()
}

async function enviarFormularioArchivo(id, tipo) {

  // Crear el contenido que se agregará al div
  const content = `
      <h2>Subir archivos</h2>
      <div id="mensaje" style="display:none;"></div>

      <form id="fileForm">
        <div class="mb-3">
            <label for="archivoA" class="form-label"></label>
            <input type="file" id="archivoA" name="archivoA">
        </div>
        <div class="mb-3">
            <label for="archivoB" class="form-label""></label>
            <input type="file" id="archivoB" name="archivoB">
        </div>
        <div class="mb-3">
            <label for="archivoC" class="form-label""></label>
            <input type="file" id="archivoC" name="archivoC">
        </div>
            <button type="submit" class="btn btn-primary">Enviar</button>
      </form>
  `;

  // Agregar el formulario al div de respuesta
  const responseDiv = document.getElementById("responseDiv");
  responseDiv.innerHTML = content;

  // Crear un objeto para almacenar los datos del formulario
  const form = document.getElementById('fileForm');

  // Mostrar solo el primer archivo (puedes cambiar esto dinámicamente según la lógica que desees)
  document.getElementById("archivoA").style.display = 'block';
  // Si deseas cambiar el archivo visible, podrías agregar lógica adicional aquí

  // Escuchar el evento submit del formulario
  form.addEventListener('submit', async function(event) {
      event.preventDefault(); // Evitar que el formulario se envíe de forma tradicional

      // Crear un objeto FormData con los datos del formulario
      const formData = new FormData(form);

      // Agregar los parámetros id y tipo directamente a FormData
      id = documentoId
      tipo = documentoTipo
      console.log(id + ": id " + tipo)
      formData.append("id", documentoId);
      
      switch (tipo) {

              case "solicitudes":
            formData.append("tipo", "solicitud");
            console.log("tipo " + tipo);
          break;

          case "respuestas":
            formData.append("tipo", "respuesta");
            console.log("tipo " + tipo);
          break;
      
        default:
          break;
      }
      

      console.log(formData + " fromData")
      // Elemento de alerta
      const alertMessage2 = document.getElementById('mensaje');

      console.log("token dentro de post archivo" + pass)

      try {
          // Enviar los datos como FormData utilizando axios
          const response = await axios.post('http://localhost:8080/archivos/upload', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data', // Indicamos que estamos enviando archivos
                  
            'X-CSRF-TOKEN': pass  // Incluir el token CSRF en el header
              }
          });

          // Manejo de la respuesta exitosa
          if (response.status === 200) {
              alertMessage2.className = 'alert alert-success';
              alertMessage2.textContent = 'Archivos subidos exitosamente';
              alertMessage2.style.display = 'block';

              // Agregar el contenido al div después de un pequeño retraso
              setTimeout(() => {
                  alertMessage2.style.display = 'none';
                  document.getElementById("tableSection").classList.add("d-none");
                  document.getElementById("formularioArchivo").classList.add("d-none");
                  //responseDiv.innerHTML = content;  // Recargar el formulario
                  document.getElementById("responseDiv").classList.add("d-none")
                  resetView2();  // Ocultar formulario y volver al inicio
                  }, 1800);
          } else {
              console.error('Error:', response.status, response.statusText);
          }
      } catch (error) {
          console.error("Error al enviar el formulario:", error);
          let errorMessage = 'Hubo un error al enviar el formulario. Intenta nuevamente.';

          // Si el servidor responde con un error 400, mostrar el mensaje de error
          if (error.response && error.response.status === 400 && error.response.data) {
              errorMessage = `Error: ${error.response.data}`;
          }

          alertMessage2.className = 'alert alert-danger';
          alertMessage2.textContent = errorMessage;
          alertMessage2.style.display = 'block';

          setTimeout(() => {
              alertMessage2.style.display = 'none';
          }, 3000);
      }
  });
}


// Función principal que maneja el formulario y los errores
function agregarManejadores(formularioDiv, formType, endpoint, movimiento) {
  const btnCerrar = formularioDiv.querySelector(".btn-cerrar");
  const form = formularioDiv.querySelector(`.${formType}Form`);
  const mensajeDiv = formularioDiv.querySelector("#mensaje");

  // Cerrar el formulario
  if (btnCerrar) {
    btnCerrar.addEventListener("click", () => {
      formularioDiv.remove();
      document.getElementById("mainContent").classList.remove("d-none");
    });
  }

  // Enviar formulario
  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      try {
        // Ejecutar la función para enviar el formulario y manejar la respuesta
        const resultado = await enviarFormulario2(form, endpoint, formularioDiv);

        // Si el resultado es exitoso, mostrar el mensaje de éxito
        if (resultado.status === 200) {

          
            mostrarMensaje(mensajeDiv, `${formType.charAt(0).toUpperCase() + formType.slice(1)} enviado con éxito`, 'success');
            // Llamar a la función para renderizar contenido adicional
            setTimeout(() => {
              console.log("######################## contenido adicional")
              console.log("######################## resultado "+ resultado)
              console.log("######################## formularioDiv "+ formularioDiv)
              console.log("######################## endpoint "+ endpoint)
            mostrarContenidoAdicional(resultado, formularioDiv, endpoint);
            console.log("######################## despues de funcion mostrar contenido")
          }, 1700); // Elimina el formulario después de 2 
            
       } else {
          // Manejo de respuesta no exitosa
          
          mostrarMensaje(mensajeDiv, `Error: ${resultado.response.data || 'Hubo un problema al procesar el formulario'}`, 'danger');
       
       }

      } catch (error) {
        // Manejo de errores en caso de excepciones
        mostrarMensaje(mensajeDiv, `Error desconocido: ${error.message || 'Hubo un problema al procesar el formulario'}`, 'danger');
      }
    });
  } else {
    console.error(`No se encontró el formulario con la clase: ${formType}Form`);
  }
}

// Función para enviar el formulario
async function enviarFormulario2(form, endpoint, formularioDiv) {
  const formData = new FormData(form);
  const formJson = {};

  // Recopilar datos del formulario
  formData.forEach((value, key) => {
    formJson[key] = value;
  });



  //############################################################


 
  documentoTipo = endpoint;  // Almacenar el value de "tipo"
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


console.log("token dentro de post form" + pass)

  //############################################################
  try {
    // Enviar los datos del formulario a la API
    const response = await axios.post(`http://localhost:8080/${endpoint}`, formJson, {
      headers: { 'Content-Type': 'application/json' ,
        'X-CSRF-TOKEN': pass,  // Incluir el token CSRF en el header
   
      }
    });

    // Si la respuesta es exitosa, devolverla
    if (response.status === 200) {
      return response;
    } else {
      // Si la respuesta no es exitosa, lanzar un error
      throw new Error(`Respuesta inesperada del servidor: ${response.status}`);
    }
  } catch (error) {
    // Manejo de errores (de red o de la API)
    throw new Error(error.response?.data || error.message || 'Error desconocido');
  }
}

// Función para mostrar mensajes de éxito o error
function mostrarMensaje(mensajeDiv, mensaje, tipo) {
  mensajeDiv.textContent = mensaje;
  mensajeDiv.style.display = "block";
  mensajeDiv.className = `alert alert-${tipo}`;

  // Establecer un tiempo de espera de 3 segundos (3000 milisegundos)
  setTimeout(() => {
    mensajeDiv.style.display = "none"; // Ocultar el mensaje después de 3 segundos

  }, 1800);  
}


// Función para manejar la visualización del contenido adicional
function mostrarContenidoAdicional(resultado, formularioDiv, endpoint) {

  console.log("************************ contenido adicional dentro de funcion contenido adicional")
  console.log("************************ resultado "+ resultado)
  console.log("************************ formularioDiv "+ formularioDiv)
  console.log("************************ endpoint "+ endpoint)
  formularioDiv.remove();
  const responseDiv = document.getElementById('responseDiv');
 // const form = document.getElementById('formulario-contenido');

  // Limpiar cualquier contenido previo del div
  responseDiv.innerHTML = '';

  // Crear contenido en base a la respuesta
  let content = '<table class="table table-striped">';
  content += `<thead><tr><th> ${endpoint === 'eventos' ? "Detalles evento registrado" : 'Detalles documento registrado'} '</th></tr></thead><tbody class="table-group-divider">`;

  // Mostrar detalles del objeto de respuesta
  const item = resultado.data || resultado;
  for (let key in item) {
    if (item.hasOwnProperty(key)) {
      let value = item[key];
      if (typeof value === 'string') {
        value = value.replace(/\[|\]/g, ''); // Eliminar corchetes si es necesario
      }
//###############################################

       // Almacenar el valor de "id" en la variable documentoId
       if (key === "id") {
        documentoId = value;  // Almacenar el value de "id"
        console.log("ID capturado:", documentoId);  // Opcional, solo para depuración
      }

//###############################################

     // content += `<tr><td><strong>${key}: </strong>${value}</td></tr>`;
    
    //###############################################
     content += `
          
                <tr>
                  <td>
                      ${
                        key === "categoria" ? `${formatText(value)}` :
                        key === "invitado" ? `<strong>Invitados: </strong>${value}` :
                        key === "numeroSolicitud" ? `<strong>Solicitud N° </strong>${value}` :
                        key === "numeroRespuesta" ? `<strong>Respuesta N° </strong>${value}` :
                        key === "id" ? "" :value
                      }
                  </td>
                </tr>
                  `;
   //###############################################
    }
  }

  content += '</tbody></table>';

  content += `
    
    ${ endpoint === 'eventos' ? "" : '<button type="" class="btn btn-primary ms-auto" onclick= enviarFormularioArchivo();>Subir Archivos</button>'}
    <button type="close" class="btn btn-secondary ms-auto" onclick= resetView();>Cerrar</button>`;
 
  responseDiv.innerHTML = content;

}







const loadDataTabla = async () => {
    
  try {
      const solicitudesResponse = await axios.get('http://localhost:8080/movimientos/pendientes?size=10');
      const solicitudes = solicitudesResponse.data.content;
      
      if (Array.isArray(solicitudes)) {
          tableBody.innerHTML = ''; // Limpiar el cuerpo de la tabla
          let rows = ''; // Variable para acumular las filas


          // Llama a getNumero y almacena el valor
          

          // Iterar sobre cada solicitud
          solicitudes.forEach(item => {
              const botonesOpciones = getBotonesOpciones(item);
              const estadoFormatted = item.estado
                  .toLowerCase()
                  .replace(/_/g, ' ')
                  .replace(/\b\w/g, letra => letra.toUpperCase());

              rows += `
                  <tr>
                      <th id="numeroSolicitud" scope="row">${item.solicitud}</th>
                      <td class="fila d-md-table-cell d-none">
                          <ul class="list-group">
                              <h3 class="title">Solicitud</h3>
                              <li>${item.emisor}</li>
                              <li class="list-group">${item.titulo}</li>
                              <li class="list-group">${item.fechaSolicitud}</li>
                              <li class="list-group">${estadoFormatted || 'No hay datos'}</li>
                          </ul>
                      </td>
              
                         <td class="mb-3 fila d-md-table-cell d-none">
          <ul class="mb-3 list-group">
              <h3 class="title">Respuesta</h3>
              
                  <li class="list-group"> ${item.fechaResuelto || ""}</li>
                  <li class="list-group">${item.comentarioResuelto || ""}</li>
              
          </ul>
      </td>
                      <td>${botonesOpciones}</td>
                      <td class="d-md-none">
                          <div>
                              <strong>Emisor:</strong> ${item.emisor} <br>
                              <strong>Título:</strong> ${item.titulo} <br>
                              <strong>Fecha Solicitud:</strong> ${item.fechaSolicitud} <br>
                              <strong>Estado:</strong> ${estadoFormatted || 'No hay datos'} <br>
                          </div>
                          <div class="btn-group">
                              <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"> Opciones </button>
                              <ul class="dropdown-menu">
                                  <li class="dropdown-item"><a class="dropdown-link text-success" onclick="" data-bs-toggle="modal" data-bs-target="#">ver</a></li>
                                  <li class="dropdown-item"><a class="dropdown-link text-primary" id="abrirFormRespuesta"  data-movimiento="${item.id}" data-ultimaRespuesta ="${ultimoNumeroRespuesta1}" onclick="">ingresar Respuesta</a></li>
                  
                              </ul>
                          </div>
                      </td>
                  </tr>
              `;
          });

          // Asignar todas las filas acumuladas a la tabla
          tableBody.innerHTML = rows;
      } else {
          console.error('La propiedad `solicitudes` no es un array.');
      }
  } catch (error) {
      console.error('Error:', error);
      alert('No se pudo cargar los datos. Verifica la URL y la conexión a Internet.');
  }
};


// Función para mostrar el main y ocultar la tabla
function resetView2() {
  document.getElementById("mainContent").classList.remove("d-none");
  loadDataTabla();
  cerrarFormularioExistente();
}

    // Función para obtener el token CSRF del meta tag
    async function getCsrfToken() {
      const response = await fetch('/pass');
      const data = await response.json();
      const csrfToken = data.token;
      console.log("token " + csrfToken);
      pass = csrfToken;
      return csrfToken;
    }
    getCsrfToken()
    