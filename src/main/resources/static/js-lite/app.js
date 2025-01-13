
//RESUMEN EVENTOS #####################################
document.addEventListener('DOMContentLoaded', () => {
        const tableBody = document.querySelector('#registros-table tbody');

        const loadDataEvento = () => {
        // Reemplaza esta URL con la URL de tu API
        const apiUrl = 'http://localhost:8080/eventos/proximos?size=2';
    
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

    loadDataEvento();
});

