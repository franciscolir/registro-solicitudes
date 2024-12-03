package com.api.documentacion.domain.emisor;

import com.api.documentacion.domain.emisor.dto.DatosMuestraEmisor;
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

        return emisorRepository.findAllByOrderByNombreEmisorAsc(paginacion).map(DatosMuestraEmisor::new);
    }
    //___________________________________________________
}