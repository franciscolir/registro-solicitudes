CREATE TABLE solicitud (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    solicitud_id BIGINT NOT NULL,
    providencia_id BIGINT,
    emisor_id BIGINT NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    descripcion VARCHAR(1000),
    comentario VARCHAR(500),
    fecha_solicitud TIMESTAMP NOT NULL,
    fecha_ingreso_solicitud TIMESTAMP NOT NULL,
    estado VARCHAR(255) NOT NULL,
    cerrado BOOLEAN,
    activo BOOLEAN,
    FOREIGN KEY (emisor_id) REFERENCES emisor(id)
);
