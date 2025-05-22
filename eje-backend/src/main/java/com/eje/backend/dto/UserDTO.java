package com.eje.backend.dto;

import com.eje.backend.model.TipoUsuario;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class UserDTO {
    
    private Long id;
    
    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 2, max = 100, message = "Nome deve ter entre 2 e 100 caracteres")
    private String nome;
    
    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email deve ser válido")
    private String email;
    
    @NotBlank(message = "WhatsApp é obrigatório")
    @Pattern(regexp = "\\(\\d{2}\\) \\d{4,5}-\\d{4}", message = "WhatsApp deve estar no formato (XX) XXXXX-XXXX")
    private String whatsapp;
    
    @NotBlank(message = "Instagram é obrigatório")
    @Pattern(regexp = "^@[a-zA-Z0-9._]+$", message = "Instagram deve começar com @ e conter apenas letras, números, pontos e underlines")
    private String instagram;
    
    @NotNull(message = "Idade é obrigatória")
    @Min(value = 16, message = "Idade mínima é 16 anos")
    @Max(value = 35, message = "Idade máxima é 35 anos")
    private Integer idade;
    
    @NotNull(message = "Data de nascimento é obrigatória")
    private LocalDate dataNascimento;
    
    @NotNull(message = "Tipo é obrigatório")
    private TipoUsuario tipo;
    
    @NotBlank(message = "Motivação é obrigatória")
    @Size(min = 50, max = 500, message = "Motivação deve ter entre 50 e 500 caracteres")
    private String motivacao;
    
    private String fotoUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Construtores
    public UserDTO() {}
    
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