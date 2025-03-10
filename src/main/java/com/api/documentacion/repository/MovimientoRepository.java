package com.api.documentacion.repository;

import aj.org.objectweb.asm.commons.Remapper;
import com.api.documentacion.domain.movimiento.Movimiento;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Range;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovimientoRepository extends JpaRepository<Movimiento,Long> {




    Page<Movimiento> findByActivoTrueAndCerradoFalseAndRechazadoFalse(Pageable paginacion);

    Page<Movimiento> findByActivoTrue(Pageable paginacion);

    Movimiento findIdBySolicitudIdAndActivoTrue(Long id);

    Page<Movimiento> findByActivoTrueAndRespuestaIdTrue(Pageable paginacion);
}
