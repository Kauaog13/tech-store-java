package com.techstore.pedido;

import com.techstore.pedido.dto.CreatePedidoRequest;
import com.techstore.pedido.dto.PedidoDTO;
import com.techstore.usuario.Usuario;
import com.techstore.usuario.UsuarioRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller REST para os endpoints de Pedidos do CLIENTE (/pedidos).
 */
@RestController
@RequestMapping("/pedidos")
@RequiredArgsConstructor
public class PedidoController {

    private final PedidoService pedidoService;
    private final UsuarioRepository usuarioRepository;

    /**
     * Endpoint para o cliente finalizar a compra.
     */
    @PostMapping
    public ResponseEntity<PedidoDTO> createPedido(@Valid @RequestBody CreatePedidoRequest request) {
        PedidoDTO pedido = pedidoService.createPedido(request);
        return new ResponseEntity<>(pedido, HttpStatus.CREATED);
    }

    /**
     * Endpoint para o cliente ver SEUS próprios pedidos.
     */
    @GetMapping("/meus")
    public ResponseEntity<List<PedidoDTO>> getMeusPedidos() {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        Usuario cliente = usuarioRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("Cliente não encontrado"));
        
        return ResponseEntity.ok(pedidoService.getPedidosByCliente(cliente.getId()));
    }

    /**
     * Endpoint para o cliente cancelar SEU próprio pedido.
     */
    @PutMapping("/{id}/cancelar")
    public ResponseEntity<PedidoDTO> cancelMyOrder(@PathVariable Long id) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        Usuario cliente = usuarioRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("Cliente não encontrado"));

        PedidoDTO pedido = pedidoService.cancelarPedidoCliente(id, cliente.getId());
        return ResponseEntity.ok(pedido);
    }
}