package com.techstore.auth;

import com.techstore.auth.dto.AuthResponse;
import com.techstore.auth.dto.LoginRequest;
import com.techstore.auth.dto.RegisterRequest;
import com.techstore.jwt.JwtService;
import com.techstore.usuario.Role;
import com.techstore.usuario.Usuario;
import com.techstore.usuario.UsuarioRepository;
import com.techstore.usuario.dto.UsuarioDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication; // <-- IMPORT ADICIONADO
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    /**
     * Registra um novo usuário (CLIENTE).
     *
     */
    public AuthResponse register(RegisterRequest request) {
        // Cria a entidade Usuario
        Usuario usuario = Usuario.builder()
                .nome(request.nome())
                .email(request.email())
                .endereco(request.endereco())
                .senha(passwordEncoder.encode(request.senha()))
                .role(Role.CLIENTE) // Novos registros são sempre CLIENTE
                .build();

        // Salva no banco
        Usuario savedUsuario = usuarioRepository.save(usuario);

        // Gera o token
        String jwtToken = jwtService.generateToken(savedUsuario);

        // Retorna a resposta (DTO)
        return new AuthResponse(UsuarioDTO.fromEntity(savedUsuario), jwtToken);
    }

    /**
     * Autentica um usuário existente.
     *
     */
    public AuthResponse login(LoginRequest request) {
        
        // ===================================================================
        // INÍCIO DA CORREÇÃO
        // ===================================================================

        // 1. O AuthenticationManager valida o usuário e senha
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.senha()
                )
        );

        // 2. Se a autenticação passar, pegamos o usuário (Principal)
        //    diretamente do objeto de autenticação.
        //    Não é necessário consultar o banco novamente.
        Usuario usuario = (Usuario) authentication.getPrincipal();

        // 3. Gera o token
        String jwtToken = jwtService.generateToken(usuario);

        // 4. Retorna a resposta (DTO)
        return new AuthResponse(UsuarioDTO.fromEntity(usuario), jwtToken);
        
        // ===================================================================
        // FIM DA CORREÇÃO
        // ===================================================================
    }
}