USE documentacion;

CREATE TABLE categorias_emisor (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('ESCUELA','SALACUNA_JARDIN','DEPARTAMENTO_MUNICIPAL','PERSONA_NATURAL','INSTITUCION_EXTERNA') NOT NULL,
    activo BOOLEAN
);


-- Insertar categorias de emisores
INSERT INTO categorias_emisor (tipo, activo) VALUES
('ESCUELA', true),
('SALACUNA_JARDIN', true),
('DEPARTAMENTO_MUNICIPAL', true),
('PERSONA_NATURAL', true),
('INSTITUCION_EXTERNA', true);