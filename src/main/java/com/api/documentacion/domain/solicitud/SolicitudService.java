package com.api.documentacion.domain.solicitud;

import com.api.documentacion.domain.solicitud.dto.DatosActualizaSolicitud;
import com.api.documentacion.domain.solicitud.dto.DatosMuestraSolicitud;
import com.api.documentacion.domain.solicitud.dto.DatosRegistraSolicitud;
import com.api.documentacion.repository.EmisorRepository;
import com.api.documentacion.repository.SolicitudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class SolicitudService {
    @Autowired
    Solicitud solicitud;
    @Autowired
    SolicitudRepository solicitudRepository;
    @Autowired
    EmisorRepository emisorRepository;


    public DatosMuestraSolicitud registrar(DatosRegistraSolicitud datos) {


        var emisor = emisorRepository.getReferenceById(datos.emisor());
        var fechaIngresoSolicitud = LocalDateTime.now();
        var estado = Estado.RECIBIDO;

        var solicitud = new Solicitud(null,
                datos.solicitudId(),
                emisor,
                datos.titulo(),
                datos.descripcion(),
                datos.fechaSolicitud(),
                fechaIngresoSolicitud,
                estado,
                false,
                true
        );
        solicitudRepository.save(solicitud);

        return new DatosMuestraSolicitud(solicitud);
    }

    public DatosMuestraSolicitud obtenerSolicitud(Long id) {
        validaSiExisteIdSolicitud(id);
        var solicitud = solicitudRepository.getReferenceById(id);

        return new DatosMuestraSolicitud(solicitud);
    }

    public Page<DatosMuestraSolicitud> listaDeSolicitudes(Pageable paginacion) {

    return solicitudRepository.findByActivoTrue(paginacion).map(DatosMuestraSolicitud::new);
};

    public DatosMuestraSolicitud actualizaSolicitud (DatosActualizaSolicitud datos){
        validaSiExisteIdSolicitud(datos.solicitudId());
        var id = solicitudRepository.findBySolicitudIdTrue(datos.solicitudId()).getId();
        var emisor = emisorRepository.getReferenceById(datos.emisor());
        solicitud.actualizaSolicitud(id, datos.solicitudId(), emisor, datos.titulo(), datos.descripcion(), datos.fechaSolicitud());
        var solicitudActializada = solicitudRepository.getReferenceById(id);

        return new DatosMuestraSolicitud(solicitudActializada);
    }

    public void eliminarSolicitud (DatosEliminaSolicitud datos){
        validaSiExisteIdSolicitud(datos.solicitudId());
        solicitud.elimiarSolicitud(datos.solicitudId(), datos.comentario());
    }

    public void cambiaEstado (Long solicitudId, Estado estado) {
        var id = obtieneIdConSolicitudId(solicitudId);
        validaSiExisteIdSolicitud(id);
        solicitud.cambiaEstado(id,estado);
    }

    public void cierraSolicitud (Long solicitudId, Estado estado) {
        var id = obtieneIdConSolicitudId(solicitudId);
        validaSiExisteIdSolicitud(id);
        solicitud.cierraSolicitud(id, estado);
    }

    public void validaSiExisteIdSolicitud (Long solicitudId) {
        var id = obtieneIdConSolicitudId(solicitudId);
        if(!solicitudRepository.existsByIdAndTrue(id)){
            throw new RuntimeException("id de solicitud no existe");
        }
    }

    public void validaSiSolicitudEstaCerrada (Long solicitudId){
        var id = obtieneIdConSolicitudId(solicitudId);
        if(solicitudRepository.existsByIdAndCerradoTrue(id)){
            throw new RuntimeException("Solicitud se encuentra cerrada");
        }
    }

    public Long obtieneIdConSolicitudId (Long solicitudId){

        return solicitudRepository.findBySolicitudIdTrue(solicitudId).getId();
    }

}
