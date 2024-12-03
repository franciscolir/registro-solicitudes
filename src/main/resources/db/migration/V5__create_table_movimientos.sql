USE documentacion;

CREATE TABLE movimientos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    fecha_ingreso TIMESTAMP,
    fecha_asignacion TIMESTAMP,
    fecha_resuelto TIMESTAMP,
    fecha_cierre TIMESTAMP,
    fecha_rechazado TIMESTAMP,
    asignado BOOLEAN,
    resuelto BOOLEAN,
    cerrado BOOLEAN,
    activo BOOLEAN,
    rechazado BOOLEAN,
    comentario_asignacion VARCHAR(255),
    comentario_resuelto VARCHAR(255),
    comentario_rechazado VARCHAR(255),
    estado ENUM('INGRESADO', 'EN_PROCESO', 'RESUELTO', 'CERRADO', 'RECHAZADO'),
    solicitud_id BIGINT,
    unidad_id BIGINT,
    certificado_id BIGINT,
    respuesta_id BIGINT
);
