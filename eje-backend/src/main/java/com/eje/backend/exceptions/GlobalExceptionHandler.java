package com.eje.backend.exceptions;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NoStackTraceException.class)
    public ProblemDetail handleNoStackTraceException(NoStackTraceException ex) {
        log.warn(ex.getMessage(), ex);
        return ProblemDetail.forStatusAndDetail(ex.getStatus(), ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ProblemDetail handleGeneric(Exception ex) {
        log.error("GenericException: {}", ex.getMessage(), ex);
        var problemDetail = ProblemDetail.forStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        problemDetail.setDetail("Ocorreu um erro interno inesperado. Por favor, tente novamente mais tarde ou entre em contato com o suporte.");
        problemDetail.setTitle("Erro interno");
        return problemDetail;
    }
}
