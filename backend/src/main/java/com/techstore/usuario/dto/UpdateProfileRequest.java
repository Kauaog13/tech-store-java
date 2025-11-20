package com.techstore.usuario.dto;

import jakarta.validation.constraints.NotEmpty;

// DTO para a requisição de atualização de perfil (ProfilePage.tsx)
// O frontend envia apenas 'nome' e 'endereco'
public record UpdateProfileRequest(
    @NotEmpty String nome,
    @NotEmpty String endereco
) {}