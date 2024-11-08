USE documentacion;

CREATE TABLE unidades (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    numero_unidad BIGINT,
    nombre_unidad VARCHAR(255),
    descripcion TEXT,
    activo BOOLEAN
);
