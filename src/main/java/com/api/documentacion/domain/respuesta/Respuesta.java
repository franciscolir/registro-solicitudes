package com.api.documentacion.domain.respuesta;

import com.api.documentacion.domain.solicitud.Solicitud;
import com.api.documentacion.domain.usuario.Usuario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Table(name = "respuestas")
@Entity(name = "Respuesta")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Respuesta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long numeroRespuesta;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    private String titulo;
    private String descripcion;
    private String comentario;

    private LocalDateTime fechaRespuesta;
    private LocalDateTime fechaEnvio;

    private Boolean activo;

    @OneToOne
    @JoinColumn(name = "solicitud_id")
    private Solicitud solicitud;


    public void actualizaRespuesta (Long id, Long numeroRespuesta, String titulo, String descripcion, LocalDateTime fechaRespuesta){

        this.id = id;
        if(numeroRespuesta != null)
            this.numeroRespuesta = numeroRespuesta;
        if(titulo != null)
            this.titulo = titulo;
        if(descripcion != null)
            this.descripcion = descripcion;
        if(fechaRespuesta != null)
            this.fechaRespuesta = fechaRespuesta;
    }

    public void elimiarRespuesta (Long id , String comentario){
        this.id = id;
        this.comentario = comentario;
        this.activo = false;
    }
}