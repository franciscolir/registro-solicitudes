package com.api.documentacion.domain.archivo;



import com.api.documentacion.domain.archivo.dto.DatosRegistraArchivo;
import com.api.documentacion.infra.errores.ValidacionDeIntegridad;
import com.api.documentacion.repository.ArchivoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.util.Optional;

@Service
public class ArchivoService {

@Autowired
    ArchivoRepository archivoRepository;

    //POST___________________________________________

    public Archivo registrar(DatosRegistraArchivo datos) throws IOException {

            Archivo archivoDB = new Archivo(
                    datos.id(),
                    datos.archivoA().getOriginalFilename(),
                    datos.archivoB().getOriginalFilename(),
                    datos.archivoC().getOriginalFilename(),
                    datos.archivoA().getContentType(),
                    datos.archivoB().getContentType(),
                    datos.archivoC().getContentType(),
                    datos.archivoA().getBytes(),
                    datos.archivoB().getBytes(),
                    datos.archivoC().getBytes()
            );

        return archivoRepository.save(archivoDB);
    }

    //GET___________________________________________

    public Archivo obtener(Long id) {

        // Buscar el archivo en la base de datos
        Optional<Archivo> archivoOpt = archivoRepository.findById(id);

        // Si el archivo no existe
        if (archivoOpt.isEmpty()) {
            throw new ValidacionDeIntegridad("el archivo no existe");
        }

        // Obtener el archivo de la base de datos
        Archivo archivo = archivoOpt.get();

        // Filtrar los atributos nulos
        Archivo archivoFiltrado = new Archivo();

        if (archivo.getNombreA() != null) archivoFiltrado.setNombreA(archivo.getNombreA());
        if (archivo.getNombreB() != null) archivoFiltrado.setNombreB(archivo.getNombreB());
        if (archivo.getNombreC() != null) archivoFiltrado.setNombreC(archivo.getNombreC());

        if (archivo.getTipoA() != null) archivoFiltrado.setTipoA(archivo.getTipoA());
        if (archivo.getTipoB() != null) archivoFiltrado.setTipoB(archivo.getTipoB());
        if (archivo.getTipoC() != null) archivoFiltrado.setTipoC(archivo.getTipoC());

        if (archivo.getArchivoA() != null) archivoFiltrado.setArchivoA(archivo.getArchivoA());
        if (archivo.getArchivoB() != null) archivoFiltrado.setArchivoB(archivo.getArchivoB());
        if (archivo.getArchivoC() != null) archivoFiltrado.setArchivoC(archivo.getArchivoC());


        return (archivoFiltrado);
    }

    //___________________________________________________
}
