

function getFormConfig(formType) {
    const commonFormatRow = (field) => `
    <div class="mb-3" ${field.name === "movimiento" ? 'style="display:none;"' : ''}>
        ${field.name === "unidad" ? `
            <input type="hidden" id="${field.name}" name="${field.name}" value="${field.value || ''}">
        ` : 
        field.name === "nombreUnidad" ? `
            <label class="form-label"></label>
            <span class="form-control-plaintext nombreUnidadForm">${field.value || ''}</span>
        ` : 
        field.type === "textarea" ? `
            <label for="${field.name}" class="form-label">${field.label}</label>
            <textarea id="${field.name}" name="${field.name}" class="form-control" ${field.required ? 'required' : ''}></textarea>
        ` : 
        `
            <label for="${field.name}" class="form-label">${field.label}</label>
            <input type="${field.type}" id="${field.name}" name="${field.name}" class="form-control" value="${field.value || ''}" ${field.required ? 'required' : ''}>
        `}
    </div>
`;

    const forms = {
        certificado: {
            title: "Ingresar Certificado",
            formatRow: commonFormatRow,
            buttonHtml: `<button type="submit" class="btn btn-primary me-4">Enviar</button>`,
            fields: [
                { label: "", type: "text", name: "nombreUnidad", required: true }, // Solo visual
                { label: "Número:", type: "number", name: "numeroCertificado", required: true },
                { label: "Título:", type: "text", name: "titulo", required: true },
                { label: "Descripción:", type: "textarea", name: "descripcion", required: true },
                { label: "Fecha :", type: "date", name: "fechaCertificado", required: true },
                { label: "", type: "text", name: "unidad", required: true }, // ID de la unidad, invisible
                { label: "", type: "number", name: "movimiento", required: true, value: "" } // Sin label, invisible
            ]
        },
        solicitud: {
            title: "Ingresar Solicitud",
            formatRow: commonFormatRow,
            buttonHtml: `<button type="submit" class="btn btn-primary me-3">Enviar</button>`,
            fields: [
                { label: "Número:", type: "number", name: "numeroSolicitud", required: true },
                { label: "Título:", type: "text", name: "tituloSolicitud", required: true },
                { label: "Descripción:", type: "textarea", name: "descripcionSolicitud", required: true },
                { label: "Fecha:", type: "date", name: "fechaSolicitud", required: true },
                { label: "Estado:", type: "text", name: "estadoSolicitud", required: true }
            ]
        },
        respuesta: {
            title: "Ingresar Respuesta",
            formatRow: commonFormatRow,
            buttonHtml: `<button type="submit" class="btn btn-primary me-3">Enviar</button>`,
            fields: [
                { label: "Número:", type: "number", name: "numeroRespuesta", required: true },
                { label: "Título:", type: "text", name: "tituloRespuesta", required: true },
                { label: "Descripción:", type: "textarea", name: "descripcionRespuesta", required: true },
                { label: "Fecha:", type: "date", name: "fechaRespuesta", required: true },
                { label: "Estado:", type: "text", name: "estadoRespuesta", required: true }
            ]
        }
    };

    return forms[formType] || null;
}

async function crearFormulario(formType, unidad = "", nombreUnidad = "", movimiento = "") {
    document.getElementById("mainContent").classList.add("d-none");

    const formConfig = getFormConfig(formType);
    if (!formConfig) return;

    const formularioDiv = document.createElement("div");
    formularioDiv.className = "formulario-oculto";

    // Asignar valores a los campos
    formConfig.fields.find(field => field.name === 'unidad').value = unidad; // ID de la unidad
    formConfig.fields.find(field => field.name === 'nombreUnidad').value = "Unidad:  "+nombreUnidad; // Solo se muestra al usuario
    formConfig.fields.find(field => field.name === 'movimiento').value = movimiento; // Valor del movimiento

    const fieldsHtml = formConfig.fields.map(field =>
        formConfig.formatRow(field)
    ).join("");

    formularioDiv.innerHTML = `
        <div class="formulario-contenido">
            <h2 class="titulo-principal">${formConfig.title}</h2>
            <form class="${formType}Form forms">
                ${fieldsHtml}
                <div class="mb-3">
                    ${formConfig.buttonHtml}
                    <button class="btn btn-cerrar btn-secondary ms-5">Cerrar</button>
                </div>
            </form>
        </div>
    `;

    agregarManejadores(formularioDiv, formType);
    document.getElementById("formularioContainer").appendChild(formularioDiv);
    formularioDiv.style.display = "block";
}

