USE documentacion;

CREATE TABLE evento_usuario (
    evento_id BIGINT,
    usuario_id BIGINT,
    PRIMARY KEY (evento_id, usuario_id)
);
