package com.techstore.usuario;

import com.techstore.usuario.dto.UpdateProfileRequest;
import com.techstore.usuario.dto.UsuarioDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller REST para endpoints /usuarios.
 * Mapeia o 'userService' do frontend.
 *
 */
@RestController
@RequestMapping("/usuarios") // CORRIGIDO: Removido o /api
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    /**
     * Mapeia o 'userService.updateProfile' do apiService.ts.
     * Usado pela ProfilePage.tsx.
     */
    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDTO> updateProfile(
            @PathVariable("id") Long userId,
            @Valid @RequestBody UpdateProfileRequest request
    ) {
        // A lógica de segurança (verificar se o usuário logado é o dono do perfil)
        // está dentro do UsuarioService.
        UsuarioDTO updatedUser = usuarioService.updateProfile(userId, request);
        return ResponseEntity.ok(updatedUser);
    }
}