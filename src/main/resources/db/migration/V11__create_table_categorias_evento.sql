USE documentacion;

-- Creación de la tabla Categoria
CREATE TABLE categorias_evento (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('REUNION', 'INAUGURACION', 'ACTIVIDAD', 'VISITA_TERRENO', 'OTRO') NOT NULL,
    activo BOOLEAN
);

-- Insertar  categorías de eventos
INSERT INTO categorias_evento (tipo, activo) VALUES
('REUNION', true),
('INAUGURACION', true),
('ACTIVIDAD', true ),
('VISITA_TERRENO', true),
('OTRO', true);