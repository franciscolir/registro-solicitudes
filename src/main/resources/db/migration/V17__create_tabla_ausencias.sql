USE documentacion;

CREATE TABLE ausencias (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    inicio DATE NOT NULL,
    termino DATE NOT NULL,
    usuario_id BIGINT,
    tipo ENUM( 'PERMISO_ADMINISTRATIVO', 'FERIADO_LEGAL', 'LICENCIA', 'OTRO') NOT NULL
);

