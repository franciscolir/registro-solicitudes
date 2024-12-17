package com.api.documentacion.domain.usuario;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Table(name = "perfiles")
@Entity(name = "Perfil")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")

public class Perfil {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private Rol rol;


    @Override
    public String toString() {
        return "Perfil{" +
                "id=" + id +
                ", rol=" + rol +
                '}';
    }


    public String[] getRoles() {
        // Obtener los roles asociados al perfil
        List<String> roles = new ArrayList<>();
        switch (rol) {
            case ADMIN:
                roles.add("ROLE_ADMIN");
                break;
            case ENCARGADO:
                roles.add("ROLE_ENCARGADO");
                break;
            case USUARIO:
                roles.add("ROLE_USUARIO");
                break;
            case SUBROGANTE:
                roles.add("ROLE_SUBROGANTE");
                break;
            // Agrega más casos según los roles que tengas
        }
        return roles.toArray(new String[0]);
    }
}
