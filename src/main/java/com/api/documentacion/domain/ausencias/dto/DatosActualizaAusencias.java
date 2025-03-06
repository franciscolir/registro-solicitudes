package com.api.documentacion.domain.ausencias.dto;

public record DatosActualizaAusencias(

        Long idAusencia,
        String fechaInicio,
        String fechaTermino
) {
}
