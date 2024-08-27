package com.api.documentacion.domain.solicitud.dto;

import com.api.documentacion.domain.solicitud.Solicitud;

public record DatosMuestraSolicitud(

        Long id,
        Long numeroSolicitud,
        String emisor,
        String titulo,
        String descripcion,
        String fechaSolicitud,
        String fechaIngresoDepartamento,
        String estado
) {

    public DatosMuestraSolicitud(Solicitud solicitud) {
        this(
                solicitud.getId(),
                solicitud.getNumeroSolicitud(),
                solicitud.getEmisor().getEstablecimiento().getNombreEstablecimiento(),
                solicitud.getTitulo(),
                solicitud.getDescripcion(),
                solicitud.getFechaSolicitud().toString(),
                solicitud.getFechaIngresoSolicitud().toString(),
                solicitud.getEstado().toString()
        );
    }
}
