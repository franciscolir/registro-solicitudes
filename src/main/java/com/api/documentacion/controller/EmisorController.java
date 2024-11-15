package com.api.documentacion.controller;

import com.api.documentacion.domain.emisor.dto.DatosMuestraEmisor;
import com.api.documentacion.domain.emisor.EmisorService;
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
@RequestMapping("/emisores")
public class EmisorController {



    @Autowired
    EmisorService emisorService;


    //Obtener lista de eventos
    @GetMapping
    public ResponseEntity<Page<DatosMuestraEmisor>> listaEmisores(Pageable paginacion) {
        var listaEmisores = emisorService.listaDeEmisores(paginacion);

        return ResponseEntity.ok(listaEmisores);
    }

}