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

    //POST___________________________________________
        //registra solicitud
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


    //GET___________________________________________
        //obtiene una solicitud con el numero de solicitud
    public DatosMuestraSolicitud obtenerSolicitud(Long solicitudId, Long emisorId) {

        var id = validaYObtieneIdConSolicitudId(solicitudId,emisorId);
        System.out.println(id + "########################### id desde el metodo: validaSiExisteIdSolicitudYRetornaId");
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
                datos.solicitudId(),
                emisor,
                datos.titulo(),
                datos.descripcion(),
                fechaSolicitud
        );
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


        //valida solicitudId y emisorId. Obtiene id de registro y lo retorna
    public Long validaYObtieneIdConSolicitudId (Long solicitudId, Long emisorId){

        if(!solicitudRepository.existsBySolicitudId(solicitudId)) {
            throw new RuntimeException("id solicitud no existe");
        }

        if(!solicitudRepository.existsByEmisorId(emisorId)) {
            throw new RuntimeException("id emisor no existe");
        }

        if(!solicitudRepository.existsIdBySolicitudIdAndEmisorIdAndActivoTrue(solicitudId,emisorId)){
            throw new RuntimeException("registro solicitud no existe");
        }

        return solicitudRepository.findIdBySolicitudIdAndEmisorIdAndActivoTrue(solicitudId, emisorId).getId();
    }
    //______________________________________________________




    //MODIFICADORES_ESTADO_FORMATO_FECHA____________________
        //cambia string a formato fecha
    public LocalDateTime dateTimeFormatter (String fecha){
        var formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

        return LocalDateTime.parse(fecha, formatter);
    }//__________


        //cambia estado segun lista de enum
    public void cambiaEstado (Long id, Estado estado) {

        validaSiExisteIdAndActivoTrue(id);
        var solicitud = solicitudRepository.getReferenceById(id);
        solicitud.cambiaEstado(id,estado);
    }//__________


        //cierra solicitud una vez respondida y cambia su estado
    public void cierraSolicitud (Long id, Estado estado) {

        validaSiExisteIdAndActivoTrue(id);
        if(solicitudRepository.existsByIdAndCerradoTrue(id)){
            throw new RuntimeException("Solicitud se encuentra cerrada");
        }
        var solicitud = solicitudRepository.getReferenceById(id);
        solicitud.cierraSolicitud(id, estado);
    }
    //______________________________________________________

}
