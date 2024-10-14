package com.api.documentacion.controller;

import com.api.documentacion.domain.movimiento.dto.*;
import com.api.documentacion.domain.movimiento.MovimientoService;
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
@RequestMapping("/movimientos")
public class MovimientoController {

    @Autowired
    MovimientoService movimientoService;

    //ingresar un registro de movimiento de solicitud
    @PostMapping
    @Transactional
    public ResponseEntity<DatosMuestraMovimiento> ingresarRegistro(@RequestBody @Valid DatosRegistraMovimiento datos) {
        var movimiento = movimientoService.registrar(datos);

        return ResponseEntity.ok(movimiento);
    }
    //Obtener lista de respuestaes
    @GetMapping
    public ResponseEntity<Page<DatosMuestraMovimiento>> listaMovimientos(Pageable paginacion) {
        var listaDeMovimientosAbiertos = movimientoService.obtenerListaDeMovimientosAbiertos(paginacion);

        return ResponseEntity.ok(listaDeMovimientosAbiertos);
    }


    //Actualizar un movimiento
    @PutMapping("/resolver")
    @Transactional
    public ResponseEntity<DatosMuestraMovimiento> actualizarMovimiento(@RequestBody @Valid DatosActualizaMovimiento datos){
        var movimiento = movimientoService.actualizaMovimiento(datos);
        return ResponseEntity.ok(movimiento);
    }

    //Cierra un movimiento
    @PutMapping("/cerrar")
    @Transactional
    public ResponseEntity<DatosMuestraMovimiento> cierraMovimiento(@RequestBody @Valid DatosCierraMovimiento datos){
        var movimiento = movimientoService.cierraMovimiento(datos);
        return ResponseEntity.ok(movimiento);
    }

    //Eliminar movimiento
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> eliminarMovimineto(@PathVariable("id") Long id){
      movimientoService.eliminarMovimiento(id);
        return ResponseEntity.noContent().build();
    }
}
