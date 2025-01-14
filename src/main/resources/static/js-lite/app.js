
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

// Ejemplo de estructura de API (ficticia)
const apiUrl = 'https://api.ejemplo.com/ausencias';  // URL de la API

// Función para obtener los datos de los empleados
async function obtenerEmpleados() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}

// Función para crear el calendario
function generarCalendario(fechaInicio) {
  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const calendario = [];
  let fecha = new Date(fechaInicio);

  // Generar los días de las dos semanas
  for (let i = 0; i < 14; i++) {
    calendario.push(new Date(fecha));
    fecha.setDate(fecha.getDate() + 1);
  }

  return calendario;
}

// Función para mostrar el calendario en la tabla
async function mostrarCalendario() {
  const empleados = await obtenerEmpleados();  // Obtener los empleados desde la API
  const calendario = generarCalendario(new Date());  // Generar calendario de 2 semanas

  const tabla = document.getElementById('employeeTable');
  tabla.innerHTML = '';  // Limpiar tabla antes de renderizar

  // Crear la fila de los días de la semana
  const thead = document.querySelector('thead tr');
  calendario.forEach(dia => {
    const th = document.createElement('th');
    th.textContent = `${dia.getDate()}-${dia.getMonth() + 1}`;
    thead.appendChild(th);
  });

  // Crear las filas de los empleados
  empleados.forEach(empleado => {
    const tr = document.createElement('tr');
    
    // Columna de la imagen y nombre
    const tdEmpleado = document.createElement('td');
    tdEmpleado.innerHTML = `<img src="${empleado.imagen}" alt="${empleado.nombre}" width="50" class="rounded-circle"> ${empleado.nombre}`;
    tr.appendChild(tdEmpleado);

    // Crear las celdas de cada día para el empleado
    calendario.forEach(dia => {
      const td = document.createElement('td');
      const ausencia = empleado.ausencias.find(a => new Date(a.fecha_inicio) <= dia && new Date(a.fecha_fin) >= dia);

      if (ausencia) {
        td.classList.add(ausencia.tipo);  // Aplicar el color según el tipo de ausencia
      }

      // Identificar fines de semana
      if (dia.getDay() === 6 || dia.getDay() === 0) {
        td.classList.add('weekend');
      }

      // Agregar la celda a la fila
      tr.appendChild(td);
    });

    // Agregar la fila a la tabla
    tabla.appendChild(tr);
  });
}

// Llamar a la función para mostrar el calendario cuando se cargue la página
mostrarCalendario();
