package com.api.documentacion.domain;

import com.api.documentacion.domain.registro.Registro;
import com.api.documentacion.domain.usuario.Usuario;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;



@Table(name = "certificados")
@Entity(name = "Certificado")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Certificado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long numeroCertificado;//numero asignado al documento por emisor. Ingreso manual

    private String titulo;
    private String descripcion;

    private LocalDate fechaCertificado;

    private Boolean activo;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @OneToOne(mappedBy = "certificado")
    private Registro registro;  // Relación inversa
}