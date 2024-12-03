USE documentacion;

CREATE TABLE emisores (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre_emisor VARCHAR(200),
    categoria_id BIGINT,
    comentario VARCHAR(255)
);
