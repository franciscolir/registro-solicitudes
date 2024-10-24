function getFormConfig(formType) {
  const commonFormatRow = (field) => `
      <div class="mb-3" ${field.hidden ? 'style="display:none;"' : ""}>
               ${
                 field.name === "unidad"
                   ? `
                ${
                  field.value
                    ? `
                    <input type="hidden" id="${field.name}" name="${field.name}" value="${field.value}">
                `
                    : `
                    <label for="${
                      field.name
                    }" class="form-label">Seleccione una Unidad</label>
                    <select id="${field.name}" name="${
                        field.name
                      }" class="form-control" required>
                        <option value="" disabled selected>Seleccione una unidad</option>
                  ${field.options
                    .map(
                      (option) =>
                        `<option value="${option.id}">${option.nombre}</option>`
                    )
                    .join("")}
                    </select>
                `
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
                   ? `
          
            <span class="form-control-plaintext">${field.value || ""}</span>
        `
                   : field.name === "numeroRespuesta"
                   ? `
        <label class="form-label">Número de Respuesta</label>
        <input type="number" id="${field.name}" name="${
                       field.name
                     }" class="form-control" value="${
                       field.value || ""
                     }" required>
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
    certificado: {
      url: "certificado",
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
          label: "Número:",
          type: "number",
          name: "numeroCertificado",
          required: true,
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
      url: "solicitud",
      title: "Ingresar Solicitud",
      formatRow: commonFormatRow,
      buttonHtml: `<button type="submit" class="btn btn-primary me-3">Enviar</button>`,
      fields: [
        {
          label: "Número de Providencia:",
          type: "number",
          name: "providencia",
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
        { label: "Título:", type: "text", name: "titulo", required: true },
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

  console.log(formType + " form");
  return forms[formType] || null;
}

async function crearFormulario(
  formType,
  unidad = "",
  nombreUnidad = "",
  movimiento = "",
  respuesta = ""
) {
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

  if (unidadField) unidadField.value = unidad;
  if (nombreUnidadField) nombreUnidadField.value = nombreUnidad;
  if (movimientoField) movimientoField.value = movimiento;
  if (respuestaField) respuestaField.value = respuesta;
  console.log(respuesta + "respuesta");

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
     if (formType === "certificado") {
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

  agregarManejadores(formularioDiv, formType, formConfig.url);
  document.getElementById("formularioContainer").appendChild(formularioDiv);
  formularioDiv.style.display = "block";
  //cerrar tabla cuando abre form
  document.getElementById("tableSection").classList.add("d-none");
}

function agregarManejadores(formularioDiv, formType, endpoint) {
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
        const resultado = await enviarFormulario(form, endpoint);
        mensajeDiv.textContent = `${
          formType.charAt(0).toUpperCase() + formType.slice(1)
        } enviado con éxito`;
        mensajeDiv.style.display = "block";

        setTimeout(() => {
          formularioDiv.remove();
          document.getElementById("mainContent").classList.remove("d-none");
        }, 2000); // Elimina el formulario después de 2 segundos
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
  const target = await event.target.closest(
    "[data-unidad], [data-nombreUnidad], [data-movimiento], [data-ultimoNumeroRespuesta], [data-form]"
  );

  if (target) {
    const unidad = event.target.getAttribute("data-unidad");
    const nombreUnidad = event.target.getAttribute("data-nombreUnidad");
    const movimiento = event.target.getAttribute("data-movimiento");
    const respuesta = event.target.getAttribute("data-ultimaRespuesta");

    console.log("ID del elemento:", event.target.id);
    console.log("Unidad:", unidad);
    console.log("Nombre Unidad:", nombreUnidad);
    console.log("Movimiento:", movimiento);
    console.log("Respuesta:", respuesta);

    switch (event.target.id) {
      case "abrirFormCertificado":
        crearFormulario("certificado", unidad, nombreUnidad, movimiento);
        break;

      case "abrirFormSolicitud":
        crearFormulario("solicitud");
        break;

      case "abrirFormRespuesta":
        crearFormulario("respuesta", movimiento, respuesta);
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
