package com.api.documentacion.repository;

import com.api.documentacion.domain.usuario.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UsuarioRepository extends JpaRepository<Usuario,Long> {


    Page<Usuario> findByActivoTrue(Pageable paginacion);

    Boolean existsByIdAndActivoTrue(Long id);

    //@Query("SELECT u FROM Usuario u WHERE u.activo = true AND (u.subrogante = true OR u.encargado = true)")
    Page<Usuario> findByActivoTrueAndSubroganteTrueOrEncargadoTrue(Pageable paginacion);

    Optional<Usuario> findByCorreoElectronico(String correo);


}
