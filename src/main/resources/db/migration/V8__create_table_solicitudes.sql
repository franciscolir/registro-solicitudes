USE documentacion;

CREATE TABLE solicitudes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    numero_solicitud BIGINT,
    providencia_id BIGINT,
    emisor_id BIGINT,
    titulo VARCHAR(255),
    descripcion TEXT,
    fecha_solicitud DATE,
    activo BOOLEAN,
    archivo_id UUID
);
