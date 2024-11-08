USE documentacion;

CREATE TABLE emisores (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    establecimiento_id BIGINT,
    comentario VARCHAR(255)
);
