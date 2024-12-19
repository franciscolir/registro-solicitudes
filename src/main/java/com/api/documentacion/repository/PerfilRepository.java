package com.api.documentacion.repository;

import com.api.documentacion.domain.usuario.Perfil;
import com.api.documentacion.domain.usuario.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface PerfilRepository extends JpaRepository<Perfil,Long> {

    Perfil getReferenceById(Long id);

    @Query("SELECT p.id FROM Perfil p WHERE p.rol = :rol")
    Long findIdByRol(@Param("rol") Rol rol);

    boolean existsById(Long id);
}
