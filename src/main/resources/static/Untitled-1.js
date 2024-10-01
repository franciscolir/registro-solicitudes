

// SOLICITUDES PENDIENTES #######################################################
document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('tableIngreso'); // Asegúrate de tener un <tbody> con id="tableBody"

    const loadData = () => {
        axios.get('http://localhost:8080/solicitudes/pendientes?size=10') // Reemplaza con tu URL de API
            .then(response => {
                const data = response.data;
                const items = data.content;

                if (Array.isArray(items)) {
                    tableBody.innerHTML = ''; // Limpiar el cuerpo de la tabla

                    items.forEach(item => {
                        const tableRow = `
                        
                            <tr>
                                <th scope="row">${item.numeroSolicitud}</th>
                                <td>
                                    <ul>
                                        <li>${item.emisor}</li> 
                                        <li>${item.titulo}</li>  
                                        <li>${item.fechaSolicitud}</li> 
                                    </ul>
                                <td>
                                    <div class="btn-group">
                                        <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"> Opciones </button>
                                            <ul class="dropdown-menu">
                                                <li class="dropdown-item"><a class="dropdown-link text-success"  onclick="">ver</a></li>
                                                <li class="dropdown-item"><a class="dropdown-link" onclick="">ingresar certificado</a></li>
                                                <li class="dropdown-item"><a class="dropdown-link text-danger" onclick="captarParametros(${item.id}, ${item.numeroSolicitud}, 'rechazarModal', 'numeroRechazar')">rechazar</a></li>
                                        
                                            </ul>
                                    </div>
                                </td>
                          </tr>
                        `;

                        tableBody.innerHTML += tableRow;
                    });
                } else {
                    console.error('La propiedad `items` no es un array.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('No se pudo cargar los datos. Verifica la URL y la conexión a Internet.');
            });
    }

    loadData();
});

                    