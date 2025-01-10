package com.api.documentacion.domain.usuario;

import com.api.documentacion.domain.unidad.UnidadService;
import com.api.documentacion.domain.usuario.dto.*;
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
import java.util.HashSet;
import java.util.Set;


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
    public void registraUsuario(DatosSubmitFormUsuario datosForm) {
        System.out.println("################################# datos " + datosForm);
        // Mapa que relaciona los roles con las acciones
         /*
        Rol rol = null;

        boolean encargado = false;
        boolean subrogante = false;

        if (datosForm.rol.equals("encargado")) {
            rol = Rol.ROLE_ENCARGADO;
            encargado = true;
        } else if (datosForm.rol.equals("subrogante")) {
            rol = Rol.ROLE_SUBROGANTE;
            subrogante = true;
        } else {
            rol = Rol.ROLE_USER;
        }

         */
        // Validar y asignar el rol
        Set<Perfil> perfiles = obtenerPerfilesPorRol(datosForm.rol);
        System.out.println("################################# perfiles " + perfiles);
        // Verificar si el rol contiene encargado o subrogante
        boolean encargado = perfiles.stream().anyMatch(p -> p.getRol() == Rol.ROLE_ENCARGADO);
        boolean subrogante = perfiles.stream().anyMatch(p -> p.getRol() == Rol.ROLE_SUBROGANTE);


        var datos = new DatosRegistraUsuario(datosForm.nombre, datosForm.correoElectronico, datosForm.contraseña, datosForm.comentario, subrogante, encargado, datosForm.unidad);
        validaCorreoElectronico(datos.correoElectronico());


        // Recuperar el perfil de una sola vez
        //var perfil = perfilRepository.getReferenceById(rolPerfil);



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
                perfiles,
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


    private Set<Perfil> obtenerPerfilesPorRol(String rol) {
        Set<Perfil> perfiles = new HashSet<>();

        switch (rol.toLowerCase()) {
            case "encargado":
                perfiles.add(perfilRepository.getReferenceById(perfilRepository.findIdByRol(Rol.ROLE_ENCARGADO)));
                perfiles.add(perfilRepository.getReferenceById(perfilRepository.findIdByRol(Rol.ROLE_USER)));
                break;
            case "subrogante":
                perfiles.add(perfilRepository.getReferenceById(perfilRepository.findIdByRol(Rol.ROLE_SUBROGANTE)));
                perfiles.add(perfilRepository.getReferenceById(perfilRepository.findIdByRol(Rol.ROLE_USER)));
                break;
            default:
                perfiles.add(perfilRepository.getReferenceById(perfilRepository.findIdByRol(Rol.ROLE_USER)));
                break;
        }
        return perfiles;
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
        System.out.println("################################# 2.5");
        if(usuarioRepository.existsByCorreoElectronico(correoElectronico)){
            System.out.println("################################# 2.6");
            throw new ValidacionDeIntegridad("Correo electronico ya fue registrado");
        }
    }   //__________

    public Usuario getByCorreoElectronico(String correoElectronico) {
        return usuarioRepository.findByCorreoElectronico(correoElectronico)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + correoElectronico));
    }




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