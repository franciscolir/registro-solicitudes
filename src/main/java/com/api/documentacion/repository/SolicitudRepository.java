package com.api.documentacion.repository;

import com.api.documentacion.domain.solicitud.Solicitud;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SolicitudRepository extends JpaRepository<Solicitud,Long> {

    Page<Solicitud> findByActivoTrue(Pageable paginacion);

    Boolean existsByIdAndCerradoTrue(Long id);

    Boolean existsByIdAndActivoTrue(Long id);

    Boolean existsBySolicitudId(Long solicitudId);

    Boolean existsByEmisorId(Long emisorId);

    Boolean existsIdBySolicitudIdAndEmisorIdAndActivoTrue(Long solicitudId, Long emisorId);

    Solicitud findIdBySolicitudIdAndEmisorIdAndActivoTrue(Long solicitudId, Long emisorId);
}