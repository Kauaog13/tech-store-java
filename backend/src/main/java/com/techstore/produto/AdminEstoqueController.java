package com.techstore.produto;

import com.techstore.produto.dto.CreateProdutoRequest;
import com.techstore.produto.dto.ProdutoDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller REST para os endpoints de ADMIN de Estoque (/admin/produtos).
 * Mapeia o 'productService.create/update/delete' do frontend.
 * Protegido por SecurityConfig para exigir Role.ADMIN.
 *
 */
@RestController
@RequestMapping("/admin/produtos") // CORRIGIDO: Removido o /api
@RequiredArgsConstructor
public class AdminEstoqueController {

    private final ProdutoService produtoService;

    @PostMapping
    public ResponseEntity<ProdutoDTO> createProduto(@Valid @RequestBody CreateProdutoRequest request) {
        ProdutoDTO produto = produtoService.createProduto(request);
        return new ResponseEntity<>(produto, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProdutoDTO> updateProduto(
            @PathVariable Long id,
            @Valid @RequestBody CreateProdutoRequest request
    ) {
        ProdutoDTO produto = produtoService.updateProduto(id, request);
        return ResponseEntity.ok(produto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduto(@PathVariable Long id) {
        produtoService.deleteProduto(id);
        return ResponseEntity.noContent().build();
    }
}