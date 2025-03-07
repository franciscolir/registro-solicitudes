package com.api.documentacion.domain.ausencias.dto;

import com.api.documentacion.domain.ausencias.Ausencia;
import com.api.documentacion.domain.evento.Evento;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Objects;

public record DatosMuestraAusenciasUsuario(
        Long id,
        String usuario,
        String tipo,
        String fechaInicio,
        String fechaTermino
) {
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public DatosMuestraAusenciasUsuario(Ausencia ausencia) {
        this(
                        ausencia != null ? ausencia.getId() : null,
                        ausencia != null ? ausencia.getUsuario().getNombre() : null,
                        ausencia != null ? ausencia.getTipo().toString() : null,
                        formatDate(Objects.requireNonNull(ausencia).getInicio()),
                        formatDate(Objects.requireNonNull(ausencia).getTermino())
        );
    }



    private static String formatDate(LocalDate dateTime) {
        return dateTime != null ? dateTime.format(DATE_TIME_FORMATTER) : null;
    }


}
