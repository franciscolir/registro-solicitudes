package com.api.documentacion.domain.unidad.dto;


import com.api.documentacion.domain.unidad.Unidad;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


public record DatosMuestraListaUnidades(


        Long id,
        String nombre

) {
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public DatosMuestraListaUnidades(Unidad unidad) {
        this(
                unidad.getId(),
                unidad.getNombreUnidad()
        );
    }

    private static String formatDateTime(LocalDateTime dateTime) {
        return dateTime != null ? dateTime.format(DATE_TIME_FORMATTER) : null;
    }
    private static String formatDate(LocalDate dateTime) {
        return dateTime != null ? dateTime.format(DATE_TIME_FORMATTER) : null;
    }



}
