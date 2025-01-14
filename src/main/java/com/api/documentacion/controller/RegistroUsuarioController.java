package com.api.documentacion.controller;

import com.api.documentacion.domain.usuario.UsuarioService;
import com.api.documentacion.domain.usuario.dto.DatosRegistraUsuario;
import com.api.documentacion.domain.usuario.dto.DatosSubmitFormUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;


@Controller
//@ResponseBody
@PreAuthorize("hasRole('ADMIN')")
public class RegistroUsuarioController {

    @Autowired
    UsuarioService usuarioService;


    // Página de registro usuario

    @GetMapping("/registrar")
    public String registrarForm(Model model) {
        model.addAttribute("register", new DatosSubmitFormUsuario());

        return "register";
    }


    @PostMapping("/registrar")
    public String registraUsuario(@ModelAttribute DatosSubmitFormUsuario datos, Model model,RedirectAttributes redirectAttributes) {

        try {
        model.addAttribute("register", datos);
        usuarioService.confirmPasswordMethod(datos.contraseña, datos.confirmContraseña);
        usuarioService.registraUsuario(datos);
        var usuario = usuarioService.getByCorreoElectronico(datos.correoElectronico);

            // Mensaje de éxito
            model.addAttribute("mensaje", "Registro exitoso");
            return "register";  // Redirige a la página de confirmación o éxito

        } catch (Exception e) {
           // Si ocurre un error, agregar mensaje de error al modelo
            model.addAttribute("error", e.getMessage());
            return "register"; // Regresar a la página de registro en caso de error
        }
    }
}