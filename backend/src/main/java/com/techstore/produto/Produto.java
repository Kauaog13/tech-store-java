package com.techstore.produto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "produtos")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Column(precision = 10, scale = 2)
    private BigDecimal preco;

    private int estoque;
    
    private String categoria;

    @Column(columnDefinition = "TEXT") // Permite textos longos
    private String descricao;

    @Column(name = "imagem_url", length = 1024)
    private String imagemUrl;
}