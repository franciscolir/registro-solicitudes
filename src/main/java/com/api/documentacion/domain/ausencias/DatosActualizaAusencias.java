package com.api.documentacion.domain.ausencias;

public record DatosActualizaAusencias(

        Long usuario,
        String feriadoLegalInicio,
        String feriadoLegalTermino,
        String permisoAdministrativoInicio,
        String permisoAdministrativoTermino,
        String licenciaInicio,
        String licenciaTermino
) {
}
