package com.techstore.usuario.dto;

import com.techstore.usuario.Role;
import com.techstore.usuario.Usuario;

// Mapeia a interface 'User' do frontend (models.ts)
public record UsuarioDTO(
    Long id,
    String nome,
    String email,
    String endereco,
    Role role
) {
    /**
     * Converte uma Entidade Usuario para o DTO (removendo a senha).
     */
    public static UsuarioDTO fromEntity(Usuario usuario) {
        return new UsuarioDTO(
            usuario.getId(),
            usuario.getNome(),
            usuario.getEmail(),
            usuario.getEndereco(),
            usuario.getRole()
        );
    }
}