package com.techstore.usuario;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import com.techstore.exception.ResourceNotFoundException;
import com.techstore.usuario.dto.UpdateProfileRequest;
import com.techstore.usuario.dto.UsuarioDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioDTO updateProfile(Long userId, UpdateProfileRequest request) {
        // Pega o email do usuário autenticado (do token JWT)
        String authenticatedUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        // Busca o usuário que queremos editar
        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

        // Busca o usuário autenticado
        Usuario authenticatedUser = usuarioRepository.findByEmail(authenticatedUserEmail)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário autenticado não encontrado"));

        // REGRA DE SEGURANÇA:
        // Um usuário só pode editar o próprio perfil, a menos que seja um ADMIN.
        if (!usuario.getEmail().equals(authenticatedUserEmail) && authenticatedUser.getRole() != Role.ADMIN) {
            throw new AccessDeniedException("Você não tem permissão para atualizar este perfil.");
        }

        // Atualiza os dados
        usuario.setNome(request.nome());
        usuario.setEndereco(request.endereco());
        
        Usuario updatedUsuario = usuarioRepository.save(usuario);

        return UsuarioDTO.fromEntity(updatedUsuario);
    }
}