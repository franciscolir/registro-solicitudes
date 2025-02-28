package com.api.documentacion.domain.ausencias;

import com.api.documentacion.domain.usuario.Usuario;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDate;


@Table(name = "permisos_administrativos")
@Entity(name = "PermisoAdministrativo")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class PermisoAdministrativo {
    private Long id;
    private LocalDate inicio;
    private LocalDate termino;
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    @JsonManagedReference
    private Usuario usuario;
}
