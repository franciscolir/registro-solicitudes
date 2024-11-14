// Delegación de eventos
document.addEventListener('DOMContentLoaded', function () {
    // Delegar el evento click al contenedor de la tabla (o contenedor padre)
    const tablaEventos = document.getElementById('tablaEventos');  // Cambia esto al id de tu tabla o contenedor
    if (tablaEventos) {
        tablaEventos.addEventListener('click', function(event) {
            // Verifica si el botón clickeado es el que abre el formulario
            if (event.target && event.target.id === 'abrirFormularioEvento') {
                abrirFormularioEvento();
            }
        });
    }
});



// Abrir el formulario en un div (en lugar de un modal)
function abrirFormularioEvento() {

    document.getElementById("formularioEventoDiv").appendChild(formularioDiv);
    formularioDiv.style.display = "block";
    //cerrar tabla cuando abre form
    document.getElementById("tableSection").classList.add("d-none");


    //const formularioDiv = document.createElement("div");
    //formularioDiv.id = "formularioEventoDiv";
    //formularioDiv.className = "formulario-evento-container";

    // Crear el contenido del formulario
    formularioDiv.innerHTML = `
        <div class="formulario-contenido">
            <h2>Ingresar Evento</h2>
            <div id="eventAlertMessage" class="alert" style="display:none;"></div>
            <form id="formEvento">
                <div class="form-group">
                    <label for="tipo">Tipo de Evento</label>
                    <select id="tipo" class="form-control">
                        <option value="" disabled selected>Seleccione un tipo de evento</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="descripcionEvent">Descripción</label>
                    <input type="text" class="form-control" id="descripcionEvent" placeholder="Descripción del evento">
                </div>

                <div class="form-group">
                    <label for="fechaEvento">Fecha y Hora</label>
                    <input type="datetime-local" class="form-control" id="fechaEvento">
                </div>

                <div class="form-group">
                    <label for="establecimiento">Establecimiento</label>
                    <select id="establecimiento" class="form-control">
                        <option value="" disabled selected>Seleccione un establecimiento</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="invitados">Invitados</label>
                    <select id="invitados" class="form-control" multiple>
                        <option value="" disabled selected>Seleccione un invitado(s)</option>
                    </select>
                </div>

                <button type="submit" class="btn btn-primary">Enviar</button>
                <button type="button" class="btn btn-secondary" id="cerrarFormularioEvento">Cerrar</button>
            </form>
        </div>
    `;

    // Agregar el formulario al cuerpo del documento
    document.body.appendChild(formularioDiv);

    // Cargar los datos de los selectores
    cargarSelectores();

    // Agregar eventos para enviar el formulario
    document.getElementById('formEvento').addEventListener('submit', enviarFormularioEvent);
    document.getElementById('cerrarFormularioEvento').addEventListener('click', cerrarFormularioEvento);
}

// Cargar selectores de tipos, establecimientos e invitados
async function cargarSelectores() {
    try {
        const tipos = await axios.get('http://localhost:8080/tipo');
        if (Array.isArray(tipos.data)) {
            llenarSelectTipos(tipos.data);
        } else {
            console.error('Datos inesperados del servidor:', tipos.data);
            alert('Hubo un problema con los datos tipos recibidos del servidor.');
        }

        const emisores = await axios.get('http://localhost:8080/emisores');
        if (Array.isArray(emisores.data.content)) {
            llenarSelectEstablecimiento(emisores.data.content);
        } else {
            console.error('Datos inesperados del servidor:', emisores.data);
            alert('Hubo un problema con los datos recibidos del servidor.');
        }

        const usuarios = await axios.get('http://localhost:8080/usuarios');
        if (Array.isArray(usuarios.data.content)) {
            llenarSelectInvitados(usuarios.data.content);
        } else {
            console.error('Datos inesperados del servidor:', usuarios.data);
            alert('Hubo un problema con los datos-usuario recibidos del servidor.');
        }
    } catch (error) {
        console.error('Error al obtener datos:', error);
        alert('Hubo un error al obtener los datos. Intenta nuevamente.');
    }
}

function llenarSelectTipos(tipos) {
    const select = document.getElementById('tipo');
    select.innerHTML = '<option value="" disabled selected>Seleccione un tipo de evento</option>';
    tipos.forEach(tipo => {
        const tipoFormatted = tipo.tipoEvento
            .toLowerCase()
            .replace(/_/g, ' ')             
            .replace(/^(.)/, (match, p1) => p1.toUpperCase());

        const option = document.createElement('option');
        option.value = tipo.tipoEvento;
        option.textContent = tipoFormatted;
        select.appendChild(option);
    });
}

function llenarSelectEstablecimiento(emisores) {
    const select = document.getElementById('establecimiento');
    select.innerHTML = '<option value="" disabled selected>Seleccione un establecimiento</option>';
    emisores.forEach(emisor => {
        const option = document.createElement('option');
        option.value = emisor.id;
        option.textContent = emisor.establecimiento;
        select.appendChild(option);
    });
}

function llenarSelectInvitados(usuarios) {
    const select = document.getElementById('invitados');
    select.innerHTML = '<option value="" disabled selected>Seleccione un invitado(s)</option>';
    usuarios.forEach(usuario => {
        const option = document.createElement('option');
        option.value = usuario.id;
        option.textContent = usuario.nombre;
        select.appendChild(option);
    });
}

// Enviar formulario
async function enviarFormularioEvent(event) {
    event.preventDefault();

    const select = document.getElementById('invitados');
    const selectedOptions = Array.from(select.selectedOptions);
    const selectedValues = selectedOptions.map(option => parseInt(option.value, 10));

    const formData = {
        tipo: document.getElementById('tipo').value,
        descripcion: document.getElementById('descripcionEvent').value,
        fecha: document.getElementById('fechaEvento').value,
        establecimiento: document.getElementById('establecimiento').value,
        invitados: selectedValues
    };

    const alertMessage = document.getElementById('eventAlertMessage');

    try {
        const response = await axios.post('http://localhost:8080/eventos', formData, {
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.status === 200) {
            alertMessage.className = 'alert alert-success';
            alertMessage.textContent = 'Evento agendado exitosamente';
            alertMessage.style.display = 'block';

            setTimeout(() => {
                alertMessage.style.display = 'none';
                cerrarFormularioEvento();
                window.location.reload();
            }, 1800);
        } else {
            alertMessage.className = 'alert alert-danger';
            alertMessage.textContent = 'Hubo un error al enviar la solicitud. Intenta nuevamente.';
            alertMessage.style.display = 'block';
        }
    } catch (error) {
        alertMessage.className = 'alert alert-danger';
        alertMessage.textContent = 'Hubo un error al enviar la solicitud. Intenta nuevamente.';
        alertMessage.style.display = 'block';

        setTimeout(() => {
            alertMessage.style.display = 'none';
        }, 2000);
    }
}

// Cerrar el formulario
function cerrarFormularioEvento() {
    const formularioDiv = document.getElementById('formularioEventoDiv');
    if (formularioDiv) {
        formularioDiv.remove();
    }
}
