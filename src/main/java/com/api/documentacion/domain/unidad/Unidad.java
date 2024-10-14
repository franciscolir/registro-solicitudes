package com.api.documentacion.domain.unidad;

import com.api.documentacion.domain.movimiento.Movimiento;
import com.api.documentacion.domain.usuario.Usuario;
import jakarta.persistence.*;
import lombok.*;
import java.util.Set;

@Table(name = "unidades")
@Entity(name = "Unidad")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Unidad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long numeroUnidad;//numero asignado al documento por emisor. Ingreso manual

    private String nombreUnidad;
    private String descripcion;

    private Boolean activo;

    @OneToMany(mappedBy = "unidad", cascade = CascadeType.ALL)
    private Set<Usuario> usuarios;

    @OneToOne(mappedBy = "unidad")
    private Movimiento movimiento;
}