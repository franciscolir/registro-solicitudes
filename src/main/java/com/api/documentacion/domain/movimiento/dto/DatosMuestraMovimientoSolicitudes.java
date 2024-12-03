package com.api.documentacion.domain.movimiento.dto;

import com.api.documentacion.domain.movimiento.Movimiento;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public record DatosMuestraMovimientoSolicitudes(

        Long id,
        Long solicitud,
        Long respuesta,
        String emisor,
        String titulo,
        String descripcion,
        String fechaSolicitud,
        String fechaIngreso,
        String estado



) {
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public DatosMuestraMovimientoSolicitudes(Movimiento movimiento) {
        this(
                movimiento.getId(),
                movimiento.getSolicitud().getNumeroSolicitud(),
                movimiento.getRespuesta() != null ? movimiento.getRespuesta().getNumeroRespuesta() : null,
                movimiento.getSolicitud().getEmisor().getNombreEmisor(),
                movimiento.getSolicitud().getTitulo(),
                movimiento.getSolicitud().getDescripcion(),
                formatDate(movimiento.getSolicitud().getFechaSolicitud()),
                formatDateTime(movimiento.getFechaIngreso()),
                movimiento.getEstado() != null ? movimiento.getEstado().toString(): null

        );

    }

    private static String formatDateTime(LocalDateTime dateTime) {
        return dateTime != null ? dateTime.format(DATE_TIME_FORMATTER) : null;
    }
    private static String formatDate(LocalDate dateTime) {
        return dateTime != null ? dateTime.format(DATE_TIME_FORMATTER) : null;
    }



}
