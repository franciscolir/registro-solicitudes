package com.api.documentacion.repository;

import com.api.documentacion.domain.emisor.CategoriaEmisor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaEmisorRepository extends JpaRepository <CategoriaEmisor, Long> {

    Page<CategoriaEmisor> findByActivoTrue(Pageable paginacion);

}
