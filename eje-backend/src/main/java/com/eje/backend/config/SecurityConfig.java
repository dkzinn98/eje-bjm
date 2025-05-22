package com.eje.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(authz -> authz
                // Endpoints públicos
                .requestMatchers("/api/users").permitAll()              // POST para cadastro
                .requestMatchers("/api/users/**").permitAll()           // Todos endpoints de usuários (temporário)
                .requestMatchers("/api/photos/**").permitAll()          // Servir fotos
                .requestMatchers("/api/auth/login").permitAll()         // Login
                .requestMatchers("/h2-console/**").permitAll()          // Console H2
                .requestMatchers("/error").permitAll()                 // Páginas de erro
                
                // Todos os outros endpoints precisam de autenticação
                .anyRequest().authenticated()
            )
            .headers(headers -> headers.frameOptions().disable()); // Para H2 Console
        
        return http.build();
    }
    
    @Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    
    // Permitir origem específica
    configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
    
    // Permitir todos os métodos HTTP
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"));
    
    // Permitir todos os headers
    configuration.setAllowedHeaders(Arrays.asList("*"));
    
    // Permitir credenciais
    configuration.setAllowCredentials(true);
    
    // Expor headers de resposta
    configuration.setExposedHeaders(Arrays.asList("*"));
    
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
}