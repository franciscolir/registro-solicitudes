package com.api.documentacion.domain.archivo.dto;

import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public record DatosActualizaArchivo(

        @NotNull
        String id,
        @NotNull(message = "debe enviar almenos uma imagen")
        MultipartFile archivoA,
        MultipartFile archivoB,
        MultipartFile archivoC
) {
}
