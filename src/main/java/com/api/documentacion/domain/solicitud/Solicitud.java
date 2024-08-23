package com.api.documentacion.domain.solicitud;

import com.api.documentacion.domain.respuesta.Respuesta;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Table(name = "solicitudes")
@Entity(name = "Solicitud")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Solicitud {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long solicitudId;//numero asignado al documento por emisor. Ingreso manual
    private Long providenciaId;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "emisor_id")
    private Emisor emisor;

    private String titulo;
    private String descripcion;
    private String comentario;

    private LocalDateTime fechaSolicitud;
    private LocalDateTime fechaIngresoSolicitud;

    private Estado estado;
    private Boolean cerrado;
    private Boolean activo;

    @OneToOne(mappedBy = "solicitud")
    private Respuesta respuesta;


    public Solicitud(Long id, Long solicitudId, Emisor emisor, String titulo, String descripcion, LocalDateTime fechaSolicitud, LocalDateTime fechaIngresoSolicitud, Estado estado,Boolean cerrado, Boolean activo) {
        this.id = id;
        this.solicitudId = solicitudId;
        this.emisor = emisor;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fechaSolicitud = fechaSolicitud;
        this.fechaIngresoSolicitud = fechaIngresoSolicitud;
        this.estado = estado;
        this.cerrado = false;
        this.activo = true;
    }

    public void actualizaSolicitud (Long id, Long solicitudId, Emisor emisor, String titulo, String descripcion, LocalDateTime fechaSolicitud){
        this.id = id;
        this.solicitudId = solicitudId;
        this.emisor = emisor;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fechaSolicitud = fechaSolicitud;
    }

    public void elimiarSolicitud (Long id , String comentario){
        this.id = id;
        this.comentario = comentario;
        this.activo = false;
    }


    public void cambiaEstado (Long id, Estado estado){
        this.id = id;
        this.estado = estado;
    }

    public void cierraSolicitud (Long id, Estado estado){
        this.id = id;
        this.estado = estado;
        this.cerrado = true;
    }


}