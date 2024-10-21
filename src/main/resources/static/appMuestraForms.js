import {enviarFormulario} from './appPostForm.js';

async function getFormConfig(formType) {
    const commonFormatRow = (field) => `
    <div class="mb-3" ${field.name === "movimiento" ? 'style="display:none;"' : ''}>
        ${field.name === "unidad" ? `
            <input type="hidden" id="${field.name}" name="${field.name}" value="${field.value || ''}">
        ` :  
        field.type === "select" ? `
            <label for="${field.name}" class="form-label">${field.label}</label>
            <select id="${field.name}" name="${field.name}" class="form-control" ${field.required ? 'required' : ''}>
                <option value="" disabled selected>Seleccione un funcionario</option>
                ${field.options.map(option => `<option value="${option.id}">${option.nombre}</option>`).join('')}
            </select>
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
            url: "certificado",
            title: "Ingresar Certificado",
            formatRow: commonFormatRow,
            buttonHtml: `<button type="submit" class="btn btn-primary me-4">Enviar</button>`,
            fields: [
                { label: "", type: "text", name: "nombreUnidad", required: true },
                { label: "Número:", type: "number", name: "numeroCertificado", required: true },
                { label: "Título:", type: "text", name: "titulo", required: true },
                { label: "Descripción:", type: "textarea", name: "descripcion", required: true },
                { label: "Fecha :", type: "date", name: "fechaCertificado", required: true },
                { label: "", type: "text", name: "unidad", required: true },
                { label: "", type: "number", name: "movimiento", required: true, value: "" }
            ]
        },
        solicitud: {
            url: "solicitud",
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
            url: "respuesta",
            title: "Ingresar Respuesta",
            formatRow: commonFormatRow,
            buttonHtml: `<button type="submit" class="btn btn-primary me-3">Enviar</button>`,
            fields: [
                { label: "Número de Solicitud:", type: "number", name: "numeroSolicitudR", required: true },
                { label: "Número de Respuesta:", type: "number", name: "numeroRespuesta", required: true },
                { label: "Funcionario:", type: "select", name: "funcionario", required: true, options: [] },
                { label: "Título:", type: "text", name: "titulo", required: true },
                { label: "Descripción:", type: "textarea", name: "descripcion", required: true },
                { label: "Comentario:", type: "textarea", name: "comentario", required: false },
                { label: "Fecha de Respuesta:", type: "date", name: "fechaRespuesta", required: true }
            ]
        }
    };

    return forms[formType] || null;
}

async function crearFormulario(formType, unidad = "", nombreUnidad = "", movimiento = "") {
    cerrarFormularioExistente(); // Cerrar el formulario anterior, si existe

    document.getElementById("mainContent").classList.add("d-none");

    const formConfig = await getFormConfig(formType);
    if (!formConfig) return;

    const formularioDiv = document.createElement("div");
    formularioDiv.className = "formulario-oculto";

    // Asignar valores a los campos
    const unidadField = formConfig.fields.find(field => field.name === 'unidad');
    const nombreUnidadField = formConfig.fields.find(field => field.name === 'nombreUnidad');
    const movimientoField = formConfig.fields.find(field => field.name === 'movimiento');

    if (unidadField) unidadField.value = unidad;
    if (nombreUnidadField) nombreUnidadField.value = nombreUnidad;
    if (movimientoField) movimientoField.value = movimiento;

    // Obtener funcionarios y llenar el select
    if (formType === 'respuesta') {
        const funcionarios = await obtenerFuncionarios();
        const funcionarioField = formConfig.fields.find(field => field.name === 'funcionario');
        if (funcionarioField) {
            funcionarioField.options = funcionarios;
        }
    }

    const fieldsHtml = formConfig.fields.map(field => formConfig.formatRow(field)).join("");

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
                mensajeDiv.textContent = `${formType.charAt(0).toUpperCase() + formType.slice(1)} enviado con éxito`;
                mensajeDiv.style.display = "block";

                setTimeout(() => {
                    formularioDiv.remove();
                    document.getElementById("mainContent").classList.remove("d-none");
                }, 2000); // Elimina el formulario después de 2 segundos
            } catch (error) {
                mensajeDiv.textContent = 'Hubo un error al enviar el formulario';
                mensajeDiv.style.display = "block";
            }
        });
    } else {
        console.error(`No se encontró el formulario con la clase: ${formType}Form`);
    }
}

document.body.addEventListener("click", (event) => {
    if (event.target) {
        if (event.target.id === "abrirFormulario") {
            const unidad = event.target.getAttribute("data-unidad");
            const nombreUnidad = event.target.getAttribute("data-nombreunidad");
            const movimiento = event.target.getAttribute("data-movimiento");
            crearFormulario('certificado', unidad, nombreUnidad, movimiento);
        } else if (event.target.id === "abrirSolicitud") {
            crearFormulario('solicitud');
        } else if (event.target.id === "abrirRespuesta") {
            crearFormulario('respuesta');
        }
    }
});

function cerrarFormularioExistente() {
    const existingForm = document.querySelector(".formulario-oculto");
    if (existingForm) {
        existingForm.remove();
    }
}

async function obtenerFuncionarios() {
    try {
        const response = await axios.get('http://localhost:8080/usuarios');
        return response.data.content; // Asume que los datos son un array de objetos con { id, nombre }
    } catch (error) {
        console.error('Error al obtener funcionarios:', error);
        return [];
    }
}



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