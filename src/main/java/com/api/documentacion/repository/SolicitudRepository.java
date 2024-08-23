package com.api.documentacion.repository;


import aj.org.objectweb.asm.commons.Remapper;
import com.api.documentacion.domain.solicitud.Solicitud;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SolicitudRepository extends JpaRepository<Solicitud,Long> {

    Page<Solicitud> findByActivoTrue(Pageable paginacion);

    Solicitud findBySolicitudIdTrue(Long aLong);

    Boolean existsByIdAndTrue(Long id);

    Boolean existsByIdAndCerradoTrue(Object id);
}
