package com.api.documentacion.controller;

import com.api.documentacion.domain.usuario.dto.DatosMuestraListaUsuarios;
import com.api.documentacion.domain.usuario.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@ResponseBody
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;

    //Obtener lista de usuarios
    @GetMapping
    public ResponseEntity<Page<DatosMuestraListaUsuarios>> listaUsuarios(Pageable paginacion) {
        var listaUsuarios = usuarioService.listaDeUsuarios(paginacion);

        return ResponseEntity.ok(listaUsuarios);
    }

}
