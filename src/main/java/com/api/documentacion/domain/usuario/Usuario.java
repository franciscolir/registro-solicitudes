package com.api.documentacion.domain.usuario;

import com.api.documentacion.domain.evento.Evento;
import com.api.documentacion.domain.unidad.Unidad;
import com.api.documentacion.domain.ausencias.FeriadoLegal;
import com.api.documentacion.domain.ausencias.Licencia;
import com.api.documentacion.domain.ausencias.PermisoAdministrativo;
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
/*
    @ManyToOne(fetch = FetchType.EAGER)



    @JoinColumn(name = "perfil_id")
    @JsonManagedReference
    private Perfil perfil;
*/
    // asigna mas de un perfil por usuario

    @ManyToMany(fetch = FetchType.EAGER)  // Relación ManyToMany para permitir varios perfiles
    @JoinTable(
            name = "usuario_perfil",
            joinColumns = @JoinColumn(name = "usuario_id"),
            inverseJoinColumns = @JoinColumn(name = "perfil_id")
    )
    @JsonManagedReference
    private Set<Perfil> perfiles = new HashSet<>();

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

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<FeriadoLegal> feriadoLegal;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<PermisoAdministrativo> permisoAdministrativo;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Licencia> licencia;



    public Usuario(Long id, String nombre, String correoElectronico, String contraseña, String comentario, Boolean activo, LocalDateTime fechaIngresoSistema) {
        this.id = id;
        this.nombre = nombre;
        this.correoElectronico = correoElectronico;
        this.contraseña = contraseña;
        this.comentario = comentario;
        this.activo = activo;
        this.fechaIngresoSistema = fechaIngresoSistema;
    }


    public void actualizaAusencias (Long id,List<FeriadoLegal> feriadoLegal, List<PermisoAdministrativo> permisoAdministrativo, List<Licencia> licencia){
        this.id = id;
        if(feriadoLegal != null)
            this.feriadoLegal = feriadoLegal;
        if(permisoAdministrativo != null)
            this.permisoAdministrativo = permisoAdministrativo;
        if(licencia != null)
            this.licencia = licencia;
    }
    @Override
    public String toString() {
        return "Usuario{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", correoElectronico='" + correoElectronico + '\'' +
                ", contraseña='" + contraseña + '\'' +
                ", comentario='" + comentario + '\'' +

                ", activo=" + activo +
                '}';
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<GrantedAuthority> authorities = new HashSet<>();
        if (perfiles != null) {
            for (Perfil perfil : perfiles) {
                for (String role : perfil.getRoles()) {
                    authorities.add(new SimpleGrantedAuthority(role));
                }
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