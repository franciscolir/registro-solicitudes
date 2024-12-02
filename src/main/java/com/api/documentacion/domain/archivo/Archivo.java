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
    private UUID id;

    private String nombreA;
    private String nombreB;
    private String nombreC;

    private String tipoA;
    private String tipoB;
    private String tipoC;

    @Lob
    private byte[] archivoA;
    @Lob
    private byte[] archivoB;
    @Lob
    private byte[] archivoC;


    public Archivo() {
        //this.id = id;

    }

    public void actualizaArchivo (UUID id, String nombreA, String nombreB, String nombreC, String tipoA, String tipoB, String tipoC, byte[] archivoA, byte[] archivoB, byte[] archivoC) {
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

    // Clase interna para la respuesta de error
    private static class ErrorResponse {
        private String message;

        public ErrorResponse(String message) {
            this.message = message;
        }

    }
}
