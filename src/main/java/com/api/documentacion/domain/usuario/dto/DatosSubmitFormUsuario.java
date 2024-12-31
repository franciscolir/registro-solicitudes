package com.api.documentacion.domain.usuario.dto;

import jakarta.validation.constraints.NotBlank;

public class DatosSubmitFormUsuario {


    public String nombre;
    public String correoElectronico;
    public String contraseña;
    public String confirmContraseña;
    public String comentario;
    public Boolean subrogante;
    public Boolean encargado;
    public Long unidad;
}
