USE documentacion;

CREATE TABLE respuestas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    numero_respuesta BIGINT,
    usuario_id BIGINT,
    titulo VARCHAR(255),
    descripcion TEXT,
    comentario TEXT,
    fecha_respuesta DATE,
    fecha_envio TIMESTAMP,
    activo BOOLEAN,
    archivo_id UUID
);
