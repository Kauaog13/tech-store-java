package com.techstore.pedido.dto;

import com.techstore.pedido.StatusPedido;
import jakarta.validation.constraints.NotNull;

// Mapeia o 'orderService.updateStatus' do apiService.ts
public record UpdateStatusRequest(
    @NotNull StatusPedido status
) {}