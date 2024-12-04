package com.api.documentacion.domain.archivo.dto;

import jakarta.validation.constraints.NotNull;

public record DatosRegistraArchivo(

        @NotNull
        Long claseId,
        @NotNull
        String claseTipo
) {
}