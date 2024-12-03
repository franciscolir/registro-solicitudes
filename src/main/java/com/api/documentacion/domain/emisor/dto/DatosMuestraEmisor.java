package com.api.documentacion.domain.emisor.dto;


import com.api.documentacion.domain.emisor.Emisor;

public record DatosMuestraEmisor(
        Long id,
        String establecimiento,
        String comentario
) {

    public DatosMuestraEmisor(Emisor emisor) {

        this(emisor.getId(),
                emisor.getNombreEmisor(),
                emisor.getComentario());
    }


}
