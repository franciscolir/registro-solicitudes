package com.api.documentacion.domain.evento;

import com.api.documentacion.domain.evento.dto.DatosMuestraEventos;
import com.api.documentacion.domain.evento.dto.DatosRegistraEvento;
import com.api.documentacion.repository.CategoriaRepository;
import com.api.documentacion.repository.EmisorRepository;
import com.api.documentacion.domain.usuario.Usuario;
import com.api.documentacion.repository.EventoRepository;
import com.api.documentacion.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class EventoService {
    @Autowired
    EventoRepository eventoRepository;
    @Autowired
    EmisorRepository emisorRepository;
    @Autowired
    UsuarioRepository usuarioRepository;
    @Autowired
    CategoriaRepository categoriaRepository;



    //POST__________________________________________
    //registra eventos con invitados

    public DatosMuestraEventos crearEvento(DatosRegistraEvento datos) {

        var categoria = categoriaRepository.getReferenceById(datos.categoria());
        var fecha = dateTimeFormatter(datos.fecha());
        var establecimiento =   emisorRepository.getReferenceById(datos.establecimiento());

        // Guardar el evento
        var evento = new Evento(
                null,
                categoria,
                datos.descripcion(),
                fecha,
                establecimiento
                );

        eventoRepository.save(evento);

        //tratar lista de usuarios y almacenarla en tabla evento_usuario



        Set<Usuario> listaUsuarios = new HashSet<>();
        for (Long usuarioId : datos.invitados()) {
            var usuario = usuarioRepository.findById(usuarioId)
                    .orElseThrow(() -> new RuntimeException("B not found"));
            listaUsuarios.add(usuario);
        }

        evento.getInvitados().addAll(listaUsuarios);
        var response = eventoRepository.save(evento);

        return new DatosMuestraEventos(response);
    }


    //GET_LISTA__________________________________________
    //obtiene lista de eventos con invitados
    public Page<DatosMuestraEventos> listaDeEventos(Pageable paginacion) {

        //return eventoRepository.findAllByOrderByFechaDesc(paginacion).map(DatosMuestraEventos::new);
        return eventoRepository.findAllWithInvitados(paginacion).map(DatosMuestraEventos::new);
    }

    public Page<DatosMuestraEventos> listaDeProximosEventos(Pageable paginacion) {
        var currentDate = LocalDateTime.now();
        return eventoRepository.findAllWithInvitadosAndProximos(paginacion, currentDate).map(DatosMuestraEventos::new);
    }

    //cambia string a formato fecha
    public LocalDateTime dateTimeFormatter (String fecha){
        var formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

        return LocalDateTime.parse(fecha, formatter);
    }//__________



}

