package com.api.documentacion.repository;

import aj.org.objectweb.asm.commons.Remapper;
import com.api.documentacion.domain.certificado.Certificado;
import com.api.documentacion.domain.unidad.Unidad;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface CertificadoRepository extends JpaRepository<Certificado,Long> {


    Page<Certificado> findByActivoTrue(Pageable paginacion);

    boolean existsByIdAndActivoTrue(Long id);

    boolean existsByNumeroCertificadoAndActivoTrue(Long numeroCertificado);

    Certificado findByNumeroCertificadoAndActivoTrue(Long numeroCertificado);

    @Query("SELECT c FROM Certificado c WHERE c.unidad = :unidad ")
    Page<Certificado> obtenerUltimoCertificadoPorUnidad(@Param("unidad") Unidad unidad, Pageable pageable);
}
