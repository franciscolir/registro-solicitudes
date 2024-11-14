package com.api.documentacion.domain.usuario;

import com.api.documentacion.domain.usuario.dto.DatosMuestraListaUsuarios;
import com.api.documentacion.infra.errores.ValidacionDeIntegridad;
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

    //obtiene una lista con todas las solicitudes
    public Page<DatosMuestraListaUsuarios> listaDeUsuariosEncargados(Pageable paginacion) {

        return usuarioRepository.findByActivoTrueAndSubroganteTrueOrEncargadoTrue(paginacion).map(DatosMuestraListaUsuarios::new);
    }//_______


    //valida id de usuario
    public void validaSiExisteIdAndActivoTrue (Long id) {
        if(!usuarioRepository.existsByIdAndActivoTrue(id)){
            throw new ValidacionDeIntegridad("usuario no existe");
        }
    }   //__________


}
