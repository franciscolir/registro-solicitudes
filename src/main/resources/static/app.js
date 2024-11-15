// Definimos la variable
let numeroObtenido = null;

// FUNCION CAPTA PARAMETROS DEL ACORDEON ####################
function captarParametros(id, numeroSolicitud, nombreModal, nombreDiv) {
    console.log(id, numeroSolicitud, nombreModal, nombreDiv, "##############################");

    const $respuestaModal = document.getElementById(nombreModal);
    const $numeroSolicitudR = document.getElementById(nombreDiv);

    if ($numeroSolicitudR) {
        $numeroSolicitudR.innerHTML = numeroSolicitud;
    }

    // Si necesitas asignar un valor a un input oculto
    const input = document.getElementById('numeroSolicitudR');
    if (input) {
        input.value = numeroSolicitud;
        $respuestaModal.appendChild(input); // Asegúrate de que este elemento se puede añadir
    }
}

//RESUMEN EVENTOS #####################################
document.addEventListener('DOMContentLoaded', () => {
        const tableBody = document.querySelector('#registros-table tbody');

        const loadData2 = () => {
        // Reemplaza esta URL con la URL de tu API
        const apiUrl = 'http://localhost:8080/eventos?size=2';
    
        // Solicitar datos usando Axios
        axios.get(apiUrl)
            .then(response => {
                // La respuesta contiene los datos en response.data
                const registros = response.data.content;
                console.log('Datos recibidos tabla:', response);

                // Limpiar el cuerpo de la tabla
                tableBody.innerHTML = '';
    
                // Crear filas para cada 
                
                registros.forEach(registro => {
                    //console.log(registro)
                    const row = document.createElement('table');
             
                    const tipoFormatted = registro.categoria
                    .toLowerCase()                  // Convierte todo el texto a minúsculas
                    .replace(/_/g, ' ')             // Reemplaza guiones bajos con espacios
                    .replace(/\b\w/g, letra => letra.toUpperCase()); // Convierte la primera letra de cada palabra a mayúscula

                       ;   
                    // Determinar la cadena de invitados

                    const invitadosString = (registro.invitado && registro.invitado.length > 2)
                    ? registro.invitado.replace(/[\[\]']+/g, '') // Elimina corchetes
                    : "Depto. SSGG"; // Valor por defecto si está vacío o no definido

                    row.innerHTML = `
                            <th class="th"> ${tipoFormatted}  |  ${registro.fecha} <th>
                            <tr> 
                                ${registro.descripcion}<br>
                                Recinto: ${registro.establecimiento}<br>
                                Invitados: ${invitadosString}
                            </td>
                    `;
    
                    tableBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    }

    loadData2();
});

// ULTIMA RESPUESTA ###################################
// Cargar la última respuesta
const loadDataUltimaRespuesta = async () => {
    const ultimaRespuesta = document.getElementById('ultimaRespuesta');

    try {
        const response = await axios.get('http://localhost:8080/respuestas?size=1&sort=id,desc');
        const data = response.data.content;

        if (Array.isArray(data) && data.length > 0) {
            ultimaRespuesta.innerHTML = '';
            const item = data[0];
            ultimaRespuesta.innerHTML = `${item.numeroRespuesta}`;

            // Almacenar el número obtenido
            numeroObtenido = item.numeroRespuesta+1;
        } else {
            console.error('La propiedad `content` no es un array o está vacío.');
            ultimaRespuesta.innerHTML = '<p>No se encontraron respuestas.</p>';
        }
        return numeroObtenido; // Retorna el número obtenido
    } catch (error) {
        console.error('Error:', error);
        alert('No se pudo cargar los datos. Verifica la URL y la conexión a Internet.');
    }
};

// Llama a la función al cargar el documento
document.addEventListener('DOMContentLoaded', () => {
    loadDataUltimaRespuesta();
});

