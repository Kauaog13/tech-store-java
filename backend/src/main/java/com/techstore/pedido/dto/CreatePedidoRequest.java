package com.techstore.pedido.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import java.util.List;

public record CreatePedidoRequest(
    @NotEmpty List<ItemRequest> itens,
    @NotEmpty String enderecoEntrega,
    @NotEmpty String formaPagamento
) {
    public record ItemRequest(
        @NotNull Long produtoId,
        @NotNull @Min(1) int quantidade
    ) {}
}