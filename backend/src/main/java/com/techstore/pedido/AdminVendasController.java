package com.techstore.pedido;

import com.techstore.pedido.dto.PedidoDTO;
import com.techstore.pedido.dto.UpdateStatusRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller REST para os endpoints de ADMIN de Vendas (/admin/vendas).
 * Mapeia o 'orderService.getAll', 'updateStatus' e 'delete' do frontend.
 * Protegido por SecurityConfig para exigir Role.ADMIN.
 */
@RestController
@RequestMapping("/admin/vendas")
@RequiredArgsConstructor
public class AdminVendasController {

    private final PedidoService pedidoService;

    @GetMapping
    public ResponseEntity<List<PedidoDTO>> getAllPedidos() {
        return ResponseEntity.ok(pedidoService.getAllPedidos());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<PedidoDTO> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateStatusRequest request
    ) {
        PedidoDTO pedido = pedidoService.updatePedidoStatus(id, request.status());
        return ResponseEntity.ok(pedido);
    }

    /**
     * Endpoint para remover o pedido permanentemente.
     * Requer cuidado pois apaga o histórico.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePedido(@PathVariable Long id) {
        pedidoService.deletePedido(id);
        return ResponseEntity.noContent().build();
    }
}