package com.api.documentacion.repository;

import com.api.documentacion.domain.ausencias.PermisoAdministrativo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PermisoAdministrativoRepository extends JpaRepository<PermisoAdministrativo, Long> {

}
