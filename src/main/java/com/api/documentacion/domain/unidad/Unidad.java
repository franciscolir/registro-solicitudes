package com.api.documentacion.domain.unidad;

import com.api.documentacion.domain.certificado.Certificado;
import com.api.documentacion.domain.movimiento.Movimiento;
import com.api.documentacion.domain.usuario.Usuario;
import com.fasterxml.jackson.annotation.JsonBackReference;
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

    @OneToMany(mappedBy = "unidad",fetch = FetchType.LAZY)
    @JsonBackReference
    private Set<Usuario> usuarios;

    @OneToMany(mappedBy = "unidad", fetch = FetchType.LAZY)
    @JsonBackReference
    private Set<Movimiento> movimientos; // Relación OneToMany

    @OneToMany(mappedBy = "unidad")  // Relación bidireccional
    private Set<Certificado> certificados;  // Una unidad tiene varios certificados

    public void eliminarUnidad(Long id) {
        this.id = id;
        this.activo = false;
    }
}