export async function obtenerUnidades() {
    try {
        const response = await axios.get('http://localhost:8080/unidades');
        return response.data.content || []; // Devuelve un array vacío en caso de error
    } catch (error) {
        console.error('Error al obtener las unidades:', error);
        return []; // Devuelve un array vacío en caso de error
    }
}
