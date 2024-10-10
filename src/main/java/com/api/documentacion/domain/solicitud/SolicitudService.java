package com.api.documentacion.domain.solicitud;

import com.api.documentacion.domain.solicitud.dto.*;
import com.api.documentacion.domain.emisor.Estado;
import com.api.documentacion.infra.errores.ValidacionDeIntegridad;
import com.api.documentacion.repository.EmisorRepository;
import com.api.documentacion.repository.SolicitudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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

        var fechaSolicitud = dateFormatter(datos.fechaSolicitud());

        var solicitud = new Solicitud(null,
                datos.numeroSolicitud(),
                datos.providenciaId(),
                emisor,
                datos.titulo(),
                datos.descripcion(),
                fechaSolicitud,
                true,
                null
        );
        solicitudRepository.save(solicitud);

        return new DatosMuestraSolicitud(solicitud);
    }


    //GET___________________________________________
        //obtiene una solicitud con el numero de solicitud
    public DatosMuestraSolicitud obtenerSolicitud(Long numeroSolicitud, Long emisorId) {

        var id = validaYObtieneIdConNumeroSolicitud(numeroSolicitud,emisorId);
        var solicitud = solicitudRepository.getReferenceById(id);
        var fechaSolicitud = stringFormatter2(solicitud.getFechaSolicitud());

        return new DatosMuestraSolicitud(
                solicitud.getId(),
                solicitud.getNumeroSolicitud(),
                solicitud.getEmisor().getEstablecimiento().getNombreEstablecimiento(),
                solicitud.getTitulo(),
                solicitud.getDescripcion(),
                fechaSolicitud);
    }
    //___________________________________________________


    //GET_LISTA__________________________________________
        //obtiene una lista con todas las solicitudes
    public Page<DatosMuestraSolicitud> listaDeSolicitudes(Pageable paginacion) {

        return solicitudRepository.findByActivoTrue(paginacion).map(DatosMuestraSolicitud::new);
    }//_______

    //___________________________________________________


    //PUT________________________________________________
        //actualiza datos de una solicitud
    public DatosMuestraSolicitud actualizaSolicitud (DatosActualizaSolicitud datos){
        validaSiExisteIdAndActivoTrue(datos.id());
        var emisor = emisorRepository.getReferenceById(datos.emisorId());
        var fechaSolicitud = dateFormatter(datos.fechaSolicitud());
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
    }

    //______________________________________________________


    //DELETE________________________________________________
        //elimina una solicitud (delete logico)
    public void eliminarSolicitud (DatosEliminaSolicitud datos){

        validaSiExisteIdAndActivoTrue(datos.id());
        var solicitud = solicitudRepository.getReferenceById(datos.id());
        solicitud.eliminarSolicitud(datos.id());
    }
    //______________________________________________________



    //VALIDADORES____________________________________________
        //valida id de registro
    public void validaSiExisteIdAndActivoTrue(Long id) {
        if(!solicitudRepository.existsByIdAndActivoTrue(id)){
            throw new ValidacionDeIntegridad("id de solicitud no existe");
        }
    }//__________


        //valida numeroSolicitud y emisorId. Obtiene id de registro y lo retorna
    public Long validaYObtieneIdConNumeroSolicitud (Long numeroSolicitud, Long emisorId){

        if(!solicitudRepository.existsByNumeroSolicitud(numeroSolicitud)) {
            throw new ValidacionDeIntegridad("id solicitud no existe");
        }

        if(!solicitudRepository.existsByEmisorId(emisorId)) {
            throw new ValidacionDeIntegridad("id emisor no existe");
        }

        if(!solicitudRepository.existsIdByNumeroSolicitudAndEmisorIdAndActivoTrue(numeroSolicitud,emisorId)){
            throw new ValidacionDeIntegridad("registro solicitud no existe");
        }

        return solicitudRepository.findIdByNumeroSolicitudAndEmisorIdAndActivoTrue(numeroSolicitud, emisorId).getId();
    }


    //______________________________________________________




    //MODIFICADORES_ESTADO_FORMATO_FECHA____________________
        //cambia string a formato fecha
    public LocalDateTime dateTimeFormatter (String fecha){
        var formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

        return LocalDateTime.parse(fecha, formatter);
    }//__________

    //cambia formato fecha a string
    public String stringFormatter (LocalDateTime fecha){
        var outputFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");

        return fecha.format(outputFormatter);
    }//__________

    //cambia string a formato fecha
    public LocalDate dateFormatter (String fecha){
        var formatter = DateTimeFormatter.ISO_LOCAL_DATE;
        //var formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

        return LocalDate.parse(fecha, formatter);
    }//__________

    //cambia formato fecha a string
    public String stringFormatter2 (LocalDate fecha){
        var outputFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        return fecha.format(outputFormatter);
    }

    //______________________________________________________

}
