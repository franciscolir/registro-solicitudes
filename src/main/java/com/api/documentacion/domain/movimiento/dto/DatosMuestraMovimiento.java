package com.api.documentacion.domain.movimiento.dto;

import com.api.documentacion.domain.movimiento.Movimiento;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Objects;


public record DatosMuestraMovimiento (

        Long id,
        Long solicitud,
        Long certificado,
        Long respuesta,
        String fechaAsignacion,
        String fechaResuelto,
        String fechaCierre,
        String nombreUsuario,
        String comentarioAsignacion,
        String comentarioResuelto,
        String estado,
        String emisor,
        String titulo,
        String fechaSolicitud,
        Boolean asignado,
        Boolean resuelto

) {
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public DatosMuestraMovimiento(Movimiento movimiento) {
        this(
                movimiento.getId(),
                movimiento.getSolicitud().getNumeroSolicitud(),
                movimiento.getCertificado() != null ? movimiento.getCertificado().getNumeroCertificado() : null,
                movimiento.getRespuesta() != null ? movimiento.getRespuesta().getNumeroRespuesta() : null,
                formatDateTime(movimiento.getFechaAsignacion()),
                formatDateTime(movimiento.getFechaResuelto()),
                formatDateTime(movimiento.getFechaCierre()),
                movimiento.getUsuario() != null ? movimiento.getUsuario().getNombre() : null,
                movimiento.getComentarioAsignacion() != null ? movimiento.getComentarioAsignacion() : null,
                movimiento.getComentarioResuelto() != null ? movimiento.getComentarioResuelto() : null,
                movimiento.getEstado() != null ? movimiento.getEstado().toString() : null,
                movimiento.getSolicitud() != null ? movimiento.getSolicitud().getEmisor().getEstablecimiento().getNombreEstablecimiento() : null,
                movimiento.getSolicitud() != null ? movimiento.getSolicitud().getTitulo() : null,
                formatDate(Objects.requireNonNull(movimiento.getSolicitud()).getFechaSolicitud()),
                movimiento.getAsignado(),
                movimiento.getResuelto()
        );

}

    private static String formatDateTime(LocalDateTime dateTime) {
        return dateTime != null ? dateTime.format(DATE_TIME_FORMATTER) : null;
    }
    private static String formatDate(LocalDate dateTime) {
        return dateTime != null ? dateTime.format(DATE_TIME_FORMATTER) : null;
    }



}
