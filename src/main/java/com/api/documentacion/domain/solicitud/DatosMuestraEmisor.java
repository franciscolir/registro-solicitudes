package com.api.documentacion.domain.solicitud;


public record DatosMuestraEmisor(
        Long id,
        String establecimiento,
        String comentario
) {

    public DatosMuestraEmisor(Emisor emisor) {

        this(emisor.getId(),
                emisor.getEstablecimiento().getNombreEstablecimiento(),
                emisor.getComentario());
    }


}
