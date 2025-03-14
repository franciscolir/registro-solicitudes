package com.api.documentacion.repository;

import com.api.documentacion.domain.evento.CategoriaEvento;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepository extends JpaRepository<CategoriaEvento,Long> {


    Page<CategoriaEvento> findByActivoTrue(Pageable paginacion);
}