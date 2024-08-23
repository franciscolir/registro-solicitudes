package com.api.documentacion.controller;


import com.api.documentacion.domain.solicitud.dto.DatosEliminaSolicitud;
import com.api.documentacion.domain.solicitud.SolicitudService;
import com.api.documentacion.domain.solicitud.dto.DatosActualizaSolicitud;
import com.api.documentacion.domain.solicitud.dto.DatosMuestraSolicitud;
import com.api.documentacion.domain.solicitud.dto.DatosRegistraSolicitud;
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
    public ResponseEntity<DatosMuestraSolicitud> ingresarSolicitudUsuario(@RequestBody @Valid DatosRegistraSolicitud datos) {
        var registroSolicitud = solicitudService.registrar(datos);

        return ResponseEntity.ok(registroSolicitud);
    }

    //Obtener una solicitud
    @GetMapping("/{id}")
    public ResponseEntity<DatosMuestraSolicitud> obtenerSolicitud(@PathVariable Long id) {
        var solicitud  =  solicitudService.obtenerSolicitud(id);

        return ResponseEntity.ok(solicitud);
    }

    //Obtener lista de solicitudes
    @GetMapping
    public ResponseEntity<Page<DatosMuestraSolicitud>> listaSolicitudes(Pageable paginacion){
        var listaSolicitudes = solicitudService.listaDeSolicitudes(paginacion);

        return ResponseEntity.ok(listaSolicitudes);
    }

    //Actualizar solicitud
    @PutMapping
    @Transactional
    public ResponseEntity actualizaSolicitud (@RequestBody @Valid DatosActualizaSolicitud datos){
        var response = solicitudService.actualizaSolicitud(datos);

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
