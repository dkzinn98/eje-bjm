package com.eje.backend.config;

import com.eje.backend.model.Admin;
import com.eje.backend.model.TipoUsuario;
import com.eje.backend.model.User;
import com.eje.backend.repository.AdminRepository;
import com.eje.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataLoader implements CommandLineRunner {
    
    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        
        // Criar admin padrão se não existir
        if (adminRepository.count() == 0) {
            Admin admin = new Admin();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("eje2025"));
            adminRepository.save(admin);
            
            System.out.println("✅ Admin criado: username=admin, password=eje2025");
        }
        
        // Criar usuários de exemplo se não existirem
        if (userRepository.count() == 0) {
            createSampleUsers();
            System.out.println("✅ Usuários de exemplo criados");
        }
    }
    
    private void createSampleUsers() {
        // Colaboradores
        User joao = new User(
            "João Silva Santos",
            "joao@email.com",
            "(61) 99999-9999",
            "@joaosilva",
            25,
            LocalDate.of(1999, 5, 15),
            TipoUsuario.COLABORADOR,
            "Quero ajudar a organizar um evento incrível para os jovens, contribuindo com minha experiência em logística e eventos corporativos."
        );
        
        User pedro = new User(
            "Pedro Henrique Alves",
            "pedro@email.com",
            "(61) 97777-7777",
            "@pedrohenrique",
            28,
            LocalDate.of(1996, 12, 10),
            TipoUsuario.COLABORADOR,
            "Tenho experiência em música e gostaria de contribuir com os momentos de louvor do evento, trazendo minha paixão pela música cristã."
        );
        
        User gabriela = new User(
            "Gabriela Santos Melo",
            "gabriela@email.com",
            "(61) 94444-4444",
            "@gabrielamelo",
            26,
            LocalDate.of(1998, 7, 12),
            TipoUsuario.COLABORADOR,
            "Sou psicóloga e gostaria de ajudar no acolhimento e suporte emocional dos participantes, oferecendo orientação quando necessário."
        );
        
        // EJistas
        User maria = new User(
            "Maria Oliveira Costa",
            "maria@email.com",
            "(61) 98888-8888",
            "@mariaoliveira",
            22,
            LocalDate.of(2002, 8, 20),
            TipoUsuario.EJISTA,
            "Busco crescimento espiritual e conhecer outros jovens que compartilham da mesma fé, fortalecendo minha caminhada cristã."
        );
        
        User ana = new User(
            "Ana Carolina Ferreira",
            "ana@email.com",
            "(61) 96666-6666",
            "@anacarolina",
            20,
            LocalDate.of(2004, 3, 25),
            TipoUsuario.EJISTA,
            "É minha primeira vez em um EJE e estou muito animada para viver essa experiência única de encontro com Deus e novos amigos."
        );
        
        User lucas = new User(
            "Lucas Rodrigues Lima",
            "lucas@email.com",
            "(61) 95555-5555",
            "@lucasrodrigues",
            24,
            LocalDate.of(2000, 11, 8),
            TipoUsuario.EJISTA,
            "Quero me aproximar mais de Deus e fazer novos amigos na caminhada da fé, compartilhando experiências e crescendo espiritualmente."
        );
        
        User rafael = new User(
            "Rafael Costa Pereira",
            "rafael@email.com",
            "(61) 93333-3333",
            "@rafaelcosta",
            23,
            LocalDate.of(2001, 1, 30),
            TipoUsuario.EJISTA,
            "Quero fortalecer minha fé e compartilhar experiências com outros jovens cristãos, buscando crescimento pessoal e espiritual."
        );
        
        User isabela = new User(
            "Isabela Rodrigues Silva",
            "isabela@email.com",
            "(61) 92222-2222",
            "@isabelarodrigues",
            21,
            LocalDate.of(2003, 4, 18),
            TipoUsuario.EJISTA,
            "Estou em um momento de busca espiritual e acredito que o EJE será transformador na minha vida, me aproximando mais de Jesus."
        );
        
        // Salvar todos
        userRepository.save(joao);
        userRepository.save(pedro);
        userRepository.save(gabriela);
        userRepository.save(maria);
        userRepository.save(ana);
        userRepository.save(lucas);
        userRepository.save(rafael);
        userRepository.save(isabela);
    }
}