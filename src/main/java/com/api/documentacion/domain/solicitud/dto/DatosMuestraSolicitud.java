package com.api.documentacion.domain.solicitud.dto;

import com.api.documentacion.domain.solicitud.Solicitud;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public record DatosMuestraSolicitud(

        Long id,
        Long numeroSolicitud,
        String emisor,
        String titulo,
        String descripcion,
        String fechaSolicitud
) {

    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public DatosMuestraSolicitud(Solicitud solicitud) {
        this(
                solicitud.getId(),
                solicitud.getNumeroSolicitud(),
                solicitud.getEmisor().getEstablecimiento().getNombreEstablecimiento(),
                solicitud.getTitulo(),
                solicitud.getDescripcion(),
                formatDate2(solicitud.getFechaSolicitud())
        );
    }

    private static String formatDate(LocalDateTime dateTime) {
        return dateTime.format(DATE_TIME_FORMATTER);
    }
    private static String formatDate2(LocalDate dateTime) {
        return dateTime.format(DATE_TIME_FORMATTER);
    }
}
