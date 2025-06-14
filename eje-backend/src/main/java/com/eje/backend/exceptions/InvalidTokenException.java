package com.eje.backend.exceptions;

import org.springframework.http.HttpStatus;

public class InvalidTokenException extends NoStackTraceException {
    public InvalidTokenException() {
        super(HttpStatus.BAD_REQUEST, "Token inválido", null);
    }
}
