package com.api.documentacion.domain.movimiento;

import com.api.documentacion.domain.certificado.Certificado;
import com.api.documentacion.domain.respuesta.Respuesta;
import com.api.documentacion.domain.solicitud.Solicitud;
import com.api.documentacion.domain.unidad.Unidad;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Table(name = "movimientos")
@Entity(name = "Movimiento")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")

public class Movimiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime fechaIngreso;
    private LocalDateTime fechaAsignacion;
    private LocalDateTime fechaResuelto;
    private LocalDateTime fechaCierre;
    private LocalDateTime fechaRechazado;

    private Boolean asignado;
    private Boolean resuelto;
    private Boolean cerrado;
    private Boolean activo;
    private Boolean rechazado;

    private String comentarioAsignacion;
    private String comentarioResuelto;
    private String comentarioRechazado;

    @Enumerated(EnumType.STRING)
    private EstadoMovimiento estado;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "solicitud_id")
    private Solicitud solicitud;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "unidad_id") // Nombre de la columna en la tabla movimientos
    private Unidad unidad; // Relación ManyToOne

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "certificado_id")
    private Certificado certificado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "respuesta_id")
    private Respuesta respuesta;


    public void asignarMovimiento (Long id, Boolean asignado, LocalDateTime fechaAsignacion, String comentarioAsignacion, EstadoMovimiento estado, Unidad unidad){

        this.id = id;
        if(asignado != null)
            this.asignado = asignado;
        if(fechaAsignacion != null)
            this.fechaAsignacion = fechaAsignacion;
        if(comentarioAsignacion != null)
            this.comentarioAsignacion = comentarioAsignacion;
        this.estado = estado;
        if(unidad != null)
            this.unidad = unidad;

    }

    public void resolverMovimiento (Long id, Boolean resuelto, LocalDateTime fechaResuelto, String comentarioResuelto, EstadoMovimiento estado, Certificado certificado){

        this.id = id;
        if(resuelto != null)
            this.resuelto = resuelto;
        if(fechaResuelto != null)
            this.fechaResuelto = fechaResuelto;
        if(comentarioResuelto != null)
            this.comentarioResuelto = comentarioResuelto;
        this.estado = estado;
        if(certificado != null)
            this.certificado = certificado;

    }

    public void cierraMovimiento (Long id, Boolean cerrado, LocalDateTime fechaCierre, EstadoMovimiento estado, Respuesta respuesta){

        this.id = id;
        if(cerrado != null)
            this.cerrado = cerrado;
        if(fechaCierre != null)
            this.fechaCierre = fechaCierre;
        this.estado = estado;
        if(respuesta != null)
            this.respuesta = respuesta;
    }

    public void rechazaMovimiento (Long id, Boolean rechazado, LocalDateTime fechaRechazado, EstadoMovimiento estado, String comentarioRechazado){

        this.id = id;
        if(rechazado != null)
            this.rechazado = rechazado;
        if(fechaRechazado != null)
            this.fechaRechazado = fechaRechazado;
        this.estado = estado;
        if(comentarioRechazado != null)
            this.comentarioRechazado = comentarioRechazado;
    }



    public void eliminarMovimiento (Long id){
        this.id = id;
        this.activo = false;
    }



    @Override
    public String toString() {
        return "Movimiento{" +
                "id=" + id +
                ", fechaIngreso=" + fechaIngreso +
                ", fechaAsignacion=" + fechaAsignacion +
                ", fechaResuelto=" + fechaResuelto +
                ", fechaCierre=" + fechaCierre +
                ", fechaRechazado=" + fechaRechazado +
                ", asignado=" + asignado +
                ", resuelto=" + resuelto +
                ", cerrado=" + cerrado +
                ", activo=" + activo +
                ", rechazado=" + rechazado +
                ", comentarioAsignacion='" + comentarioAsignacion + '\'' +
                ", comentarioResuelto='" + comentarioResuelto + '\'' +
                ", comentarioRechazado='" + comentarioRechazado + '\'' +
                ", estado=" + estado +
                ", solicitud=" + solicitud +
                ", unidad=" + unidad +
                ", certificado=" + certificado +
                ", respuesta=" + respuesta +
                '}';
    }
}
