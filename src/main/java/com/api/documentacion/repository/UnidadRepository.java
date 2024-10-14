package com.api.documentacion.repository;

import com.api.documentacion.domain.unidad.Unidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UnidadRepository extends JpaRepository<Unidad,Long> {



}
