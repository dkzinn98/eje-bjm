package com.eje.backend.service;

import com.eje.backend.dto.UserDTO;
import com.eje.backend.model.User;
import com.eje.backend.model.TipoUsuario;
import com.eje.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    private final String uploadDir = "uploads/photos";
    
    // Criar diretório se não existir
    public UserService() {
        try {
            Files.createDirectories(Paths.get(uploadDir));
        } catch (IOException e) {
            throw new RuntimeException("Não foi possível criar diretório de upload", e);
        }
    }
    
    // ========== MÉTODOS CHAMADOS PELO CONTROLLER ==========
    
    // Listar todos os usuários (retorna User para o Controller)
    public List<User> findAll() {
        return userRepository.findAll();
    }
    
    // Criar usuário (retorna User para o Controller)
    public User createUser(UserDTO userDTO) {
        // Validar email único
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new RuntimeException("Email já cadastrado");
        }
        
        // Validar WhatsApp único
        if (userRepository.existsByWhatsapp(userDTO.getWhatsapp())) {
            throw new RuntimeException("WhatsApp já cadastrado");
        }
        
        User user = convertToEntity(userDTO);
        return userRepository.save(user);
    }
    
    // Buscar por ID (retorna User para o Controller)
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
    
    // Atualizar usuário (retorna User para o Controller)
    public User updateUser(Long id, UserDTO userDTO) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isEmpty()) {
            throw new RuntimeException("Usuário não encontrado");
        }
        
        User user = existingUser.get();
        
        // Validar email único (exceto o próprio usuário)
        if (!user.getEmail().equals(userDTO.getEmail()) && 
            userRepository.existsByEmail(userDTO.getEmail())) {
            throw new RuntimeException("Email já cadastrado");
        }
        
        // Validar WhatsApp único (exceto o próprio usuário)
        if (!user.getWhatsapp().equals(userDTO.getWhatsapp()) && 
            userRepository.existsByWhatsapp(userDTO.getWhatsapp())) {
            throw new RuntimeException("WhatsApp já cadastrado");
        }
        
        // Atualizar campos
        user.setNome(userDTO.getNome());
        user.setEmail(userDTO.getEmail());
        user.setWhatsapp(userDTO.getWhatsapp());
        user.setInstagram(userDTO.getInstagram());
        user.setIdade(userDTO.getIdade());
        user.setDataNascimento(userDTO.getDataNascimento());
        user.setTipo(userDTO.getTipo());
        user.setMotivacao(userDTO.getMotivacao());
        
        return userRepository.save(user);
    }
    
    // Atualização parcial (retorna User para o Controller)
    public User partialUpdateUser(Long id, Map<String, Object> updates) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("Usuário não encontrado");
        }
        
        User user = userOpt.get();
        
        // Aplicar updates parciais
        updates.forEach((key, value) -> {
            switch (key) {
                case "nome":
                    user.setNome((String) value);
                    break;
                case "email":
                    // Validar email único
                    if (!user.getEmail().equals(value) && userRepository.existsByEmail((String) value)) {
                        throw new RuntimeException("Email já cadastrado");
                    }
                    user.setEmail((String) value);
                    break;
                case "whatsapp":
                    if (!user.getWhatsapp().equals(value) && userRepository.existsByWhatsapp((String) value)) {
                        throw new RuntimeException("WhatsApp já cadastrado");
                    }
                    user.setWhatsapp((String) value);
                    break;
                case "instagram":
                    user.setInstagram((String) value);
                    break;
                case "idade":
                    // Garantir conversão correta de Integer
                    if (value instanceof Number) {
                        user.setIdade(((Number) value).intValue());
                    } else {
                        user.setIdade(Integer.parseInt(value.toString()));
                    }
                    break;
                case "tipo":
                    // Converter String para TipoUsuario enum
                    if (value instanceof String) {
                        user.setTipo(TipoUsuario.valueOf(((String) value).toUpperCase()));
                    }
                    break;
                case "motivacao":
                    user.setMotivacao((String) value);
                    break;
                case "dataNascimento":
                    // Se precisar atualizar data de nascimento
                    if (value instanceof String) {
                        user.setDataNascimento(java.time.LocalDate.parse((String) value));
                    }
                    break;
            }
        });
        
        return userRepository.save(user);
    }
    
    // Deletar usuário
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("Usuário não encontrado");
        }
        
        // Deletar foto se existir
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent() && user.get().getFotoUrl() != null) {
            deletePhotoFile(user.get().getFotoUrl());
        }
        
        userRepository.deleteById(id);
    }
    
    // Salvar foto do usuário (retorna String para o Controller)
    public String saveUserPhoto(Long userId, MultipartFile file) throws IOException {
        // Verificar se usuário existe
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("Usuário não encontrado");
        }
        
        User user = userOpt.get();
        
        // Deletar foto anterior se existir
        if (user.getFotoUrl() != null) {
            deletePhotoFile(user.getFotoUrl());
        }
        
        // Gerar nome único para arquivo
        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename != null && originalFilename.contains(".") 
            ? originalFilename.substring(originalFilename.lastIndexOf("."))
            : ".jpg";
        
        String fileName = "user_" + userId + "_" + UUID.randomUUID().toString() + extension;
        Path filePath = Paths.get(uploadDir, fileName);
        
        // Salvar arquivo
        Files.copy(file.getInputStream(), filePath);
        
        // Atualizar URL no banco
        String photoUrl = "/api/photos/" + fileName;
        user.setFotoUrl(photoUrl);
        userRepository.save(user);
        
        return photoUrl;
    }
    
    // Buscar foto do usuário (retorna Resource para o Controller)
    public Resource getUserPhoto(Long id) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("Usuário não encontrado");
        }
        
        User user = userOpt.get();
        if (user.getFotoUrl() == null) {
            return null;
        }
        
        try {
            String fileName = user.getFotoUrl().substring(user.getFotoUrl().lastIndexOf("/") + 1);
            Path filePath = Paths.get(uploadDir, fileName);
            return new UrlResource(filePath.toUri());
        } catch (Exception e) {
            throw new RuntimeException("Erro ao carregar foto", e);
        }
    }
    
    // Buscar por tipo (recebe String, retorna List<User>)
    public List<User> findByTipo(String tipo) {
        TipoUsuario tipoEnum = TipoUsuario.valueOf(tipo.toUpperCase());
        return userRepository.findByTipo(tipoEnum);
    }
    
    // Buscar por email (retorna User para o Controller)
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    // Contar todos os usuários
    public long countAll() {
        return userRepository.count();
    }
    
    // Contar por tipo (recebe String)
    public long countByTipo(String tipo) {
        TipoUsuario tipoEnum = TipoUsuario.valueOf(tipo.toUpperCase());
        return userRepository.countByTipo(tipoEnum);
    }
    
    // ========== MÉTODOS ORIGINAIS (mantidos para compatibilidade) ==========
    
    // Buscar por tipo (versão original com enum)
    public List<UserDTO> findByTipo(TipoUsuario tipo) {
        return userRepository.findByTipo(tipo).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    // Buscar por nome ou email
    public List<UserDTO> searchByNomeOrEmail(String search) {
        return userRepository.findByNomeOrEmailContaining(search).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    // Criar usuário (versão original)
    public UserDTO create(UserDTO userDTO) {
        // Validar email único
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new RuntimeException("Email já cadastrado");
        }
        
        // Validar WhatsApp único
        if (userRepository.existsByWhatsapp(userDTO.getWhatsapp())) {
            throw new RuntimeException("WhatsApp já cadastrado");
        }
        
        User user = convertToEntity(userDTO);
        User savedUser = userRepository.save(user);
        return convertToDTO(savedUser);
    }
    
    // Atualizar usuário (versão original)
    public UserDTO update(Long id, UserDTO userDTO) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isEmpty()) {
            throw new RuntimeException("Usuário não encontrado");
        }
        
        User user = existingUser.get();
        
        // Validar email único (exceto o próprio usuário)
        if (!user.getEmail().equals(userDTO.getEmail()) && 
            userRepository.existsByEmail(userDTO.getEmail())) {
            throw new RuntimeException("Email já cadastrado");
        }
        
        // Validar WhatsApp único (exceto o próprio usuário)
        if (!user.getWhatsapp().equals(userDTO.getWhatsapp()) && 
            userRepository.existsByWhatsapp(userDTO.getWhatsapp())) {
            throw new RuntimeException("WhatsApp já cadastrado");
        }
        
        // Atualizar campos
        user.setNome(userDTO.getNome());
        user.setEmail(userDTO.getEmail());
        user.setWhatsapp(userDTO.getWhatsapp());
        user.setInstagram(userDTO.getInstagram());
        user.setIdade(userDTO.getIdade());
        user.setDataNascimento(userDTO.getDataNascimento());
        user.setTipo(userDTO.getTipo());
        user.setMotivacao(userDTO.getMotivacao());
        
        User updatedUser = userRepository.save(user);
        return convertToDTO(updatedUser);
    }
    
    // Deletar usuário (versão original)
    public void delete(Long id) {
        deleteUser(id); // Reusar o método novo
    }
    
    // Upload de foto (versão original)
    public String uploadPhoto(Long userId, MultipartFile file) throws IOException {
        return saveUserPhoto(userId, file); // Reusar o método novo
    }
    
    // Estatísticas
    public UserStatsDTO getStats() {
        long total = userRepository.count();
        long colaboradores = userRepository.countByTipo(TipoUsuario.COLABORADOR);
        long ejistas = userRepository.countByTipo(TipoUsuario.EJISTA);
        
        return new UserStatsDTO(total, colaboradores, ejistas);
    }
    
    // ========== MÉTODOS AUXILIARES ==========
    
    private UserDTO convertToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setNome(user.getNome());
        dto.setEmail(user.getEmail());
        dto.setWhatsapp(user.getWhatsapp());
        dto.setInstagram(user.getInstagram());
        dto.setIdade(user.getIdade());
        dto.setDataNascimento(user.getDataNascimento());
        dto.setTipo(user.getTipo());
        dto.setMotivacao(user.getMotivacao());
        dto.setFotoUrl(user.getFotoUrl());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setUpdatedAt(user.getUpdatedAt());
        return dto;
    }
    
    private User convertToEntity(UserDTO dto) {
        User user = new User();
        user.setNome(dto.getNome());
        user.setEmail(dto.getEmail());
        user.setWhatsapp(dto.getWhatsapp());
        user.setInstagram(dto.getInstagram());
        user.setIdade(dto.getIdade());
        user.setDataNascimento(dto.getDataNascimento());
        user.setTipo(dto.getTipo());
        user.setMotivacao(dto.getMotivacao());
        return user;
    }
    
    private void deletePhotoFile(String photoUrl) {
        try {
            String fileName = photoUrl.substring(photoUrl.lastIndexOf("/") + 1);
            Path filePath = Paths.get(uploadDir, fileName);
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            System.err.println("Erro ao deletar arquivo: " + e.getMessage());
        }
    }
    
    // ========== CLASSE INTERNA ==========
    
    public static class UserStatsDTO {
        private long total;
        private long colaboradores;
        private long ejistas;
        
        public UserStatsDTO(long total, long colaboradores, long ejistas) {
            this.total = total;
            this.colaboradores = colaboradores;
            this.ejistas = ejistas;
        }
        
        // Getters
        public long getTotal() { return total; }
        public long getColaboradores() { return colaboradores; }
        public long getEjistas() { return ejistas; }
    }
}