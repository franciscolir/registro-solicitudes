package com.api.documentacion.controller;

import com.api.documentacion.domain.solicitud.dto.*;
import com.api.documentacion.domain.solicitud.SolicitudService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@ResponseBody
@RequestMapping("/solicitudes")
public class SolicitudController {

    @Autowired
    SolicitudService solicitudService;

    //ingresar una solicitud
    @PostMapping
    @Transactional
    public ResponseEntity<?> ingresarSolicitudUsuario(@RequestBody @Valid DatosRegistraSolicitud datos) {
        var registroSolicitud = solicitudService.registrar(datos);

        return ResponseEntity.ok().build();
    }

    //Obtener una solicitud
    @GetMapping("/{solicitudId}/{emisorId}")
    public ResponseEntity<DatosMuestraSolicitud> obtenerSolicitud(@PathVariable("solicitudId") Long solicitudId, @PathVariable("emisorId") Long emisorId) {
        var solicitud  =  solicitudService.obtenerSolicitud(solicitudId,emisorId);
        return ResponseEntity.ok(solicitud);
    }

    //Obtener lista de solicitudes
    @GetMapping
    public ResponseEntity<Page<DatosMuestraSolicitud>> listaSolicitudes(Pageable paginacion){
        var listaSolicitudes = solicitudService.listaDeSolicitudes(paginacion);

        return ResponseEntity.ok(listaSolicitudes);
    }

    //Obtener lista de solicitudes pendientes de respuesta
    @GetMapping("/{pendientes}")
    public ResponseEntity<Page<DatosMuestraSolicitud>> listaSolicitudesPendientes(Pageable paginacion){
        var listaSolicitudes = solicitudService.listaDeSolicitudesPendientes(paginacion);

        return ResponseEntity.ok(listaSolicitudes);
    }



    //Actualizar solicitud
    @PutMapping
    @Transactional
    public ResponseEntity actualizaSolicitud (@RequestBody @Valid DatosActualizaSolicitud datos){
        var response = solicitudService.actualizaSolicitud(datos);

        return ResponseEntity.ok(response);
    }

    //Declinar solicitud
    @PutMapping("/declinar")
    @Transactional
    public ResponseEntity declinarSolicitud (@RequestBody @Valid DatosDeclinarSolicitud datos){
        var response = solicitudService.declinarSolicitud(datos);

        return ResponseEntity.ok(response);
    }

    //Eliminar solicitud
    @DeleteMapping
    @Transactional
    public ResponseEntity eliminaSolicitud (@RequestBody @Valid DatosEliminaSolicitud datos){
        solicitudService.eliminarSolicitud(datos);

        return ResponseEntity.noContent().build();
    }
}