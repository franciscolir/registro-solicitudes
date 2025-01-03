package com.api.documentacion.controller;

import com.api.documentacion.domain.archivo.Archivo;
import com.api.documentacion.domain.archivo.ArchivoService;
import com.api.documentacion.domain.archivo.dto.DatosRegistraArchivo;
import com.api.documentacion.repository.ArchivoRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@Controller
@RestController
@RequestMapping("/archivos")
@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
public class ArchivoController {

    @Autowired
    ArchivoService archivoService;
    @Autowired
    ArchivoRepository archivoRepository;


    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Archivo> subirImagen(
            @RequestParam("archivoA") MultipartFile archivoA,
            @RequestParam(value = "archivoB", required = false) MultipartFile archivoB,
            @RequestParam(value = "archivoC", required = false) MultipartFile archivoC,

            @RequestParam("id") Long id, // Recibir cada campo individualmente
            @RequestParam("tipo") String tipo) {
        try {

            // Crear el objeto DatosRegistraArchivo manualmente
            DatosRegistraArchivo datos = new DatosRegistraArchivo(id, tipo);

            // Procesar archivoA (siempre presente)
            Archivo archivo = archivoService.almacenarImagen(archivoA, datos);


            // Procesar archivoB si no es nulo
            if (archivoB != null && !archivoB.isEmpty()) {

                // Lógica para procesar archivoB, por ejemplo:
                archivoService.almacenarImagen(archivoB, datos);
            }

            // Procesar archivoC si no es nulo
            if (archivoC != null && !archivoC.isEmpty()) {

                // Lógica para procesar archivoC, por ejemplo:
                archivoService.almacenarImagen(archivoC, datos);
            }

            return new ResponseEntity<>(archivo, HttpStatus.OK);

        } catch (IOException e) {

            // Manejo de excepciones en caso de error en el procesamiento de los archivos
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/download/solicitud/{solicitudId}")
    public ResponseEntity<List<Archivo>> obtenerImagenesClaseX(@PathVariable Long solicitudId) {
        List<Archivo> imagenes = archivoService.obtenerArchivoPorSolicitud(solicitudId);
        return new ResponseEntity<>(imagenes, HttpStatus.OK);
    }

    @GetMapping("/download/certificado/{certificadoId}")
    public ResponseEntity<List<Archivo>> obtenerImagenesClaseY(@PathVariable Long certificadoId) {
        List<Archivo> imagenes = archivoService.obtenerArchivoPorCertificado(certificadoId);
        return new ResponseEntity<>(imagenes, HttpStatus.OK);
    }


    @GetMapping("/download/respuesta/{respuestaId}")
    public ResponseEntity<List<Archivo>> obtenerImagenesClaseZ(@PathVariable Long respuestaId) {
        List<Archivo> imagenes = archivoService.obtenerArchivoPorRespuesta(respuestaId);
        return new ResponseEntity<>(imagenes, HttpStatus.OK);
    }
}