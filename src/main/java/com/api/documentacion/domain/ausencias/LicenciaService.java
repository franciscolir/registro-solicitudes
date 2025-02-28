package com.api.documentacion.domain.ausencias;

import com.api.documentacion.domain.ausencias.dto.DatosRegistraLicencia;
import com.api.documentacion.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;


@Service
public class LicenciaService {

    @Autowired
  LicenciaRepository licenciaRepository;
    @Autowired
    UsuarioRepository usuarioRepository;

    public Licencia registraLicencia(DatosRegistraLicencia datos){

        var inicio = dateFormatter(datos.inicio());
        var termino = dateFormatter(datos.termino());
        var usuario = usuarioRepository.getReferenceById(datos.usuarioId());
        var licencia = new Licencia(
                null,
                inicio,
                termino,
                usuario
        );
        licenciaRepository.save(licencia);
return licencia;

    }

    //MODIFICADOR_FORMATO_FECHA-dia-hora____________________

    //cambia string a formato fecha solo dia
    public LocalDate dateFormatter (String fecha){
        var formatter = DateTimeFormatter.ISO_LOCAL_DATE;
        //var formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

        return LocalDate.parse(fecha, formatter);
    }//__________

}
