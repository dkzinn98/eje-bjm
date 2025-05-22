package com.eje.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 2, max = 100, message = "Nome deve ter entre 2 e 100 caracteres")
    @Column(nullable = false, length = 100)
    private String nome;
    
    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email deve ser válido")
    @Column(nullable = false, unique = true, length = 100)
    private String email;
    
    @NotBlank(message = "WhatsApp é obrigatório")
    @Pattern(regexp = "\\(\\d{2}\\) \\d{4,5}-\\d{4}", message = "WhatsApp deve estar no formato (XX) XXXXX-XXXX")
    @Column(nullable = false, length = 20)
    private String whatsapp;
    
    @NotBlank(message = "Instagram é obrigatório")
    @Pattern(regexp = "^@[a-zA-Z0-9._]+$", message = "Instagram deve começar com @ e conter apenas letras, números, pontos e underlines")
    @Column(nullable = false, length = 50)
    private String instagram;
    
    @NotNull(message = "Idade é obrigatória")
    @Min(value = 16, message = "Idade mínima é 16 anos")
    @Max(value = 35, message = "Idade máxima é 35 anos")
    @Column(nullable = false)
    private Integer idade;
    
    @NotNull(message = "Data de nascimento é obrigatória")
    @Column(name = "data_nascimento", nullable = false)
    private LocalDate dataNascimento;
    
    @NotNull(message = "Tipo é obrigatório")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private TipoUsuario tipo;
    
    @NotBlank(message = "Motivação é obrigatória")
    @Size(min = 50, max = 500, message = "Motivação deve ter entre 50 e 500 caracteres")
    @Column(nullable = false, length = 500)
    private String motivacao;
    
    @Column(name = "foto_url", length = 255)
    private String fotoUrl;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Construtores
    public User() {
        this.createdAt = LocalDateTime.now();
    }
    
    public User(String nome, String email, String whatsapp, String instagram, 
                Integer idade, LocalDate dataNascimento, TipoUsuario tipo, String motivacao) {
        this();
        this.nome = nome;
        this.email = email;
        this.whatsapp = whatsapp;
        this.instagram = instagram;
        this.idade = idade;
        this.dataNascimento = dataNascimento;
        this.tipo = tipo;
        this.motivacao = motivacao;
    }
    
    // Callback JPA
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
    
    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getWhatsapp() { return whatsapp; }
    public void setWhatsapp(String whatsapp) { this.whatsapp = whatsapp; }
    
    public String getInstagram() { return instagram; }
    public void setInstagram(String instagram) { this.instagram = instagram; }
    
    public Integer getIdade() { return idade; }
    public void setIdade(Integer idade) { this.idade = idade; }
    
    public LocalDate getDataNascimento() { return dataNascimento; }
    public void setDataNascimento(LocalDate dataNascimento) { this.dataNascimento = dataNascimento; }
    
    public TipoUsuario getTipo() { return tipo; }
    public void setTipo(TipoUsuario tipo) { this.tipo = tipo; }
    
    public String getMotivacao() { return motivacao; }
    public void setMotivacao(String motivacao) { this.motivacao = motivacao; }
    
    public String getFotoUrl() { return fotoUrl; }
    public void setFotoUrl(String fotoUrl) { this.fotoUrl = fotoUrl; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}