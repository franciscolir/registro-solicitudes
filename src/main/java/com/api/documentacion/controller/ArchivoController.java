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
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@Controller
@RestController
@RequestMapping("/archivos")
public class ArchivoController {

    @Autowired
    ArchivoService archivoService;
    @Autowired
    ArchivoRepository archivoRepository;



    @PostMapping("/upload")
    public ResponseEntity<Archivo> subirImagen(@RequestParam("archivo") MultipartFile archivoFile,
                                              @Valid @RequestBody DatosRegistraArchivo datos) {
        try {
            Archivo archivo = archivoService.almacenarImagen(archivoFile, datos);
            return new ResponseEntity<>(archivo, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/obtener/claseX/{solicitudId}")
    public ResponseEntity<List<Archivo>> obtenerImagenesClaseX(@PathVariable Long solicitudId) {
        List<Archivo> imagenes = archivoService.obtenerArchivoPorSolicitud(solicitudId);
        return new ResponseEntity<>(imagenes, HttpStatus.OK);
    }

    @GetMapping("/obtener/claseY/{certificadoId}")
    public ResponseEntity<List<Archivo>> obtenerImagenesClaseY(@PathVariable Long certificadoId) {
        List<Archivo> imagenes = archivoService.obtenerArchivoPorCertificado(certificadoId);
        return new ResponseEntity<>(imagenes, HttpStatus.OK);
    }



    @GetMapping("/obtener/claseZ/{respuestaId}")
    public ResponseEntity<List<Archivo>> obtenerImagenesClaseZ(@PathVariable Long respuestaId) {
        List<Archivo> imagenes = archivoService.obtenerArchivoPorRespuesta(respuestaId);
        return new ResponseEntity<>(imagenes, HttpStatus.OK);
    }
}