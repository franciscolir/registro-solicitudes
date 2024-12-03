package com.api.documentacion.repository;

import com.api.documentacion.domain.archivo.Archivo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ArchivoRepository extends JpaRepository<Archivo, String> {
}
