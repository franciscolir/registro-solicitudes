package com.api.documentacion.domain.solicitud;

import com.api.documentacion.domain.emisor.Emisor;
import com.api.documentacion.domain.movimiento.MovimientoService;
import com.api.documentacion.domain.solicitud.dto.*;
import com.api.documentacion.infra.errores.ValidacionDeIntegridad;
import com.api.documentacion.repository.EmisorRepository;
import com.api.documentacion.repository.MovimientoRepository;
import com.api.documentacion.repository.SolicitudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class SolicitudService {

    @Autowired @Lazy
    SolicitudRepository solicitudRepository;
    @Autowired
    EmisorRepository emisorRepository;
    @Autowired @Lazy
    MovimientoService movimientoService;
    @Autowired
    MovimientoRepository movimientoRepository;


    //POST___________________________________________
        //registra solicitud
    public DatosMuestraSolicitud registrar(DatosRegistraSolicitud datos) throws IOException {

        var emisor = emisorRepository.getReferenceById(datos.emisor());
        var fechaSolicitud = dateFormatter(datos.fechaSolicitud());
        validaSiNumeroDeSolicitudExiste(datos.numeroSolicitud(),emisor);
        var solicitud = new Solicitud(null,
                datos.numeroSolicitud(),
                datos.providenciaId(),
                emisor,
                datos.titulo(),
                datos.descripcion(),
                fechaSolicitud,
                true
        );
        solicitudRepository.save(solicitud);

        //Crea Movimiento cuando se registra solicitud
            movimientoService.registrar(solicitud);

        return new DatosMuestraSolicitud(solicitud);
    }


    //GET___________________________________________
        //obtiene una solicitud con el numero de solicitud
    public DatosMuestraSolicitudConMovimiento obtenerSolicitud(Long numeroSolicitud, Long emisorId) {

        var id = validaYObtieneIdConNumeroSolicitud(numeroSolicitud,emisorId);
        var solicitud = solicitudRepository.getReferenceById(id);
        var fechaSolicitud = stringFormatter2(solicitud.getFechaSolicitud());
        var movimientoId = movimientoRepository.findIdBySolicitudIdAndActivoTrue(id).getId();
        var movimiento = movimientoRepository.getReferenceById(movimientoId);

        return new DatosMuestraSolicitudConMovimiento(
                solicitud.getId(),
                solicitud.getNumeroSolicitud(),
                solicitud.getEmisor().getNombreEmisor(),
                solicitud.getTitulo(),
                solicitud.getDescripcion(),
                fechaSolicitud,
                movimiento.getEstado().toString(),
                movimiento.getFechaIngreso().toString()
        );
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
    //valida numero de registro
    public void validaSiNumeroDeSolicitudExiste(Long numeroSolicitud, Emisor emisor) {
        if(solicitudRepository.existsByNumeroSolicitudAndEmisorAndActivoTrue(numeroSolicitud, emisor)){
            throw new ValidacionDeIntegridad("numero de solicitud ya fue registrado");
        }
    }//__________


        //valída numeroSolicitud y emisorId. Obtiene id de registro y lo retorna
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
    public LocalDate dateFormatter (String fecha){
        var formatter = DateTimeFormatter.ISO_LOCAL_DATE;

        return LocalDate.parse(fecha, formatter);
    }//__________

    //cambia formato fecha a string
    public String stringFormatter2 (LocalDate fecha){
        var outputFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        return fecha.format(outputFormatter);
    }

    //______________________________________________________

}
