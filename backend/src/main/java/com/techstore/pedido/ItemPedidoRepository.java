package com.techstore.pedido;

import com.techstore.dashboard.dto.TopProdutoDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface ItemPedidoRepository extends JpaRepository<ItemPedido, Long> {

    // GRÁFICO TOP PRODUTOS: Contabiliza apenas itens de pedidos PAGOS ou ENVIADOS
    @Query("SELECT new com.techstore.dashboard.dto.TopProdutoDTO(i.produto.nome, SUM(i.quantidade)) " +
           "FROM ItemPedido i " +
           "WHERE i.pedido.status IN ('PAGO', 'ENVIADO') " +
           "GROUP BY i.produto.nome " +
           "ORDER BY SUM(i.quantidade) DESC")
    List<TopProdutoDTO> findMostSoldProducts(Pageable pageable);
}