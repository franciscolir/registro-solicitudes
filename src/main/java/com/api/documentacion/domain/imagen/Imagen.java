package com.api.documentacion.domain.imagen;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.*;

@Table(name = "imagenes")
@Entity(name = "Imagen")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Imagen {

    @Id
    private Long id;
    @Lob
    private byte[] imagenA;
    @Lob
    private byte[] imagenB;
    @Lob
    private byte[] imagenC;
}
