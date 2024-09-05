package com.api.documentacion.repository;

import com.api.documentacion.domain.emisor.Establecimiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstablecimientoRepository extends JpaRepository<Establecimiento,Long> {
}
