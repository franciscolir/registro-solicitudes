package com.api.documentacion.repository;

import aj.org.objectweb.asm.commons.Remapper;
import com.api.documentacion.domain.respuesta.Respuesta;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.net.ssl.SSLSession;

@Repository
public interface RespuestaRepository extends JpaRepository<Respuesta,Long> {

    Page<Respuesta> findByActivoTrue(Pageable paginacion);

    Respuesta findByidAndActivoTrue(Long id);

    Boolean existsByIdAndActivoTrue(Long id);

    Respuesta findByNumeroRespuestaAndActivoTrue(Long numeroRespuesta);

    Boolean existsByNumeroRespuestaAndActivoTrue(Long numeroRespuesta);
}
