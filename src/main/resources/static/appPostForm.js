import { loadData } from './appTablaMovimientoSolicitudes.js';
import { resetView } from './appMuestraTablas.js';

export async function enviarFormulario(form, endpoint) {
    const formData = new FormData(form);

    // Elemento de alerta
    const alertMessage = document.getElementById('mensaje');

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
