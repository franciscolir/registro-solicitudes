package com.api.documentacion.domain.usuario;

import com.api.documentacion.domain.Certificado;
import com.api.documentacion.domain.evento.Evento;
import com.api.documentacion.domain.movimiento.Movimiento;
import com.api.documentacion.domain.unidad.Unidad;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Table(name = "usuarios")
@Entity(name = "Usuario")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")

public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String correoElectronico;
    private String contraseña;
    private String comentario;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "perfil_id")
    private Perfil perfil;

    private Boolean activo;

    private LocalDateTime fechaIngresoSistema;

    @ManyToMany(mappedBy = "invitados",fetch = FetchType.LAZY)
    private Set<Evento> eventos = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "unidad_id")
    private Unidad unidad;


    public Usuario(Long id, String nombre, String correoElectronico, String contraseña, String comentario, Perfil perfil, Boolean activo, LocalDateTime fechaIngresoSistema) {
        this.id = id;
        this.nombre = nombre;
        this.correoElectronico = correoElectronico;
        this.contraseña = contraseña;
        this.comentario = comentario;
        this.perfil = perfil;
        this.activo = activo;
        this.fechaIngresoSistema = fechaIngresoSistema;
    }

    @Override
    public String toString() {
        return "Usuario{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", correoElectronico='" + correoElectronico + '\'' +
                ", contraseña='" + contraseña + '\'' +
                ", comentario='" + comentario + '\'' +
                ", perfil=" + perfil +
                ", activo=" + activo +
                '}';
    }
}