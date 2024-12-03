package com.api.documentacion.domain.evento;

import com.api.documentacion.domain.emisor.Emisor;
import com.api.documentacion.domain.usuario.Usuario;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity(name = "Evento")
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

    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private CategoriaEvento categoriaEvento;

    private String descripcion;


    private LocalDateTime fecha;

    @ManyToOne
    @JoinColumn(name = "emisor_id")
    private Emisor emisor;

    @ManyToMany
    @JoinTable(
            name = "evento_usuario",
            joinColumns = @JoinColumn(name = "evento_id"),
            inverseJoinColumns = @JoinColumn(name = "usuario_id")
    )
    private Set<Usuario> invitados = new HashSet<>();

    public Evento(Long id, CategoriaEvento categoriaEvento, String descripcion, LocalDateTime fecha, Emisor emisor) {
        this.id = id;
        this.categoriaEvento = categoriaEvento;
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.emisor = emisor;
    }


    public void setUsuarios(Set<Usuario> usuarios) {
    }

    @Override
    public String toString() {
        return "Evento{" +
                "id=" + id +
                ", categoria=" + categoriaEvento +
                ", descripcion='" + descripcion + '\'' +
                ", fecha=" + fecha +
                ", establecimiento=" + emisor +
                ", invitados=" + invitados +
                '}';
    }
}
