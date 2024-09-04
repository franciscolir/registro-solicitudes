package com.api.documentacion.repository;

import com.api.documentacion.domain.usuario.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UsuarioRepository extends JpaRepository<Usuario,Long> {


    Page<Usuario> findByActivoTrue(Pageable paginacion);
}
