package com.api.documentacion.controller;

import com.api.documentacion.domain.usuario.dto.*;
import com.api.documentacion.domain.usuario.UsuarioService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


@Controller
@ResponseBody
@RequestMapping("/usuarios")
//@PreAuthorize("hasRole('ROLE_USER')")

public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;


    // Página de registro usuario
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/registrar")
    public String registrarForm(Model model) {
        model.addAttribute("register", new DatosSubmitFormUsuario());
        return "register";
    }



    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/registrar")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DatosMuestraUsuario> registraUsuario(@ModelAttribute DatosSubmitFormUsuario datos, Model model) {

        System.out.println("################################# 1");
        model.addAttribute("register",datos);
        usuarioService.confirmPasswordMethod(datos.contraseña, datos.confirmContraseña);
        var datosRegistraUsuario = new DatosRegistraUsuario(datos.nombre, datos.correoElectronico, datos.comentario, datos.contraseña, datos.subrogante,datos.encargado, datos.unidad);
        var usuario = usuarioService.registraUsuario(datosRegistraUsuario);
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
