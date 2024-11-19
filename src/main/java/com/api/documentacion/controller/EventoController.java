package com.api.documentacion.controller;

import com.api.documentacion.domain.evento.dto.DatosMuestraEventos;
import com.api.documentacion.domain.evento.EventoService;
import com.api.documentacion.domain.evento.dto.DatosRegistraEvento;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;



@Controller
@ResponseBody
@RequestMapping("/eventos")
public class EventoController {


    @Autowired
    EventoService eventoService;

    @PostMapping
    public ResponseEntity<DatosMuestraEventos> crearEvento(@RequestBody @Valid DatosRegistraEvento datos) {
        System.out.println(datos);
        var evento = eventoService.crearEvento(datos);
        return ResponseEntity.ok().build();
    }

    //Obtener lista de eventos
    @GetMapping
    public ResponseEntity<Page<DatosMuestraEventos>> listaEventos(Pageable paginacion) {
        var listaEventos = eventoService.listaDeEventos(paginacion);

        return ResponseEntity.ok(listaEventos);
    }

    //Obtener lista de eventos
    @GetMapping("/proximos")
    public ResponseEntity<Page<DatosMuestraEventos>> listaProximosEventos(Pageable paginacion) {
        var listaEventos = eventoService.listaDeProximosEventos(paginacion);

        return ResponseEntity.ok(listaEventos);
    }

}