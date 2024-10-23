package com.api.documentacion.domain.movimiento.dto;

import com.api.documentacion.domain.movimiento.Movimiento;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


public record DatosMuestraMovimientoRespuestas(

        Long id,
        Long numeroRespuesta,
        String titulo,
        String descripcion,
        String fechaRespuesta,
        String fechaEnvio,
        Long numeroSolicitud



) {
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public DatosMuestraMovimientoRespuestas(Movimiento movimiento) {

        this(
                movimiento.getId(),
                movimiento.getRespuesta() != null ? movimiento.getRespuesta().getNumeroRespuesta() : null,
                movimiento.getRespuesta() != null ? movimiento.getRespuesta().getTitulo() : null,
                movimiento.getRespuesta() != null ? movimiento.getRespuesta().getDescripcion() : null,
                formatDate(movimiento.getRespuesta() != null ? movimiento.getRespuesta().getFechaRespuesta() : null),
                formatDateTime(movimiento.getFechaCierre()),
                movimiento.getSolicitud().getNumeroSolicitud()

        );

    }

    private static String formatDateTime(LocalDateTime dateTime) {
        return dateTime != null ? dateTime.format(DATE_TIME_FORMATTER) : null;
    }
    private static String formatDate(LocalDate dateTime) {
        return dateTime != null ? dateTime.format(DATE_TIME_FORMATTER) : null;
    }



}
