USE documentacion;

CREATE TABLE certificados (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    numero_certificado BIGINT,
    titulo VARCHAR(255),
    descripcion TEXT,
    fecha_certificado DATE,
    activo BOOLEAN,
    unidad_id BIGINT
);
