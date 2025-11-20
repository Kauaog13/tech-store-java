package com.techstore.pedido;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.math.BigDecimal;
import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    
    // Soma total de vendas (excluindo cancelados)
    @Query("SELECT SUM(p.valorTotal) FROM Pedido p WHERE p.status <> 'CANCELADO'")
    BigDecimal sumValorTotalVendas();

    // Contagem de pedidos válidos
    @Query("SELECT COUNT(p) FROM Pedido p WHERE p.status <> 'CANCELADO'")
    Long countPedidosValidos();

    // Pedidos recentes (Top 5)
    List<Pedido> findTop5ByOrderByDataPedidoDesc();
}