package com.api.documentacion.domain.usuario.dto;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DatosSubmitFormUsuario {


    public String nombre;
    public String correoElectronico;
    public String contraseña;
    public String confirmContraseña;
    public String comentario;
    public boolean subrogante;
    public boolean encargado;
    public boolean ninguno;
    public Long unidad;

}
