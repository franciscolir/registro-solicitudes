package com.api.documentacion.controller;

import com.api.documentacion.domain.ausencias.AusenciaService;
import com.api.documentacion.domain.ausencias.dto.DatosMuestraAusenciasUsuario;
import com.api.documentacion.domain.ausencias.dto.DatosRegistraAusencias;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@ResponseBody
@RequestMapping("/ausencias")
@PreAuthorize("hasRole('ROLE_USER')")
public class AusenciasController {

    @Autowired
    AusenciaService ausenciaService;

    //ingresar una ausencia
    @PostMapping
    @Transactional
    public ResponseEntity<?> ingresarAusenciaUsuario(@RequestBody @Valid DatosRegistraAusencias datos) {

       var registroAusencia = ausenciaService.registraAusencia(datos);

        return ResponseEntity.ok(registroAusencia);
    }
/*
    //Obtener una ausencia
    @GetMapping("/{usuarioId}")
    public ResponseEntity <DatosMuestraAusenciasUsuario> obtenerAusencia(@PathVariable("usuarioId") Long usuarioId) {
        var ausencia = ausenciaService.obtenerAusencia(usuarioId);
        return ResponseEntity.ok(ausencia);
    }*/

    //Obtener lista de ausenciaes
    @GetMapping
    public ResponseEntity<Page<DatosMuestraAusenciasUsuario>> listaAusenciaes(Pageable paginacion) {
        var listaAusencias = ausenciaService.obtenerListaDeAusencias(paginacion);

        return ResponseEntity.ok(listaAusencias);
    }

/*
    //Actualizar ausencia
    @PutMapping
    @Transactional
    public ResponseEntity<?> actualizaAusencia(@RequestBody @Valid DatosActualizaAusencias datos) {
        var response = ausenciaService.actualizaAusencia(datos);

        return ResponseEntity.ok(response);
    }


    //Eliminar ausencia
    @DeleteMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Transactional
    public ResponseEntity<?> eliminaAusencia(@RequestBody @Valid DatosEliminaAusencia datos) {
        ausenciaService.eliminarAusencia(datos);

        return ResponseEntity.noContent().build();
    }*/
}