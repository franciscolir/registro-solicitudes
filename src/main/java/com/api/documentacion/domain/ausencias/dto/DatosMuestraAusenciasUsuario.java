package com.api.documentacion.domain.ausencias.dto;

import com.api.documentacion.domain.usuario.Usuario;
import com.api.documentacion.domain.ausencias.FeriadoLegal;
import com.api.documentacion.domain.ausencias.Licencia;
import com.api.documentacion.domain.ausencias.PermisoAdministrativo;

import java.time.LocalDate;
import java.util.List;

public record DatosMuestraAusenciasUsuario(
        Long id,
        String nombre,
        Boolean feriadoLegal,
        String fechaTerminoFeriadoLegal,
        Boolean administrativo,
        String fechaTerminoAdministrativo,
        Boolean licencia,
        String fechaTerminoLicencia
) {

    public DatosMuestraAusenciasUsuario(Usuario usuario) {
        this(
                usuario != null ? usuario.getId() : null,
                usuario != null ? usuario.getNombre() : null,
                obtenerFeriadoActivo(usuario != null ? usuario.getFeriadoLegal() : null),
                obtenerFechaTerminoFeriadoLegal(usuario != null ? usuario.getFeriadoLegal() : null),
                obtenerPermisoAdministrativoActivo(usuario != null ? usuario.getPermisoAdministrativo() : null),
                obtenerFechaTerminoPermisoAdministrativo(usuario != null ? usuario.getPermisoAdministrativo() : null),
                obtenerLicenciaActiva(usuario != null ? usuario.getLicencia() : null),
                obtenerFechaTerminoLicencia(usuario != null ? usuario.getLicencia() : null)
        );
    }

    // Verificar si algún feriado está activo en la fecha actual
    private static boolean obtenerFeriadoActivo(List<FeriadoLegal> feriados) {
        if (feriados == null || feriados.isEmpty()) {
            return false;
        }
        return feriados.stream()
                .anyMatch(feriado -> feriado != null && fechaEstaEntre(feriado.getInicio(), feriado.getTermino()));
    }

    // Obtener la fecha de término del feriado activo
    private static String obtenerFechaTerminoFeriadoLegal(List<FeriadoLegal> feriados) {
        if (feriados == null || feriados.isEmpty()) {
            return null;
        }
        return feriados.stream()
                .filter(feriado -> feriado != null && fechaEstaEntre(feriado.getInicio(), feriado.getTermino()))
                .map(feriado -> feriado.getTermino() != null ? feriado.getTermino().toString() : null)
                .findFirst()
                .orElse(null);
    }

    // Verificar si algún permiso administrativo está activo en la fecha actual
    private static boolean obtenerPermisoAdministrativoActivo(List<PermisoAdministrativo> permisos) {
        if (permisos == null || permisos.isEmpty()) {
            return false;
        }
        return permisos.stream()
                .anyMatch(permiso -> permiso != null && fechaEstaEntre(permiso.getInicio(), permiso.getTermino()));
    }

    // Obtener la fecha de término del permiso administrativo activo
    private static String obtenerFechaTerminoPermisoAdministrativo(List<PermisoAdministrativo> permisos) {
        if (permisos == null || permisos.isEmpty()) {
            return null;
        }
        return permisos.stream()
                .filter(permiso -> permiso != null && fechaEstaEntre(permiso.getInicio(), permiso.getTermino()))
                .map(permiso -> permiso.getTermino() != null ? permiso.getTermino().toString() : null)
                .findFirst()
                .orElse(null);
    }

    // Verificar si alguna licencia está activa en la fecha actual
    private static boolean obtenerLicenciaActiva(List<Licencia> licencias) {
        if (licencias == null || licencias.isEmpty()) {
            return false;
        }
        return licencias.stream()
                .anyMatch(licencia -> licencia != null && fechaEstaEntre(licencia.getInicio(), licencia.getTermino()));
    }

    // Obtener la fecha de término de la licencia activa
    private static String obtenerFechaTerminoLicencia(List<Licencia> licencias) {
        if (licencias == null || licencias.isEmpty()) {
            return null;
        }
        return licencias.stream()
                .filter(licencia -> licencia != null && fechaEstaEntre(licencia.getInicio(), licencia.getTermino()))
                .map(licencia -> licencia.getTermino() != null ? licencia.getTermino().toString() : null)
                .findFirst()
                .orElse(null);
    }

    // Verifica si la fecha actual está entre la fecha de inicio y la de término
    private static boolean fechaEstaEntre(LocalDate fechaInicio, LocalDate fechaTermino) {
        if (fechaInicio == null || fechaTermino == null) {
            return false;
        }
        LocalDate hoy = LocalDate.now();
        return (hoy.isEqual(fechaInicio) || hoy.isAfter(fechaInicio)) && (hoy.isEqual(fechaTermino) || hoy.isBefore(fechaTermino));
    }
}
