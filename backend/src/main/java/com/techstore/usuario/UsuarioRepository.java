package com.techstore.usuario;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Usado pelo Spring Security (via ApplicationConfig) para carregar o usuário
    Optional<Usuario> findByEmail(String email);
}