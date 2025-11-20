package com.techstore.produto;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    
    @Query("SELECT p.nome FROM Produto p WHERE p.estoque < 5")
    List<String> findLowStockProducts();
}