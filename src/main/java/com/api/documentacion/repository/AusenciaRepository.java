package com.api.documentacion.repository;

import com.api.documentacion.domain.ausencias.Ausencia;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AusenciaRepository extends JpaRepository<Ausencia,Long> {
}
