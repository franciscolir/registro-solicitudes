let ultimoNumeroRespuesta3;
let ultimoNumeroCertificado;

console.log(ultimoNumeroCertificado);

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
        {
          label: "",
          type: "number",
          name: "unidad",
          required: true,
          hidden: false,
          value: "",
        }, // Campo oculto
        { label: "", type: "text", name: "nombreUnidad", required: true },
        {
          label: "",
          type: "number",
          name: "numeroCertificado",
          required: true,
          value: "",
        },
        { label: "Título:", type: "text", name: "titulo", required: true },
        {
          label: "Descripción:",
          type: "textarea",
          name: "descripcion",
          required: true,
        },
        {
          label: "Fecha :",
          type: "date",
          name: "fechaCertificado",
          required: true,
        },
        {
          label: "",
          type: "number",
          name: "movimiento",
          required: true,
          hidden: true,
          value: "",
        },
      ],
    },
    solicitud: {
      url: "solicitudes",
      title: "Ingresar Solicitud",
      formatRow: commonFormatRow,
      buttonHtml: `<button type="submit" class="btn btn-primary me-3">Enviar</button>`,
      fields: [
        {
          label: "",
          type: "number",
          name: "providenciaId",
          required: true,
        },
        {
          label: "Emisor:",
          type: "select",
          name: "emisor",
          required: true,
          options: [],
        }, // Opciones se llenarán dinámicamente
        {
          label: "Número de Solicitud:",
          type: "number",
          name: "numeroSolicitud",
          required: true,
        },
        { label: "Título:", 
          type: "text", 
          name: "titulo", 
          required: true },
        {
          label: "Descripción:",
          type: "textarea",
          name: "descripcion",
          required: false,
        },
        {
          label: "Fecha de Solicitud:",
          type: "date",
          name: "fechaSolicitud",
          required: true,
        },
      ],
    },
    evento: {
      url: "eventos",
      title: "Ingresar Evento",
      formatRow: commonFormatRow,
      buttonHtml: `<button type="submit" class="btn btn-primary me-3">Enviar</button>`,
      fields: [
        {
          label: "Tipo:",
          type: "select",
          name: "tipo",
          required: true,
          options: [],
        }, // Se llenará dinámicamente
        {
          label: "Descripción:",
          type: "text",
          name: "descripcion",
          required: true,
        },
        {
          label: "Fecha y Hora:",
          type: "datetime-local",
          name: "fecha",
          required: true,
        },
        {
          label: "Establecimiento:",
          type: "select",
          name: "establecimiento",
          required: true,
          options: [],
        }, // Se llenará dinámicamente
        {
          label: "Invitados:",
          type: "select",
          name: "invitados",
          required: false,
          multiple: true,
          options: [],
        }, // Se llenará dinámicamente
      ],
    },
    respuesta: {
      url: "respuesta",
      title: "Ingresar Respuesta",
      formatRow: commonFormatRow,
      buttonHtml: `<button type="submit" class="btn btn-primary me-3">Enviar</button>`,
      fields: [
        {
          label: "",
          type: "number",
          name: "movimientoId",
          required: true,
          value: "",
          hidden: true,
        }, // Mantener oculto
        { label: "", type: "number", name: "numeroRespuesta", required: true },
        {
          label: "Funcionario:",
          type: "select",
          name: "funcionario",
          required: true,
          options: [],
        },
        { label: "Título:", type: "text", name: "titulo", required: true },
        {
          label: "Descripción:",
          type: "textarea",
          name: "descripcion",
          required: true,
        },
        {
          label: "Comentario:",
          type: "textarea",
          name: "comentario",
          required: false,
        },
        {
          label: "Fecha de Respuesta:",
          type: "date",
          name: "fechaRespuesta",
          required: true,
        },
      ],
    },
  };


  return forms[formType] || null;
}

