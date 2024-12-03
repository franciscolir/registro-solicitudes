package com.api.documentacion.domain.solicitud.dto;

import com.api.documentacion.domain.movimiento.Movimiento;
import com.api.documentacion.domain.solicitud.Solicitud;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public record DatosMuestraSolicitudConMovimiento(

        Long id,
        Long numeroSolicitud,
        String emisor,
        String titulo,
        String descripcion,
        String fechaSolicitud,
        String estado,
        String fechaIngreso
) {

    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public DatosMuestraSolicitudConMovimiento(Solicitud solicitud, Movimiento movimiento) {
        this(
                solicitud.getId(),
                solicitud.getNumeroSolicitud(),
                solicitud.getEmisor().getNombreEmisor(),
                solicitud.getTitulo(),
                solicitud.getDescripcion(),
                formatDate(solicitud.getFechaSolicitud()),
                movimiento.getEstado().toString(),
                formatDateTime(movimiento.getFechaIngreso())


          );
    }

    private static String formatDateTime(LocalDateTime dateTime) {
        return dateTime != null ? dateTime.format(DATE_TIME_FORMATTER) : null;
    }
    private static String formatDate(LocalDate dateTime) {
        return dateTime != null ? dateTime.format(DATE_TIME_FORMATTER) : null;
    }
}
