USE documentacion;

CREATE TABLE usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    correo_electronico VARCHAR(255),
    contraseña VARCHAR(255),
    comentario TEXT,
    -- perfil_id BIGINT,
    activo BOOLEAN,
    fecha_ingreso_sistema TIMESTAMP,
    unidad_id BIGINT,
    subrogante BOOLEAN DEFAULT FALSE,
    encargado BOOLEAN DEFAULT FALSE
);
