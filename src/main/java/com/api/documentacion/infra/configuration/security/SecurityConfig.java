package com.api.documentacion.infra.configuration.security;

import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.SessionManagementConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.time.Duration;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {




    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                //.csrf(AbstractHttpConfigurer::disable)  // Desactivar CSRF si es necesario (si no es necesario, se puede eliminar)
                .authorizeHttpRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers("/hola").permitAll()// Permitir acceso sin autenticación
                                .anyRequest().authenticated()  // Requiere autenticación para cualquier otra solicitud
                )
                .formLogin(formLogin ->
                        formLogin
                                .loginPage("/hola")  // Página de login personalizada (descomentado)
                                //.loginProcessingUrl("/login") // URL donde se procesará el login
                                .successHandler(successHandler())  // Redirige después de iniciar sesión
                                .permitAll()  // Permitir acceso sin autenticación a la página de login
                )
                .sessionManagement(sessionManagement ->
                        sessionManagement
                                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)  // Siempre crear una sesión
                                .invalidSessionUrl("/hola")  // Redirigir a la página de login si la sesión es inválida
                                .sessionFixation(SessionManagementConfigurer.SessionFixationConfigurer::newSession)// Protección contra fijación de sesión
                                .maximumSessions(1)  // Limitar a 1 sesión por usuario
                                .expiredUrl("/hola")  // Redirigir a la página de login si la sesión expira
                                  // Ejemplo de 30 minutos de inactividad
                        //.sessionRegistry(sessionRegistry())  // Registro de sesiones
                )
                .build();
    }


public AuthenticationSuccessHandler successHandler(){
        return ((request, response, authentication) -> {
            response.sendRedirect("/welcome");
        });
}

public SessionRegistry sessionRegistry(){
        return  new SessionRegistryImpl();
}




    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        // Autenticación en memoria (usuario y contraseña en código)
        auth.inMemoryAuthentication()
                .withUser("user")
                .password("{noop}password")  // {noop} es un prefijo que indica sin encriptar la contraseña
                .roles("USER");
    }

}

