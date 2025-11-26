package com.techstore.dashboard;

import com.techstore.dashboard.dto.DashboardDataDTO;
import com.techstore.dashboard.dto.TopProdutoDTO;
import com.techstore.pedido.ItemPedidoRepository;
import com.techstore.pedido.PedidoRepository;
import com.techstore.pedido.dto.PedidoDTO;
import com.techstore.produto.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final PedidoRepository pedidoRepository;
    private final ProdutoRepository produtoRepository;
    private final ItemPedidoRepository itemPedidoRepository;

    @Transactional(readOnly = true)
    public DashboardDataDTO getDashboardData() {
        // 1. Vendas Totais (Mantém filtro financeiro rigoroso)
        BigDecimal totalVendas = pedidoRepository.sumValorTotalVendas();
        if (totalVendas == null) totalVendas = BigDecimal.ZERO;

        // 2. Total Pedidos (Mantém filtro financeiro rigoroso)
        Long totalPedidos = pedidoRepository.countPedidosValidos();
        
        BigDecimal ticketMedio = BigDecimal.ZERO;
        if (totalPedidos > 0) {
            ticketMedio = totalVendas.divide(BigDecimal.valueOf(totalPedidos), 2, RoundingMode.HALF_UP);
        }

        // 3. Total Produtos
        Long totalProdutos = produtoRepository.count();

        // 4. Pedidos Recentes (ALTERADO: Agora busca TODOS os status)
        List<PedidoDTO> pedidosRecentes = pedidoRepository.findTop5ByOrderByDataPedidoDesc()
                .stream()
                .map(PedidoDTO::fromEntity)
                .collect(Collectors.toList());

        // 5. Produtos Mais Vendidos (Mantém filtro para mostrar o que realmente vendeu)
        List<TopProdutoDTO> topProdutos = itemPedidoRepository.findMostSoldProducts(PageRequest.of(0, 5));

        // 6. Baixo Estoque
        List<String> baixoEstoque = produtoRepository.findLowStockProducts();

        return new DashboardDataDTO(
            totalVendas,
            totalPedidos,
            totalProdutos,
            ticketMedio,
            pedidosRecentes,
            topProdutos,
            baixoEstoque
        );
    }
}