package com.api.documentacion.controller;

import com.api.documentacion.domain.respuesta.RespuestaService;
import com.api.documentacion.domain.respuesta.dto.DatosActualizaRespuesta;
import com.api.documentacion.domain.respuesta.dto.DatosEliminaRespuesta;
import com.api.documentacion.domain.respuesta.dto.DatosMuestraRespuesta;
import com.api.documentacion.domain.respuesta.dto.DatosRegistraRespuesta;
import com.api.documentacion.infra.errores.ValidacionDeIntegridad;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Collections;

@Controller
@ResponseBody
@RequestMapping("/respuestas")
@PreAuthorize("hasRole('ROLE_USER')")
public class RespuestaController {


    @Autowired
    RespuestaService respuestaService;


    //ingresar una respuesta
    @PostMapping
    @Transactional
    public ResponseEntity<?> ingresarRespuestaUsuario(@RequestBody @Valid DatosRegistraRespuesta datos) {
        DatosMuestraRespuesta registroRespuesta = null;
        registroRespuesta = respuestaService.registrar(datos);
        return ResponseEntity.ok(registroRespuesta);
    }

    //Obtener una respuesta
    @GetMapping("/{id}")
    public ResponseEntity<DatosMuestraRespuesta> obtenerRespuesta(@PathVariable Long id) {
        var respuesta = respuestaService.obtenerRespuesta(id);

        return ResponseEntity.ok(respuesta);
    }


    //Obtener lista de respuestaes
    @GetMapping
    public ResponseEntity<Page<DatosMuestraRespuesta>> listaRespuestas(Pageable paginacion) {
        var listaRespuestas = respuestaService.listaDeRespuestas(paginacion);

        return ResponseEntity.ok(listaRespuestas);
    }

    //Obtener lista de respuestaes
    @GetMapping("/last")
    public ResponseEntity<DatosMuestraRespuesta> ultimaRespuestas() {
        var listaRespuestas = respuestaService.obtenerUltimaRespuesta();

        return ResponseEntity.ok(listaRespuestas);
    }

    //Actualizar respuesta
    @PutMapping
    @Transactional
    public ResponseEntity actualizaRespuesta(@RequestBody @Valid DatosActualizaRespuesta datos) {
        var response = respuestaService.actualizaRespuesta(datos);

        return ResponseEntity.ok(response);
    }

    //Eliminar respuesta
    @DeleteMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Transactional
    public ResponseEntity eliminaRespuesta(@RequestBody @Valid DatosEliminaRespuesta datos) {
        respuestaService.eliminarRespuesta(datos);

        return ResponseEntity.noContent().build();
    }

}