package com.api.documentacion.domain.evento;

import com.api.documentacion.domain.solicitud.Establecimiento;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "eventos")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoEvento tipo;

    private String descripcion;
    private String invitado;

    private LocalDateTime fecha;

    @ManyToOne
    @JoinColumn(name = "establecimiento_id")
    private Establecimiento establecimiento;
}
