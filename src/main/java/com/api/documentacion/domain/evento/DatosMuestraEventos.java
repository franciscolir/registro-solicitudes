package com.api.documentacion.domain.evento;

import com.api.documentacion.domain.solicitud.Establecimiento;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public record DatosMuestraEventos(Long id,
                                  String tipo,
                                  String descripcion,
                                  String invitado,
                                  String fecha,
                                  String establecimiento) {


    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public DatosMuestraEventos (Evento evento){

         this(evento.getId(),
                 evento.getTipo().toString(),
                 evento.getDescripcion(),
                 evento.getInvitado(),
                 formatDate(evento.getFecha()),
                 evento.getEstablecimiento().getNombreEstablecimiento());
     }
    private static String formatDate(LocalDateTime dateTime) {
        return dateTime.format(DATE_TIME_FORMATTER);
    }
}
