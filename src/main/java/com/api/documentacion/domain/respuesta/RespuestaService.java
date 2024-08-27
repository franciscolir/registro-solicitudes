package com.api.documentacion.domain.respuesta;


import com.api.documentacion.domain.respuesta.dto.DatosActualizaRespuesta;
import com.api.documentacion.domain.respuesta.dto.DatosEliminaRespuesta;
import com.api.documentacion.domain.respuesta.dto.DatosMuestraRespuesta;
import com.api.documentacion.domain.respuesta.dto.DatosRegistraRespuesta;
import com.api.documentacion.domain.solicitud.Estado;
import com.api.documentacion.domain.solicitud.SolicitudService;
import com.api.documentacion.repository.RespuestaRepository;
import com.api.documentacion.repository.SolicitudRepository;
import com.api.documentacion.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

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


    public DatosMuestraRespuesta registrar(DatosRegistraRespuesta datos) {

        var usuario = usuarioRepository.getReferenceById(datos.usuario());
        var solicitud = solicitudRepository.getReferenceById(datos.solicitudId());
        var fechaEnvioRespuesta = LocalDateTime.now();
        var respuesta = new Respuesta(null,
                datos.respuestaId(),
                usuario,
                datos.titulo(),
                datos.descripcion(),
                datos.comentario(),
                datos.fechaRespuesta(),
                fechaEnvioRespuesta,
                true,
                solicitud
        );
        respuestaRepository.save(respuesta);

        //actualiza Solicitud, cambia su estado a RESUELTO y cerrado true.
        var estado = Estado.RESUELTO;
        solicitudService.cierraSolicitud(datos.solicitudId(),solicitud.getEmisor().getId(), estado);

        return new DatosMuestraRespuesta(respuesta);
    }

    //obtiene respuesta
    public DatosMuestraRespuesta obtenerRespuesta(Long id) {
        validaSiExisteIdRespuesta(id);
        var respuesta = respuestaRepository.getReferenceById(id);

        return new DatosMuestraRespuesta(respuesta);
    }

    //obtiene lista de respuesta
    public Page<DatosMuestraRespuesta> listaDeRespuestas(Pageable paginacion) {

        return respuestaRepository.findByActivoTrue(paginacion).map(DatosMuestraRespuesta::new);
    }

//actualiza respuesta Respuesta
    public DatosMuestraRespuesta actualizaRespuesta (DatosActualizaRespuesta datos){
        validaSiExisteIdRespuesta(datos.solicitudId());
        var id = respuestaRepository.findByRespuestaIdAndActivoTrue(datos.respuestaId()).getId();
        var respuesta = respuestaRepository.getReferenceById(id);
        respuesta.actualizaRespuesta(id, datos.respuestaId(), datos.titulo(), datos.descripcion(), datos.fechaRespuesta());
        var respuestaActualizada = respuestaRepository.getReferenceById(id);

        return new DatosMuestraRespuesta(respuestaActualizada);
    }

    public void eliminarRespuesta (DatosEliminaRespuesta datos){
        validaSiExisteIdRespuesta(datos.respuestaId());
        var id = respuestaRepository.findByRespuestaIdAndActivoTrue(datos.respuestaId()).getId();
        var respuesta = respuestaRepository.getReferenceById(id);
        respuesta.elimiarRespuesta(datos.respuestaId(), datos.comentario());
    }


    public void validaSiExisteIdRespuesta (Long respuestaId) {
        var id = obtieneIdConRespuestaId(respuestaId);
        if(!respuestaRepository.existsByIdAndActivoTrue(id)){
            throw new RuntimeException("id de respuesta no existe");
        }
    }

    public Long obtieneIdConRespuestaId (Long respuestaId){

        return respuestaRepository.findByRespuestaIdAndActivoTrue(respuestaId).getId();
    }
}
