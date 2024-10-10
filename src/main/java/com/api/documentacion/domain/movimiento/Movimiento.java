package com.api.documentacion.domain.movimiento;

import com.api.documentacion.domain.Certificado;
import com.api.documentacion.domain.respuesta.Respuesta;
import com.api.documentacion.domain.solicitud.Solicitud;
import com.api.documentacion.domain.usuario.Usuario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Table(name = "movimientos")
@Entity(name = "Movimiento")
@Getter
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

    private Boolean asignado;
    private Boolean resuelto;
    private Boolean cerrado;
    private Boolean activo;

    private String comentarioAsignacion;
    private String comentarioResuelto;

    @Enumerated(EnumType.STRING)
    private EstadoMovimiento estado;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "solicitud_id")
    private Solicitud solicitud;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "certificado_id")
    private Certificado certificado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "respuesta_id")
    private Respuesta respuesta;


    public void actualizaMovimiento (Long id, Boolean resuelto, LocalDateTime fechaResuelto, String comentarioResuelto, EstadoMovimiento estado, Certificado certificado){

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


    public void eliminarMovimiento (Long id){
        this.id = id;
        this.activo = false;
    }
}
