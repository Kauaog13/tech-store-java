package com.techstore.config;

import com.techstore.usuario.Role;
import com.techstore.usuario.Usuario;
import com.techstore.usuario.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        criarUsuarioSeNaoExistir("admin@techstore.com", "admin123", "Admin Principal", Role.ADMIN);
        criarUsuarioSeNaoExistir("cliente@techstore.com", "cliente123", "Cliente Padrão", Role.CLIENTE);
    }

    private void criarUsuarioSeNaoExistir(String email, String senha, String nome, Role role) {
        Optional<Usuario> usuarioExistente = usuarioRepository.findByEmail(email);
        
        if (usuarioExistente.isEmpty()) {
            Usuario novoUsuario = Usuario.builder()
                    .nome(nome)
                    .email(email)
                    .endereco("Endereço Gerado Automaticamente")
                    .senha(passwordEncoder.encode(senha)) // Gera o hash CORRETO e ATUAL
                    .role(role)
                    .build();
            
            usuarioRepository.save(novoUsuario);
            System.out.println(">>> Usuário criado: " + email + " / " + senha);
        } else {
            // Opcional: Atualizar a senha se o usuário já existir para garantir que o hash está certo
            Usuario usuario = usuarioExistente.get();
            // Descomente a linha abaixo se quiser FORÇAR a atualização da senha a cada restart
            // usuario.setSenha(passwordEncoder.encode(senha));
            // usuarioRepository.save(usuario);
            System.out.println(">>> Usuário já existente: " + email);
        }
    }
}