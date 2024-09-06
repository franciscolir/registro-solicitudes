package com.api.documentacion.domain.respuesta.dto;

import com.api.documentacion.domain.respuesta.Respuesta;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public record DatosMuestraRespuesta(

        Long id,
        Long numeroRespuesta,
        String usuario,
        String titulo,
        String descripcion,
        String fechaRespuesta,
        String fechaEnvio,
        Long solicitudId
) {
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public DatosMuestraRespuesta (Respuesta respuesta){
        this(respuesta.getId(),
                respuesta.getNumeroRespuesta(),
                respuesta.getUsuario().getNombre(),
                respuesta.getTitulo(),
                respuesta.getDescripcion(),
                formatDate(respuesta.getFechaRespuesta()),
                formatDateTime(respuesta.getFechaEnvio()),
                respuesta.getSolicitud().getId()
        );
    }

    private static String formatDateTime(LocalDateTime dateTime) {
        return dateTime.format(DATE_TIME_FORMATTER);
    }
    private static String formatDate(LocalDate dateTime) {
        return dateTime.format(DATE_TIME_FORMATTER);
    }
}
