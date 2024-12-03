package com.api.documentacion.domain.archivo;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Table(name = "archivos")
@Entity(name = "Archivo")
@Getter
@Setter
//@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Archivo {

    @Id
    @Column(name = "id", nullable = false, updatable = false)
    private String id; // UUID almacenado como String (VARCHAR(36))

    @Column(name = "nombre_a")
    private String nombreA;
    @Column(name = "nombre_b")
    private String nombreB;
    @Column(name = "nombre_c")
    private String nombreC;

    @Column(name = "tipo_a")
    private String tipoA;
    @Column(name = "tipo_b")
    private String tipoB;
    @Column(name = "tipo_c")
    private String tipoC;

    @Lob
    @Column(name = "archivo_a")
    private byte[] archivoA;
    @Lob
    @Column(name = "archivo_b")
    private byte[] archivoB;
    @Lob
    @Column(name = "archivo_c")
    private byte[] archivoC;


    public Archivo() {
        this.id = getId();

    }

    public void actualizaArchivo (String id, String nombreA, String nombreB, String nombreC, String tipoA, String tipoB, String tipoC, byte[] archivoA, byte[] archivoB, byte[] archivoC) {
            this.id = id;
        if(nombreA != null)
            this.nombreA = nombreA;
        if(nombreB != null)
            this.nombreB = nombreB;
        if(nombreC != null)
            this.nombreC = nombreC;
        if(tipoA != null)
            this.tipoA = tipoA;
        if(tipoB != null)
            this.tipoB = tipoB;
        if(tipoC != null)
            this.tipoC = tipoC;
        if(archivoA != null)
            this.archivoA = archivoA;
        if(archivoB != null)
            this.archivoB = archivoB;
        if(archivoC != null)
            this.archivoC = archivoC;
    }

    // Métodos para generar UUID si se usa String para id
    @PrePersist
    public void prePersist() {
        if (this.id == null) {
            this.id = UUID.randomUUID().toString(); // Genera un UUID si no se especifica
        }
    }


    // Clase interna para la respuesta de error
    private static class ErrorResponse {
        private String message;

        public ErrorResponse(String message) {
            this.message = message;
        }

    }
}
