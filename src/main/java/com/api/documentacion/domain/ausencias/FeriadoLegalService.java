package com.api.documentacion.domain.ausencias;

import com.api.documentacion.domain.ausencias.dto.DatosRegistraFeriadoLegal;
import com.api.documentacion.repository.FeriadoLegalRepository;
import com.api.documentacion.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;


@Service
public class FeriadoLegalService {

    @Autowired
    FeriadoLegalRepository feriadoLegalRepository;
    @Autowired
    UsuarioRepository usuarioRepository;

    public FeriadoLegal registraFeriadoLegal(DatosRegistraFeriadoLegal datos){

        var inicio = dateFormatter(datos.inicio());
        var termino = dateFormatter(datos.termino());
        var usuario = usuarioRepository.getReferenceById(datos.usuarioId());
        var feriado = new FeriadoLegal(
                null,
                inicio,
                termino,
                usuario
        );
        feriadoLegalRepository.save(feriado);
return feriado;

    }

    //MODIFICADOR_FORMATO_FECHA-dia-hora____________________

    //cambia string a formato fecha solo dia
    public LocalDate dateFormatter (String fecha){
        var formatter = DateTimeFormatter.ISO_LOCAL_DATE;
        //var formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

        return LocalDate.parse(fecha, formatter);
    }//__________

}
