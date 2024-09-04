package com.api.documentacion.domain.usuario;

import com.api.documentacion.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
@Transactional
public class UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;



    //GET_LISTA__________________________________________
    //obtiene una lista con todas las solicitudes
    public Page<DatosMuestraListaUsuarios> listaDeUsuarios(Pageable paginacion) {

        return usuarioRepository.findByActivoTrue(paginacion).map(DatosMuestraListaUsuarios::new);
    }//_______

}
