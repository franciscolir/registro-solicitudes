package com.api.documentacion.repository;

import com.api.documentacion.domain.solicitud.Solicitud;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SolicitudRepository extends JpaRepository<Solicitud,Long> {

    Page<Solicitud> findByActivoTrue(Pageable paginacion);

    Boolean existsByIdAndCerradoTrue(Long id);

    Boolean existsByIdAndActivoTrue(Long id);

    Boolean existsByNumeroSolicitud(Long numeroSolicitud);

    Boolean existsByEmisorId(Long emisorId);

    Boolean existsIdByNumeroSolicitudAndEmisorIdAndActivoTrue(Long numeroSolicitud, Long emisorId);

    Solicitud findIdByNumeroSolicitudAndEmisorIdAndActivoTrue(Long numeroSolicitud, Long emisorId);

    Page<Solicitud> findByCerradoFalse(Pageable paginacion);

    Page<Solicitud> findByCerradoFalseOrderByFechaIngresoSolicitudDesc(Pageable paginacion);
}