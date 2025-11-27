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
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        // CORREÇÃO: Verifica se o email já existe antes de tentar salvar
        if (usuarioRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("Este email já está cadastrado no sistema.");
        }

        Usuario usuario = Usuario.builder()
                .nome(request.nome())
                .email(request.email())
                .endereco(request.endereco())
                .senha(passwordEncoder.encode(request.senha()))
                .role(Role.CLIENTE)
                .build();

        Usuario savedUsuario = usuarioRepository.save(usuario);
        String jwtToken = jwtService.generateToken(savedUsuario);

        return new AuthResponse(UsuarioDTO.fromEntity(savedUsuario), jwtToken);
    }

    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.senha()
                )
        );

        Usuario usuario = (Usuario) authentication.getPrincipal();
        String jwtToken = jwtService.generateToken(usuario);

        return new AuthResponse(UsuarioDTO.fromEntity(usuario), jwtToken);
    }
}