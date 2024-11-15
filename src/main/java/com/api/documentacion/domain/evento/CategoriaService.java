package com.api.documentacion.domain.evento;

import com.api.documentacion.domain.evento.dto.DatosMuestraCategoria;
import com.api.documentacion.domain.evento.dto.DatosMuestraEventos;
import com.api.documentacion.domain.evento.dto.DatosRegistraEvento;
import com.api.documentacion.domain.usuario.Usuario;
import com.api.documentacion.repository.CategoriaRepository;
import com.api.documentacion.repository.EstablecimientoRepository;
import com.api.documentacion.repository.EventoRepository;
import com.api.documentacion.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.Set;

@Service
public class CategoriaService {
    @Autowired
    CategoriaRepository categoriaRepository;



    //GET_LISTA__________________________________________
    //obtiene lista de eventos con invitados
    public Page<DatosMuestraCategoria> listaDeCategorias(Pageable paginacion) {

        return categoriaRepository.findByActivoTrue(paginacion).map(DatosMuestraCategoria::new);
    }



    }

