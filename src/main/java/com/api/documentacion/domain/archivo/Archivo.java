package com.api.documentacion.domain.archivo;

import com.api.documentacion.domain.certificado.Certificado;
import com.api.documentacion.domain.respuesta.Respuesta;
import com.api.documentacion.domain.solicitud.Solicitud;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Table(name = "archivos")
@Entity(name = "Archivo")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Archivo {

    @Id
    private Long id;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "solicitud_id")  // Esta columna se agregará a la tabla 'archivo'
    private Solicitud solicitud;  // Relación con el Documento

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "respuesta_id")  // Esta columna se agregará a la tabla 'archivo'
    private Respuesta respuesta;  // Relación con el Documento

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "certificado_id")  // Esta columna se agregará a la tabla 'archivo'
    private Certificado certificado;  // Relación con el Documento

    public Archivo(Long id, String nombreA, String nombreB, String nombreC, String tipoA, String tipoB, String tipoC, byte[] archivoA, byte[] archivoB, byte[] archivoC) {
        this.id = id;
        this.nombreA = nombreA;
        this.nombreB = nombreB;
        this.nombreC = nombreC;
        this.tipoA = tipoA;
        this.tipoB = tipoB;
        this.tipoC = tipoC;
        this.archivoA = archivoA;
        this.archivoB = archivoB;
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
