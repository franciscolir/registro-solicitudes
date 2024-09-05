package com.api.documentacion.domain.evento;

import com.api.documentacion.domain.emisor.Establecimiento;
import com.api.documentacion.domain.usuario.Usuario;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "eventos")
@Getter
@Setter
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


    private LocalDateTime fecha;

    @ManyToOne
    @JoinColumn(name = "establecimiento_id")
    private Establecimiento establecimiento;

    @ManyToMany
    @JoinTable(
            name = "evento_usuario",
            joinColumns = @JoinColumn(name = "evento_id"),
            inverseJoinColumns = @JoinColumn(name = "usuario_id")
    )
    private Set<Usuario> invitados = new HashSet<>();

    public Evento(Long id, TipoEvento tipo, String descripcion, LocalDateTime fecha, Establecimiento establecimiento) {
        this.id = id;
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.establecimiento = establecimiento;
    }


    public void setUsuarios(Set<Usuario> usuarios) {
    }

    @Override
    public String toString() {
        return "Evento{" +
                "id=" + id +
                ", tipo=" + tipo +
                ", descripcion='" + descripcion + '\'' +
                ", fecha=" + fecha +
                ", establecimiento=" + establecimiento +
                ", invitados=" + invitados +
                '}';
    }
}
