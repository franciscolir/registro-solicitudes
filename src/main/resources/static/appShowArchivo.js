/*
document.addEventListener("DOMContentLoaded", () => {
    // Referencia al botón y el contenedor de archivos
    const fetchFilesBtn = document.getElementById('fetch-files-btn');
    const fileListElement = document.getElementById('file-list');

    // Evento que se activa al presionar el botón
    fetchFilesBtn.addEventListener('click', () => {
        // Obtener los valores de los parámetros de los inputs
        const param1 = document.getElementById('param1').value;
        const param2 = document.getElementById('param2').value;

        // Validar que los parámetros no estén vacíos
        if (!param1 || !param2) {
            alert('Por favor, ingresa ambos parámetros.');
            return;
        }

        // Limpiar el listado de archivos antes de hacer una nueva consulta
        fileListElement.innerHTML = '<p>Cargando archivos...</p>';

        // Llamar a la función para obtener los archivos
        fetchFiles(param1, param2).then(files => {
            fileListElement.innerHTML = ''; // Limpiar contenido previo

            if (files.length === 0) {
                fileListElement.innerHTML = '<p>No se encontraron archivos.</p>';
            } else {
                files.forEach(file => {
                    const fileItemElement = createFileItem(file);
                    fileListElement.appendChild(fileItemElement);
                });
            }
        }).catch(error => {
            fileListElement.innerHTML = '<p>Error al cargar los archivos.</p>';
        });
    });
});



// Función para obtener los archivos desde la API con parámetros dinámicos
async function fetchFiles(param1, param2) {
    try {
        // Aquí construimos la URL usando los parámetros dinámicos
        const response = await axios.get(`https://tu-api.com/archivos?param1=${param1}&param2=${param2}`);
        return response.data; // Suponemos que la API devuelve una lista de archivos
    } catch (error) {
        console.error('Error al obtener los archivos:', error);
        throw error;
    }
}
    

// Función para crear un ítem de archivo (vista previa y opción de descarga)
function createFileItem(file) {
    const fileItem = document.createElement('div');
    fileItem.classList.add('file-item');

    // Crear la vista previa del archivo
    const filePreview = createFilePreview(file);
    fileItem.appendChild(filePreview);

    return fileItem;
}

// Función para crear la vista previa de cada archivo
function createFilePreview(file) {
    const previewContainer = document.createElement('div');
    previewContainer.classList.add('file-preview');

    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
        const imgElement = document.createElement('img');
        imgElement.src = file.downloadUrl;
        imgElement.alt = file.name;
        imgElement.width = 200;
        previewContainer.appendChild(imgElement);
    } else if (fileExtension === 'pdf') {
        const embedElement = document.createElement('embed');
        embedElement.src = file.downloadUrl;
        embedElement.type = 'application/pdf';
        embedElement.width = 200;
        embedElement.height = 200;
        previewContainer.appendChild(embedElement);
    } else {
        const downloadLink = document.createElement('a');
        downloadLink.href = file.downloadUrl;
        downloadLink.download = file.name;
        downloadLink.textContent = `Descargar ${file.name}`;
        previewContainer.appendChild(downloadLink);
    }

    return previewContainer;
}
*/