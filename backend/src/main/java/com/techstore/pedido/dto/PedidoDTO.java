package com.techstore.pedido.dto;

import com.techstore.pedido.Pedido;
import com.techstore.pedido.StatusPedido;
import com.techstore.usuario.dto.UsuarioDTO;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

public record PedidoDTO(
    Long id,
    UsuarioDTO cliente,
    List<ItemPedidoDTO> itens,
    StatusPedido status,
    BigDecimal valorTotal,
    Instant dataPedido,
    String enderecoEntrega,
    String formaPagamento 
) {
    public static PedidoDTO fromEntity(Pedido pedido) {
        return new PedidoDTO(
            pedido.getId(),
            UsuarioDTO.fromEntity(pedido.getCliente()),
            pedido.getItens().stream()
                .map(ItemPedidoDTO::fromEntity)
                .collect(Collectors.toList()),
            pedido.getStatus(),
            pedido.getValorTotal(),
            pedido.getDataPedido(),
            pedido.getEnderecoEntrega(),
            pedido.getFormaPagamento()
        );
    }
}