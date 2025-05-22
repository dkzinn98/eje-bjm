package com.eje.backend.repository;

import com.eje.backend.model.User;
import com.eje.backend.model.TipoUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Buscar por email (para evitar duplicatas)
    Optional<User> findByEmail(String email);
    
    // Buscar por WhatsApp (para evitar duplicatas)
    Optional<User> findByWhatsapp(String whatsapp);
    
    // Buscar por tipo
    List<User> findByTipo(TipoUsuario tipo);
    
    // Buscar por nome (case insensitive)
    List<User> findByNomeContainingIgnoreCase(String nome);
    
    // Buscar por nome ou email (para busca)
    @Query("SELECT u FROM User u WHERE " +
           "LOWER(u.nome) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(u.email) LIKE LOWER(CONCAT('%', :search, '%'))")
    List<User> findByNomeOrEmailContaining(@Param("search") String search);
    
    // Contar por tipo
    long countByTipo(TipoUsuario tipo);
    
    // Verificar se email já existe (para validação)
    boolean existsByEmail(String email);
    
    // Verificar se WhatsApp já existe (para validação)
    boolean existsByWhatsapp(String whatsapp);
}