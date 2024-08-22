package com.api.documentacion.domain.usuario;

import com.api.documentacion.repository.PerfilRepository;
import com.api.documentacion.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
@Transactional
public class UsuarioService {

    @Autowired
    UsuarioRepository repository;
    @Autowired
    PerfilRepository perfilRepository;




}
