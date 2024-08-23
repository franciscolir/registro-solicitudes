CREATE TABLE emisor (
    id BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    establecimiento_id BIGINT NOT NULL,
    comentario VARCHAR(500),
    FOREIGN KEY (establecimiento_id) REFERENCES establecimiento(id)
);
