package com.techstore.exception;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.Map;

/**
 * Handler Global de Exceções (@RestControllerAdvice).
 * Captura exceções customizadas e do Spring Security e as transforma em respostas HTTP claras.
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Captura a exceção de estoque (Regra de Negócio).
     * Retorna 422 Unprocessable Entity, conforme solicitado.
     */
    @ExceptionHandler(EstoqueInsuficienteException.class)
    public ResponseEntity<?> handleEstoqueInsuficiente(EstoqueInsuficienteException ex, WebRequest request) {
        return new ResponseEntity<>(Map.of("erro", ex.getMessage()), HttpStatus.UNPROCESSABLE_ENTITY); // 422
    }

    /**
     * Captura quando um recurso não é encontrado.
     * Retorna 404 Not Found.
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handleResourceNotFound(ResourceNotFoundException ex, WebRequest request) {
        return new ResponseEntity<>(Map.of("erro", ex.getMessage()), HttpStatus.NOT_FOUND); // 404
    }

    /**
     * Captura quando o usuário não é encontrado durante o login/autenticação.
     * Retorna 404 Not Found.
     */
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<?> handleUsernameNotFound(UsernameNotFoundException ex, WebRequest request) {
        return new ResponseEntity<>(Map.of("erro", ex.getMessage()), HttpStatus.NOT_FOUND); // 404
    }
    
    /**
     * Captura falhas de autorização (ex: Cliente tentando acessar /admin).
     * Retorna 403 Forbidden.
     */
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<?> handleAccessDenied(AccessDeniedException ex, WebRequest request) {
        return new ResponseEntity<>(Map.of("erro", "Acesso negado. Você não tem permissão para este recurso."), HttpStatus.FORBIDDEN); // 403
    }

    /**
     * Handler genérico para outras exceções não tratadas.
     * Retorna 500 Internal Server Error.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGlobalException(Exception ex, WebRequest request) {
        // Logar a exceção (ex.printStackTrace())
        ex.printStackTrace();
        return new ResponseEntity<>(Map.of("erro", "Ocorreu um erro interno no servidor."), HttpStatus.INTERNAL_SERVER_ERROR); // 500
    }
}