USE documentacion;


    -- Crear tabla Archivos
CREATE TABLE archivos (
id BIGINT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(255) NOT NULL,
ruta VARCHAR(255) NOT NULL,
solicitud_id BIGINT,
certificado_id BIGINT,
respuesta_id BIGINT
);