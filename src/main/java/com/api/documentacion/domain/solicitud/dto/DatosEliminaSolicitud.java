package com.api.documentacion.domain.solicitud.dto;

import jakarta.validation.constraints.NotNull;

public record DatosEliminaSolicitud(

        @NotNull(message = "id de Solicitud es obligatorio")
        Long emisorId,
        @NotNull(message = "id de Solicitud es obligatorio")
        Long solicitudId,

        String comentario
) {
}
