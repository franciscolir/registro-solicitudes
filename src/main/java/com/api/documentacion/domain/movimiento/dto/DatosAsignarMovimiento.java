package com.api.documentacion.domain.movimiento.dto;

import jakarta.validation.constraints.NotNull;

public record DatosAsignarMovimiento(

        @NotNull
        Long id,
        Long unidad,
        String comentarioAsignado
) {
}
