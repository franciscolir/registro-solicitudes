package com.api.documentacion.repository;


import aj.org.objectweb.asm.commons.Remapper;
import com.api.documentacion.domain.solicitud.Solicitud;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SolicitudRepository extends JpaRepository<Solicitud,Long> {

    Page<Solicitud> findByActivoTrue(Pageable paginacion);

    Solicitud findBySolicitudIdAndActivoTrue(Long aLong);


    Boolean existsByIdAndCerradoTrue(Long id);

    Boolean existsByIdAndActivoTrue(Long id);

    // Consulta derivada para obtener el id
    //@Query("SELECT r.id FROM Solicitudes r WHERE r.solicitud_id = :solicitudId AND r.emisor_id = :emisorId")
    //Long findIdBySolicitudIdAndEmisor(@Param("solicitudId") Long solicitudId, @Param("emisorId") Long emisorId);
    Long findIdBySolicitudIdAndEmisorId(Long solicitudId, Long emisorId);
}
