package com.api.documentacion.domain.archivo;

import com.api.documentacion.domain.certificado.Certificado;
import com.api.documentacion.domain.respuesta.Respuesta;
import com.api.documentacion.domain.solicitud.Solicitud;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Table(name = "archivos")
@Entity(name = "Archivo")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Archivo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String ruta;

    @ManyToOne
    @JoinColumn(name = "solicitud_id")
    private Solicitud solicitud;

    @ManyToOne
    @JoinColumn(name = "certificado_id")
    private Certificado certificado;

    @ManyToOne
    @JoinColumn(name = "respuesta_id")
    private Respuesta respuesta;


}
