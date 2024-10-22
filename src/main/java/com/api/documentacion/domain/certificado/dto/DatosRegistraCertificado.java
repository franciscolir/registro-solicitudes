package com.api.documentacion.domain.certificado.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


public record DatosRegistraCertificado(

        @NotNull
        Long numeroCertificado,
        @NotBlank
        String titulo,
        @NotBlank
        String descripcion,
        @NotBlank
        String fechaCertificado,
        @NotNull
        Long unidad,
        Long movimiento
) {


}
