package com.api.documentacion.domain.respuesta;

import com.api.documentacion.domain.respuesta.dto.DatosActualizaRespuesta;
import com.api.documentacion.domain.respuesta.dto.DatosEliminaRespuesta;
import com.api.documentacion.domain.respuesta.dto.DatosMuestraRespuesta;
import com.api.documentacion.domain.respuesta.dto.DatosRegistraRespuesta;
import com.api.documentacion.domain.emisor.Estado;
import com.api.documentacion.domain.solicitud.SolicitudService;
import com.api.documentacion.domain.usuario.UsuarioService;
import com.api.documentacion.infra.errores.ValidacionDeIntegridad;
import com.api.documentacion.repository.RespuestaRepository;
import com.api.documentacion.repository.SolicitudRepository;
import com.api.documentacion.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class RespuestaService {
    @Autowired
    UsuarioRepository usuarioRepository;
    @Autowired
    RespuestaRepository respuestaRepository;
    @Autowired
    SolicitudRepository solicitudRepository;
    @Autowired
    SolicitudService solicitudService;
    @Autowired
    UsuarioService usuarioService;


    public DatosMuestraRespuesta registrar(DatosRegistraRespuesta datos) {
        usuarioService.validaSiExisteIdAndActivoTrue(datos.usuario());
        var usuario = usuarioRepository.getReferenceById(datos.usuario());
        solicitudService.validaSiSolicitudFueRespondida(datos.solicitudId());
        var solicitud = solicitudRepository.getReferenceById(datos.solicitudId());
        validaSiExisteNumeroRespuestaAndActivoTrue(datos.numeroRespuesta());
        var fechaRespuesta = dateFormatter(datos.fechaRespuesta());
        var fechaEnvioRespuesta = LocalDateTime.now();
        var respuesta = new Respuesta(null,
                datos.numeroRespuesta(),
                usuario,
                datos.titulo(),
                datos.descripcion(),
                datos.comentario(),
                fechaRespuesta,
                fechaEnvioRespuesta,
                true,
                solicitud
        );
        respuestaRepository.save(respuesta);

        //actualiza Solicitud, cambia su estado a RESUELTO y cerrado true.
        var estado = Estado.RESUELTO;
        solicitudService.cerrarSolicitud(datos.solicitudId(), estado);

        return new DatosMuestraRespuesta(respuesta);
    }

    //GET___________________________________________
        //obtiene respuesta con el numero de respuesta

    public DatosMuestraRespuesta obtenerRespuesta(Long numeroRespuesta) {
        var id = validaSiExisteYObtieneIdConNumeroRespuesta(numeroRespuesta);
        var respuesta = respuestaRepository.getReferenceById(id);

        return new DatosMuestraRespuesta(respuesta);
    }
    //___________________________________________________


    //GET_LISTA__________________________________________
        //obtiene lista de respuestas
    public Page<DatosMuestraRespuesta> listaDeRespuestas(Pageable paginacion) {

        return respuestaRepository.findByActivoTrue(paginacion).map(DatosMuestraRespuesta::new);
    }
    //___________________________________________________



    //PUT________________________________________________
        //actualiza respuesta Respuesta
    public DatosMuestraRespuesta actualizaRespuesta (DatosActualizaRespuesta datos){

        validaSiExisteIdAndActivoTrue(datos.id());
        var respuesta = respuestaRepository.getReferenceById(datos.id());
        var fechaRespuesta = dateFormatter(datos.fechaRespuesta());
        respuesta.actualizaRespuesta(datos.id(), datos.respuestaId(), datos.titulo(), datos.descripcion(), fechaRespuesta);
        var respuestaActualizada = respuestaRepository.getReferenceById(datos.id());

        return new DatosMuestraRespuesta(respuestaActualizada);
    }
    //______________________________________________________


    //DELETE________________________________________________
        //elimina una solicitud (delete logico)
    public void eliminarRespuesta (DatosEliminaRespuesta datos){

        validaSiExisteIdAndActivoTrue(datos.id());
        var respuesta = respuestaRepository.getReferenceById(datos.id());
        respuesta.elimiarRespuesta(datos.id(), datos.comentario());
    }
    //______________________________________________________


    //VALIDADORES____________________________________________
        //valida id de registro
    public void validaSiExisteIdAndActivoTrue (Long id) {
        if(!respuestaRepository.existsByIdAndActivoTrue(id)){
            throw new ValidacionDeIntegridad(" id no existe");
        }
    }   //__________

    //VALIDADORES____________________________________________
    //valida id de registro
    public void validaSiExisteNumeroRespuestaAndActivoTrue (Long id) {
        if(respuestaRepository.existsByIdAndActivoTrue(id)){
            throw new ValidacionDeIntegridad(" El numero de respuesta ya fue registrado");
        }
    }   //__________


        //valida numeroRespuesta. Obtiene id de registro y lo retorna
    public Long validaSiExisteYObtieneIdConNumeroRespuesta (Long numeroRespuesta) {
        if(!respuestaRepository.existsByNumeroRespuestaAndActivoTrue(numeroRespuesta)){
            throw new ValidacionDeIntegridad(" id de respuesta no existe");
        }
        return respuestaRepository.findByNumeroRespuestaAndActivoTrue(numeroRespuesta).getId();
    }
    //______________________________________________________


    //MODIFICADOR_FORMATO_FECHA-dia-hora____________________
        //cambia string a formato fecha
    public LocalDateTime dateTimeFormatter (String fecha){
        var formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

        return LocalDateTime.parse(fecha, formatter);
    }   //__________
    //cambia string a formato fecha solo dia
    public LocalDate dateFormatter (String fecha){
        var formatter = DateTimeFormatter.ISO_LOCAL_DATE;
        //var formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

        return LocalDate.parse(fecha, formatter);
    }//__________
}
