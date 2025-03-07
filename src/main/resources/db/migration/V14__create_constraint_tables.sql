USE documentacion;

-- Constraint para la tabla certificados
ALTER TABLE certificados
ADD CONSTRAINT fk_certificados_unidad
FOREIGN KEY (unidad_id) REFERENCES unidades(id);


-- Constraint para la tabla emisores
ALTER TABLE emisores
ADD CONSTRAINT FK_emisor_categoria
FOREIGN KEY (categoria_id) REFERENCES categorias_emisor(id);

-- Constraint para la tabla eventos
ALTER TABLE eventos
ADD CONSTRAINT fk_eventos_emisor
FOREIGN KEY (emisor_id) REFERENCES emisores(id);

-- Constraint para la tabla movimientos
ALTER TABLE movimientos
ADD CONSTRAINT fk_movimientos_solicitud
FOREIGN KEY (solicitud_id) REFERENCES solicitudes(id),
ADD CONSTRAINT fk_movimientos_unidad
FOREIGN KEY (unidad_id) REFERENCES unidades(id),
ADD CONSTRAINT fk_movimientos_certificado
FOREIGN KEY (certificado_id) REFERENCES certificados(id),
ADD CONSTRAINT fk_movimientos_respuesta
FOREIGN KEY (respuesta_id) REFERENCES respuestas(id);

-- Constraint para la tabla respuestas
ALTER TABLE respuestas
ADD CONSTRAINT fk_respuestas_usuario
FOREIGN KEY (usuario_id) REFERENCES usuarios(id);

-- Constraint para la tabla solicitudes
ALTER TABLE solicitudes
ADD CONSTRAINT fk_solicitudes_emisor
FOREIGN KEY (emisor_id) REFERENCES emisores(id);

-- Constraint para la tabla usuarios
ALTER TABLE usuarios

ADD CONSTRAINT fk_usuarios_unidad
FOREIGN KEY (unidad_id) REFERENCES unidades(id);

-- ADD CONSTRAINT fk_usuarios_perfil
-- FOREIGN KEY (perfil_id) REFERENCES perfiles(id),

-- Constraint para la tabla intermedia evento_usuario
ALTER TABLE evento_usuario
ADD CONSTRAINT fk_evento_usuario_evento
FOREIGN KEY (evento_id) REFERENCES eventos(id),
ADD CONSTRAINT fk_evento_usuario_usuario
FOREIGN KEY (usuario_id) REFERENCES usuarios(id);

-- Constraint para la tabla eventos

ALTER TABLE eventos
ADD CONSTRAINT FK_evento_categoria
FOREIGN KEY (categoria_id) REFERENCES categorias_evento(id);

-- Constraint para la tabla archivos
ALTER TABLE archivos
ADD CONSTRAINT fk_archivo_solicitud
FOREIGN KEY (solicitud_id) REFERENCES solicitudes(id) ON DELETE SET NULL,
ADD CONSTRAINT fk_archivo_certificado
FOREIGN KEY (certificado_id) REFERENCES certificados(id) ON DELETE SET NULL,
ADD CONSTRAINT fk_archivo_respuesta
FOREIGN KEY (respuesta_id) REFERENCES respuestas(id) ON DELETE SET NULL;