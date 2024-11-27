package com.api.documentacion.domain.imagen;


import com.api.documentacion.domain.certificado.Certificado;
import com.api.documentacion.domain.certificado.dto.DatosMuestraCertificado;
import com.api.documentacion.domain.certificado.dto.DatosRegistraCertificado;
import com.api.documentacion.domain.imagen.dto.DatosRegistraImagen;
import com.api.documentacion.domain.movimiento.dto.DatosActualizaMovimiento;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class ImagenService {



    //POST___________________________________________

    public DatosMuestraImagen registrar(DatosRegistraImagen datos) {





        var certificado = new Imagen(null,
                lastImagen,
                datos.titulo(),
                datos.descripcion(),
                imagenImagen,
                fechaImagen,
                true,
                unidad,
                null
        );

        certificadoRepository.save(certificado);

        //Actualiza movimiento con ingreso de certificado

        if (datos.movimiento() != null) {
            var datosMovimiento = new DatosActualizaMovimiento(datos.movimiento(),
                    datos.comentario(),
                    certificado.getId());
            movimientoService.resolverMovimiento(datosMovimiento);
        }


        System.out.println(certificado+"  certificado##################");
        return new DatosMuestraImagen(certificado);
    }

    //___________________________________________________
}
