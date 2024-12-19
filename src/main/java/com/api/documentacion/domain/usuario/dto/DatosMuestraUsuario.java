package com.api.documentacion.domain.usuario.dto;

import com.api.documentacion.domain.usuario.Usuario;

    public record DatosMuestraUsuario(
            Long id,
            String nombre) {

        public DatosMuestraUsuario(Usuario usuario) {
            this(
                    usuario.getId(),
                    usuario.getNombre());
        }


}
