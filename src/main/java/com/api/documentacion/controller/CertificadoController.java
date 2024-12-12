package com.api.documentacion.controller;

import com.api.documentacion.domain.certificado.CertificadoService;
import com.api.documentacion.domain.certificado.dto.DatosActualizaCertificado;
import com.api.documentacion.domain.certificado.dto.DatosMuestraCertificado;
import com.api.documentacion.domain.certificado.dto.DatosRegistraCertificado;
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
@RequestMapping("/certificados")
@PreAuthorize("hasRole('ROLE_USER')")
public class CertificadoController {


    @Autowired
    CertificadoService certificadoService;


    //ingresar un certificado
    @PostMapping
    @Transactional
    public ResponseEntity<?> ingresarCertificadoUsuario(@RequestBody @Valid DatosRegistraCertificado datos) {
        DatosMuestraCertificado registroCertificado = null;
        try {
            registroCertificado = certificadoService.registrar(datos);
        } catch (IOException e) {
            throw new RuntimeException(e + " error al registar certificado");
        }
        return ResponseEntity.ok(registroCertificado);
        }

    //Obtener una certificado
    @GetMapping("/{id}")
    public ResponseEntity<DatosMuestraCertificado> obtenerCertificado(@PathVariable Long id) {
        var certificado = certificadoService.obtenerCertificado(id);

        return ResponseEntity.ok(certificado);
    }

    //Obtener ultimo certificado por unidad
    @GetMapping("/unidad/{unidadId}")
    public ResponseEntity<Page<DatosMuestraCertificado>>  obtenerUltimoCertificadoPorUnidad(@PathVariable Long unidadId, Pageable paginacion) {
        var certificado = certificadoService.obtenerUltimoCertificado(unidadId, paginacion);

        return ResponseEntity.ok(certificado);
    }


    //Obtener lista de certificadoes
    @GetMapping
    public ResponseEntity<Page<DatosMuestraCertificado>> listaCertificados(Pageable paginacion) {
        var listaCertificados = certificadoService.listaDeCertificados(paginacion);

        return ResponseEntity.ok(listaCertificados);
    }

    //Actualizar certificado
    @PutMapping
    @Transactional
    public ResponseEntity<?> actualizaCertificado(@RequestBody @Valid DatosActualizaCertificado datos) {
        var response = certificadoService.actualizaCertificado(datos);

        return ResponseEntity.ok(response);
    }

    //Eliminar certificado
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Transactional

    public ResponseEntity<?> eliminaCertificado(@PathVariable Long id) {
        certificadoService.eliminarCertificado(id);

        return ResponseEntity.noContent().build();
    }

}