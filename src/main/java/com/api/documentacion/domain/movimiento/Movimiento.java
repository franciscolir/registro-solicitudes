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

    private LocalDateTime fechaAsignacion;

    private LocalDateTime fechaResuelto;

    private LocalDateTime fechaCierre;

    private LocalDateTime fechaRechazo;

    private Boolean rechazado;
    private Boolean asignado;
    private Boolean resuelto;
    private Boolean cerrado;
    private Boolean activo;

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


    public void actualizaMovimiento (Long id, Boolean resuelto, Boolean cerrado, LocalDateTime fechaResuelto, LocalDateTime fechaCierre){

        this.id = id;
        if(resuelto != null)
            this.resuelto = resuelto;
        if(cerrado != null)
            this.cerrado = cerrado;
        if(fechaResuelto != null)
            this.fechaResuelto = fechaResuelto;
        if(fechaCierre != null)
            this.fechaCierre = fechaCierre;
    }


    public void eliminarMovimiento (Long id){
        this.id = id;
        this.activo = false;
    }
}
