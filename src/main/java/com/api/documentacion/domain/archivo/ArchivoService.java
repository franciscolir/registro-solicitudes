package com.api.documentacion.domain.archivo;

import com.api.documentacion.domain.archivo.dto.DatosRegistraArchivo;
import com.api.documentacion.domain.certificado.Certificado;
import com.api.documentacion.domain.respuesta.Respuesta;
import com.api.documentacion.domain.solicitud.Solicitud;
import com.api.documentacion.repository.ArchivoRepository;
import com.api.documentacion.repository.CertificadoRepository;
import com.api.documentacion.repository.RespuestaRepository;
import com.api.documentacion.repository.SolicitudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class ArchivoService {

@Autowired
    ArchivoRepository archivoRepository;

        @Autowired
    SolicitudRepository solicitudRepository;

        @Autowired
    CertificadoRepository certificadoRepository;

        @Autowired
    RespuestaRepository respuestaRepository;

        //private static final String DIRECTORIO_ALMACENAMIENTO = "archivos/";
        private static final String DIRECTORIO_ALMACENAMIENTO = System.getProperty("user.dir") + "/archivos/";


        public Archivo almacenarImagen(MultipartFile archivoFile, DatosRegistraArchivo datos) throws IOException {
            // Generar un identificador único para el archivoFile
            System.out.print("paso 11 #############");
            String nombreArchivo = UUID.randomUUID().toString() + "-" + archivoFile.getOriginalFilename();
            System.out.print("paso 12 #############");
            // Crear el directorio si no existe
            File directorio = new File(DIRECTORIO_ALMACENAMIENTO);
            System.out.print("paso 13 #############");
            if (!directorio.exists()) {
                System.out.print("paso 14 #############");
                directorio.mkdir();
            }

            // Guardar el archivoFile en el directorio local
            File archivoLocal = new File(directorio, nombreArchivo);
            System.out.print("paso 15 #############");// traqueo llega hasta aqui
            archivoFile.transferTo(archivoLocal);
            System.out.print("paso 16 #############");
            // Crear la entidad Archivo
            Archivo archivo = switch (datos.claseTipo()) {

                case "solicitud" -> {
                    System.out.print("paso 17 #############");
                    Solicitud solicitud = solicitudRepository.findById(datos.claseId())
                            .orElseThrow(() -> new RuntimeException("Solicitud no encontrada"));
                    //archivo.setSolicitud(solicitud);
                    yield new Archivo(
                            null,
                            nombreArchivo,
                            archivoLocal.getAbsolutePath(), solicitud, null, null
                    );
                }
                case "certificado" -> {
                    System.out.print("paso 18 #############");
                    Certificado certificado = certificadoRepository.findById(datos.claseId())
                            .orElseThrow(() -> new RuntimeException("Certificado no encontrada"));
                    //archivo.setCertificado(certificado);
                    yield new Archivo(
                            null,
                            nombreArchivo,
                            archivoLocal.getAbsolutePath(), null, certificado, null
                    );
                }
                case "respuesta" -> {
                    System.out.print("paso 19 #############");
                    Respuesta respuesta = respuestaRepository.findById(datos.claseId())
                            .orElseThrow(() -> new RuntimeException("Respuesta no encontrada"));
                    //archivo.setRespuesta(respuesta);
                    yield new Archivo(
                            null,
                            nombreArchivo,
                            archivoLocal.getAbsolutePath(), null, null, respuesta
                    );
                }

                default -> throw new RuntimeException("Tipo de clase no válido");
            };
            System.out.print("paso 20 #############");
            //Archivo archivo = new Archivo();
            //archivo.setNombre(nombreArchivo);
            //archivo.setRuta(archivoLocal.getAbsolutePath());

            // Asociar la archivo con la clase correspondiente según el DTO

            // Guardar la archivo en la base de datos
            return archivoRepository.save(archivo);
        }


    public List<Archivo> obtenerArchivoPorSolicitud(Long solicitudId) {
            Solicitud solicitud = solicitudRepository.findById(solicitudId)
                    .orElseThrow(() -> new RuntimeException("Solicitud no encontrada"));
            return solicitud.getArchivo();
        }

        public List<Archivo> obtenerArchivoPorCertificado(Long certificadoId) {
            Certificado certificado = certificadoRepository.findById(certificadoId)
                    .orElseThrow(() -> new RuntimeException("Certificado no encontrada"));
            return certificado.getArchivo();
        }

        public List<Archivo> obtenerArchivoPorRespuesta(Long respuestaId) {
            Respuesta respuesta = respuestaRepository.findById(respuestaId)
                    .orElseThrow(() -> new RuntimeException("Respuesta no encontrada"));
            return respuesta.getArchivo();
        }


}
