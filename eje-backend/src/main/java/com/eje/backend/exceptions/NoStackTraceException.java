package com.eje.backend.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class NoStackTraceException extends RuntimeException {
    private final HttpStatus status;
    private final String message;

    public NoStackTraceException(
            HttpStatus status,
            String message,
            Throwable cause
    ) {
        super(message, cause, false, false);
        this.status = status;
        this.message = message;
    }
}
