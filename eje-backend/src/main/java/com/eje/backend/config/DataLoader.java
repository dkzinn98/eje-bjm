package com.eje.backend.config;

import com.eje.backend.model.Admin;
import com.eje.backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {
    
    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        
        // Criar admin padrão se não existir
        if (adminRepository.count() == 0) {
            Admin admin = new Admin();
            admin.setUsername("ejeadmin");
            admin.setPassword(passwordEncoder.encode("@eje2025#bjm"));
            adminRepository.save(admin);
            
            System.out.println("✅ Admin criado: username=ejeadmin, password=@eje2025#bjm");
        } else {
            System.out.println("ℹ️ Admin já existe no banco de dados");
        }
        
        System.out.println("🚀 Sistema EJE Backend iniciado com sucesso!");
    }
}