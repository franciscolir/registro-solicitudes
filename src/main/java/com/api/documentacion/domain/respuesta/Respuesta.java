package com.api.documentacion.domain.respuesta;

import com.api.documentacion.domain.archivo.Archivo;
import com.api.documentacion.domain.movimiento.Movimiento;
import com.api.documentacion.domain.solicitud.Solicitud;
import com.api.documentacion.domain.usuario.Usuario;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Table(name = "respuestas")
@Entity(name = "Respuesta")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")

@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "@id")
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

    private LocalDate fechaRespuesta;
    private LocalDateTime fechaEnvio;

    private Boolean activo;

    @OneToMany(mappedBy = "respuesta", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Movimiento> movimientos;  // Relación OneToMany

    @OneToMany(mappedBy = "respuesta")
    private List<Archivo> archivo;


    public Respuesta(Long id, Long numeroRespuesta, Usuario usuario, String titulo, String descripcion, String comentario, LocalDate fechaRespuesta, LocalDateTime fechaEnvio, Boolean activo) {
        this.id = id;
        this.numeroRespuesta = numeroRespuesta;
        this.usuario = usuario;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.comentario = comentario;
        this.fechaRespuesta = fechaRespuesta;
        this.fechaEnvio = fechaEnvio;
        this.activo = activo;
    }

    public void actualizaRespuesta (Long id, Long numeroRespuesta, String titulo, String descripcion, LocalDate fechaRespuesta){

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