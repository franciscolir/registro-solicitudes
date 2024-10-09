package com.api.documentacion.domain.movimiento;

import com.api.documentacion.domain.movimiento.dto.*;
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

    public DatosMuestraMovimientoAsignacion registrar(DatosRegistraMovimiento datos) {

            var fechaAsignacion = LocalDateTime.now();
        var solicitud = solicitudRepository.getReferenceById(datos.solicitud());
        var usuario = usuarioRepository.getReferenceById(datos.usuario());
        var movimiento = new Movimiento(null,
                fechaAsignacion,
                null,
                null,
                true,
                false,
                false,
                true,
                datos.comentarioAsignacion(),
                null,
                EstadoMovimiento.PENDIENTE,
                solicitud,
                usuario,
                null,
                null
        );
        movimientoRepository.save(movimiento);

        return new DatosMuestraMovimientoAsignacion(movimiento);
    }

    //___________________________________________________

    //GET___________________________________________
    //obtiene movimiento al asignar

    public DatosMuestraMovimientoAsignacion obtenerMovimientoAsignacion(Long idSolicitud) {

        var id = movimientoRepository.findIdBySolicitudId(idSolicitud).getId();
        var movimiento = movimientoRepository.getReferenceById(id);

        return new DatosMuestraMovimientoAsignacion(movimiento);
    }
    //obtiene movimiento al resolver

    public DatosMuestraMovimientoResuelto obtenerMovimientoResuelto(Long idSolicitud) {

        var id = movimientoRepository.findIdBySolicitudId(idSolicitud).getId();
        var movimiento = movimientoRepository.getReferenceById(id);

        return new DatosMuestraMovimientoResuelto(movimiento);
    }
    //___________________________________________________

    //PUT________________________________________________
    //resuelve movimiento
    public DatosMuestraMovimientoResuelto actualizaMovimiento (DatosActualizaMovimiento datos){

        var movimiento = movimientoRepository.getReferenceById(datos.id());

            var fechaResuelto = LocalDateTime.now();
            var certificado = certificadoRepository.getReferenceById(datos.certificado());
            movimiento.actualizaMovimiento(
                    datos.id(),
                    true,
                    fechaResuelto,
                    datos.comentarioResuelto(),
                    EstadoMovimiento.RESUELTO,
                    certificado
            );

        var movimientoActualizado = movimientoRepository.getReferenceById(datos.id());

        return new DatosMuestraMovimientoResuelto(movimientoActualizado);
    }//______________

    //cierra movimiento
        public DatosMuestraMovimiento cierraMovimiento (DatosCierraMovimiento datos){
            var movimiento = movimientoRepository.getReferenceById(datos.id());

            var fechaCierre = LocalDateTime.now();
            var respuesta = respuestaRepository.getReferenceById(datos.respuesta());
            movimiento.cierraMovimiento(
                    datos.id(),
                    true,
                    fechaCierre,
                    EstadoMovimiento.CERRADO,
                    respuesta
            );


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
