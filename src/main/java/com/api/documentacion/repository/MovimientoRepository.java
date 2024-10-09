package com.api.documentacion.repository;

import com.api.documentacion.domain.movimiento.Movimiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovimientoRepository extends JpaRepository<Movimiento,Long> {


    Movimiento findIdBySolicitudId(Long idSolicitud);
}
