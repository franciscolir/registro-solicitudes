package com.api.documentacion.infra.configuration.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PasswordService {

    private final PasswordEncoder passwordEncoder;

    public PasswordService() {
        this.passwordEncoder = new BCryptPasswordEncoder();
    }
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Usamos BCrypt para encriptar las contraseñas
    }

    public String encriptarContraseña(String contraseña) {
        return passwordEncoder.encode(contraseña);
    }

    public boolean verificarContraseña(String contraseña, String contraseñaEncriptada) {
        return passwordEncoder.matches(contraseña, contraseñaEncriptada);
    }
}
