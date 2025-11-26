package com.techstore.pedido;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.math.BigDecimal;
import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    
    // SOMA FINANCEIRA: Continua restrita (Apenas 'PAGO' ou 'ENVIADO')
    @Query("SELECT SUM(p.valorTotal) FROM Pedido p WHERE p.status IN ('PAGO', 'ENVIADO')")
    BigDecimal sumValorTotalVendas();

    // CONTAGEM DE PEDIDOS VÁLIDOS: Continua restrita
    @Query("SELECT COUNT(p) FROM Pedido p WHERE p.status IN ('PAGO', 'ENVIADO')")
    Long countPedidosValidos();

    // LISTA RECENTE (NOVO): Traz os últimos 5 pedidos INDEPENDENTE do status
    List<Pedido> findTop5ByOrderByDataPedidoDesc();
}