package com.api.documentacion.domain.archivo.dto;

import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;

public record DatosRegistraArchivo(

        @NotNull
        Long id,
        @NotNull(message = "debe enviar almenos uma imagen")
        MultipartFile archivoA,
        MultipartFile archivoB,
        MultipartFile archivoC

) {


}
