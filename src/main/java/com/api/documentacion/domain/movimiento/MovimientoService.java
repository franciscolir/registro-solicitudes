package com.api.documentacion.domain.movimiento;

import com.api.documentacion.domain.movimiento.dto.DatosActualizaMovimiento;
import com.api.documentacion.domain.movimiento.dto.DatosMuestraMovimiento;
import com.api.documentacion.domain.movimiento.dto.DatosRegistraMovimiento;
import com.api.documentacion.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class MovimientoService {
@Autowired
    UsuarioRepository usuarioRepository;
@Autowired
    CertificadoRepository certificadoRepository;
@Autowired
    RespuestaRepository respuestaRepository;
@Autowired
    SolicitudRepository solicitudRepository;
@Autowired
    MovimientoRepository movimientoRepository;

    //POST___________________________________________

    public DatosMuestraMovimiento registrar(DatosRegistraMovimiento datos) {

        LocalDateTime fechaAsignacion;
        LocalDateTime fechaRechazo;
        boolean asignado;
        boolean rechazado;

        if (datos.asignado()) {
            fechaAsignacion = LocalDateTime.now();
            fechaRechazo = null;
            asignado = true;
            rechazado = false;
        } else {
            fechaAsignacion = null;
            fechaRechazo = LocalDateTime.now();
            asignado = false;
            rechazado = true;
        }

        var solicitud = solicitudRepository.getReferenceById(datos.solicitud());
        var usuario = usuarioRepository.getReferenceById(datos.usuario());
        var certificado = certificadoRepository.getReferenceById(datos.certificado());
        var respuesta = respuestaRepository.getReferenceById(datos.respuesta());
        var movimiento = new Movimiento(null,
                fechaAsignacion,
                null,
                null,
                fechaRechazo,
                rechazado,
                asignado,
                false,
                false,
                true,
                solicitud,
                usuario,
                certificado,
                respuesta
                );
        movimientoRepository.save(movimiento);

        return new DatosMuestraMovimiento(movimiento);
    }
    //___________________________________________________

    //GET___________________________________________
    //obtiene movimiento

    public DatosMuestraMovimiento obtenerMovimiento(Long id) {

        var movimiento = movimientoRepository.getReferenceById(id);

        return new DatosMuestraMovimiento(movimiento);
    }//___________
    //PUT________________________________________________
    //resuelve o cierra movimiento
    public DatosMuestraMovimiento actualizaMovimiento (DatosActualizaMovimiento datos){

        var movimiento = movimientoRepository.getReferenceById(datos.id());
        if (datos.resuelto()) {
            var fechaResuelto = LocalDateTime.now();
            movimiento.actualizaMovimiento(
                    datos.id(),
                    true,
                    null,
                    fechaResuelto,
                    null);
        }

        if (datos.cerrado()){
            var fechaCierre = LocalDateTime.now();
        movimiento.actualizaMovimiento(
                datos.id(),
                null,
                true,
                null,
                fechaCierre);
        }

        var movimientoActualizado = movimientoRepository.getReferenceById(datos.id());

        return new DatosMuestraMovimiento(movimientoActualizado);
    }
    //______________________________________________________

    //DELETE________________________________________________
    //elimina un movimiento (delete logico)
    public void eliminarMovimiento (Long id){

        var movimiento = movimientoRepository.getReferenceById(id);
        movimiento.eliminarMovimiento(id);
    }
    //______________________________________________________

}
