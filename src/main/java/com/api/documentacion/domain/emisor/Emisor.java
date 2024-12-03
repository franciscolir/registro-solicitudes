package com.api.documentacion.domain.emisor;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "emisores")
@Entity(name = "Emisor")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")

public class Emisor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombreEmisor;

    @OneToOne
    @JoinColumn(name = "categoria_id")
    private CategoriaEmisor categoria;

    private String comentario;
}