function agregarManejadores(formularioDiv, formType) {
    const btnCerrar = formularioDiv.querySelector(".btn-cerrar");
    const form = formularioDiv.querySelector(`.${formType}Form`);

    if (btnCerrar) {
        btnCerrar.addEventListener("click", () => {
            formularioDiv.remove(); // Cierra el formulario eliminándolo
            document.getElementById("mainContent").classList.remove("d-none");
        });
    }

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault(); // Evitar el envío del formulario
            alert(`${formType.charAt(0).toUpperCase() + formType.slice(1)} enviado`);
            formularioDiv.remove(); // Cierra el formulario eliminándolo
        });
    } else {
        console.error(`No se encontró el formulario con la clase: ${formType}Form`);
    }
}

document.body.addEventListener("click", (event) => {
    if (event.target) {
        if (event.target.id === "abrirFormulario") {
            const unidad = event.target.getAttribute("data-unidad");
            const nombreUnidad = event.target.getAttribute("data-nombreunidad"); // Asegúrate de que el HTML tenga este atributo
            const movimiento = event.target.getAttribute("data-movimiento");
            crearFormulario('certificado', unidad, nombreUnidad, movimiento);
        } else if (event.target.id === "abrirSolicitud") {
            crearFormulario('solicitud');
        } else if (event.target.id === "abrirRespuesta") {
            crearFormulario('respuesta');
        }
    }
});


