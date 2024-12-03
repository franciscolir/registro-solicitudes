package com.api.documentacion.domain.emisor;

import jakarta.persistence.*;
import lombok.*;

@Entity(name = "CategoriaEmisor")
@Table(name = "categorias_emisor")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")

public class CategoriaEmisor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoEmisor tipo;

    private Boolean activo;

}