package com.api.documentacion.domain.respuesta.dto;

import com.api.documentacion.domain.respuesta.Respuesta;
import java.time.LocalDateTime;

public record DatosMuestraRespuesta(

        Long id,
        Long numeroRespuesta,
        String usuario,
        String titulo,
        String descripcion,
        LocalDateTime fechaRespuesta,
        LocalDateTime fechaEnvio,
        Long solicitudId
) {

    public DatosMuestraRespuesta (Respuesta respuesta){
        this(respuesta.getId(),
                respuesta.getNumeroRespuesta(),
                respuesta.getUsuario().getNombre(),
                respuesta.getTitulo(),
                respuesta.getDescripcion(),
                respuesta.getFechaRespuesta(),
                respuesta.getFechaEnvio(),
                respuesta.getSolicitud().getId()
        );
    }
}
