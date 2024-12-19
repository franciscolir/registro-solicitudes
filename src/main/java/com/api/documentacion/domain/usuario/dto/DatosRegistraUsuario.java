package com.api.documentacion.domain.usuario.dto;

import com.api.documentacion.domain.evento.Evento;
import com.api.documentacion.domain.unidad.Unidad;
import com.api.documentacion.domain.usuario.Perfil;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

public record DatosRegistraUsuario(

        String nombre,
        String correoElectronico,
        String contraseña,
        String comentario,
        Long perfil,
        Boolean subrogante,
        Boolean encargado,
        Long unidad
) {



}
