package com.api.documentacion.repository;

import aj.org.objectweb.asm.commons.Remapper;
import com.api.documentacion.domain.evento.Evento;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;


@Repository
public interface EventoRepository extends JpaRepository<Evento,Long> {



    Page<Evento> findAll(Pageable paginacion);

    //DISTINCT para evistar que sume elementos repetidos por la tabla evento-usuario
    @Query("SELECT DISTINCT e FROM Evento e LEFT JOIN FETCH e.invitados ORDER BY e.fecha")
    Page<Evento> findAllWithInvitados(Pageable pageable);

    // Consulta que filtra eventos con fecha futura o actual
    @Query("SELECT DISTINCT e FROM Evento e LEFT JOIN FETCH e.invitados WHERE e.fecha >= :currentDate ORDER BY e.fecha")
    Page<Evento> findAllWithInvitadosAndProximos(Pageable paginacion, LocalDateTime currentDate);
    ;
}
