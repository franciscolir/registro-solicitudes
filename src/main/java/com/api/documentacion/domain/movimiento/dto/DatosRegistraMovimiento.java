package com.api.documentacion.domain.movimiento.dto;


import jakarta.validation.constraints.NotNull;

public record DatosRegistraMovimiento(

        @NotNull(message = "numero de registro es obligatorio")
        Long solicitud,
        Long usuario,
        Long certificado,
        Long respuesta,
        Boolean asignado,
        Boolean rechazado

) {

}
