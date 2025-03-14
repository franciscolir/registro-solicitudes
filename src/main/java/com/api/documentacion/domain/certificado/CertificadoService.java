package com.api.documentacion.domain.certificado;

import com.api.documentacion.domain.certificado.dto.DatosActualizaCertificado;
import com.api.documentacion.domain.certificado.dto.DatosMuestraCertificado;
import com.api.documentacion.domain.certificado.dto.DatosRegistraCertificado;
import com.api.documentacion.domain.movimiento.MovimientoService;
import com.api.documentacion.domain.movimiento.dto.DatosActualizaMovimiento;
import com.api.documentacion.infra.errores.ValidacionDeIntegridad;
import com.api.documentacion.repository.CertificadoRepository;
import com.api.documentacion.repository.UnidadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class CertificadoService {
    @Autowired
    UnidadRepository unidadRepository;
    @Autowired @Lazy
    CertificadoRepository certificadoRepository;
    @Autowired
    MovimientoService movimientoService;


    //POST___________________________________________

    public DatosMuestraCertificado registrar(DatosRegistraCertificado datos) throws IOException {
        //crea el registro del archivo
        var unidad = unidadRepository.getReferenceById(datos.unidad());

        //Trae lista de numeros de certificado segun unidad. elije el ultimo y lo aumenta en uno
        Pageable pageable = PageRequest.of(0, 1, Sort.by(Sort.Order.desc("numeroCertificado")));
        List<Long> certificados = certificadoRepository.findLastCertificadoByUnidad(unidad, pageable);

        // Si la lista está vacía, asigna 1. Si no lo está, verifica que el primer elemento no sea null.
        long lastCertificado = 1L;  // Valor por defecto
        if (!certificados.isEmpty() && certificados.get(0) != null) {
            lastCertificado = certificados.get(0) + 1;
        }

        var fechaCertificado = LocalDate.now();
        var certificado = new Certificado(null,
                lastCertificado,
                datos.titulo(),
                datos.descripcion(),
                fechaCertificado,
                true,
                unidad
        );

        certificadoRepository.save(certificado);

        //Actualiza movimiento con ingreso de certificado

        if (datos.movimiento() != null) {
            var datosMovimiento = new DatosActualizaMovimiento(datos.movimiento(),
                    datos.comentario(),
                    certificado.getId());
            movimientoService.resolverMovimiento(datosMovimiento);
        }

        return new DatosMuestraCertificado(certificado);
    }

    //___________________________________________________


    //GET___________________________________________
        //obtiene certificado con el numero de certificado

    public DatosMuestraCertificado obtenerCertificado(Long numeroCertificado) {
        var id = validaSiExisteYObtieneIdConNumeroCertificado(numeroCertificado);
        var certificado = certificadoRepository.getReferenceById(id);

        return new DatosMuestraCertificado(certificado);
    }//___________

    //obtiene el ultimo certificado con el numero de usuario
    public Page<DatosMuestraCertificado> obtenerUltimoCertificado(Long unidadId, Pageable paginacion) {
        var unidad = unidadRepository.getReferenceById(unidadId);

        return certificadoRepository.obtenerUltimoCertificadoPorUnidad(unidad, paginacion).map(DatosMuestraCertificado::new);

    }

    //___________________________________________________


    //GET_LISTA__________________________________________
        //obtiene lista de certificados
    public Page<DatosMuestraCertificado> listaDeCertificados(Pageable paginacion) {

        return certificadoRepository.findByActivoTrue(paginacion).map(DatosMuestraCertificado::new);
    }


    //___________________________________________________



    //PUT________________________________________________
        //actualiza certificado Certificado
    public DatosMuestraCertificado actualizaCertificado (DatosActualizaCertificado datos){

        validaSiExisteIdAndActivoTrue(datos.id());
        var certificado = certificadoRepository.getReferenceById(datos.id());
        var fechaCertificado = dateFormatter(datos.fechaCertificado());
        certificado.actualizaCertificado(datos.id(), datos.numeroCertificado(), datos.titulo(), datos.descripcion(), fechaCertificado);
        var certificadoActualizada = certificadoRepository.getReferenceById(datos.id());

        return new DatosMuestraCertificado(certificadoActualizada);
    }
    //______________________________________________________


    //DELETE________________________________________________
        //elimina una repuesta (delete logico)
    public void eliminarCertificado (Long id){

        validaSiExisteIdAndActivoTrue(id);
        var certificado = certificadoRepository.getReferenceById(id);
        certificado.elimiarCertificado(id);
    }
    //______________________________________________________


    //VALIDADORES____________________________________________
        //valida id de registro
    public void validaSiExisteIdAndActivoTrue (Long id) {
        if(!certificadoRepository.existsByIdAndActivoTrue(id)){
            throw new ValidacionDeIntegridad(" id no existe");
        }
    }   //__________

    //VALIDADORES____________________________________________

        //valida numeroCertificado. Obtiene id de registro y lo retorna
    public Long validaSiExisteYObtieneIdConNumeroCertificado (Long numeroCertificado) {
        if(!certificadoRepository.existsByNumeroCertificadoAndActivoTrue(numeroCertificado)){
            throw new ValidacionDeIntegridad(" id de certificado no existe");
        }
        return certificadoRepository.findByNumeroCertificadoAndActivoTrue(numeroCertificado).getId();
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
