CREATE TABLE respuesta (
    id BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    respuesta_id BIGINT NOT NULL,
    usuario_id BIGINT NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    comentario TEXT,
    fecha_respuesta TIMESTAMP NOT NULL,
    fecha_envio TIMESTAMP NOT NULL,
    activo BOOLEAN,
    solicitud_id BIGINT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    FOREIGN KEY (solicitud_id) REFERENCES solicitud(id)
);