/*import { obtenerUnidades } from './appGetAxios.js';

function getFormConfig(formType) {
    const commonFormatRow = (field, options = []) => `
        <div class="mb-3">
            <label for="${field.name}" class="form-label">${field.label}</label>
            ${field.type === "select" ? `
                <select id="${field.name}" name="${field.name}" class="form-control" ${field.required ? 'required' : ''}>
                    <option value="" disabled selected>Seleccione una unidad</option>
                    ${options.map(option => `<option value="${option.id}">${option.nombre}</option>`).join('')}
                </select>
                ` :
                field.type === "textarea" ? `
                <textarea id="${field.name}" name="${field.name}" class="form-control" ${field.required ? 'required' : ''}></textarea>` :
                `<input type="${field.type}" id="${field.name}" name="${field.name}" class="form-control" ${field.required ? 'required' : ''}>`
            }
        </div>
    `;

    const forms = {
        certificado: {
            title: "Ingresar Certificado",
            formatRow: commonFormatRow,
            buttonHtml: `<button type="submit" class="btn btn-primary me-4">Enviar</button>`,
            fields: [
                { label: "Número de Certificado:", type: "number", name: "numeroCertificado", required: true },
                { label: "Título:", type: "text", name: "titulo", required: true },
                { label: "Descripción:", type: "textarea", name: "descripcion", required: true },
                { label: "Fecha del Certificado:", type: "date", name: "fechaCertificado", required: true },
                { label: "Unidad:", type: "select", name: "unidad", required: true },
                { label: "Movimiento:", type: "number", name: "movimiento", required: true }
            ]
        },
        solicitud: {
            title: "Ingresar Solicitud",
            formatRow: commonFormatRow,
            buttonHtml: `<button type="submit" class="btn btn-primary me-3">Enviar</button>`,
            fields: [
                { label: "Número:", type: "number", name: "numeroSolicitud", required: true },
                { label: "Título:", type: "text", name: "tituloSolicitud", required: true },
                { label: "Descripción:", type: "textarea", name: "descripcionSolicitud", required: true },
                { label: "Fecha:", type: "date", name: "fechaSolicitud", required: true },
                { label: "Estado:", type: "text", name: "estadoSolicitud", required: true }
            ]
        },
        respuesta: {
            title: "Ingresar Respuesta",
            formatRow: commonFormatRow,
            buttonHtml: `<button type="submit" class="btn btn-primary me-3">Enviar</button>`,
            fields: [
                { label: "Número:", type: "number", name: "numeroRespuesta", required: true },
                { label: "Título:", type: "text", name: "tituloRespuesta", required: true },
                { label: "Descripción:", type: "textarea", name: "descripcionRespuesta", required: true },
                { label: "Fecha:", type: "date", name: "fechaRespuesta", required: true },
                { label: "Estado:", type: "text", name: "estadoRespuesta", required: true }
            ]
        }
    };

    return forms[formType] || null;
}

async function crearFormulario(formType, unidad = "", movimiento = "") {
    document.getElementById("mainContent").classList.add("d-none");

    const formConfig = getFormConfig(formType);
    if (!formConfig) return;

    const formularioDiv = document.createElement("div");
    formularioDiv.className = "formulario-oculto";

    // Obtener unidades
    const unidades = await obtenerUnidades();

    const fieldsHtml = formConfig.fields.map(field =>
        formConfig.formatRow(field, field.name === 'unidad' ? unidades : [])
    ).join("");

    formularioDiv.innerHTML = `
        <div class="formulario-contenido">
            <h2 class="titulo-principal">${formConfig.title}</h2>
            <form class="${formType}Form forms">
                ${fieldsHtml}
                <div class="mb-3">
                    ${formConfig.buttonHtml}
                    <button class="btn btn-cerrar btn-secondary ms-5">Cerrar</button>
                </div>
            </form>
        </div>
    `;

    agregarManejadores(formularioDiv, formType);
    document.getElementById("formularioContainer").appendChild(formularioDiv);
    formularioDiv.style.display = "block";
}

function agregarManejadores(formularioDiv, formType) {
    const btnCerrar = formularioDiv.querySelector(".btn-cerrar");
    const form = formularioDiv.querySelector(`.${formType}Form`);

    if (btnCerrar) {
        btnCerrar.addEventListener("click", () => {
            formularioDiv.remove(); // Cierra el formulario eliminándolo
            document.getElementById("mainContent").classList.remove("d-none");
        });
    }

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault(); // Evitar el envío del formulario
            alert(`${formType.charAt(0).toUpperCase() + formType.slice(1)} enviado`);
            formularioDiv.remove(); // Cierra el formulario eliminándolo
        });
    } else {
        console.error(`No se encontró el formulario con la clase: ${formType}Form`);
    }
}

document.body.addEventListener("click", (event) => {
    if (event.target) {
        if (event.target.id === "abrirFormulario") {
            const unidad = event.target.getAttribute("data-unidad");
            const movimiento = event.target.getAttribute("data-movimiento");
            crearFormulario('certificado', unidad, movimiento);
        } else if (event.target.id === "abrirSolicitud") {
            crearFormulario('solicitud');
        } else if (event.target.id === "abrirRespuesta") {
            crearFormulario('respuesta');
        }
    }
});





// Uso de las funciones

document.getElementById("abrirFormulario").addEventListener("click", function() {
    const unidad = this.getAttribute("data-unidad");
    const movimiento = this.getAttribute("data-movimiento");
    crearFormulario('certificado', unidad, movimiento);
});

document.getElementById("abrirSolicitud").addEventListener("click", function() {
    crearFormulario('solicitud');
});

document.getElementById("abrirRespuesta").addEventListener("click", function() {
    crearFormulario('respuesta');
});
*/