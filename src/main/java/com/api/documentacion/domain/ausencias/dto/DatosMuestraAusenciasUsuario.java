package com.api.documentacion.domain.ausencias.dto;

import com.api.documentacion.domain.ausencias.Ausencia;
import com.api.documentacion.domain.usuario.Usuario;

import java.time.LocalDate;
import java.util.List;

public record DatosMuestraAusenciasUsuario(
        Long id,
        String usuario,
        String tipo,
        String fechaInicio,
        String fechaTermino
) {

    public DatosMuestraAusenciasUsuario(Ausencia ausencia) {
        this(
                obtenerAusenciaActiva(
                        ausencia != null ? ausencia.getId() : null,
                        ausencia != null ? ausencia.getUsuario().getNombre() : null,
                        ausencia != null ? ausencia.getTipo().toString() : null,

                        ausencia != null ? ausencia.getInicio() : null,
                        ausencia != null ? ausencia.getTermino() : null)
        );
    }

    // Verificar si algún feriado está activo en la fecha actual
    private static boolean obtenerAusenciaActiva(Ausencia ausencias) {
        if (ausencias == null || ausencias.isEmpty()) {
            return false;
        }
        return ausencias.stream()
                .anyMatch(ausencia -> ausencia != null && fechaEstaEntre(ausencia.getInicio(), ausencia.getTermino()));
    }

    // Obtener la fecha de término del feriado activo
    private static String obtenerFechaTerminoAusencia(List<Ausencia> ausencias) {
        if (ausencias == null || ausencias.isEmpty()) {
            return null;
        }
        return ausencias.stream()
                .filter(ausencia -> ausencia != null && fechaEstaEntre(ausencia.getInicio(), ausencia.getTermino()))
                .map(ausencia -> ausencia.getTermino() != null ? ausencia.getTermino().toString() : null)
                .findFirst()
                .orElse(null);
    }




    // Verifica si la fecha actual está entre la fecha de inicio y la de término
    private Ausencia fechaEstaEntre(Ausencia ausencia, LocalDate fechaInicio, LocalDate fechaTermino) {
        LocalDate hoy = LocalDate.now();
        if (fechaInicio == null || fechaTermino == null || !((hoy.isEqual(fechaInicio) || hoy.isAfter(fechaInicio)) && (hoy.isEqual(fechaTermino) || hoy.isBefore(fechaTermino)))) {

            return null;
        }

        return (
                ausencia != null ? ausencia.getId() : null,
        ausencia != null ? ausencia.getUsuario().getNombre() : null,
                ausencia != null ? ausencia.getTipo().toString() : null,

                ausencia != null ? ausencia.getInicio() : null,
                ausencia != null ? ausencia.getTermino() : null);
    }
}
