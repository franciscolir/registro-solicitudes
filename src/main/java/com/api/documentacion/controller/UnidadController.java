package com.api.documentacion.controller;

import com.api.documentacion.domain.unidad.UnidadService;
import com.api.documentacion.domain.unidad.dto.DatosMuestraListaUnidades;
import com.api.documentacion.domain.usuario.UsuarioService;
import com.api.documentacion.domain.usuario.dto.DatosMuestraListaUsuarios;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@ResponseBody
@RequestMapping("/unidades")
@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
public class UnidadController {

    @Autowired
    UnidadService unidadService;

    //Obtener lista de unidades
    @Transactional
    @GetMapping
    public ResponseEntity<Page<DatosMuestraListaUnidades>> listaUnidades(Pageable paginacion) {
        var listaDeUnidades = unidadService.listaDeUnidades(paginacion);

        return ResponseEntity.ok(listaDeUnidades);
    }

}
