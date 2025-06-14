package com.eje.backend.exceptions;

import org.springframework.http.HttpStatus;

public class InvalidCredentialsException extends NoStackTraceException {
    public InvalidCredentialsException() {
        super(HttpStatus.BAD_REQUEST, "Usuário ou senha incorretos", null);
    }
}
