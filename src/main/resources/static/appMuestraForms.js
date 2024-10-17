function getFormConfig(formType) {
    switch (formType) {
        case 'certificado':
            return {
                title: "Formulario de Certificado",
                formatRow: (field) => `
                    <div class="mb-3">
                        <label for="${field.name}" class="form-label">${field.label}</label>
                        ${field.type === "textarea" 
                            ? `<textarea id="${field.name}" name="${field.name}" class="form-control" ${field.required ? 'required' : ''}></textarea>`
                            : `<input type="${field.type}" id="${field.name}" name="${field.name}" class="form-control" ${field.required ? 'required' : ''}>`
                        }
                    </div>
                `,
                buttonHtml: `<button type="submit" class="btn btn-primary">Enviar</button>`,
                fields: [
                    { label: "Número de Certificado:", type: "number", name: "numeroCertificado", required: true },
                    { label: "Título:", type: "text", name: "titulo", required: true },
                    { label: "Descripción:", type: "textarea", name: "descripcion", required: true },
                    { label: "Fecha del Certificado:", type: "date", name: "fechaCertificado", required: true },
                    { label: "Unidad:", type: "number", name: "unidad", required: true },
                    { label: "Movimiento:", type: "number", name: "movimiento", required: true }
                ]
            };

        case 'solicitud':
            return {
                title: "Formulario de Solicitud",
                formatRow: (field) => `
                    <div class="mb-3">
                        <label for="${field.name}" class="form-label">${field.label}</label>
                        ${field.type === "textarea" 
                            ? `<textarea id="${field.name}" name="${field.name}" class="form-control" ${field.required ? 'required' : ''}></textarea>`
                            : `<input type="${field.type}" id="${field.name}" name="${field.name}" class="form-control" ${field.required ? 'required' : ''}>`
                        }
                    </div>
                `,
                buttonHtml: `<button type="submit" class="btn btn-primary">Enviar</button>`,
                fields: [
                    { label: "Número:", type: "number", name: "numeroSolicitud", required: true },
                    { label: "Título:", type: "text", name: "tituloSolicitud", required: true },
                    { label: "Descripción:", type: "textarea", name: "descripcionSolicitud", required: true },
                    { label: "Fecha:", type: "date", name: "fechaSolicitud", required: true },
                    { label: "Estado:", type: "text", name: "estadoSolicitud", required: true }
                ]
            };

        case 'respuesta':
            return {
                title: "Formulario de Respuesta",
                formatRow: (field) => `
                    <div class="mb-3">
                        <label for="${field.name}" class="form-label">${field.label}</label>
                        ${field.type === "textarea" 
                            ? `<textarea id="${field.name}" name="${field.name}" class="form-control" ${field.required ? 'required' : ''}></textarea>`
                            : `<input type="${field.type}" id="${field.name}" name="${field.name}" class="form-control" ${field.required ? 'required' : ''}>`
                        }
                    </div>
                `,
                buttonHtml: `<button type="submit" class="btn btn-primary">Enviar</button>`,
                fields: [
                    { label: "Número:", type: "number", name: "numeroRespuesta", required: true },
                    { label: "Título:", type: "text", name: "tituloRespuesta", required: true },
                    { label: "Descripción:", type: "textarea", name: "descripcionRespuesta", required: true },
                    { label: "Fecha:", type: "date", name: "fechaRespuesta", required: true },
                    { label: "Estado:", type: "text", name: "estadoRespuesta", required: true }
                ]
            };

        default:
            return null;
    }
}


function crearFormulario(formType, unidad = "", movimiento = "") {

    document.getElementById("mainContent").classList.add("d-none");
    //document.getElementById("formularioContainer").classList.remove("d-none");
    const formConfig = getFormConfig(formType);
    if (!formConfig) return;

    const formularioDiv = document.createElement("div");
    formularioDiv.className = "formulario-oculto";

    const fieldsHtml = formConfig.fields.map(field => formConfig.formatRow(field)).join("");

    formularioDiv.innerHTML = `
        <div class="formulario-contenido">
            <button class="btn-cerrar">Cerrar</button>
            <h2>${formConfig.title}</h2>
            <form class="${formType}Form">
                ${fieldsHtml}
                ${formConfig.buttonHtml}
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

    console.log("Botón cerrar:", btnCerrar);
    console.log("Formulario:", form);

    if (btnCerrar) {
        btnCerrar.addEventListener("click", function() {
            formularioDiv.remove(); // Cierra el formulario eliminándolo
            document.getElementById("mainContent").classList.remove("d-none");
        });
    }

    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Evitar el envío del formulario
            alert(`${formType.charAt(0).toUpperCase() + formType.slice(1)} enviado`);
            formularioDiv.remove(); // Cierra el formulario eliminándolo
        });
    } else {
        console.error(`No se encontró el formulario con la clase: ${formType}Form`);
    }
}




document.body.addEventListener("click", function(event) {
    if (event.target && event.target.id === "abrirFormulario") {
        const unidad = event.target.getAttribute("data-unidad");
        const movimiento = event.target.getAttribute("data-movimiento");
        crearFormulario('certificado', unidad, movimiento);
    }

    if (event.target && event.target.id === "abrirSolicitud") {
        crearFormulario('solicitud');
    }

    if (event.target && event.target.id === "abrirRespuesta") {
        crearFormulario('respuesta');
    }
});



// Uso de las funciones
/*
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