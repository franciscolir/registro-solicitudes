package com.api.documentacion.domain.emisor;

import com.api.documentacion.domain.emisor.dto.DatosMuestraCategoriaEmisor;
import com.api.documentacion.repository.CategoriaEmisorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;



@Service
public class CategoriaEmisorService {
    @Autowired
    CategoriaEmisorRepository categoriaRepository;



    //GET_LISTA__________________________________________
    //obtiene lista de eventos con invitados
    public Page<DatosMuestraCategoriaEmisor> listaDeCategorias(Pageable paginacion) {

        return categoriaRepository.findByActivoTrue(paginacion).map(DatosMuestraCategoriaEmisor::new);
    }



}