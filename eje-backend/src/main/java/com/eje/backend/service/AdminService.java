package com.eje.backend.service;

import com.eje.backend.model.Admin;
import com.eje.backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {
    
    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    // Buscar admin por username
    public Optional<Admin> findByUsername(String username) {
        return adminRepository.findByUsername(username);
    }
    
    // Validar login
    public boolean validateLogin(String username, String password) {
        Optional<Admin> admin = adminRepository.findByUsername(username);
        if (admin.isPresent()) {
            return passwordEncoder.matches(password, admin.get().getPassword());
        }
        return false;
    }
    
    // Criar admin (usado apenas para popular dados iniciais)
    public Admin createAdmin(String username, String password) {
        if (adminRepository.existsByUsername(username)) {
            throw new RuntimeException("Username já existe");
        }
        
        Admin admin = new Admin();
        admin.setUsername(username);
        admin.setPassword(passwordEncoder.encode(password));
        
        return adminRepository.save(admin);
    }
    
    // Verificar se existem admins
    public boolean hasAdmins() {
        return adminRepository.count() > 0;
    }
}