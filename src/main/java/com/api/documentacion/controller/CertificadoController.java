package com.api.documentacion.controller;

import com.api.documentacion.domain.certificado.CertificadoService;
import com.api.documentacion.domain.certificado.dto.DatosActualizaCertificado;
import com.api.documentacion.domain.certificado.dto.DatosMuestraCertificado;
import com.api.documentacion.domain.certificado.dto.DatosRegistraCertificado;
import com.api.documentacion.domain.respuesta.RespuestaService;
import com.api.documentacion.domain.respuesta.dto.DatosActualizaRespuesta;
import com.api.documentacion.domain.respuesta.dto.DatosEliminaRespuesta;
import com.api.documentacion.domain.respuesta.dto.DatosMuestraRespuesta;
import com.api.documentacion.domain.respuesta.dto.DatosRegistraRespuesta;
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
@RequestMapping("/certificados")
public class CertificadoController {


    @Autowired
    CertificadoService certificadoService;


    //ingresar una respuesta
    @PostMapping
    @Transactional
    public ResponseEntity<?> ingresarCertificadoUsuario(@RequestBody @Valid DatosRegistraCertificado datos) {
        var registroCertificado = certificadoService.registrar(datos);
        return ResponseEntity.ok().build();
        }

    //Obtener una certificado
    @GetMapping("/{id}")
    public ResponseEntity<DatosMuestraCertificado> obtenerCertificado(@PathVariable Long id) {
        var certificado = certificadoService.obtenerCertificado(id);

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
    @Transactional
    public ResponseEntity<?> eliminaCertificado(@PathVariable Long id) {
        certificadoService.eliminarCertificado(id);

        return ResponseEntity.noContent().build();
    }

}