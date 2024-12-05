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


    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Archivo> subirImagen(
            @RequestParam("archivoA") MultipartFile archivoA,
            @RequestParam(value = "archivoB", required = false) MultipartFile archivoB,
            @RequestParam(value = "archivoC", required = false) MultipartFile archivoC,

            @RequestParam("id") Long id, // Recibir cada campo individualmente
            @RequestParam("tipo") String tipo) {
        try {
            System.out.print("paso 1 #############");
            // Crear el objeto DatosRegistraArchivo manualmente
            DatosRegistraArchivo datos = new DatosRegistraArchivo(id, tipo);
            System.out.print("paso 2 #############");
            // Procesar archivoA (siempre presente)
            Archivo archivo = archivoService.almacenarImagen(archivoA, datos);
            System.out.print("paso 3 #############");

            // Procesar archivoB si no es nulo
            if (archivoB != null && !archivoB.isEmpty()) {
                System.out.print("paso 4 #############");
                // Lógica para procesar archivoB, por ejemplo:
                archivoService.almacenarImagen(archivoB, datos);
            }

            // Procesar archivoC si no es nulo
            if (archivoC != null && !archivoC.isEmpty()) {
                System.out.print("paso 5 #############");
                // Lógica para procesar archivoC, por ejemplo:
                archivoService.almacenarImagen(archivoC, datos);
            }
            System.out.print("paso 6 #############");
            return new ResponseEntity<>(archivo, HttpStatus.OK);

        } catch (IOException e) {
            System.out.print("paso 7 #############");
            // Manejo de excepciones en caso de error en el procesamiento de los archivos
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