package com.api.documentacion.domain.evento.dto;

import com.api.documentacion.domain.evento.Evento;
import com.api.documentacion.domain.usuario.Usuario;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public record DatosMuestraEventos(Long id,
                                  String categoria,
                                  String fecha,
                                  String establecimiento,
                                  String descripcion,
                                  String invitado
                                  ) {


    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public DatosMuestraEventos (Evento evento){

         this(evento.getId(),
                 evento.getCategoriaEvento().getTipo().toString(),
                 formatDate(evento.getFecha()),
                 evento.getEmisor().getNombreEmisor(),
                 evento.getDescripcion(),
                 evento.getInvitados().stream().map(Usuario::getNombre).toList().toString()
                 );
     }
    private static String formatDate(LocalDateTime dateTime) {
        return dateTime.format(DATE_TIME_FORMATTER);
    }
}
