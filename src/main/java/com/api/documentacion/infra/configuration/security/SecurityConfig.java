package com.api.documentacion.infra.configuration.security;

import com.api.documentacion.domain.usuario.UsuarioService;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.config.annotation.web.configurers.SessionManagementConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

@Autowired
    UsuarioService usuarioService;
@Autowired
PasswordService passwordService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                //.csrf(AbstractHttpConfigurer::disable)  // Desactivar CSRF si es necesario (si no es necesario, se puede eliminar)
                .authorizeHttpRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers("/login", "/logout").permitAll()
                                .requestMatchers("/static/**").permitAll()
                                .requestMatchers("/register").hasRole("ADMIN")
                                .requestMatchers("/usuarios/**").hasRole("USER")
                                .requestMatchers("/").authenticated()
                                .anyRequest().authenticated() )
                .formLogin(formLogin ->
                        formLogin
                                .loginPage("/login")  // Página de login personalizada (descomentado)
                                .loginProcessingUrl("/login") // URL donde se procesará el login
                                // .failureForwardUrl("/login?error=true")  // En caso de error, redirige a la página de login con un parámetro error
                                .successHandler(successHandler())  // Redirige después de iniciar sesión
                                .permitAll()  // Permitir acceso sin autenticación a la página de login
                )  .logout(logout ->
                        logout
                                .logoutUrl("/logout") // URL para logout
                                .logoutRequestMatcher(new AntPathRequestMatcher("/logout", "POST"))  // Solicitud POST para logout
                                .logoutSuccessUrl("/login?logout") // Redirigir a login después de logout
                                .invalidateHttpSession(true) // Invalidar la sesión
                                .clearAuthentication(true) // Limpia la autenticación del contexto de seguridad
                                .permitAll()  // Permitir que cualquier usuario acceda a la URL de logout

                )
                .sessionManagement(sessionManagement ->
                        sessionManagement
                                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)  // Siempre crear una sesión
                                .invalidSessionUrl("/login")  // Redirigir a la página de login si la sesión es inválida
                                .sessionFixation(SessionManagementConfigurer.SessionFixationConfigurer::newSession)// Protección contra fijación de sesión
                                .maximumSessions(1)  // Limitar a 1 sesión por usuario
                                .expiredUrl("/login")  // Redirigir a la página de login si la sesión expira
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

    @Bean
    public AuthenticationManager authManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder =
                http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder
                .userDetailsService(usuarioService)
                .passwordEncoder(passwordService.passwordEncoder());

        return authenticationManagerBuilder.build(); // Crear y devolver AuthenticationManager

    }

    /*
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Usamos BCrypt para encriptar las contraseñas
    }
*/

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(usuarioService);
        authProvider.setPasswordEncoder(passwordService.passwordEncoder());
        return authProvider;
    }

}

