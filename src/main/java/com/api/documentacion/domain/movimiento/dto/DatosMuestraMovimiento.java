package com.api.documentacion.domain.movimiento.dto;

import com.api.documentacion.domain.movimiento.Movimiento;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public record DatosMuestraMovimiento (

        Long id,
        Long solicitud,
        Long certificado,
        Long respuesta,
        String fechaAsignacion,
        String fechaResuelto,
        String nombreUsuario

    ) {
        private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        public DatosMuestraMovimiento (Movimiento movimiento){
            this(movimiento.getId(),
                    movimiento.getSolicitud().getNumeroSolicitud(),
                    movimiento.getCertificado().getNumeroCertificado(),
                    movimiento.getRespuesta().getNumeroRespuesta(),
                    formatDateTime(movimiento.getFechaAsignacion()),
                    formatDateTime(movimiento.getFechaResuelto()),
                    movimiento.getUsuario().getNombre()
            );
        }
    private static String formatDateTime(LocalDateTime dateTime) {
        return dateTime.format(DATE_TIME_FORMATTER);
    }

    }
