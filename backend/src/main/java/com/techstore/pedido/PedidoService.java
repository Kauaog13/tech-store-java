package com.techstore.pedido;

import com.techstore.exception.EstoqueInsuficienteException;
import com.techstore.exception.ResourceNotFoundException;
import com.techstore.pedido.dto.CreatePedidoRequest;
import com.techstore.pedido.dto.PedidoDTO;
import com.techstore.produto.Produto;
import com.techstore.produto.ProdutoRepository;
import com.techstore.usuario.Usuario;
import com.techstore.usuario.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ProdutoRepository produtoRepository;
    private final UsuarioRepository usuarioRepository;

    @Transactional
    public PedidoDTO createPedido(CreatePedidoRequest request) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        Usuario cliente = usuarioRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("Cliente não encontrado"));

        String enderecoEntrega = (request.enderecoEntrega() != null && !request.enderecoEntrega().isBlank())
                ? request.enderecoEntrega()
                : cliente.getEndereco();

        Pedido pedido = Pedido.builder()
                .cliente(cliente)
                .enderecoEntrega(enderecoEntrega)
                .formaPagamento(request.formaPagamento())
                .status(StatusPedido.PENDENTE)
                .itens(new ArrayList<>())
                .build();

        BigDecimal valorTotal = BigDecimal.ZERO;

        for (CreatePedidoRequest.ItemRequest itemRequest : request.itens()) {
            Produto produto = produtoRepository.findById(itemRequest.produtoId())
                    .orElseThrow(() -> new ResourceNotFoundException("Produto ID " + itemRequest.produtoId() + " não encontrado"));

            if (produto.getEstoque() < itemRequest.quantidade()) {
                throw new EstoqueInsuficienteException(
                    "Estoque insuficiente para " + produto.getNome() + 
                    ". Disponível: " + produto.getEstoque() + 
                    ", Solicitado: " + itemRequest.quantidade()
                );
            }

            produto.setEstoque(produto.getEstoque() - itemRequest.quantidade());
            produtoRepository.save(produto);

            ItemPedido itemPedido = ItemPedido.builder()
                    .pedido(pedido)
                    .produto(produto)
                    .quantidade(itemRequest.quantidade())
                    .precoUnitario(produto.getPreco())
                    .build();

            pedido.getItens().add(itemPedido);

            valorTotal = valorTotal.add(
                produto.getPreco().multiply(BigDecimal.valueOf(itemRequest.quantidade()))
            );
        }

        pedido.setValorTotal(valorTotal);
        Pedido savedPedido = pedidoRepository.save(pedido);

        return PedidoDTO.fromEntity(savedPedido);
    }
    
    public List<PedidoDTO> getAllPedidos() {
        return pedidoRepository.findAll().stream()
                .map(PedidoDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public List<PedidoDTO> getPedidosByCliente(Long clienteId) {
        return pedidoRepository.findAll().stream()
                .filter(p -> p.getCliente().getId().equals(clienteId))
                .map(PedidoDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public PedidoDTO cancelarPedidoCliente(Long pedidoId, Long clienteId) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new ResourceNotFoundException("Pedido não encontrado"));

        if (!pedido.getCliente().getId().equals(clienteId)) {
            throw new SecurityException("Você não tem permissão para cancelar este pedido.");
        }

        if (pedido.getStatus() != StatusPedido.PENDENTE) {
            throw new IllegalStateException("Não é possível cancelar este pedido pois ele já foi processado ou finalizado.");
        }

        return updatePedidoStatus(pedidoId, StatusPedido.CANCELADO);
    }

    @Transactional
    public PedidoDTO updatePedidoStatus(Long pedidoId, StatusPedido newStatus) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new ResourceNotFoundException("Pedido não encontrado"));

        if (pedido.getStatus() == StatusPedido.CANCELADO) {
            throw new IllegalStateException("Este pedido já foi cancelado e o estoque estornado.");
        }

        if (newStatus == StatusPedido.CANCELADO) {
            returnStock(pedido);
        }

        pedido.setStatus(newStatus);
        Pedido updatedPedido = pedidoRepository.save(pedido);

        return PedidoDTO.fromEntity(updatedPedido);
    }

    @Transactional
    public void deletePedido(Long pedidoId) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new ResourceNotFoundException("Pedido não encontrado"));
        
        if (pedido.getStatus() != StatusPedido.CANCELADO) {
             returnStock(pedido);
        }

        pedidoRepository.delete(pedido);
    }

    private void returnStock(Pedido pedido) {
        for (ItemPedido item : pedido.getItens()) {
            Produto produto = item.getProduto();
            produto.setEstoque(produto.getEstoque() + item.getQuantidade());
            produtoRepository.save(produto);
        }
    }
}