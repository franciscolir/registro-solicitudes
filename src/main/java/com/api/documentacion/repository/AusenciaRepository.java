package com.api.documentacion.repository;

import com.api.documentacion.domain.ausencias.Ausencia;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;

public interface AusenciaRepository extends JpaRepository<Ausencia,Long> {

    @Query(value = "SELECT * FROM evento WHERE fecha1 >= :fechaHoy AND fecha2 <= :fechaHoy",
            countQuery = "SELECT count(*) FROM evento WHERE fecha1 >= :fechaHoy AND fecha2 <= :fechaHoy",
            nativeQuery = true)
    Page<Ausencia> findAusenciasBetweenFechas(@Param("fechaHoy") LocalDate fechaHoy, Pageable pageable);

}
