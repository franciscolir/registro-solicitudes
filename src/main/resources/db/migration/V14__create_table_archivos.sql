USE documentacion;

-- Creación de la tabla Archivo

-- V1__create_archivo_table.sql

CREATE TABLE archivo (
    id BIGINT PRIMARY KEY,
    nombre_a VARCHAR(255) NOT NULL,
    nombre_b VARCHAR(255),
    nombre_c VARCHAR(255),
    tipo_a VARCHAR(50) NOT NULL,
    tipo_b VARCHAR(50),
    tipo_c VARCHAR(50),
    archivo_a LONGBLOB,
    archivo_b LONGBLOB,
    archivo_c LONGBLOB,
    solicitud_id BIGINT NOT NULL,
    respuesta_id BIGINT NOT NULL,
    certificado_id BIGINT NOT NULL,

    FOREIGN KEY (solicitud_id) REFERENCES solicitudes(id) ,
    FOREIGN KEY (respuesta_id) REFERENCES respuestas(id) ,
    FOREIGN KEY (certificado_id) REFERENCES certificados(id)
);
