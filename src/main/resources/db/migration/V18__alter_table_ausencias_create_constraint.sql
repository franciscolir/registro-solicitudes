USE documentacion;

    -- Agregar la restricción de clave foránea (foreign key) en la columna 'usuario_id'
    ALTER TABLE ausencias
        ADD CONSTRAINT fk_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON DELETE CASCADE;
