package com.api.documentacion.domain;

import com.api.documentacion.domain.movimiento.Movimiento;
import com.api.documentacion.domain.unidad.Unidad;
import com.api.documentacion.domain.usuario.Usuario;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;



@Table(name = "certificados")
@Entity(name = "Certificado")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Certificado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long numeroCertificado;//numero asignado al documento por emisor. Ingreso manual

    private String titulo;
    private String descripcion;

    private LocalDate fechaCertificado;

    private Boolean activo;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "unidad_id")
    private Unidad unidad;

    @OneToOne(mappedBy = "certificado")
    private Movimiento movimiento;  // Relación inversa
}