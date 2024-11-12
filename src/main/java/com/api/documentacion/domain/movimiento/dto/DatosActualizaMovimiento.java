package com.api.documentacion.domain.movimiento.dto;

import jakarta.validation.constraints.NotNull;

public record DatosActualizaMovimiento(

        @NotNull
        Long id,
        String comentarioResuelto,
        @NotNull
        Long certificado

) {
}
