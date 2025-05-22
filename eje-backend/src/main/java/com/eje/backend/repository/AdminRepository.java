package com.eje.backend.repository;

import com.eje.backend.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    
    // Buscar admin por username
    Optional<Admin> findByUsername(String username);
    
    // Verificar se username já existe
    boolean existsByUsername(String username);
}