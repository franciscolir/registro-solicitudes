package com.api.documentacion.domain.solicitud;

import com.api.documentacion.domain.solicitud.dto.*;
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

    //POST___________________________________________
        //registra solicitud
    public DatosMuestraSolicitud registrar(DatosRegistraSolicitud datos) {

        var emisor = emisorRepository.getReferenceById(datos.emisor());

        var fechaSolicitud = dateTimeFormatter(datos.fechaSolicitud());
        var fechaIngresoSolicitud = LocalDateTime.now();
        var estado = Estado.RECIBIDO;

        var solicitud = new Solicitud(null,
                datos.numeroSolicitud(),
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


    //GET___________________________________________
        //obtiene una solicitud con el numero de solicitud
    public DatosMuestraSolicitud obtenerSolicitud(Long numeroSolicitud, Long emisorId) {

        var id = validaYObtieneIdConNumeroSolicitud(numeroSolicitud,emisorId);
        var solicitud = solicitudRepository.getReferenceById(id);

        return new DatosMuestraSolicitud(solicitud);
    }
    //___________________________________________________


    //GET_LISTA__________________________________________
        //obtiene una lista con todas las solicitudes
    public Page<DatosMuestraSolicitud> listaDeSolicitudes(Pageable paginacion) {

        return solicitudRepository.findByActivoTrue(paginacion).map(DatosMuestraSolicitud::new);
    };
    //___________________________________________________


    //PUT________________________________________________
        //actualiza datos de una solicitud
    public DatosMuestraSolicitud actualizaSolicitud (DatosActualizaSolicitud datos){
        validaSiExisteIdAndActivoTrue(datos.id());
        var emisor = emisorRepository.getReferenceById(datos.emisorId());
        var fechaSolicitud = dateTimeFormatter(datos.fechaSolicitud());
        var solicitud = solicitudRepository.getReferenceById(datos.id());
        solicitud.actualizaSolicitud(
                datos.id(),
                datos.numeroSolicitud(),
                emisor,
                datos.titulo(),
                datos.descripcion(),
                fechaSolicitud
        );
        var solicitudActializada = solicitudRepository.getReferenceById(datos.id());

        return new DatosMuestraSolicitud(solicitudActializada);
    }   //__________


        //declinar una solicitud
    public DatosMuestraSolicitud declinarSolicitud (DatosDeclinarSolicitud datos){
        validaSiExisteIdAndActivoTrue(datos.id());
        var fechaDeclinacion = LocalDateTime.now();
        var estado = Estado.DECLINADO;
        var solicitud = solicitudRepository.getReferenceById(datos.id());
        solicitud.declinarSolicitud(
                datos.id(),
                datos.comentario(),
                fechaDeclinacion
        );
        cerrarSolicitud(datos.id(),estado);
        var solicitudActializada = solicitudRepository.getReferenceById(datos.id());

        return new DatosMuestraSolicitud(solicitudActializada);
    }
    //______________________________________________________


    //DELETE________________________________________________
        //elimina una solicitud (delete logico)
    public void eliminarSolicitud (DatosEliminaSolicitud datos){

        validaSiExisteIdAndActivoTrue(datos.id());
        var solicitud = solicitudRepository.getReferenceById(datos.id());
        solicitud.eliminarSolicitud(datos.id(), datos.comentario());
    }
    //______________________________________________________



    //VALIDADORES____________________________________________
        //valida id de registro
    public void validaSiExisteIdAndActivoTrue(Long id) {
        if(!solicitudRepository.existsByIdAndActivoTrue(id)){
            throw new RuntimeException("id de solicitud no existe");
        }
    }//__________


        //valida numeroSolicitud y emisorId. Obtiene id de registro y lo retorna
    public Long validaYObtieneIdConNumeroSolicitud (Long numeroSolicitud, Long emisorId){

        if(!solicitudRepository.existsByNumeroSolicitud(numeroSolicitud)) {
            throw new RuntimeException("id solicitud no existe");
        }

        if(!solicitudRepository.existsByEmisorId(emisorId)) {
            throw new RuntimeException("id emisor no existe");
        }

        if(!solicitudRepository.existsIdByNumeroSolicitudAndEmisorIdAndActivoTrue(numeroSolicitud,emisorId)){
            throw new RuntimeException("registro solicitud no existe");
        }

        return solicitudRepository.findIdByNumeroSolicitudAndEmisorIdAndActivoTrue(numeroSolicitud, emisorId).getId();
    }

    //valida si solicitud ya fue respondida
    public void validaSiSolicitudFueRespondida(Long id) {
        validaSiExisteIdAndActivoTrue(id);
        if(solicitudRepository.existsByIdAndCerradoTrue(id)){
            throw new RuntimeException("Solicitud se encuentra cerrada");
        }
    }//__________


    //______________________________________________________




    //MODIFICADORES_ESTADO_FORMATO_FECHA____________________
        //cambia string a formato fecha
    public LocalDateTime dateTimeFormatter (String fecha){
        var formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

        return LocalDateTime.parse(fecha, formatter);
    }//__________



        //cerrar solicitud una vez respondida o declinada y cambia su estado
    public void cerrarSolicitud (Long id, Estado estado) {
        var solicitud = solicitudRepository.getReferenceById(id);
        solicitud.cierraSolicitud(id, estado);
    }
    //______________________________________________________

}
