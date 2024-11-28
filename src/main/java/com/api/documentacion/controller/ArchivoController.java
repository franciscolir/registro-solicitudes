package com.api.documentacion.controller;


import com.api.documentacion.domain.archivo.Archivo;
import com.api.documentacion.domain.archivo.ArchivoService;
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

@Controller
@RestController
@RequestMapping("/archivos")
public class ArchivoController {

    @Autowired
    ArchivoService archivoService;
    @Autowired
    ArchivoRepository archivoRepository;

    //Cargar archivos
    @PostMapping("/up")
    public ResponseEntity<?> cargarArchivos(@Valid @RequestBody DatosRegistraArchivo datos) throws IOException {

        try {
            // Verificamos y almacenamos cada archivo de forma independiente
            if (datos.archivoA() != null) {
                archivoService.registrar(datos);
            }

            return ResponseEntity.ok("Archivos cargados exitosamente");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error al cargar los archivos");
        }
    }

    //Cargar archivos

    @GetMapping("/{id}")
    public ResponseEntity<Archivo> obtenerArchivo(@PathVariable Long id) {
        var archivo = archivoService.obtener(id);

            return ResponseEntity.ok(archivo);  // Retornar el objeto Archivo completo


    }
}