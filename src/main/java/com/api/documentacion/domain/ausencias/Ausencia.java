package com.api.documentacion.domain.ausencias;

import com.api.documentacion.domain.usuario.Usuario;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;


@Table(name = "ausencias")
@Entity(name = "Ausencia")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Ausencia {
    private Long id;
    private LocalDate inicio;
    private LocalDate termino;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    @JsonManagedReference
    private Usuario usuario;

    @Enumerated(EnumType.STRING)
    private TipoAusencia tipo;


}
