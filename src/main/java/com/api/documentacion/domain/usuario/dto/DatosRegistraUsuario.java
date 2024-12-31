package com.api.documentacion.domain.usuario.dto;


import jakarta.validation.constraints.NotBlank;


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
