package com.eje.backend.model;

public enum TipoUsuario {
    COLABORADOR("Colaborador"),
    EJISTA("EJista");
    
    private final String descricao;
    
    TipoUsuario(String descricao) {
        this.descricao = descricao;
    }
    
    public String getDescricao() {
        return descricao;
    }
    
    @Override
    public String toString() {
        return descricao;
    }
}