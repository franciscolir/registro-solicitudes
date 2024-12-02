package com.api.documentacion.controller;


import com.api.documentacion.domain.archivo.Archivo;
import com.api.documentacion.domain.archivo.ArchivoService;
import com.api.documentacion.domain.archivo.dto.DatosActualizaArchivo;
import com.api.documentacion.domain.archivo.dto.DatosRegistraArchivo;
import com.api.documentacion.repository.ArchivoRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

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
    public ResponseEntity<Archivo> obtenerArchivo(@PathVariable UUID id) {
        var archivo = archivoService.obtener(id);

            return ResponseEntity.ok(archivo);  // Retornar el objeto Archivo completo
    }

    //Cargar archivos
    @PutMapping("/update")
    public ResponseEntity<?> actualizarArchivos(@Valid @RequestBody DatosActualizaArchivo datos) throws IOException {

        try {
            // Verificamos y almacenamos cada archivo de forma independiente
            if (datos.archivoA() != null) {
                archivoService.actualizar(datos);
            }

            return ResponseEntity.ok("Archivos cargados exitosamente");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error al cargar los archivos");
        }
    }
}