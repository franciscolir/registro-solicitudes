package com.api.documentacion.domain.solicitud.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DatosDeclinarSolicitud(
        @NotNull(message = "Id es obligatorio")
        Long id,
        @NotNull(message = "Id usuarioes obligatorio")
        Long usuarioId,
        @NotBlank(message = "debe incluir comentario")
        String comentario
       ) {
}
