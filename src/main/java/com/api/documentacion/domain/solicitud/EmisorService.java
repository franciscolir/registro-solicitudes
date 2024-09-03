package com.api.documentacion.domain.solicitud;

import com.api.documentacion.domain.evento.DatosMuestraEventos;
import com.api.documentacion.domain.evento.EventoRepository;
import com.api.documentacion.repository.EmisorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;




@Service
public class EmisorService {
    @Autowired
    EmisorRepository emisorRepository;

    //GET_LISTA__________________________________________
    //obtiene lista de emisores
    public Page<DatosMuestraEmisor> listaDeEmisores(Pageable paginacion) {

        return emisorRepository.findAllByOrderByEstablecimientoAsc(paginacion).map(DatosMuestraEmisor::new);
    }
    //___________________________________________________
}