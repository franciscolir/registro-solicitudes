package com.api.documentacion.domain.usuario;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Table(name = "usuarios")
@Entity(name = "Usuario")
@Getter
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




    public Usuario(Long id, String nombre, String correoElectronico, String contraseña, Perfil perfil, Boolean activo, LocalDateTime fecha, String comentario) {
        this.id = getId();
        this.nombre = nombre;
        this.correoElectronico = correoElectronico;
        this.contraseña = contraseña;
        this.perfil = perfil;
        this.activo = true;
        this.fechaIngresoSistema = fecha;
        this.comentario = comentario;
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
