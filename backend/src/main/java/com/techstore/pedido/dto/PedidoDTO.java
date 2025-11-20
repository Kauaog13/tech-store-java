package com.techstore.pedido.dto;

import com.techstore.pedido.Pedido;
import com.techstore.pedido.StatusPedido;
import com.techstore.usuario.dto.UsuarioDTO;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

// Mapeia a interface 'Order' do models.ts
public record PedidoDTO(
    Long id,
    UsuarioDTO cliente,
    List<ItemPedidoDTO> itens,
    StatusPedido status,
    BigDecimal valorTotal,
    Instant dataPedido // O frontend (TS) trata a string ISO
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
            pedido.getDataPedido()
        );
    }
}