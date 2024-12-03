package com.api.documentacion.domain.evento;

import com.api.documentacion.domain.evento.dto.DatosMuestraCategoria;
import com.api.documentacion.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CategoriaEventoService {
    @Autowired
    CategoriaRepository categoriaRepository;



    //GET_LISTA__________________________________________
    //obtiene lista de eventos con invitados
    public Page<DatosMuestraCategoria> listaDeCategorias(Pageable paginacion) {

        return categoriaRepository.findByActivoTrue(paginacion).map(DatosMuestraCategoria::new);
    }



    }

