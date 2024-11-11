package com.api.documentacion.domain.movimiento.dto;

import jakarta.validation.constraints.NotNull;

public record DatosRegistraMovimiento(

        @NotNull(message = "numero de registro es obligatorio")
        Long solicitud
        //@NotNull(message = "numero de emisor es obligatorio")
        //Long emisor
) {

}
