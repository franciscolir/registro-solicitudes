package com.api.documentacion.domain.evento;

import com.api.documentacion.domain.evento.dto.DatosRegistraEvento;
import com.api.documentacion.domain.solicitud.EstablecimientoRepository;
import com.api.documentacion.domain.usuario.Usuario;
import com.api.documentacion.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class EventoService {
    @Autowired
    EventoRepository eventoRepository;
    @Autowired
    EstablecimientoRepository establecimientoRepository;
    @Autowired
    UsuarioRepository usuarioRepository;



    //POST__________________________________________
    //registra eventos con invitados

    public DatosMuestraEventos crearEvento(DatosRegistraEvento datos) {

        var tipo = TipoEvento.valueOf(datos.tipo());
        var fecha = dateTimeFormatter(datos.fecha());
        var establecimiento =   establecimientoRepository.getReferenceById(datos.establecimiento());


        // Guardar el evento
        var evento = new Evento(
                null,
                tipo,
                datos.descripcion(),
                fecha,
                establecimiento);

        eventoRepository.save(evento);

        // Obtener los usuarios desde la base de datos

        List<Usuario> lista = usuarioRepository.findAllById(datos.invitados());
        // Convertir de List a Set y almacena usuarios
        Set<Usuario> usuarios = (new HashSet<>(lista));

        // Asignar los usuarios al evento
        evento.setUsuarios(usuarios);

        // Guardar el evento con los usuarios asignados
        var response = eventoRepository.save(evento);
        return new DatosMuestraEventos(response);
    }

    //GET_LISTA__________________________________________
    //obtiene lista de eventos con invitados
    public Page<DatosMuestraEventos> listaDeEventos(Pageable paginacion) {

        //return eventoRepository.findAllByOrderByFechaDesc(paginacion).map(DatosMuestraEventos::new);
        return eventoRepository.findAllWithInvitados(paginacion).map(DatosMuestraEventos::new);
    }

    //cambia string a formato fecha
    public LocalDateTime dateTimeFormatter (String fecha){
        var formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

        return LocalDateTime.parse(fecha, formatter);
    }//__________


}
