package com.techstore.config;

import com.techstore.usuario.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

/**
 * Configuração principal do Spring Security.
 * Contém a configuração de CORS e a autorização de endpoints.
 *
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            
            // Define as regras de autorização
            .authorizeHttpRequests(authz -> authz
                // Permite todas as requisições "preflight" (OPTIONS) do navegador.
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // ===================================================================
                // CORREÇÃO: Removidos TODOS os prefixos /api das regras.
                // O context-path /api é tratado pelo Tomcat.
                // ===================================================================

                // Endpoints públicos
                .requestMatchers("/auth/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/produtos", "/produtos/**").permitAll()
                
                // Endpoints do Cliente (CLIENTE ou ADMIN)
                .requestMatchers(HttpMethod.POST, "/pedidos").hasAnyAuthority(Role.CLIENTE.name(), Role.ADMIN.name())
                .requestMatchers(HttpMethod.PUT, "/usuarios/**").hasAnyAuthority(Role.CLIENTE.name(), Role.ADMIN.name())
                
                // Endpoints do Admin (Somente ADMIN)
                .requestMatchers("/admin/**").hasAuthority(Role.ADMIN.name())
                
                // Todas as outras requisições devem ser autenticadas
                .anyRequest().authenticated()
            )
            
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authenticationProvider(authenticationProvider)
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    /**
     * Bean que define a configuração de CORS para a aplicação.
     * Esta é a configuração correta para desenvolvimento local.
     *
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Define a origem permitida (o seu frontend)
        configuration.setAllowedOrigins(List.of("http://localhost:5173")); 
        
        // Define os métodos permitidos
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        
        // Define os cabeçalhos permitidos
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "Cache-Control"));
        
        // Permite o envio de credenciais (tokens, cookies)
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        
        // ===================================================================
        // CORREÇÃO: A regra de CORS deve corresponder ao que o Spring recebe
        // (caminhos *sem* o context-path /api).
        // ===================================================================
        source.registerCorsConfiguration("/**", configuration); 
        
        return source;
    }
}