package com.techstore.produto.dto;

import com.techstore.produto.Produto;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public record CreateProdutoRequest(
    @NotEmpty String nome,
    @NotNull @Min(0) BigDecimal preco,
    @NotNull @Min(0) int estoque,
    @NotEmpty String categoria,
    @NotEmpty String descricao, // Novo campo (Obrigatório)
    @NotEmpty String imagemUrl
) {
    public Produto toEntity() {
        return Produto.builder()
            .nome(nome)
            .preco(preco)
            .estoque(estoque)
            .categoria(categoria)
            .descricao(descricao)
            .imagemUrl(imagemUrl)
            .build();
    }
}