package com.api.documentacion.domain.evento;

import jakarta.persistence.*;
import lombok.*;


@Entity(name = "CategoriaEvento")
@Table(name = "categorias_evento")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")

public class CategoriaEvento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoEvento tipo;

    private Boolean activo;

}

