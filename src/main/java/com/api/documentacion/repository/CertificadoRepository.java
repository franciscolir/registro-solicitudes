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

import java.util.List;


@Repository
public interface CertificadoRepository extends JpaRepository<Certificado,Long> {


    Page<Certificado> findByActivoTrue(Pageable paginacion);

    boolean existsByIdAndActivoTrue(Long id);

    boolean existsByNumeroCertificadoAndActivoTrue(Long numeroCertificado);

    Certificado findByNumeroCertificadoAndActivoTrue(Long numeroCertificado);

    @Query("SELECT c FROM Certificado c WHERE c.unidad = :unidad")
    Page<Certificado> obtenerUltimoCertificadoPorUnidad(@Param("unidad") Unidad unidad, Pageable pageable);


    // Consulta personalizada para obtener el id del documento con el numero_documentos más alto en un departamento específico
    @Query("SELECT d.id FROM Certificado d WHERE d.unidad = :unidad ORDER BY d.numeroCertificado DESC")
    Long findIdOfLastCertificadoByUnidad(Long unidad);


    // Consulta personalizada para obtener el último número de documento por unidad
    //@Query("SELECT d.numeroCertificado FROM Certificado d WHERE d.unidad = :unidad ORDER BY d.numeroCertificado DESC")
    //Page<Certificado> findLastCertificadoByUnidad(Unidad unidad);

    @Query("SELECT d.numeroCertificado FROM Certificado d WHERE d.unidad = :unidad ORDER BY d.numeroCertificado DESC")
    List<Long> findLastCertificadoByUnidad(Unidad unidad, Pageable pageable);




}