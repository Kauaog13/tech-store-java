package com.techstore.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

// DTO (Record) para o request de registro. Mapeia o frontend (apiService.ts > register)
public record RegisterRequest(
    @NotEmpty String nome,
    @Email @NotEmpty String email,
    @NotEmpty String endereco,
    @NotEmpty String senha
) {}