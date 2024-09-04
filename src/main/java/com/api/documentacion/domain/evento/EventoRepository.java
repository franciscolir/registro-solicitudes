package com.api.documentacion.domain.evento;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface EventoRepository extends JpaRepository<Evento,Long> {



    Page<Evento> findAll(Pageable paginacion);

    Page<Evento>  findAllByOrderByFechaDesc(Pageable paginacion);

    @Query("SELECT e FROM Evento e LEFT JOIN FETCH e.invitados ORDER BY e.fecha DESC")
    Page<Evento> findAllWithInvitados(Pageable pageable);
}
