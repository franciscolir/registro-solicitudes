USE documentacion;

CREATE TABLE perfiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    rol ENUM('ADMIN', 'ENCARGADO', 'USUARIO','SUBROGANTE')
);

-- Insertar perfiles
INSERT INTO perfiles (rol) VALUES
('ADMIN'),
('ENCARGADO'),
('USUARIO'),
('SUBROGANTE');