package com.api.documentacion.domain.evento.dto;


import com.api.documentacion.domain.evento.CategoriaEvento;


public record DatosMuestraCategoria (

        Long id,
        String categoria
){

    public DatosMuestraCategoria(CategoriaEvento categoriaEvento) {
        this(
                categoriaEvento.getId(),
                categoriaEvento.getTipo().toString());
             }


}
