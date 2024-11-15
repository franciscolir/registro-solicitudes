package com.api.documentacion.domain.evento.dto;


import com.api.documentacion.domain.evento.Categoria;


public record DatosMuestraCategoria (

        Long id,
        String nombreCategoria
){

    public DatosMuestraCategoria(Categoria categoria) {
        this(
                categoria.getId(),
                categoria.getTipo().name());
             }


}
