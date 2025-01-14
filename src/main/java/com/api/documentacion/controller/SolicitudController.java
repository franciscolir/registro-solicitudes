package com.api.documentacion.controller;

import com.api.documentacion.domain.solicitud.dto.*;
import com.api.documentacion.domain.solicitud.SolicitudService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Controller
@ResponseBody
@RequestMapping("/solicitudes")
@PreAuthorize("hasRole('ROLE_USER')")
public class SolicitudController {

    @Autowired
    SolicitudService solicitudService;

    //ingresar una solicitud
    @PostMapping
    @Transactional
    public ResponseEntity<?> ingresarSolicitudUsuario(@RequestBody @Valid DatosRegistraSolicitud datos) {
        DatosMuestraSolicitud registroSolicitud = null;
        try {
            registroSolicitud = solicitudService.registrar(datos);
        } catch (IOException e) {
            throw new RuntimeException(e + "error al registrar solicitud");
        }

        return ResponseEntity.ok(registroSolicitud);
    }

    //Obtener una solicitud
    @GetMapping("/{solicitudId}/{emisorId}")
    public ResponseEntity<DatosMuestraSolicitudConMovimiento> obtenerSolicitud(@PathVariable("solicitudId") Long solicitudId, @PathVariable("emisorId") Long emisorId) {
        var solicitud = solicitudService.obtenerSolicitud(solicitudId, emisorId);
        return ResponseEntity.ok(solicitud);
    }

    //Obtener lista de solicitudes
    @GetMapping
    public ResponseEntity<Page<DatosMuestraSolicitud>> listaSolicitudes(Pageable paginacion) {
        var listaSolicitudes = solicitudService.listaDeSolicitudes(paginacion);

        return ResponseEntity.ok(listaSolicitudes);
    }


    //Actualizar solicitud
    @PutMapping
    @Transactional
    public ResponseEntity<?> actualizaSolicitud(@RequestBody @Valid DatosActualizaSolicitud datos) {
        var response = solicitudService.actualizaSolicitud(datos);

        return ResponseEntity.ok(response);
    }


    //Eliminar solicitud
    @DeleteMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Transactional
    public ResponseEntity<?> eliminaSolicitud(@RequestBody @Valid DatosEliminaSolicitud datos) {
        solicitudService.eliminarSolicitud(datos);

        return ResponseEntity.noContent().build();
    }
}