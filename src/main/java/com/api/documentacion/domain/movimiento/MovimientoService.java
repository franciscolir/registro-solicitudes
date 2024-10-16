package com.api.documentacion.domain.movimiento;

import com.api.documentacion.domain.movimiento.dto.*;
import com.api.documentacion.domain.respuesta.dto.DatosMuestraRespuesta;
import com.api.documentacion.domain.solicitud.SolicitudService;
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
    @Autowired
    SolicitudService solicitudService;

    //POST___________________________________________

    public DatosMuestraMovimiento registrar(DatosRegistraMovimiento datos) {

        var fechaIngreso = LocalDateTime.now();
        var id = solicitudService.validaYObtieneIdConNumeroSolicitud(datos.solicitud(), datos.emisor());
        var solicitud = solicitudRepository.getReferenceById(id);
        var movimiento = new Movimiento(null,
                fechaIngreso,
                null,
                null,
                null,
                null,
                false,
                false,
                false,
                true,
                false,
                null,
                null,
                null,
                EstadoMovimiento.INGRESADO,
                solicitud,
                null,
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

        return movimientoRepository.findByActivoTrueAndCerradoFalseAndRechazadoFalse(paginacion).map(DatosMuestraMovimiento::new);
    }

    //obtiene movimiento al ingresar solicitud

    public Page<DatosMuestraMovimientoSolicitudes> obtenerListaDeMovimientosSolicitudes(Pageable paginacion) {

        return movimientoRepository.findByActivoTrue(paginacion).map(DatosMuestraMovimientoSolicitudes::new);
    }

    //PUT________________________________________________
    // movimiento asignar
    public DatosMuestraMovimiento asignarMovimiento (DatosAsignarMovimiento datos){

        var movimiento = movimientoRepository.getReferenceById(datos.id());

        var fechaAsignar = LocalDateTime.now();
        var unidad = unidadRepository.getReferenceById(datos.unidad());
        movimiento.asignarMovimiento(
                datos.id(),
                true,
                fechaAsignar,
                datos.comentarioAsignado(),
                EstadoMovimiento.EN_PROCESO,
                unidad
        );

        var movimientoActualizado = movimientoRepository.getReferenceById(datos.id());

        return new DatosMuestraMovimiento(movimientoActualizado);
    }//______________
    //actualiza movimiento
    public DatosMuestraMovimiento resolverMovimiento (DatosActualizaMovimiento datos){

        var movimiento = movimientoRepository.getReferenceById(datos.id());

            var fechaResuelto = LocalDateTime.now();
            var certificado = certificadoRepository.getReferenceById(datos.certificado());
            movimiento.resolverMovimiento(
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
        public DatosMuestraMovimiento cerrarMovimiento (DatosCierraMovimiento datos){
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

    //rechazar movimiento
    public DatosMuestraMovimiento rechazarMovimiento (DatosRechazarMovimiento datos){

        var movimiento = movimientoRepository.getReferenceById(datos.id());

        var fechaRechazar = LocalDateTime.now();
        movimiento.rechazaMovimiento(
                datos.id(),
                true,
                fechaRechazar,
                EstadoMovimiento.RECHAZADO,
                datos.comentarioRechazar()
        );

        var movimientoActualizado = movimientoRepository.getReferenceById(datos.id());

        return new DatosMuestraMovimiento(movimientoActualizado);
    }//______________
    //______________________________________________________

    //DELETE________________________________________________
    //elimina un movimiento (delete logico)
    public void eliminarMovimiento (Long id){

        var movimiento = movimientoRepository.getReferenceById(id);
        movimiento.eliminarMovimiento(id);
    }
    //______________________________________________________

}
