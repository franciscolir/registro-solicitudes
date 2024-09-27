CREATE TABLE certificados (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    numero_certificado BIGINT,
    titulo VARCHAR(255),
    descripcion TEXT,
    fecha_certificado DATE,
    activo BOOLEAN,
    registro_id BIGINT,
    CONSTRAINT fk_certificado_registro FOREIGN KEY (registro_id)
        REFERENCES registros(id)
);
