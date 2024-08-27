package com.api.documentacion.domain.solicitud.dto;

import com.api.documentacion.domain.solicitud.Estado;
import com.api.documentacion.domain.solicitud.Solicitud;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import java.time.LocalDateTime;

public record DatosMuestraSolicitud(

        Long id,
        Long solicitudId,
        String emisor,
        String titulo,
        String descripcion,
        LocalDateTime fechaSolicitud,
        Estado estado
) {


    public DatosMuestraSolicitud(Solicitud solicitud) {
        this(
                solicitud.getId(),
                solicitud.getSolicitudId(),
                solicitud.getEmisor().getEstablecimiento().getNombreEstablecimiento(),
                solicitud.getTitulo(),
                solicitud.getDescripcion(),
                solicitud.getFechaSolicitud(),
                solicitud.getEstado()
        );
    }
}
