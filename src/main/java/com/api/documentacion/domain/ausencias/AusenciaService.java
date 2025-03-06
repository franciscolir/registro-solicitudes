package com.api.documentacion.domain.ausencias;

import com.api.documentacion.domain.ausencias.dto.DatosRegistraAusencias;
import com.api.documentacion.repository.AusenciaRepository;
import com.api.documentacion.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;


@Service
public class AusenciaService {

    @Autowired
    AusenciaRepository feriadoLegalRepository;
    @Autowired
    UsuarioRepository usuarioRepository;



    //POST

    public Ausencia registraAusencia(DatosRegistraAusencias datos){

        var inicio = dateFormatter(datos.fechaInicio());
        var termino = dateFormatter(datos.fechaTermino());
        var usuario = usuarioRepository.getReferenceById(datos.usuario());
        var tipo = TipoAusencia.valueOf(datos.tipoAusencia());// agregar manejador de error
        var feriado = new Ausencia(
                null,
                inicio,
                termino,
                usuario,
                tipo
        );
        feriadoLegalRepository.save(feriado);
return feriado;

    }


    //PUT



    //MODIFICADOR_FORMATO_FECHA-dia-hora____________________

    //cambia string a formato fecha solo dia
    public LocalDate dateFormatter (String fecha){
        var formatter = DateTimeFormatter.ISO_LOCAL_DATE;
        //var formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

        return LocalDate.parse(fecha, formatter);
    }//__________

}
