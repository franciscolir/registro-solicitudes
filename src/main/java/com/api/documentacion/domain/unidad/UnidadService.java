package com.api.documentacion.domain.unidad;

import com.api.documentacion.domain.movimiento.EstadoMovimiento;
import com.api.documentacion.domain.movimiento.Movimiento;
import com.api.documentacion.domain.movimiento.dto.*;
import com.api.documentacion.domain.unidad.dto.DatosMuestraListaUnidades;
import com.api.documentacion.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service

public class UnidadService {

    @Autowired
    UnidadRepository unidadRepository;


    //GET___________________________________________

    //obtiene lista de unidades
@Transactional
    public Page<DatosMuestraListaUnidades> listaDeUnidades(Pageable paginacion) {

        return unidadRepository.findDistinctByActivoTrue(paginacion).map(DatosMuestraListaUnidades::new);
    }


    //DELETE________________________________________________
    //elimina un movimiento (delete logico)
    public void eliminarUnidad (Long id){

        var unidad = unidadRepository.getReferenceById(id);
        unidad.eliminarUnidad(id);
    }
    //______________________________________________________

}

