package com.api.documentacion.domain.emisor;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "establecimientos")
@Entity(name = "Establecimiento")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")

public class Establecimiento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombreSolicitante;
    private String nombreEstablecimiento;
    private String comentario;

    @Override
    public String toString() {
        return "Establecimiento{" +
                "id=" + id +
                ", nombreSolicitante='" + nombreSolicitante + '\'' +
                ", nombreEstablecimiento='" + nombreEstablecimiento + '\'' +
                ", comentario='" + comentario + '\'' +
                '}';
    }
}




