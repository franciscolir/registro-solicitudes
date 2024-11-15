package com.api.documentacion.controller;

import com.api.documentacion.domain.evento.CategoriaService;
import com.api.documentacion.domain.evento.dto.DatosMuestraCategoria;
import com.api.documentacion.domain.evento.TipoEvento;
import com.api.documentacion.domain.solicitud.dto.DatosMuestraSolicitud;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RestController
@RequestMapping("/categoria")
public class CategoriaController {

    @Autowired
    CategoriaService categoriaService;

    //Obtener lista de categorias

    @GetMapping
    public ResponseEntity<Page<DatosMuestraCategoria>> obtenerListaDeCategoria(Pageable paginacion) {
        var listaCategorias = categoriaService.listaDeCategorias(paginacion);
        return ResponseEntity.ok(listaCategorias);
    }


}
