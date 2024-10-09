package com.api.documentacion.domain.movimiento.dto;

import com.api.documentacion.domain.movimiento.Movimiento;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public record DatosMuestraMovimientoAsignacion(

        Long id,
        Long solicitud,
        String fechaAsignacion,
        String nombreUsuario,
        String comentarioAsignacion,
        String estado,
        Boolean resuelto,
        Boolean asignado
) {
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public DatosMuestraMovimientoAsignacion(Movimiento movimiento){
        this(movimiento.getId(),
                movimiento.getSolicitud().getNumeroSolicitud(),
                formatDateTime(movimiento.getFechaAsignacion()),
                movimiento.getUsuario().getNombre(),
                movimiento.getComentarioAsignacion(),
                movimiento.getEstado().toString(),
                movimiento.getResuelto(),
                movimiento.getAsignado()
        );
    }
    private static String formatDateTime(LocalDateTime dateTime) {
        return dateTime.format(DATE_TIME_FORMATTER);
    }

}