package com.api.documentacion.domain.certificado.dto;


import com.api.documentacion.domain.certificado.Certificado;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public record DatosMuestraCertificado(

        Long id,
        Long numeroCertificado,
        String unidad,
        String titulo,
        String descripcion,
        String fechaCertificado
) {
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public DatosMuestraCertificado(Certificado certificado){
        this(certificado.getId(),
                certificado.getNumeroCertificado(),
                certificado.getUnidad().getNombreUnidad(),
                certificado.getTitulo(),
                certificado.getDescripcion(),
                formatDate(certificado.getFechaCertificado())
        );
    }

    private static String formatDate(LocalDate dateTime) {
        return dateTime.format(DATE_TIME_FORMATTER);
    }
}
