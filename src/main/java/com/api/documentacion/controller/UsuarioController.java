package com.api.documentacion.controller;

import com.api.documentacion.domain.usuario.dto.*;
import com.api.documentacion.domain.usuario.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


@Controller
@ResponseBody
@RequestMapping("/usuarios")
//@PreAuthorize("hasRole('ROLE_USER')")
@PreAuthorize("hasRole('ROLE_USER')")
public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;


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
    //@PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/perfiles")
    public ResponseEntity<Page<DatosMuestraListaPerfiles>> listaPerfiles(Pageable paginacion) {
        var listaPerfiles = usuarioService.listaDePerfiles(paginacion);

        return ResponseEntity.ok(listaPerfiles);
    }

    @GetMapping("/roles")
    public ResponseEntity<?> obtenerRoles() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null) {
            // Obtener los roles del usuario
            List<String> roles = authentication.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());
            System.out.println(roles + "roles-------------------------------");
            return ResponseEntity.ok(roles);  // Retornar los roles como respuesta

        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No autenticado");
    }


}
