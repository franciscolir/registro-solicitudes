package com.api.documentacion.domain.evento;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class EventoService {
@Autowired
    EventoRepository eventoRepository;




    //GET_LISTA__________________________________________
    //obtiene lista de eventos con invitados
    public Page<DatosMuestraEventos> listaDeEventos(Pageable paginacion) {

        //return eventoRepository.findAllByOrderByFechaDesc(paginacion).map(DatosMuestraEventos::new);
        return eventoRepository.findAllWithInvitados(paginacion).map(DatosMuestraEventos::new);
    }


}
