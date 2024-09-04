package com.api.documentacion.controller;

import com.api.documentacion.domain.evento.DatosMuestraTipoEvento;
import com.api.documentacion.domain.evento.TipoEvento;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/tipo")
public class TipoEventoController {

    @GetMapping
    public ResponseEntity<List<DatosMuestraTipoEvento>> getEventoTipo() {
        List<DatosMuestraTipoEvento> tipos = Arrays.stream(TipoEvento.values())
                .map(DatosMuestraTipoEvento::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(tipos);
    }
}
