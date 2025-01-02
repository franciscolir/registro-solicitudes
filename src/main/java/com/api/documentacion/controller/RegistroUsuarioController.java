package com.api.documentacion.controller;

import com.api.documentacion.domain.usuario.UsuarioService;
import com.api.documentacion.domain.usuario.dto.DatosRegistraUsuario;
import com.api.documentacion.domain.usuario.dto.DatosSubmitFormUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.HashMap;
import java.util.Map;

@Controller
//@ResponseBody

public class RegistroUsuarioController {

    @Autowired
    UsuarioService usuarioService;


    // Página de registro usuario
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/registrar")
    public String registrarForm(Model model) {
        model.addAttribute("register", new DatosSubmitFormUsuario());

        return "register";
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/registrar")
    //@PreAuthorize("hasRole('ADMIN')")
    public String registraUsuario(@ModelAttribute DatosSubmitFormUsuario datos, Model model,RedirectAttributes redirectAttributes) {

        try {

        model.addAttribute("register", datos);
        usuarioService.confirmPasswordMethod(datos.contraseña, datos.confirmContraseña);
        usuarioService.registraUsuario(new DatosRegistraUsuario(datos.nombre, datos.correoElectronico, datos.contraseña, datos.comentario,  datos.subrogante, datos.encargado, datos.unidad));
        var usuario = usuarioService.getUserByUsername(datos.correoElectronico);
            // Añadir el usuario al modelo
            model.addAttribute("usuario", usuario);

              // Redirigir a la vista de usuario registrado
            return "register-response"; // Nombre de la vista que muestra los detalles del usuario

        } catch (Exception e) {
            // Si ocurre un error, redirigir con un mensaje de error
            redirectAttributes.addAttribute("error", e.getMessage()); // Agregar mensaje de error al parámetro URL
            return "register"; // Regresar a la página de registro en caso de error
        }
    }
}