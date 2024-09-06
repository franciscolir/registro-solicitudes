package com.api.documentacion.domain.respuesta.dto;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.time.LocalDateTime;

public record DatosActualizaRespuesta(
        @NotNull(message = "id es obligatorio")
        Long id,
        Long solicitudId,
        Long respuestaId,
        String titulo,
        String descripcion,
        @Pattern(regexp = "^(19|20)\\d\\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$", message = "Formato fecha no valido. Ejemplo 'YYYY-MM-DD'")
        String fechaRespuesta) {
}
