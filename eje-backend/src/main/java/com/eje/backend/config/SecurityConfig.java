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
            // Configuração CORS
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            
            // Desabilitar CSRF para APIs REST
            .csrf(csrf -> csrf.disable())
            
            // Política de sessão stateless para APIs
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            
            // Configuração de autorização
            .authorizeHttpRequests(authz -> authz
                // Endpoints públicos - usuários
                .requestMatchers("/api/users").permitAll()              // POST para cadastro
                .requestMatchers("/api/users/**").permitAll()           // Todos endpoints de usuários (temporário)
                .requestMatchers("/api/users/*/photo").permitAll()      // Upload/download de fotos
                
                // Endpoints públicos - outros
                .requestMatchers("/api/photos/**").permitAll()          // Servir fotos
                .requestMatchers("/api/auth/login").permitAll()         // Login
                .requestMatchers("/api/auth/register").permitAll()      // Registro
                
                // Console H2 (apenas para desenvolvimento)
                .requestMatchers("/h2-console/**").permitAll()
                
                // Páginas de erro
                .requestMatchers("/error").permitAll()
                
                // Swagger/OpenAPI (se estiver usando)
                .requestMatchers("/swagger-ui/**").permitAll()
                .requestMatchers("/v3/api-docs/**").permitAll()
                
                // Health check
                .requestMatchers("/actuator/health").permitAll()
                
                // Todos os outros endpoints precisam de autenticação
                .anyRequest().authenticated()
            )
            
            // Configuração de headers - versão simplificada e compatível
            .headers(headers -> headers
                .frameOptions(frameOptions -> frameOptions.disable())   // Para H2 Console
            );
        
        return http.build();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Permitir origens específicas (adicionar mais conforme necessário)
        configuration.setAllowedOrigins(Arrays.asList(
            "http://localhost:5173",    // Vite dev server
            "http://localhost:3000",    // React dev server
            "http://localhost:8080"     // Outras possíveis origens
        ));
        
        // Permitir métodos HTTP específicos
        configuration.setAllowedMethods(Arrays.asList(
            "GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "PATCH"
        ));
        
        // Permitir headers específicos (mais seguro que "*")
        configuration.setAllowedHeaders(Arrays.asList(
            "Authorization",
            "Content-Type",
            "X-Requested-With",
            "Accept",
            "Origin",
            "Access-Control-Request-Method",
            "Access-Control-Request-Headers"
        ));
        
        // Permitir credenciais
        configuration.setAllowCredentials(true);
        
        // Expor headers específicos de resposta
        configuration.setExposedHeaders(Arrays.asList(
            "Access-Control-Allow-Origin",
            "Access-Control-Allow-Credentials",
            "Authorization",
            "Content-Disposition"
        ));
        
        // Tempo de cache para preflight requests
        configuration.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}