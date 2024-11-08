USE documentacion;

CREATE TABLE establecimientos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre_solicitante VARCHAR(255),
    nombre_establecimiento VARCHAR(255),
    comentario TEXT
);

