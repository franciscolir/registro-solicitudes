USE documentacion;

CREATE TABLE archivos (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()), -- Usamos UUID() de MySQL para generar UUID como string
    nombre_a VARCHAR(255),
    nombre_b VARCHAR(255),
    nombre_c VARCHAR(255),
    tipo_a VARCHAR(50),
    tipo_b VARCHAR(50),
    tipo_c VARCHAR(50),
    archivo_a LONGBLOB,
    archivo_b LONGBLOB,
    archivo_c LONGBLOB
);
