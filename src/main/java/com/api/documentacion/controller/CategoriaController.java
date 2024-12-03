package com.api.documentacion.controller;

import com.api.documentacion.domain.evento.CategoriaEventoService;
import com.api.documentacion.domain.evento.dto.DatosMuestraCategoria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RestController
@RequestMapping("/categoria")
public class CategoriaController {

    @Autowired
    CategoriaEventoService categoriaEventoService;

    //Obtener lista de categorias

    @GetMapping
    public ResponseEntity<Page<DatosMuestraCategoria>> obtenerListaDeCategoria(Pageable paginacion) {
        var listaCategorias = categoriaEventoService.listaDeCategorias(paginacion);
        return ResponseEntity.ok(listaCategorias);
    }


}
