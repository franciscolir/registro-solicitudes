USE documentacion;

CREATE TABLE eventos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('REUNION', 'INAUGURACION', 'ACTIVIDAD', 'VISITA_TERRENO', 'OTRO') NOT NULL,
    descripcion TEXT,
    fecha TIMESTAMP,
    establecimiento_id BIGINT
);
