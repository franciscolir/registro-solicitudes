package com.api.documentacion.domain.solicitud;

import com.api.documentacion.domain.solicitud.dto.DatosMuestraSolicitud;
import com.api.documentacion.domain.solicitud.dto.DatosRegistraSolicitud;
import com.api.documentacion.repository.EmisorRepository;
import com.api.documentacion.repository.SolicitudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class SolicitudService {
@Autowired
    SolicitudRepository solicitudRepository;
@Autowired
Solicitud solicitud;
    @Autowired
    EmisorRepository emisorRepository;


    public DatosMuestraSolicitud registrar (DatosRegistraSolicitud datos){


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
                true
        );
        solicitudRepository.save(solicitud);

        return new DatosMuestraSolicitud(solicitud);
    }

    public void eliminarSolicitud (DatosEliminaSolicitud datos){

        solicitud.elimiarSolicitud(datos.solicitudId(), datos.comentario());
    }

}
