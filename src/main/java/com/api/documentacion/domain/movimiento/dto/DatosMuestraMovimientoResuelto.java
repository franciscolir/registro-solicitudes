package com.api.documentacion.domain.movimiento.dto;

import com.api.documentacion.domain.movimiento.Movimiento;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public record DatosMuestraMovimientoResuelto(

        Long id,
        Long solicitud,
        Long certificado,
        String fechaResuelto,
        String nombreUsuario,
        String comentarioResuelto,
        String estado

    ) {
        private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        public DatosMuestraMovimientoResuelto (Movimiento movimiento){
            this(movimiento.getId(),
                    movimiento.getSolicitud().getNumeroSolicitud(),
                    movimiento.getCertificado().getNumeroCertificado(),
                    formatDateTime(movimiento.getFechaResuelto()),
                    movimiento.getUsuario().getNombre(),
                    movimiento.getComentarioResuelto(),
                    movimiento.getEstado().toString()
            );
        }
    private static String formatDateTime(LocalDateTime dateTime) {
        return dateTime.format(DATE_TIME_FORMATTER);
    }

    }
