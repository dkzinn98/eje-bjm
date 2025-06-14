package com.eje.backend.controller;

import com.eje.backend.usecase.LoginUser;
import com.eje.backend.usecase.ValidateToken;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public record AuthController(
        LoginUser loginUser,
        ValidateToken validateToken
) {
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        var input = new LoginUser.Input(loginRequest.username(), loginRequest.password());
        var token = loginUser.execute(input);
        var response = new LoginResponse(token, "Login realizado com sucesso");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/validate")
    public ResponseEntity<ValidateTokenResponse> validateToken(@RequestBody TokenRequest tokenRequest) {
        var input = new ValidateToken.Input(tokenRequest.token);
        var response = validateToken.execute(input);
        return response
                ? ResponseEntity.ok(new ValidateTokenResponse("Token válido"))
                : ResponseEntity.badRequest().body(new ValidateTokenResponse("Token inválido"));
    }

    public record LoginRequest(
            @NotBlank(message = "Username é obrigatório")
            String username,
            @NotBlank(message = "Password é obrigatório")
            String password
    ) {
    }

    public record TokenRequest(
            @NotBlank(message = "Token é obrigatório")
            String token
    ) {
    }

    public record LoginResponse(
            String token,
            String message
    ) {
    }

    public record ValidateTokenResponse(String message) {
    }
}