package com.api.documentacion.domain.usuario;

import com.api.documentacion.domain.evento.Evento;
import com.api.documentacion.domain.unidad.Unidad;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.*;

@Table(name = "usuarios")
@Entity(name = "Usuario")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")

public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String correoElectronico;
    private String contraseña;
    private String comentario;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "perfil_id")
    @JsonManagedReference
    private Perfil perfil;

    private Boolean activo;
    private Boolean subrogante;
    private Boolean encargado;

    private LocalDateTime fechaIngresoSistema;

    @ManyToMany(mappedBy = "invitados",fetch = FetchType.LAZY)
    @JsonManagedReference
    private Set<Evento> eventos = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "unidad_id")
    @JsonManagedReference
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


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        if (perfil != null) {
            for (String role : perfil.getRoles()) {
                authorities.add(new SimpleGrantedAuthority(role));
            }
        }
        return authorities;
    }

    @Override
    public String getPassword() {
        return contraseña;
    }

    @Override
    public String getUsername() {
        return correoElectronico;
    }

}