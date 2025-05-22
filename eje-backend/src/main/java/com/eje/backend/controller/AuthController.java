package com.eje.backend.controller;

import com.eje.backend.service.AdminService;
import com.eje.backend.service.JwtService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    
    @Autowired
    private AdminService adminService;
    
    @Autowired
    private JwtService jwtService;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            if (adminService.validateLogin(loginRequest.getUsername(), loginRequest.getPassword())) {
                String token = jwtService.generateToken(loginRequest.getUsername());
                return ResponseEntity.ok(new LoginResponse(token, "Login realizado com sucesso"));
            } else {
                return ResponseEntity.badRequest().body(new ErrorResponse("Usuário ou senha incorretos"));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Erro interno do servidor"));
        }
    }
    
    @PostMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestBody TokenRequest tokenRequest) {
        try {
            String username = jwtService.extractUsername(tokenRequest.getToken());
            if (jwtService.validateToken(tokenRequest.getToken(), username)) {
                return ResponseEntity.ok(new SuccessResponse("Token válido"));
            } else {
                return ResponseEntity.badRequest().body(new ErrorResponse("Token inválido"));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Token inválido"));
        }
    }
    
    // Classes de request/response
    public static class LoginRequest {
        @NotBlank(message = "Username é obrigatório")
        private String username;
        
        @NotBlank(message = "Password é obrigatório")
        private String password;
        
        // Getters e Setters
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
    
    public static class TokenRequest {
        @NotBlank(message = "Token é obrigatório")
        private String token;
        
        // Getters e Setters
        public String getToken() { return token; }
        public void setToken(String token) { this.token = token; }
    }
    
    public static class LoginResponse {
        private String token;
        private String message;
        
        public LoginResponse(String token, String message) {
            this.token = token;
            this.message = message;
        }
        
        // Getters e Setters
        public String getToken() { return token; }
        public void setToken(String token) { this.token = token; }
        
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
    }
    
    public static class ErrorResponse {
        private String message;
        
        public ErrorResponse(String message) {
            this.message = message;
        }
        
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
    }
    
    public static class SuccessResponse {
        private String message;
        
        public SuccessResponse(String message) {
            this.message = message;
        }
        
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
    }
}