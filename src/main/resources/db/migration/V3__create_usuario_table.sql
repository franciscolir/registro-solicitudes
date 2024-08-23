CREATE TABLE usuario (
    id BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    correo_electronico VARCHAR(255) NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    comentario VARCHAR(500),
    perfil_id BIGINT NOT NULL,
    activo BOOLEAN,
    fecha_ingreso_sistema TIMESTAMP NOT NULL,
    FOREIGN KEY (perfil_id) REFERENCES perfil(id)
);
