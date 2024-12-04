package com.api.documentacion.domain.archivo;

import com.api.documentacion.domain.certificado.Certificado;
import com.api.documentacion.domain.respuesta.Respuesta;
import com.api.documentacion.domain.solicitud.Solicitud;
import jakarta.persistence.*;
import lombok.*;

@Table(name = "archivos")
@Entity(name = "Archivo")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Archivo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String ruta;

    @ManyToOne
    @JoinColumn(name = "solicitud_id")
    private Solicitud solicitud;

    @ManyToOne
    @JoinColumn(name = "certificado_id")
    private Certificado certificado;

    @ManyToOne
    @JoinColumn(name = "respuesta_id")
    private Respuesta respuesta;


}
-- Crear tabla ClaseX
CREATE TABLE ClaseX (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        descripcion VARCHAR(255) NOT NULL
);

        -- Crear tabla ClaseY
CREATE TABLE ClaseY (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        descripcion VARCHAR(255) NOT NULL
);

        -- Crear tabla ClaseZ
CREATE TABLE ClaseZ (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        descripcion VARCHAR(255) NOT NULL
);

        -- Crear tabla Imagen
CREATE TABLE Imagen (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
ruta VARCHAR(255) NOT NULL,
clase_x_id BIGINT,
clase_y_id BIGINT,
clase_z_id BIGINT,
FOREIGN KEY (clase_x_id) REFERENCES ClaseX(id) ON DELETE SET NULL,
FOREIGN KEY (clase_y_id) REFERENCES ClaseY(id) ON DELETE SET NULL,
FOREIGN KEY (clase_z_id) REFERENCES ClaseZ(id) ON DELETE SET NULL
);



        -- Crear índice para la columna 'clase_x_id' de la tabla Imagen
CREATE INDEX idx_clase_x_id ON Imagen(clase_x_id);

-- Crear índice para la columna 'clase_y_id' de la tabla Imagen
CREATE INDEX idx_clase_y_id ON Imagen(clase_y_id);

-- Crear índice para la columna 'clase_z_id' de la tabla Imagen
CREATE INDEX idx_clase_z_id ON Imagen(clase_z_id);
