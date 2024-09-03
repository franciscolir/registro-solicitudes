package com.api.documentacion.repository;

import com.api.documentacion.domain.solicitud.Emisor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmisorRepository extends JpaRepository<Emisor,Long> {

    Page<Emisor> findAllByOrderByEstablecimientoAsc(Pageable paginacion);
}
