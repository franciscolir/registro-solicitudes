package com.api.documentacion.domain.solicitud;

import com.api.documentacion.domain.solicitud.dto.DatosActualizaSolicitud;
import com.api.documentacion.domain.solicitud.dto.DatosEliminaSolicitud;
import com.api.documentacion.domain.solicitud.dto.DatosMuestraSolicitud;
import com.api.documentacion.domain.solicitud.dto.DatosRegistraSolicitud;
import com.api.documentacion.repository.EmisorRepository;
import com.api.documentacion.repository.SolicitudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class SolicitudService {
    @Autowired
    SolicitudRepository solicitudRepository;
    @Autowired
    EmisorRepository emisorRepository;


    public DatosMuestraSolicitud registrar(DatosRegistraSolicitud datos) {

        var emisor = emisorRepository.getReferenceById(datos.emisor());

        var fechaSolicitud = dateTimeFormatter(datos.fechaSolicitud());
        var fechaIngresoSolicitud = LocalDateTime.now();
        var estado = Estado.RECIBIDO;

        var solicitud = new Solicitud(null,
                datos.solicitudId(),
                emisor,
                datos.titulo(),
                datos.descripcion(),
                fechaSolicitud,
                fechaIngresoSolicitud,
                estado,
                false,
                true
        );
        solicitudRepository.save(solicitud);

        return new DatosMuestraSolicitud(solicitud);
    }

    //obtiene una solicitud con el numero de solicitud
    public DatosMuestraSolicitud obtenerSolicitud(Long solicitudId, Long emisorId) {
        var id = validaSiExisteIdSolicitudYRetornaId(solicitudId,emisorId);
        var solicitud = solicitudRepository.getReferenceById(id);

        return new DatosMuestraSolicitud(solicitud);
    }

    public Page<DatosMuestraSolicitud> listaDeSolicitudes(Pageable paginacion) {

        return solicitudRepository.findByActivoTrue(paginacion).map(DatosMuestraSolicitud::new);
    };

    public DatosMuestraSolicitud actualizaSolicitud (DatosActualizaSolicitud datos){
        var id = validaSiExisteIdSolicitudYRetornaId(datos.solicitudId(),datos.emisorId());
        var emisor = emisorRepository.getReferenceById(datos.emisorId());
        var fechaSolicitud = dateTimeFormatter(datos.fechaSolicitud());
        var solicitud = solicitudRepository.getReferenceById(id);
        solicitud.actualizaSolicitud(
                id,
                datos.solicitudId(),
                emisor,
                datos.titulo(),
                datos.descripcion(),
                fechaSolicitud
        );

        var solicitudActializada = solicitudRepository.getReferenceById(id);

        return new DatosMuestraSolicitud(solicitudActializada);
    }

    public void eliminarSolicitud (DatosEliminaSolicitud datos){
        validaSiExisteIdSolicitud(datos.solicitudId(),datos.emisorId());
        var id = obtieneIdConSolicitudId(datos.solicitudId(),datos.emisorId());
        var solicitud = solicitudRepository.getReferenceById(id);
        solicitud.elimiarSolicitud(datos.solicitudId(), datos.comentario());
    }

    //cambia string a formato fecha
    public LocalDateTime dateTimeFormatter (String fecha){
        var formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

        return LocalDateTime.parse(fecha, formatter);
    }


    public void cambiaEstado (Long solicitudId, Long emisorId, Estado estado) {
        var id = obtieneIdConSolicitudId(solicitudId,emisorId);
        validaSiExisteIdSolicitud(id,emisorId);
        var solicitud = solicitudRepository.getReferenceById(id);
        solicitud.cambiaEstado(id,estado);
    }

    public void cierraSolicitud (Long solicitudId, Long emisorId, Estado estado) {
        var id = obtieneIdConSolicitudId(solicitudId,emisorId);
        validaSiExisteIdSolicitud(id,emisorId);
        var solicitud = solicitudRepository.getReferenceById(id);
        solicitud.cierraSolicitud(id, estado);
    }

    public void validaSiExisteIdSolicitud (Long solicitudId, Long emisorId) {
        var id = obtieneIdConSolicitudId(solicitudId,emisorId);
        if(!solicitudRepository.existsByIdAndActivoTrue(id)){
            throw new RuntimeException("id de solicitud no existe");
        }
    }

    public Long validaSiExisteIdSolicitudYRetornaId (Long solicitudId, Long emisorId) {
        var id = obtieneIdConSolicitudId(solicitudId,emisorId);
        if(!solicitudRepository.existsByIdAndActivoTrue(id)){
            throw new RuntimeException("id de solicitud no existe");
        }
        return id;
    }




    public void validaSiSolicitudEstaCerrada (Long solicitudId, Long emisorId){
        var id = obtieneIdConSolicitudId(solicitudId,emisorId);
        if(solicitudRepository.existsByIdAndCerradoTrue(id)){
            throw new RuntimeException("Solicitud se encuentra cerrada");
        }
    }

    public Long obtieneIdConSolicitudId (Long solicitudId, Long emisorId){

        return solicitudRepository.findIdBySolicitudIdAndEmisorId(solicitudId,emisorId);
        //return solicitudRepository.findBySolicitudIdAndActivoTrue(solicitudId).getId();
    }

}
