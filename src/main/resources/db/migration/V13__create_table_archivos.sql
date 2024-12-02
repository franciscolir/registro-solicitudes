USE documentacion;

CREATE TABLE archivos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre_a VARCHAR(255) NOT NULL,
    nombre_b VARCHAR(255),
    nombre_c VARCHAR(255),
    tipo_a VARCHAR(50) NOT NULL,
    tipo_b VARCHAR(50),
    tipo_c VARCHAR(50),
    archivo_a LONGBLOB,
    archivo_b LONGBLOB,
    archivo_c LONGBLOB
);
