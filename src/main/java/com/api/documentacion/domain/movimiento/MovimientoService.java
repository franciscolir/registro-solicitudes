package com.api.documentacion.domain.movimiento;

import com.api.documentacion.domain.movimiento.dto.*;
import com.api.documentacion.domain.respuesta.dto.DatosMuestraRespuesta;
import com.api.documentacion.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class MovimientoService {
    @Autowired
    UnidadRepository unidadRepository;
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

        var fechaAsignacion = LocalDateTime.now();
        var solicitud = solicitudRepository.getReferenceById(datos.solicitud());
        var unidad = unidadRepository.getReferenceById(datos.unidad());
        var movimiento = new Movimiento(null,
                null,
                fechaAsignacion,
                null,
                null,
                true,
                false,
                false,
                true,
                datos.comentarioAsignacion(),
                null,
                EstadoMovimiento.EN_PROCESO,
                solicitud,
                unidad,
                null,
                null
        );
        movimientoRepository.save(movimiento);

        return new DatosMuestraMovimiento(movimiento);
    }

    //___________________________________________________

    //GET___________________________________________
    //obtiene movimiento al ingresar solicitud

    public Page<DatosMuestraMovimiento> obtenerListaDeMovimientosPendientes(Pageable paginacion) {

        return movimientoRepository.findByActivoTrueAndCerradoFalse(paginacion).map(DatosMuestraMovimiento::new);
    }

    //obtiene movimiento al ingresar solicitud

    public Page<DatosMuestraMovimientoSolicitudes> obtenerListaDeMovimientosSolicitudes(Pageable paginacion) {

        return movimientoRepository.findByActivoTrue(paginacion).map(DatosMuestraMovimientoSolicitudes::new);
    }

    //PUT________________________________________________
    //actualiza movimiento
    public DatosMuestraMovimiento actualizaMovimiento (DatosActualizaMovimiento datos){

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

        return new DatosMuestraMovimiento(movimientoActualizado);
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
