package com.api.documentacion.controller;

import com.api.documentacion.domain.archivo.Archivo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URL;
import java.util.List;

@Controller
//@RestController
//@RequestMapping("/v1")
public class InicioController {

    // Página de inicio (login)
    @GetMapping("/")
    public String home() {
        return "login"; // Esto devolverá la plantilla "home.html"
    }

    // Página de bienvenida después de iniciar sesión
    @GetMapping("/welcome")
    public String welcome(Model model) {
        // Obtener el nombre del usuario autenticado
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        // Añadir el nombre del usuario al modelo
        model.addAttribute("username", username);

        return "welcome"; // Esto devolverá la plantilla "welcome.html"
    }

    @GetMapping("/index")
    public String index() {
        return "index"; // Esto devolverá la plantilla "home.html"
    }

    // Página de error si el usuario no está autenticado
    @GetMapping("/access-denied")
    public String accessDenied() {
        return "access-denied"; // Esto devolverá la plantilla "access-denied.html"
    }
}
