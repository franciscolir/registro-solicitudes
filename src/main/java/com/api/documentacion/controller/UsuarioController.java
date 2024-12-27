package com.api.documentacion.controller;

import com.api.documentacion.domain.usuario.dto.DatosMuestraListaPerfiles;
import com.api.documentacion.domain.usuario.dto.DatosMuestraListaUsuarios;
import com.api.documentacion.domain.usuario.UsuarioService;
import com.api.documentacion.domain.usuario.dto.DatosMuestraUsuario;
import com.api.documentacion.domain.usuario.dto.DatosRegistraUsuario;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@ResponseBody
@RequestMapping("/usuarios")
//@PreAuthorize("hasRole('ROLE_USER')")

public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/registrar")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DatosMuestraUsuario> registraUsuario(@RequestParam("nombre") String nombre,
                                                               @RequestParam("correoElectronico") String correoElectronico,
                                                               @RequestParam("contraseña") String contraseña,
                                                               @RequestParam("unidad") Long unidad,
                                                               @RequestParam("subrogante") boolean subrogante,
                                                               @RequestParam("encargado") boolean encargado,
                                                               @RequestParam("comentario") String comentario,
                                                               HttpServletRequest request) {

        var datos = new DatosRegistraUsuario(nombre,correoElectronico,contraseña,comentario,subrogante,encargado,unidad);

        System.out.println("################################# 1");
        var usuario = usuarioService.registraUsuario(datos);
        System.out.println("################################# 2");
        return ResponseEntity.ok(usuario);
    }


    //Obtener lista de usuarios
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<Page<DatosMuestraListaUsuarios>> listaUsuarios(Pageable paginacion) {
        var listaUsuarios = usuarioService.listaDeUsuarios(paginacion);

        return ResponseEntity.ok(listaUsuarios);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/encargados")
    public ResponseEntity<Page<DatosMuestraListaUsuarios>> listaUsuariosEncargados(Pageable paginacion) {
        var listaUsuarios = usuarioService.listaDeUsuariosEncargados(paginacion);

        return ResponseEntity.ok(listaUsuarios);
    }

    //Obtener lista de usuarios
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/perfiles")
    public ResponseEntity<Page<DatosMuestraListaPerfiles>> listaPerfiles(Pageable paginacion) {
        var listaPerfiles = usuarioService.listaDePerfiles(paginacion);

        return ResponseEntity.ok(listaPerfiles);
    }

}
