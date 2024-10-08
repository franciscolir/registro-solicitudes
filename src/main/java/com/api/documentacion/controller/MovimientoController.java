package com.api.documentacion.controller;


import com.api.documentacion.domain.movimiento.dto.DatosActualizaMovimiento;
import com.api.documentacion.domain.movimiento.dto.DatosMuestraMovimiento;
import com.api.documentacion.domain.movimiento.dto.DatosRegistraMovimiento;
import com.api.documentacion.domain.movimiento.MovimientoService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@ResponseBody
@RequestMapping("/movimiento")
public class MovimientoController {

    @Autowired
    MovimientoService movimientoService;

    //ingresar un registro de movimiento de solicitud
    @PostMapping
    @Transactional
    public ResponseEntity<?> ingresarRegistro(@RequestBody @Valid DatosRegistraMovimiento datos) {
        var movimiento = movimientoService.registrar(datos);

        return ResponseEntity.ok().build();
    }

    //Obtener un movimiento
    @GetMapping("/{id}")
    public ResponseEntity<DatosMuestraMovimiento> obtenerRegistro(@PathVariable("id") Long id) {
        var movimiento  =  movimientoService.obtenerMovimiento(id);
        return ResponseEntity.ok(movimiento);
    }

    //Actualizar un movimiento
    @PutMapping
    @Transactional
    public ResponseEntity<DatosMuestraMovimiento> actualizarMovimiento(@RequestBody @Valid DatosActualizaMovimiento datos){
        var movimiento = movimientoService.actualizaMovimiento(datos);
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
