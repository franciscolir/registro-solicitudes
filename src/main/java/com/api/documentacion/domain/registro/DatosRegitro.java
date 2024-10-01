package com.api.documentacion.domain.registro;


import jakarta.validation.constraints.NotNull;

public record DatosRegitro(

        @NotNull(message = "numero de registro es obligatorio")
        Long solicitud,
        Long usuario,
        Long certificado,
        Long respuesta

) {

}
