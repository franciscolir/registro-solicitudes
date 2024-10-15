package com.api.documentacion.domain.movimiento.dto;

import jakarta.validation.constraints.NotNull;

public record DatosRechazarMovimiento(

        @NotNull
        Long id,
        String comentarioRechazar
) {
}
