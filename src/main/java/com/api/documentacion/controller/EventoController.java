package com.api.documentacion.controller;

import com.api.documentacion.domain.evento.DatosMuestraEventos;
import com.api.documentacion.domain.evento.EventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;



@Controller
@ResponseBody
@RequestMapping("/eventos")
public class EventoController {


    @Autowired
    EventoService eventoService;


    //Obtener lista de eventos
    @GetMapping
    public ResponseEntity<Page<DatosMuestraEventos>> listaEventos(Pageable paginacion) {
        var listaEventos = eventoService.listaDeEventoss(paginacion);

        return ResponseEntity.ok(listaEventos);
    }

}