package com.api.documentacion.domain.respuesta.dto;

import jakarta.validation.constraints.NotNull;

public record DatosEliminaRespuesta(
        @NotNull(message = "id de Respuesta es obligatorio")
        Long id,
        String comentario
) {
}
