package com.api.documentacion.domain.usuario.dto;

import com.api.documentacion.domain.evento.Evento;
import com.api.documentacion.domain.unidad.Unidad;
import com.api.documentacion.domain.usuario.Perfil;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

public record DatosRegistraUsuario(

        @NotBlank(message = "Nombre es obligatorio")
        String nombre,
        @NotBlank(message = "Email es obligatorio")
        String correoElectronico,
        @NotBlank(message = "Contraseña es obligatoria")
        String contraseña,
        String comentario,
        //Long perfil,
        Boolean subrogante,
        Boolean encargado,
        @NotBlank(message = "Unidad es obligatoria")
        Long unidad
) {



}
