let ultimoNumeroRespuesta3;
//let ultimoNumeroCertificado;

//console.log(ultimoNumeroCertificado);

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
            <select id="${field.name}" name="${
                       field.name
                     }" class="form-control" ${
                       field.required ? "required" : ""
                     }>
                <option value="" disabled selected>Seleccione un ${
                  field.name
                }</option>
                ${field.options
                  .map(
                    (option) =>
                      `<option value="${option.id}">${
                        option.nombre || option.establecimiento
                      }</option>`
                  )
                  .join("")}
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
                    : field.name === "numeroCertificado"
                    ? ` <label class="form-label">Número de Certificado</label>
                     <input type="text" class="form-control" id="${field.name}" name="${field.name}" value="${field.value || ""}" />
                    
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
    certificados: {
      url: "certificados",
      title: "Ingresar Certificado",
      formatRow: commonFormatRow,
      buttonHtml: `<button type="submit" class="btn btn-primary me-4">Enviar</button>`,
      fields: [
        { label: "", type: "number", name: "unidad",  required: true, hidden: false, value: "" }, // Campo oculto
        { label: "", type: "text", name: "nombreUnidad", required: true },
        { label: "Título:", type: "text", name: "titulo", required: true },
        { label: "Descripción:",type: "textarea", name: "descripcion",required: true, },
        { label: "",type: "number", name: "movimiento", required: true, hidden: true, value: "", },
        { label: "Cometario interno", type: "textarea", name: "comentario",required: true,value: "", },
      ],
    },
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
      url: "evento",
      title: "Ingresar Evento",
      formatRow: commonFormatRow,
      buttonHtml: `<button type="submit" class="btn btn-primary me-3">Enviar</button>`,
      fields: [
        { label: "Tipo:", type: "select",   name: "tipo",   required: true,  options: [],  }, // Se llenará dinámicamente
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
        { label: "", type: "number", name: "numeroRespuesta", required: true },
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
    
  console.log ("entra a crearForm ###############");
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
  const certificadoField = formConfig.fields.find(
    (field) => field.name === "numeroCertificado"
  );

  //if (unidadField) unidadField.value = unidad;
  if (unidadField) unidadField.value = Number(unidad);
  if (nombreUnidadField) nombreUnidadField.value = nombreUnidad;
  if (movimientoField) movimientoField.value = movimiento;
  if (respuestaField) respuestaField.value = respuesta;
  if (certificadoField) certificadoField.value = certificado;
  

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

  // Obtener unidades y llenar el select
  if (formType === "certificados") {
    const unidades = await obtenerUnidades();
    if (unidadField) {
      unidadField.options = unidades;
    }
  }

  // Obtener funcionarios y llenar el select
  /*
  if (formType === "evento") {
    //select tipo
    const tipo = await obtenerTipoEvento();
    const tipoField = formConfig.fields.find(
      (field) => field.name === "tipo"
    );
    if (tipoField) {
      tipoField.options = tipo;
    }*/
    if (formType === "evento") {
      try {
        const tipoEventos = await obtenerTipoEvento();
        const tipoField = formConfig.fields.find(
          (field) => field.name === "tipo"
        );
    
        if (tipoField) {
          // Extrae los valores de tipoEvento y los asigna a las opciones
          tipoField.options = tipoEventos.map(evento => evento.tipoEvento);
        } else {
          console.error('Campo tipo no encontrado');
        }
      } catch (error) {
        console.error('Error al obtener tipo de evento:', error);
      }
    }
    

    


  


  /*
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
  

  }*/

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
    console.log(unidad + " segundo unidad dentro de creraForm y antes de loasd ###############");


    
  agregarManejadores(formularioDiv, formType, formConfig.url, movimiento, );
  document.getElementById("formularioContainer").appendChild(formularioDiv);
  formularioDiv.style.display = "block";
  //cerrar tabla cuando abre form
  document.getElementById("tableSection").classList.add("d-none");
}

function agregarManejadores(formularioDiv, formType, endpoint, movimiento) {
  const btnCerrar = formularioDiv.querySelector(".btn-cerrar");
  const form = formularioDiv.querySelector(`.${formType}Form`);
  const mensajeDiv = formularioDiv.querySelector("#mensaje");




  console.log(formularioDiv+"form")
  if (btnCerrar) {
    btnCerrar.addEventListener("click", () => {
      formularioDiv.remove();
      document.getElementById("mainContent").classList.remove("d-none");
    });
  }

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      try {
        const resultado = await enviarFormulario2(form, endpoint);
        mensajeDiv.textContent = `${
          formType.charAt(0).toUpperCase() + formType.slice(1)
        } enviado con éxito`;
        mensajeDiv.style.display = "block";

       

        setTimeout(() => {
          formularioDiv.remove();
          document.getElementById("mainContent").classList.remove("d-none");
        }, 2000); // Elimina el formulario después de 2 
        
      } catch (error) {
        mensajeDiv.textContent = "Hubo un error al enviar el formulario";
        mensajeDiv.style.display = "block";
      }
    });
  } else {
    console.error(`No se encontró el formulario con la clase: ${formType}Form`);
  }
}

document.body.addEventListener("click", async (event) => {
    loadDataUltimaRespuesta3 ();
  const target = await event.target.closest(
    "[data-unidad], [data-nombreUnidad], [data-movimiento], [data-ultimoNumeroRespuesta], [data-form]"
  );

  if (target) {
    //const unidad = event.target.getAttribute("data-unidad");
    const unidad = Number(event.target.getAttribute("data-unidad"));

    const nombreUnidad = event.target.getAttribute("data-nombreUnidad");
    const movimiento = event.target.getAttribute("data-movimiento");
    //const respuesta = event.target.getAttribute("data-ultimaRespuesta");

    //console.log(movimiento+" numero movimineto en form")

    switch (event.target.id) {
      case "abrirFormCertificado":
        crearFormulario("certificados", unidad, nombreUnidad, movimiento, null, null);//ultimoNumeroCertificado);
        
        break;

      case "abrirFormSolicitud":
        crearFormulario("solicitud");
        break;

      case "abrirFormRespuesta":
        
        crearFormulario("respuesta", null, null, movimiento, ultimoNumeroRespuesta3,null);
        break;

     case "abrirFormEvento":
      console.log("entra a case de form event")
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
  return await obtenerDatos("http://localhost:8080/tipo");
}

async function obtenerDatos(url) {
  try {
    const response = await axios.get(url);
    console.log(response.data.content+" obtener datos ############")
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
     const response = await axios.get('http://localhost:8080/respuestas?size=1&sort=id,desc');
     const data = response.data.content;

     if (Array.isArray(data) && data.length > 0) {
         
         const item = data[0];
        
         // Almacenar el número obtenido
         ultimoNumeroRespuesta3 = item.numeroRespuesta+1;
         console.log(ultimoNumeroRespuesta3 +" ultimo numero appTablaMovimiento")
     } else {
         console.error('La propiedad `content` no es un array o está vacío.');
     }
 } catch (error) {
     console.error('Error:', error);
     alert('No se pudo cargar los datos. Verifica la URL y la conexión a Internet.');
 }
};


async function enviarFormulario2(form, endpoint) {
  const formData = new FormData(form);

  // Elemento de alerta
  const alertMessage = document.getElementById('mensaje');

  // Mostrar todos los elementos del formulario en la consola
  console.log("Elementos del formulario:");
  for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
  }

  try {
    const response = await axios.post(`http://localhost:8080/${endpoint}`, formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

      if (response.status === 200) {
          // Manejar la respuesta exitosa
          alertMessage.className = 'alert alert-success';
          alertMessage.textContent = 'Respuesta enviada exitosamente';
          alertMessage.style.display = 'block';

          // Ocultar el mensaje después de 2 segundos
          setTimeout(() => {
              alertMessage.style.display = 'none';
              resetView(); // Ocultar formulario y volver al inicio
              loadData(); // Recargar solo la tabla
          }, 1800);
      } else {
          console.error('Error:', response.status, response.statusText);
          // Manejar códigos de estado no 200 aquí
      }
  } catch (error) {
      // Manejar el error
      let errorMessage = 'Hubo un error al enviar el formulario. Intenta nuevamente.';
      
      if (error.response && error.response.status === 400 && error.response.data) {
          // Si hay un mensaje de error en la respuesta del servidor, usarlo
          errorMessage = `Error: ${error.response.data}`;
      }

      alertMessage.className = 'alert alert-danger';
      alertMessage.textContent = errorMessage;
      alertMessage.style.display = 'block';

      // Ocultar el mensaje después de 3 segundos
      setTimeout(() => {
          alertMessage.style.display = 'none';
      }, 3000);
  }
}

function resetView() {
  document.getElementById("mainContent").classList.remove("d-none");
  document.getElementById("tableSection").classList.add("d-none");
// Si ya hay un formulario abierto, lo eliminamos
cerrarFormularioExistente()
}