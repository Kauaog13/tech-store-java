package com.techstore.dashboard.dto;

import com.techstore.pedido.dto.PedidoDTO;
import java.math.BigDecimal;
import java.util.List;

public record DashboardDataDTO(
    BigDecimal totalVendas,
    Long totalPedidos,
    Long totalProdutos,
    BigDecimal ticketMedio,
    List<PedidoDTO> pedidosRecentes,
    List<TopProdutoDTO> produtosMaisVendidos,
    List<String> produtosBaixoEstoque // Apenas nomes para simplificar visualização
) {}