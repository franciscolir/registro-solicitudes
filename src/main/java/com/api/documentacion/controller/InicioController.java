package com.api.documentacion.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.stereotype.Controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;


@Controller
//@RestController
//@RequestMapping("/v1")
    public class InicioController {

        @Autowired
        AuthenticationManager authenticationManager;

        // GET: Mostrar página de login
        @GetMapping("/login")
        public String showLoginPage(HttpServletRequest request, Model model) {
            // Verificar si el parámetro 'logout' está presente en la URL
            if (request.getParameter("logout") != null) {
                model.addAttribute("message", "Sesión cerrada exitosamente.");
            }
            // Verificar si hay un error de autenticación
            Exception authException = (Exception) request.getSession().getAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);

            // Si hubo un error en la autenticación, agregar un mensaje de error al modelo
            if (authException != null) {
                String errorMessage = "Ocurrió un error en el login.";

                if (authException instanceof BadCredentialsException) {
                    errorMessage = "Nombre de usuario o contraseña incorrectos.";
                } else {
                    errorMessage = "La cuenta ha expirado.";
                }

                model.addAttribute("error", true);
                model.addAttribute("errorMessage", errorMessage); // Mostrar mensaje específico de error
            }

            // Evitar bucles si el error ya está presente
            if (request.getParameter("error") != null) {
                model.addAttribute("error", true);
                model.addAttribute("errorMessage", "Intento de login fallido. Verifique las credenciales.");
            }

            return "login"; // Redirige a la vista de login
        }

        // POST: Procesar el login
        @PostMapping("/login")
        public String processLogin(@RequestParam("username") String username,
                                   @RequestParam("password") String password,
                                   HttpServletRequest request) {
            try {
                // Crear el token de autenticación con el nombre de usuario y la contraseña
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password);
                // Autenticar al usuario con el AuthenticationManager
                Authentication authentication = authenticationManager.authenticate(authToken);
                // Si la autenticación es exitosa, guardar el contexto de seguridad
                SecurityContextHolder.getContext().setAuthentication(authentication);

                // Redirigir a la página de bienvenida después del login exitoso
                return "redirect:/welcome";
            } catch (AuthenticationException e) {
                // Si hay un error de autenticación, guardar el error en la sesión
                request.getSession().setAttribute(WebAttributes.AUTHENTICATION_EXCEPTION, e);
                // Redirigir al login con un parámetro de error
                return "redirect:/login?error=true"; // Evitar ciclo redirigiendo correctamente
            }
        }


    // Página de bienvenida después de iniciar sesión
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/welcome")
    public String welcome() {
        return "welcome";
    }


    // Página de bienvenida después de iniciar sesión
    //@GetMapping("/home")
    //public String home() {
       // return "index";
    //}
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/home")
    public String showHomePage(Model model) {
        // Aquí puedes agregar lógica de seguridad si es necesario
        return "redirect:/html/index-lite.html";  // Redirige a un archivo fuera de los recursos estáticos
    }


    // Página de error si el usuario no está autenticado
    @GetMapping("/access-denied")
    public String accessDenied() {
        return "access-denied"; // Esto devolverá la plantilla "access-denied.html"
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        // Limpiar el contexto de seguridad
        SecurityContextHolder.clearContext();

        // Invalidar la sesión
        HttpSession session = request.getSession(false); // Obtiene la sesión actual, si existe
        if (session != null) {
            session.invalidate();  // Invalida la sesión
        }

        // Devolver respuesta exitosa
        return ResponseEntity.ok("Logout exitoso");
    }


    //test para enviar form desde index
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/pass")
    public ResponseEntity<CsrfToken> getCsrfToken(CsrfToken csrfToken) {
        return ResponseEntity.ok(csrfToken);
    }

}
