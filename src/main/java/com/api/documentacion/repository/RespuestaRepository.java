package com.api.documentacion.repository;

import com.api.documentacion.domain.respuesta.Respuesta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RespuestaRepository extends JpaRepository<Respuesta,Long> {
}
