package com.api.documentacion.domain.solicitud;

import com.api.documentacion.domain.registro.Registro;
import com.api.documentacion.domain.respuesta.Respuesta;
import com.api.documentacion.domain.emisor.Emisor;
import com.api.documentacion.domain.emisor.Estado;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
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
    private Long numeroSolicitud;//numero asignado al documento por emisor. Ingreso manual
    private Long providenciaId;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "emisor_id")
    private Emisor emisor;

    private String titulo;
    private String descripcion;
    private String comentario;

    private LocalDate fechaSolicitud;
    private LocalDateTime fechaIngresoSolicitud;
    private LocalDateTime fechaDeclinacion;

    @Enumerated(EnumType.STRING)
    private Estado estado;
    private Boolean cerrado;
    private Boolean activo;

    @OneToOne(mappedBy = "solicitud")
    private Respuesta respuesta;

    @OneToOne(mappedBy = "solicitud")
    private Registro registro;  // Relación inversa


    public Solicitud(Long id, Long numeroSolicitud, Emisor emisor, String titulo, String descripcion, LocalDate fechaSolicitud, LocalDateTime fechaIngresoSolicitud, Estado estado,Boolean cerrado, Boolean activo) {
        this.id = id;
        this.numeroSolicitud = numeroSolicitud;
        this.emisor = emisor;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fechaSolicitud = fechaSolicitud;
        this.fechaIngresoSolicitud = fechaIngresoSolicitud;
        this.estado = estado;
        this.cerrado = false;
        this.activo = true;
    }

    public void actualizaSolicitud (Long id, Long numeroSolicitud, Emisor emisor, String titulo, String descripcion, LocalDate fechaSolicitud){
        this.id = id;
        this.numeroSolicitud = numeroSolicitud;
        if(emisor != null)
            this.emisor = emisor;
        if(titulo != null)
            this.titulo = titulo;
        if(descripcion != null)
            this.descripcion = descripcion;
        if(fechaSolicitud != null)
            this.fechaSolicitud = fechaSolicitud;
    }


    public void declinarSolicitud (Long id, String comentario, LocalDateTime fechaDeclinacion){
        this.id = id;
        this.comentario = comentario;
        this.fechaDeclinacion = fechaDeclinacion;
    }


    public void eliminarSolicitud (Long id , String comentario){
        this.id = id;
        this.comentario = comentario;
        this.activo = false;
    }


    public void cierraSolicitud (Long id, Estado estado){
        this.id = id;
        this.estado = estado;
        this.cerrado = true;
    }

}