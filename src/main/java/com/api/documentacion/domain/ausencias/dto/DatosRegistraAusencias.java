package com.api.documentacion.domain.ausencias.dto;

public record DatosRegistraAusencias(

        Long usuario,
        String fechaInicio,
        String fechaTermino,
        String tipoAusencia
) {
}
