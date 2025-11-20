package com.techstore.produto.dto;

import com.techstore.produto.Produto;
import java.math.BigDecimal;

public record ProdutoDTO(
    Long id,
    String nome,
    BigDecimal preco,
    int estoque,
    String categoria,
    String descricao, // Novo campo
    String imagemUrl
) {
    public static ProdutoDTO fromEntity(Produto produto) {
        return new ProdutoDTO(
            produto.getId(),
            produto.getNome(),
            produto.getPreco(),
            produto.getEstoque(),
            produto.getCategoria(),
            produto.getDescricao(),
            produto.getImagemUrl()
        );
    }
}