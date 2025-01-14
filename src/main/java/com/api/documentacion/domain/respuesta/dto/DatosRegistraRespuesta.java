package com.api.documentacion.domain.respuesta.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DatosRegistraRespuesta(

        @NotNull(message = "numero de movimiento es obligatorio")
        Long movimiento,
        @NotNull(message = "id de usuario es obligatoria")
        Long usuario,
        @NotBlank(message = "Titulo es obligatorio")
        String titulo,
        String descripcion,
        String comentario
) {
}
