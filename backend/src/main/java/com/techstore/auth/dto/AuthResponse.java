package com.techstore.auth.dto;

import com.techstore.usuario.dto.UsuarioDTO;

// DTO (Record) para a resposta de login/registro. Mapeia o frontend (apiService.ts)
public record AuthResponse(
    UsuarioDTO user,
    String token
) {}