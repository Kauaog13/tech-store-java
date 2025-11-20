package com.techstore.produto;

import com.techstore.exception.ResourceNotFoundException;
import com.techstore.produto.dto.CreateProdutoRequest;
import com.techstore.produto.dto.ProdutoDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // <-- 1. IMPORTAR

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    // --- Métodos Públicos (usados pelo ProdutoController) ---
    // (Não precisa de @Transactional pois é apenas LEITURA)
    public List<ProdutoDTO> getAllProdutos() {
        return produtoRepository.findAll().stream()
                .map(ProdutoDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // (Não precisa de @Transactional pois é apenas LEITURA)
    public ProdutoDTO getProdutoById(Long id) {
        return produtoRepository.findById(id)
                .map(ProdutoDTO::fromEntity)
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado"));
    }

    // --- Métodos de Admin (usados pelo AdminEstoqueController) ---

    @Transactional // <-- 2. ADICIONAR TRANSAÇÃO
    public ProdutoDTO createProduto(CreateProdutoRequest request) {
        Produto produto = request.toEntity();
        Produto savedProduto = produtoRepository.save(produto);
        return ProdutoDTO.fromEntity(savedProduto);
    }

    @Transactional
    public ProdutoDTO updateProduto(Long id, CreateProdutoRequest request) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado para atualização"));

        produto.setNome(request.nome());
        produto.setPreco(request.preco());
        produto.setEstoque(request.estoque());
        produto.setCategoria(request.categoria());
        produto.setDescricao(request.descricao()); // Atualiza descrição
        produto.setImagemUrl(request.imagemUrl());

        Produto updatedProduto = produtoRepository.save(produto);
        return ProdutoDTO.fromEntity(updatedProduto);
    }

    @Transactional // <-- 4. ADICIONAR TRANSAÇÃO
    public void deleteProduto(Long id) {
        if (!produtoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Produto não encontrado para exclusão");
        }
        produtoRepository.deleteById(id);
    }
}