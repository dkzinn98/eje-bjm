package com.eje.backend.usecase;

import com.eje.backend.exceptions.InvalidTokenException;
import com.eje.backend.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class ValidateToken implements UseCase<ValidateToken.Input, Boolean> {

    private final JwtService jwtService;

    @Override
    public Boolean execute(Input input) {
        try {
            validateToken(input.token());
            return true;
        } catch (Exception e) {
            log.error("Error validating token", e);
            throw e;
        }
    }

    private void validateToken(String token) {
        var username = jwtService.extractUsername(token);
        var isValidToken = jwtService.validateToken(token, username);
        if (isValidToken) return;
        throw new InvalidTokenException();
    }

    public record Input(String token) {
    }
}
