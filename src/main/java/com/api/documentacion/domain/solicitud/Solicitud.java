package com.api.documentacion.domain.solicitud;

import com.api.documentacion.domain.archivo.Archivo;
import com.api.documentacion.domain.movimiento.Movimiento;
import com.api.documentacion.domain.emisor.Emisor;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Table(name = "solicitudes")
@Entity(name = "Solicitud")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")

@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "@id")
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

    private LocalDate fechaSolicitud;
    private Boolean activo;

    @OneToOne(mappedBy = "solicitud")
    private Movimiento movimiento;  // Relación inversa

    @OneToMany(mappedBy = "solicitud")
    private List<Archivo> archivo;

    public Solicitud(Long id, Long numeroSolicitud, Long providenciaId, Emisor emisor, String titulo, String descripcion, LocalDate fechaSolicitud, Boolean activo) {
        this.id = id;
        this.numeroSolicitud = numeroSolicitud;
        this.providenciaId = providenciaId;
        this.emisor = emisor;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fechaSolicitud = fechaSolicitud;
        this.activo = activo;
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


    public void eliminarSolicitud (Long id){
        this.id = id;
        this.activo = false;
    }


}