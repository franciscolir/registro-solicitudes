CREATE TABLE registros (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    fecha_asignacion TIMESTAMP,
    fecha_resuelto TIMESTAMP,
    rechazado BOOLEAN,
    asignado BOOLEAN,
    cerrado BOOLEAN,
    activo BOOLEAN
);