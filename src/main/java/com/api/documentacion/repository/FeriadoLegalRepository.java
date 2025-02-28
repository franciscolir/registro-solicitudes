package com.api.documentacion.repository;

import com.api.documentacion.domain.ausencias.FeriadoLegal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeriadoLegalRepository extends JpaRepository<FeriadoLegal, Long> {

}
