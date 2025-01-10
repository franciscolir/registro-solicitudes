
-- Eliminar la restricción de clave foránea antes de eliminar la columna

-- ALTER TABLE usuarios DROP FOREIGN KEY fk_usuarios_perfil;

-- Eliminar la columna 'perfil_id' de la tabla 'usuarios'
-- ALTER TABLE usuarios DROP COLUMN perfil_id;

-- Crear la tabla intermedia 'usuario_perfil' para manejar la relación muchos a muchos
CREATE TABLE usuario_perfil (
    usuario_id BIGINT NOT NULL,
    perfil_id BIGINT NOT NULL,
    PRIMARY KEY (usuario_id, perfil_id),  -- Clave primaria compuesta
    CONSTRAINT fk_usuario_id FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,  -- Relación con la tabla usuarios
    CONSTRAINT fk_perfil_id FOREIGN KEY (perfil_id) REFERENCES perfiles(id) ON DELETE CASCADE   -- Relación con la tabla perfiles
);

-- Agregar índices adicionales (opcional, para mejorar el rendimiento)
CREATE INDEX idx_usuario_id ON usuario_perfil(usuario_id);
CREATE INDEX idx_perfil_id ON usuario_perfil(perfil_id);
