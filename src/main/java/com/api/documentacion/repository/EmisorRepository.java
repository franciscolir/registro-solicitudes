package com.api.documentacion.repository;

import com.api.documentacion.domain.solicitud.Emisor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmisorRepository extends JpaRepository<Emisor,Long> {
}
