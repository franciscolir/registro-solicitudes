package com.api.documentacion.domain.certificado.dto;

import jakarta.validation.constraints.NotNull;

public record DatosActualizaCertificado(

        @NotNull(message = "id es obligatorio")
        Long id,
        Long numeroCertificado,
        String titulo,
        String descripcion,
        String fechaCertificado
) {
}
