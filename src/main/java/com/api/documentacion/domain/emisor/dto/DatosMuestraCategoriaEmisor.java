package com.api.documentacion.domain.emisor.dto;

import com.api.documentacion.domain.emisor.CategoriaEmisor;


public record DatosMuestraCategoriaEmisor(

        Long id,
        String tipo
){

    public DatosMuestraCategoriaEmisor(CategoriaEmisor categoria) {
        this(
                categoria.getId(),
                categoria.getTipo().toString());
    }


}