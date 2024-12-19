package com.api.documentacion.repository;


import com.api.documentacion.domain.unidad.Unidad;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UnidadRepository extends JpaRepository<Unidad,Long> {


    Page<Unidad> findDistinctByActivoTrue(Pageable pageable);

    boolean existsByIdAndActivoTrue(Long id);

    ;
}
