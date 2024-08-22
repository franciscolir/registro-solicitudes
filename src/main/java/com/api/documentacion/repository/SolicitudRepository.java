package com.api.documentacion.repository;


import com.api.documentacion.domain.solicitud.Solicitud;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SolicitudRepository extends JpaRepository<Solicitud,Long> {
}
