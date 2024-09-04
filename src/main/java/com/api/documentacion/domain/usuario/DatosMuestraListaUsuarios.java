package com.api.documentacion.domain.usuario;


public record DatosMuestraListaUsuarios(
        Long id,
        String nombre) {

    public DatosMuestraListaUsuarios(Usuario usuario) {
        this(
                usuario.getId(),
                usuario.getNombre());
    }
}
