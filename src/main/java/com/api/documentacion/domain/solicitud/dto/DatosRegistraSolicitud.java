package com.api.documentacion.domain.solicitud.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.time.LocalDateTime;

public record DatosRegistraSolicitud(



        //registra solicitud
        @NotNull(message = "Emisor es obligatorio")
        Long emisor,
        @NotNull(message = "Numero de solicitud es obligatoria")
        Long solicitudId,
        @NotBlank(message = "Nombre es obligatorio")
        String titulo,
        String descripcion,
        @NotBlank(message = "Nombre es obligatorio")
        @Pattern(regexp = "^(19|20)\\d\\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$", message = "Formato fecha no valido. Ejemplo 'YYYY-MM-DDTHH:MM:SS'")
        LocalDateTime fechaSolicitud

) {
}
