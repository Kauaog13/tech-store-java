package com.techstore.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EstoqueInsuficienteException.class)
    public ResponseEntity<?> handleEstoqueInsuficiente(EstoqueInsuficienteException ex, WebRequest request) {
        return new ResponseEntity<>(Map.of("erro", ex.getMessage()), HttpStatus.UNPROCESSABLE_ENTITY);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handleResourceNotFound(ResourceNotFoundException ex, WebRequest request) {
        return new ResponseEntity<>(Map.of("erro", ex.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<?> handleUsernameNotFound(UsernameNotFoundException ex, WebRequest request) {
        return new ResponseEntity<>(Map.of("erro", ex.getMessage()), HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<?> handleAccessDenied(AccessDeniedException ex, WebRequest request) {
        return new ResponseEntity<>(Map.of("erro", "Acesso negado."), HttpStatus.FORBIDDEN);
    }

    // CORREÇÃO: Handler para erro de validação lógica (ex: email duplicado verificado no service)
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handleIllegalArgument(IllegalArgumentException ex, WebRequest request) {
        // Retorna 400 Bad Request
        return new ResponseEntity<>(Map.of("erro", ex.getMessage(), "message", ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    // CORREÇÃO: Handler para erro de banco de dados (ex: email duplicado que passou pelo service)
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<?> handleDataIntegrity(DataIntegrityViolationException ex, WebRequest request) {
        // Retorna 409 Conflict
        return new ResponseEntity<>(Map.of("erro", "Este email já está em uso.", "message", "Este email já está em uso."), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGlobalException(Exception ex, WebRequest request) {
        ex.printStackTrace();
        return new ResponseEntity<>(Map.of("erro", "Erro interno no servidor."), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}