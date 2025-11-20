package com.techstore.exception;

/**
 * Exceção customizada (conforme Documentação) para ser lançada quando
 * uma tentativa de compra excede o estoque disponível.
 */
public class EstoqueInsuficienteException extends RuntimeException {
    public EstoqueInsuficienteException(String message) {
        super(message);
    }
}