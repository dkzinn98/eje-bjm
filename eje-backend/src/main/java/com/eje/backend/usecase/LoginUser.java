package com.eje.backend.usecase;

import com.eje.backend.exceptions.InvalidCredentialsException;
import com.eje.backend.service.AdminService;
import com.eje.backend.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class LoginUser implements UseCase<LoginUser.Input, String> {

    private final AdminService adminService;
    private final JwtService jwtService;

    @Override
    public String execute(Input input) {
        try {
            validateLogin(input);
            return jwtService.generateToken(input.username);
        } catch (Exception e) {
            log.error("Login failed", e);
            throw e;
        }
    }

    private void validateLogin(Input input) {
        var isValidLogin = adminService.validateLogin(input.username, input.password);
        if (isValidLogin) return;
        throw new InvalidCredentialsException();
    }

    public record Input(String username, String password) {
    }

}
