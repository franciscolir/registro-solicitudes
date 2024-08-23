CREATE TABLE establecimiento (
    id BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nombre_solicitante VARCHAR(255),
    nombre_establecimiento VARCHAR(255) NOT NULL,
    comentario VARCHAR(500)
);
