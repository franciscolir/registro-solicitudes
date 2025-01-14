package com.api.documentacion.domain.respuesta;

import com.api.documentacion.domain.movimiento.MovimientoService;
import com.api.documentacion.domain.movimiento.dto.DatosCierraMovimiento;
import com.api.documentacion.domain.respuesta.dto.DatosActualizaRespuesta;
import com.api.documentacion.domain.respuesta.dto.DatosEliminaRespuesta;
import com.api.documentacion.domain.respuesta.dto.DatosMuestraRespuesta;
import com.api.documentacion.domain.respuesta.dto.DatosRegistraRespuesta;
import com.api.documentacion.domain.usuario.UsuarioService;
import com.api.documentacion.infra.errores.ValidacionDeIntegridad;
import com.api.documentacion.repository.RespuestaRepository;
import com.api.documentacion.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class RespuestaService {
    @Autowired
    UsuarioRepository usuarioRepository;
    @Autowired
    RespuestaRepository respuestaRepository;
    @Autowired
    UsuarioService usuarioService;
    @Autowired
    MovimientoService movimientoService;

    //POST___________________________________________

    public DatosMuestraRespuesta registrar(DatosRegistraRespuesta datos){

        var numeroRespuesta = obtenerUltimaRespuesta().numeroRespuesta()+1;// inrementa para siguiente numero de respuesta
        System.out.println(numeroRespuesta+ " numero de respuesta");
        usuarioService.validaSiExisteIdAndActivoTrue(datos.usuario());
        var usuario = usuarioRepository.getReferenceById(datos.usuario());
        //validaSiExisteNumeroRespuestaAndActivoTrue(datos.numeroRespuesta());
        validaSiExisteNumeroRespuestaAndActivoTrue(numeroRespuesta);
        //var fechaRespuesta = dateFormatter(datos.fechaRespuesta());
        var fechaRespuesta = LocalDate.now();
        var fechaEnvioRespuesta = LocalDateTime.now();
        var respuesta = new Respuesta(null,
                //datos.numeroRespuesta(),
                numeroRespuesta,
                usuario,
                datos.titulo(),
                datos.descripcion(),
                datos.comentario(),
                fechaRespuesta,
                fechaEnvioRespuesta,
                true
        );
        respuestaRepository.save(respuesta);

        //Actualiza Movimiento cuando se registra respuesta
        if (datos.movimiento() != null) {
            var datosMovimiento = new DatosCierraMovimiento(datos.movimiento(), respuesta.getId());
            movimientoService.cerrarMovimiento(datosMovimiento);
        }

        return new DatosMuestraRespuesta(respuesta);
    }
    //___________________________________________________


    //GET___________________________________________
        //obtiene respuesta con el numero de respuesta

    public DatosMuestraRespuesta obtenerRespuesta(Long numeroRespuesta) {
        var id = validaSiExisteYObtieneIdConNumeroRespuesta(numeroRespuesta);
        var respuesta = respuestaRepository.getReferenceById(id);

        return new DatosMuestraRespuesta(respuesta);
    }//___________


    //GET___________________________________________
    //obtiene respuesta con el numero de respuesta

    public DatosMuestraRespuesta obtenerUltimaRespuesta() {
        // Obtener todos los registros activos de la base de datos
        List<Respuesta> respuestasActivas = respuestaRepository.findByActivoTrue();

        // Ordenar las respuestas por 'numeroRespuesta' de manera descendente
        // Ordenar de mayor a menor
        var respuesta = respuestasActivas.stream().min((r1, r2) -> Long.compare(r2.getNumeroRespuesta(), r1.getNumeroRespuesta()))  // Obtiene el primer elemento (el más reciente, con el numeroRespuesta más alto)
                .orElse(null); // Devuelve null si no hay respuestas activas


        if (respuesta == null) {
            //crea respuesta null para asignar numero inicial de respuesta
            return new DatosMuestraRespuesta(null,1L,null,null,null,null);
        }
        System.out.printf(respuesta + "respuesta######################");
        return new DatosMuestraRespuesta(respuesta);
    }//___________
    //___________________________________________________


    //GET_LISTA__________________________________________
        //obtiene lista de respuestas
    public Page<DatosMuestraRespuesta> listaDeRespuestas(Pageable paginacion) {


        return respuestaRepository.findByActivoTrue(paginacion).map(DatosMuestraRespuesta::new);
    }
    //___________________________________________________



    //PUT________________________________________________
        //actualiza respuesta Respuesta
    public DatosMuestraRespuesta actualizaRespuesta (DatosActualizaRespuesta datos){

        validaSiExisteIdAndActivoTrue(datos.id());
        var respuesta = respuestaRepository.getReferenceById(datos.id());
        var fechaRespuesta = dateFormatter(datos.fechaRespuesta());
        respuesta.actualizaRespuesta(datos.id(), datos.respuestaId(), datos.titulo(), datos.descripcion(), fechaRespuesta);
        var respuestaActualizada = respuestaRepository.getReferenceById(datos.id());

        return new DatosMuestraRespuesta(respuestaActualizada);
    }
    //______________________________________________________


    //DELETE________________________________________________
        //elimina una repuesta (delete logico)
    public void eliminarRespuesta (DatosEliminaRespuesta datos){

        validaSiExisteIdAndActivoTrue(datos.id());
        var respuesta = respuestaRepository.getReferenceById(datos.id());
        respuesta.elimiarRespuesta(datos.id(), datos.comentario());
    }
    //______________________________________________________


    //VALIDADORES____________________________________________
        //valida id de registro
    public void validaSiExisteIdAndActivoTrue (Long id) {
        if(!respuestaRepository.existsByIdAndActivoTrue(id)){
            throw new ValidacionDeIntegridad(" id no existe");
        }
    }   //__________

    //VALIDADORES____________________________________________
    //valida id de registro
    public void validaSiExisteNumeroRespuestaAndActivoTrue (Long id) {
        if(respuestaRepository.existsByNumeroRespuestaAndActivoTrue(id)){
            throw new ValidacionDeIntegridad(" El numero de respuesta ya fue registrado");
        }
    }   //__________


        //valida numeroRespuesta. Obtiene id de registro y lo retorna
    public Long validaSiExisteYObtieneIdConNumeroRespuesta (Long numeroRespuesta) {
        if(!respuestaRepository.existsByNumeroRespuestaAndActivoTrue(numeroRespuesta)){
            throw new ValidacionDeIntegridad(" id de respuesta no existe");
        }
        return respuestaRepository.findByNumeroRespuestaAndActivoTrue(numeroRespuesta).getId();
    }//___________


    //______________________________________________________


    //MODIFICADOR_FORMATO_FECHA-dia-hora____________________
    //cambia string a formato fecha solo dia
    public LocalDate dateFormatter (String fecha){
        var formatter = DateTimeFormatter.ISO_LOCAL_DATE;
        //var formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

        return LocalDate.parse(fecha, formatter);
    }//__________


}
