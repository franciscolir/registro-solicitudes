package com.api.documentacion.domain.certificado;

import com.api.documentacion.domain.archivo.Archivo;
import com.api.documentacion.domain.movimiento.Movimiento;
import com.api.documentacion.domain.unidad.Unidad;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;


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
    @JoinColumn(name = "numero_certificado")
    private Long numeroCertificado;//numero asignado al documento por emisor. Ingreso manual

    private String titulo;
    private String descripcion;

    private LocalDate fechaCertificado;

    private Boolean activo;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "unidad_id")
    private Unidad unidad;

    @OneToOne(mappedBy = "certificado")
    private Movimiento movimiento;  // Relación inversa

    @OneToOne
    @JoinColumn(name = "archivo_id") // Columna que establece la relación con Archivo
    private Archivo archivo;


    public Certificado(Long id, Long numeroCertificado, String titulo, String descripcion, LocalDate fechaCertificado, Boolean activo, Unidad unidad, Archivo archivo) {
        this.id = id;
        this.numeroCertificado = numeroCertificado;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fechaCertificado = fechaCertificado;
        this.activo = activo;
        this.unidad = unidad;
        this.archivo = archivo;
    }

    public void actualizaCertificado (Long id, Long numeroCertificado, String titulo, String descripcion, LocalDate fechaCertificado){

        this.id = id;
        if(numeroCertificado != null)
            this.numeroCertificado = numeroCertificado;
        if(titulo != null)
            this.titulo = titulo;
        if(descripcion != null)
            this.descripcion = descripcion;
        if(fechaCertificado != null)
            this.fechaCertificado = fechaCertificado;
    }

    public void elimiarCertificado (Long id ){
        this.id = id;

        this.activo = false;
    }

    @Override
    public String toString() {
        return "Certificado{" +
                "id=" + id +
                ", numeroCertificado=" + numeroCertificado +
                ", titulo='" + titulo + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", fechaCertificado=" + fechaCertificado +
                ", activo=" + activo +
                ", unidad=" + unidad +
                ", movimiento=" + movimiento +
                '}';
    }
}