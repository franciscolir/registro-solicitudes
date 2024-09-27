package com.api.documentacion.repository;

import com.api.documentacion.domain.Certificado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CertificadoRepository extends JpaRepository<Certificado,Long> {



}
