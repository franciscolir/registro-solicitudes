CREATE TABLE eventos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    descripcion TEXT,
    fecha TIMESTAMP NOT NULL,
    invitado VARCHAR(255),
    establecimiento_id BIGINT,

    CONSTRAINT fk_establecimiento
        FOREIGN KEY (establecimiento_id)
        REFERENCES establecimientos (id)
);