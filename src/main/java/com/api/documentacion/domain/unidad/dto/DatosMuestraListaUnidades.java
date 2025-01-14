package com.api.documentacion.domain.unidad.dto;

import com.api.documentacion.domain.unidad.Unidad;

public record DatosMuestraListaUnidades(


        Long id,
        String nombre

) {
      public DatosMuestraListaUnidades(Unidad unidad) {
        this(
                unidad.getId(),
                unidad.getNombreUnidad()
        );
    }

}
