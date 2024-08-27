package com.api.documentacion.domain.solicitud.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;


public record DatosActualizaSolicitud(
        @NotNull(message = "Id es obligatorio")
        Long id,
        Long emisorId,
        Long numeroSolicitud,
        String titulo,
        String descripcion,
        @Pattern(regexp = "^(19|20)\\d\\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$", message = "Formato fecha no valido. Ejemplo 'YYYY-MM-DDTHH:MM:SS'")
        String fechaSolicitud
) {
}
