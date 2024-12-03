USE documentacion;

CREATE TABLE eventos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    categoria_id BIGINT,
    descripcion TEXT,
    fecha TIMESTAMP,
    emisor_id BIGINT
);
