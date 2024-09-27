package com.api.documentacion.repository;

import com.api.documentacion.domain.registro.Registro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegistroRepository extends JpaRepository<Registro,Long> {
}
