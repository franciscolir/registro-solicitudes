package com.api.documentacion.controller;


import com.api.documentacion.domain.solicitud.dto.DatosMuestraSolicitud;
import com.api.documentacion.domain.solicitud.dto.DatosRegistraSolicitud;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@ResponseBody
@RequestMapping("/registro")
public class RegistroController {


    //ingresar una registro
    @PostMapping
    @Transactional
    public ResponseEntity<?> ingresarRegistro(@RequestBody @Valid DatosRegistro datos) {
        var registro = registroService.registrar(datos);

        return ResponseEntity.ok().build();
    }

    //Obtener una registro
    @GetMapping("/{solicitudId}/{emisorId}")
    public ResponseEntity<DatosMuestraRegistro> obtenerRegistro(@PathVariable("solicitudId") Long solicitudId, @PathVariable("emisorId") Long emisorId) {
        var registro  =  registroService.obtenerSolicitud(solicitudId,emisorId);
        return ResponseEntity.ok(registro);
    }

}
