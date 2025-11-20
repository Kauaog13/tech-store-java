package com.techstore.exception;

/**
 * Exceção genérica para quando um recurso (Produto, Pedido, Usuário) não é encontrado.
 */
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}