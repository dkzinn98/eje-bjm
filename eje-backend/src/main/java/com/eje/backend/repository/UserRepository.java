package com.eje.backend.repository;

import com.eje.backend.model.User;
import com.eje.backend.model.TipoUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Buscar por email
    Optional<User> findByEmail(String email);
    
    // Buscar por tipo de usuário
    List<User> findByTipo(TipoUsuario tipo);
    
    // Contar por tipo
    long countByTipo(TipoUsuario tipo);
    
    // Verificar se email já existe
    boolean existsByEmail(String email);
    
    // Verificar se WhatsApp já existe
    boolean existsByWhatsapp(String whatsapp);
    
    // Buscar por nome ou email (contém)
    @Query("SELECT u FROM User u WHERE LOWER(u.nome) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(u.email) LIKE LOWER(CONCAT('%', :search, '%'))")
    List<User> findByNomeOrEmailContaining(@Param("search") String search);
    
    // Buscar por nome (contém)
    List<User> findByNomeContainingIgnoreCase(String nome);
    
    // Buscar por data de cadastro
    List<User> findByCreatedAtBetween(LocalDateTime inicio, LocalDateTime fim);
    
    // Buscar usuários por faixa etária
    List<User> findByIdadeBetween(Integer idadeMin, Integer idadeMax);
}