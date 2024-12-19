package com.api.documentacion.domain.usuario.dto;

import com.api.documentacion.domain.usuario.Perfil;
import java.util.Arrays;

public record DatosMuestraListaPerfiles(

        Long id,
        String perfil
) {

    public DatosMuestraListaPerfiles(Perfil perfil) {
        this(
                perfil.getId(),
                Arrays.toString(perfil.getRoles())
        );
    }
}
