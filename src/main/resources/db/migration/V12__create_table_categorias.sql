USE documentacion;

-- Creación de la tabla Categoria
CREATE TABLE categorias (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('REUNION', 'INAUGURACION', 'ACTIVIDAD', 'VISITA_TERRENO', 'OTRO') NOT NULL,
    activo BOOLEAN
);

-- Insertar algunas categorías (opcional)
INSERT INTO categorias (tipo) VALUES
('REUNION'),
('INAUGURACION'),
('ACTIVIDAD'),
('VISITA_TERRENO'),
('OTRO');