package com.api.documentacion.repository;

import com.api.documentacion.domain.emisor.Emisor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmisorRepository extends JpaRepository<Emisor,Long> {

    Page<Emisor> findAllByOrderByNombreEmisorAsc(Pageable paginacion);
}
