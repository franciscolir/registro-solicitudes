package com.api.documentacion.controller;

import com.api.documentacion.domain.archivo.Archivo;
import com.api.documentacion.domain.archivo.ArchivoService;
import com.api.documentacion.domain.archivo.dto.DatosActualizaArchivo;
import com.api.documentacion.repository.ArchivoRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RestController
@RequestMapping("/archivos")
public class ArchivoController {

    @Autowired
    ArchivoService archivoService;
    @Autowired
    ArchivoRepository archivoRepository;



    //Cargar archivos

    @GetMapping("/{id}")
    public ResponseEntity<Archivo> obtenerArchivo(@PathVariable String id) {
        var archivo = archivoService.obtener(id);

            return ResponseEntity.ok(archivo);  // Retornar el objeto Archivo completo
    }

    //Cargar archivos
    @PutMapping("/update")
    public ResponseEntity<?> actualizarArchivos(@ModelAttribute DatosActualizaArchivo datos) {

        // Verificamos y almacenamos cada archivo de forma independiente
        if (datos.archivoA() != null) {
            archivoService.actualizar(datos);
        }

        return ResponseEntity.ok("Archivos cargados exitosamente");
    }
}