async function crearFormulario(
  formType,
  unidad = "",
  nombreUnidad = "",
  movimiento = "",
  respuesta = "",
  certificado = ""
) {
    console.log(unidad + "unidad dentro de creraForm y antes de loasd ###############");
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
    const funcionarios = await obtenerFuncionarios();
    const funcionarioField = formConfig.fields.find(
      (field) => field.name === "funcionario"
    );
    if (funcionarioField) {
      funcionarioField.options = funcionarios;
    }
  }
  // Obtener emisores y llenar el select
  if (formType === "solicitud") {
    const establecimientos = await obtenerEmisores();
    console.log("Establecimientos obtenidos:", establecimientos); // Verifica aquí
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


    //##################################################################################################################################
    //if (unidad=! null){
      //loadDataUltimoCertificado (unidad);
   // }else{

     // loadDataUltimoCertificado (unidad);
   // }
    
   
    //##################################################################################################################################
    
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
        const resultado = await enviarFormulario(form, endpoint, method = 'POST');
        mensajeDiv.textContent = `${
          formType.charAt(0).toUpperCase() + formType.slice(1)
        } enviado con éxito`;
        mensajeDiv.style.display = "block";

        setTimeout(() => {
          formularioDiv.remove();
          document.getElementById("mainContent").classList.remove("d-none");
        }, 2000); // Elimina el formulario después de 2 

        //crear formulario paralelo para actualizar estado de 
        if (formType === 'solicitud'){
          actualizaMovimiento(solicitud, emisor, null, 'POST')
        }
        if (formType === 'certificados'){
          actualizaMovimiento(movimiento, ultimoNumeroCertificado,'resolver','PUT')
        
        }
        if (formType === 'respuesta'){
          actualizaMovimiento(movimiento, ultimoNumeroRespuesta3,'cerrar','PUT')

        }
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

    console.log(movimiento+" numero movimineto en form")

    switch (event.target.id) {
      case "abrirFormCertificado":
        crearFormulario("certificados", unidad, nombreUnidad, movimiento, null, ultimoNumeroCertificado);
        
        break;

      case "abrirFormSolicitud":
        crearFormulario("solicitud");
        break;

      case "abrirFormRespuesta":
        
        crearFormulario("respuesta", null, null, movimiento, ultimoNumeroRespuesta3,null);
        break;

      case "abrirFormEvento":
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

async function obtenerUnidades() {
  return await obtenerDatos("http://localhost:8080/unidades");
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


function actualizaMovimiento(id, documento, endpoint, method) {
  // Crea un formulario oculto
  const form = document.createElement('form');
  form.method = method; // O el método que necesites
  form.action = 'movimientos/'+endpoint; // Define el endpoint donde enviar los datos
  form.style.display = 'none'; // Oculta el formulario

  // Agrega los parámetros al formulario
  const idInput = document.createElement('input');
  idInput.type = 'hidden';
  idInput.name = 'id';
  idInput.value = id;

  const documentoInput = document.createElement('input');
  documentoInput.type = 'hidden';
  documentoInput.name = 'documento';
  documentoInput.value = documento;

  // Agregar los inputs al formulario
  form.appendChild(idInput);
  form.appendChild(documentoInput);

  // Agregar el formulario al documento
  document.body.appendChild(form);

  // Manejo de eventos para enviar el formulario
  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    try {
      const resultado = await enviarFormulario(form, form.action, form.method);
      mostrarMensaje('Formulario paralelo enviado con éxito', 'success');
      
      // Eliminar el formulario después de enviarlo
      form.remove();
    } catch (error) {
      mostrarMensaje('Hubo un error al enviar el formulario', 'error');
    }
  });

  // Enviar el formulario automáticamente
  form.submit();
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
// Cargar la última respuesta
const loadDataUltimoCertificado = async (unidad) => {
  try {
   const response = await axios.get(`http://localhost:8080/certificados/unidad/${unidad}?size=1&sort=numeroCertificado,desc`);
   const data = response.data.content;

   if (Array.isArray(data) && data.length > 0) {
       
       const item = data[0];
      
       // Almacenar el número obtenido
       ultimoNumeroCertificado = item.numeroCertificado+1;
       console.log(ultimoNumeroCertificado +" ultimo numero appTablaMovimiento")
   } else {
       console.error('La propiedad `content` no es un array o está vacío.');
   }
} catch (error) {
   console.error('Error:', error);
   alert('No se pudo cargar los datos. Verifica la URL y la conexión a Internet.');
}
};