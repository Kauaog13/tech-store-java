package com.techstore.pedido.dto;

import com.techstore.pedido.ItemPedido;
import com.techstore.produto.dto.ProdutoDTO;

// Mapeia a interface 'CartItem' do models.ts (usado dentro do PedidoDTO)
public record ItemPedidoDTO(
    ProdutoDTO product,
    int quantidade
) {
    public static ItemPedidoDTO fromEntity(ItemPedido item) {
        return new ItemPedidoDTO(
            ProdutoDTO.fromEntity(item.getProduto()),
            item.getQuantidade()
        );
    }
}