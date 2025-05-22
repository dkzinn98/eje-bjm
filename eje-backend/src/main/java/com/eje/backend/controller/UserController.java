# Implementação de Edição de Usuários - Backend

## 1. Adicione estes métodos no `UserController.java`:

```java
// Buscar usuário por ID
@GetMapping("/{id}")
public ResponseEntity<?> getUserById(@PathVariable Long id) {
    Optional<User> user = userService.findById(id);
    if (user.isPresent()) {
        return ResponseEntity.ok(user.get());
    }
    return ResponseEntity.notFound().build();
}

// Atualizar usuário
@PutMapping("/{id}")
public ResponseEntity<?> updateUser(@PathVariable Long id, @Valid @RequestBody UserDTO userDTO) {
    try {
        User updatedUser = userService.updateUser(id, userDTO);
        return ResponseEntity.ok(updatedUser);
    } catch (RuntimeException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}

// Atualização parcial
@PatchMapping("/{id}")
public ResponseEntity<?> partialUpdateUser(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
    try {
        User updatedUser = userService.partialUpdateUser(id, updates);
        return ResponseEntity.ok(updatedUser);
    } catch (RuntimeException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}
```

## 2. Adicione estes métodos no `UserService.java`:

```java
// Buscar por ID
public Optional<User> findById(Long id) {
    return userRepository.findById(id);
}

// Atualizar usuário completo
@Transactional
public User updateUser(Long id, UserDTO userDTO) {
    User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    
    // Verificar se o email mudou e já existe
    if (!user.getEmail().equals(userDTO.getEmail())) {
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new RuntimeException("Email já cadastrado");
        }
    }
    
    // Atualizar campos
    user.setNome(userDTO.getNome());
    user.setEmail(userDTO.getEmail());
    user.setWhatsapp(userDTO.getWhatsapp());
    user.setInstagram(userDTO.getInstagram());
    user.setIdade(userDTO.getIdade());
    user.setDataNascimento(userDTO.getDataNascimento());
    user.setMotivacao(userDTO.getMotivacao());
    user.setTipo(userDTO.getTipo());
    user.setUpdatedAt(LocalDateTime.now());
    
    return userRepository.save(user);
}

// Atualização parcial
@Transactional
public User partialUpdateUser(Long id, Map<String, Object> updates) {
    User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    
    updates.forEach((key, value) -> {
        switch (key) {
            case "nome":
                user.setNome((String) value);
                break;
            case "email":
                String newEmail = (String) value;
                if (!user.getEmail().equals(newEmail)) {
                    if (userRepository.existsByEmail(newEmail)) {
                        throw new RuntimeException("Email já cadastrado");
                    }
                    user.setEmail(newEmail);
                }
                break;
            case "whatsapp":
                user.setWhatsapp((String) value);
                break;
            case "instagram":
                user.setInstagram((String) value);
                break;
            case "idade":
                user.setIdade(Integer.valueOf(value.toString()));
                break;
            case "motivacao":
                user.setMotivacao((String) value);
                break;
            case "tipo":
                user.setTipo(UserType.valueOf((String) value));
                break;
            // Adicione outros campos conforme necessário
        }
    });
    
    user.setUpdatedAt(LocalDateTime.now());
    return userRepository.save(user);
}
```

## 3. Adicione no `User.java` (se ainda não tiver):

```java
@Column(name = "updated_at")
private LocalDateTime updatedAt;

// Adicione getter e setter
public LocalDateTime getUpdatedAt() {
    return updatedAt;
}

public void setUpdatedAt(LocalDateTime updatedAt) {
    this.updatedAt = updatedAt;
}
```

## 4. Teste os endpoints:

### Buscar usuário por ID:
```bash
GET http://localhost:8080/api/users/1
```

### Atualizar usuário completo:
```bash
PUT http://localhost:8080/api/users/1
Content-Type: application/json

{
    "nome": "João Silva Editado",
    "email": "joao.editado@email.com",
    "whatsapp": "(61) 98765-4321",
    "instagram": "@joaoeditado",
    "idade": 20,
    "dataNascimento": "2004-01-15",
    "motivacao": "Motivação atualizada...",
    "tipo": "COLABORADOR"
}
```

### Atualização parcial:
```bash
PATCH http://localhost:8080/api/users/1
Content-Type: application/json

{
    "nome": "Apenas o nome mudou",
    "instagram": "@novoinsta"
}