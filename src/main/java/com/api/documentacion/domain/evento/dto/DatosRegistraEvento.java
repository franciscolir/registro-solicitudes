package com.api.documentacion.domain.evento.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;
import java.util.Set;


public record DatosRegistraEvento(
        @NotBlank(message = "tipo de evento es obligatoria")
        Long categoria,
        @NotBlank(message = "descripcion es obligatoria")
        String descripcion,
        @NotBlank(message = "fecha es obligatoria")
        String fecha,
        @NotNull(message = "establecimineto es obligatorio")
        Long establecimiento,
        @NotNull(message = "usuario es obligatorio")
        //Set<Long> invitados
        List<Long> invitados) {




}
