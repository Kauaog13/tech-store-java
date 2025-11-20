package com.techstore.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

// DTO (Record) para o request de login.
public record LoginRequest(
    @Email @NotEmpty String email,
    @NotEmpty String senha
) {}