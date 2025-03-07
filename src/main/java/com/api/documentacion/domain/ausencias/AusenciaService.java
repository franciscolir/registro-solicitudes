package com.api.documentacion.domain.ausencias;

import com.api.documentacion.domain.ausencias.dto.DatosMuestraAusenciasUsuario;
import com.api.documentacion.domain.ausencias.dto.DatosRegistraAusencias;
import com.api.documentacion.repository.AusenciaRepository;
import com.api.documentacion.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;


@Service
public class AusenciaService {

    @Autowired
    AusenciaRepository ausenciaRepository;
    @Autowired
    UsuarioRepository usuarioRepository;



    //POST

    public DatosMuestraAusenciasUsuario registraAusencia(DatosRegistraAusencias datos){

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
        ausenciaRepository.save(feriado);
    return new DatosMuestraAusenciasUsuario(feriado);
    }

    //GET___________________________________________
    //obtiene lista de ausencia

    public Page<DatosMuestraAusenciasUsuario> obtenerListaDeAusencias(Pageable paginacion) {

        var hoy = LocalDate.now();
        return ausenciaRepository.findAusenciasBetweenFechas(hoy,paginacion).map(DatosMuestraAusenciasUsuario::new);
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
