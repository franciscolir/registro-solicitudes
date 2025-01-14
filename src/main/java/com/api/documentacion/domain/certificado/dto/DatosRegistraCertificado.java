package com.api.documentacion.domain.certificado.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


public record DatosRegistraCertificado(

        @NotBlank
        String titulo,
        @NotBlank
        String descripcion,
        String comentario,
        @NotNull
        Long unidad,
        Long movimiento
) {


}
