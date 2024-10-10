package com.api.documentacion.domain.unidad;

import com.api.documentacion.domain.movimiento.Movimiento;
import com.api.documentacion.domain.usuario.Usuario;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

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

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @OneToOne(mappedBy = "unidad")
    private Movimiento movimiento;  // Relación inversa
}