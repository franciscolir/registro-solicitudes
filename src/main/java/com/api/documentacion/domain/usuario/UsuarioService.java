package com.api.documentacion.domain.usuario;

import com.api.documentacion.domain.unidad.UnidadService;
import com.api.documentacion.domain.usuario.dto.DatosMuestraListaPerfiles;
import com.api.documentacion.domain.usuario.dto.DatosMuestraListaUsuarios;
import com.api.documentacion.domain.usuario.dto.DatosMuestraUsuario;
import com.api.documentacion.domain.usuario.dto.DatosRegistraUsuario;
import com.api.documentacion.infra.configuration.security.PasswordService;
import com.api.documentacion.infra.errores.ValidacionDeIntegridad;
import com.api.documentacion.repository.PerfilRepository;
import com.api.documentacion.repository.UnidadRepository;
import com.api.documentacion.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;


@Service
@Transactional
public class UsuarioService implements UserDetailsService {

    @Autowired
    UsuarioRepository usuarioRepository;
    @Autowired
    PerfilRepository perfilRepository;
    @Autowired
    PasswordService passwordService;
    @Autowired
    UnidadRepository unidadRepository;
    @Autowired
    UnidadService unidadService;


// POST registrar usuario__________________________________________________
    public void registraUsuario(DatosRegistraUsuario datos) {
        validaCorreoElectronico(datos.correoElectronico());
        //var perfil = perfilRepository.getReferenceById(datos.perfil());

        // Mapa que relaciona los roles con las acciones
        System.out.println("################################# 3");
        Rol rol = null;
        System.out.println("################################# datos encargado" + datos.encargado());
        System.out.println("################################# datos subrogante" + datos.subrogante());
        if (datos.encargado()) {
            rol = Rol.ROLE_ENCARGADO;
        } else if (datos.subrogante()) {
            rol = Rol.ROLE_SUBROGANTE;
        } else {
            rol = Rol.ROLE_USER;
        }
        System.out.println("################################# rol" + rol);
        // Recuperar el perfil de una sola vez
        var rolPerfil = perfilRepository.findIdByRol(rol);
        var perfil = perfilRepository.getReferenceById(rolPerfil);



        var fechaIngreso = LocalDateTime.now();
        var contraseña = passwordService.encriptarContraseña(datos.contraseña());
        unidadService.validaUnidad(datos.unidad());
        var unidad = unidadRepository.getReferenceById(datos.unidad());

        var usuario = new Usuario(
                null,
                datos.nombre(),
                datos.correoElectronico(),
                contraseña,
                datos.comentario(),
                perfil,
                true,
                datos.subrogante(),
                datos.encargado(),
                fechaIngreso,
                null,
                unidad
        );
        System.out.println("################################# usuario" + usuario);
        usuarioRepository.save(usuario);
        //new DatosMuestraUsuario(usuario);
    }


    //GET_LISTA__________________________________________
    //obtiene una lista con todas las solicitudes
    public Page<DatosMuestraListaUsuarios> listaDeUsuarios(Pageable paginacion) {

        return usuarioRepository.findByActivoTrue(paginacion).map(DatosMuestraListaUsuarios::new);
    }//_______

    //obtiene una lista con todas las solicitudes
    public Page<DatosMuestraListaUsuarios> listaDeUsuariosEncargados(Pageable paginacion) {

        return usuarioRepository.findByActivoTrueAndSubroganteTrueOrEncargadoTrue(paginacion).map(DatosMuestraListaUsuarios::new);
    }//_______

    public Page<DatosMuestraListaPerfiles> listaDePerfiles(Pageable paginacion) {
        return perfilRepository.findAll(paginacion).map(DatosMuestraListaPerfiles::new);

    }

    //valida id de usuario
    public void validaSiExisteIdAndActivoTrue (Long id) {
        if(!usuarioRepository.existsByIdAndActivoTrue(id)){
            throw new ValidacionDeIntegridad("usuario no existe");
        }
    }   //__________

    //valida id de perfil
    public void validaCorreoElectronico (String correoElectronico) {
        if(usuarioRepository.existsByCorreoElectronico(correoElectronico)){
            throw new ValidacionDeIntegridad("Correo electronico ya fue registrado");
        }
    }   //__________



    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuarioRepository.findByCorreoElectronico(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));
    }

    public Usuario getUserByUsername(String username) {
        return usuarioRepository.findByCorreoElectronico(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));
    }


public void confirmPasswordMethod (String password, String confirmPassword){

        if (!password.equals(confirmPassword)) {
            throw new ValidacionDeIntegridad("Contraesñas no corresponden");
        }
}

}