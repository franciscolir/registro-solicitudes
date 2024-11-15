package com.api.documentacion.domain.evento.dto;


import com.api.documentacion.domain.evento.Categoria;


public record DatosMuestraCategoria (

        Long id,
        String categoria
){

    public DatosMuestraCategoria(Categoria categoria) {
        this(
                categoria.getId(),
                categoria.getTipo().toString());
             }


}
