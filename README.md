# 🔥 EJE 2025 - Sistema de Gestão de Inscrições

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Spring_Boot-3.4.6-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white" />
  <img src="https://img.shields.io/badge/Java-17-007396?style=for-the-badge&logo=java&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-15-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
</div>

## 📋 Sobre o Projeto

Sistema completo de gestão de inscrições para o Encontro de Jovens das Escolas (EJE) 2025. A aplicação permite o cadastro de participantes (Ejistas) e colaboradores, com painel administrativo para gerenciamento completo dos dados.

### ✨ Funcionalidades Principais

- **📝 Cadastro de Participantes**: Formulário completo para inscrição de Ejistas
- **👥 Cadastro de Colaboradores**: Sistema de candidatura para voluntários
- **🔐 Painel Administrativo**: Dashboard completo com autenticação
- **✏️ Edição de Dados**: Modal elegante para atualização de informações
- **📸 Upload de Fotos**: Sistema de upload e visualização de imagens
- **🔍 Busca e Filtros**: Pesquisa por nome, email e tipo de usuário
- **📊 Estatísticas**: Visualização de métricas em tempo real
- **🗑️ Exclusão Segura**: Confirmação antes de deletar registros

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18.2.0** - Biblioteca JavaScript para interfaces
- **Styled Components** - Estilização CSS-in-JS
- **React Router DOM** - Navegação entre páginas
- **Axios** - Cliente HTTP para API
- **Vite** - Build tool e dev server

### Backend
- **Spring Boot 3.4.6** - Framework Java
- **Spring Data JPA** - Persistência de dados
- **Spring Security** - Autenticação e autorização
- **H2 Database** - Banco de dados em desenvolvimento
- **PostgreSQL** - Banco de dados em produção
- **Maven** - Gerenciador de dependências

## 📁 Estrutura do Projeto

```
eje-project/
├── eje-frontend/               # Aplicação React
│   ├── src/
│   │   ├── assets/            # Imagens e recursos
│   │   ├── components/        # Componentes reutilizáveis
│   │   ├── pages/            # Páginas da aplicação
│   │   │   ├── Admin/        # Dashboard administrativo
│   │   │   ├── Colaborador/  # Tela de cadastro de colaboradores
│   │   │   ├── Ejista/       # Tela de cadastro de ejistas
│   │   │   └── Home/         # Página inicial
│   │   ├── services/         # Serviços e API
│   │   └── styles/           # Estilos globais
│   └── package.json
│
└── eje-backend/               # API Spring Boot
    ├── src/main/java/com/eje/backend/
    │   ├── controller/       # Controladores REST
    │   ├── model/           # Entidades JPA
    │   ├── dto/             # Data Transfer Objects
    │   ├── repository/      # Repositórios JPA
    │   ├── service/         # Lógica de negócio
    │   └── config/          # Configurações
    └── pom.xml
```

## 🛠️ Instalação e Configuração

### Pré-requisitos

- **Node.js** 16+ e npm/yarn
- **Java** 17+
- **Maven** 3.6+
- **Git**

### 1️⃣ Clone o Repositório

```bash
git clone https://github.com/dkzinn98/eje-bjm.git
cd eje-2025
```

### 2️⃣ Configurar o Backend

```bash
cd eje-backend

# Instalar dependências
./mvnw clean install

# Executar aplicação
./mvnw spring-boot:run
```

O backend estará disponível em `http://localhost:8080`

### 3️⃣ Configurar o Frontend

```bash
cd eje-frontend

# Instalar dependências
npm install

# Executar aplicação
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

## 🔧 Configuração do Banco de Dados

### Desenvolvimento (H2)
O projeto usa H2 por padrão. Acesse o console em:
```
http://localhost:8080/h2-console
```

### Produção (PostgreSQL)
Configure as variáveis de ambiente:

```properties
# application-prod.properties
spring.datasource.url=${DATABASE_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
spring.jpa.hibernate.ddl-auto=update
```

## 📱 Endpoints da API

### Usuários
- `GET /api/users` - Listar todos usuários
- `GET /api/users/{id}` - Buscar usuário por ID
- `POST /api/users` - Criar novo usuário
- `PUT /api/users/{id}` - Atualizar usuário
- `DELETE /api/users/{id}` - Deletar usuário
- `POST /api/users/{id}/photo` - Upload de foto
- `GET /api/users/{id}/photo` - Buscar foto

### Autenticação
- `POST /api/auth/login` - Login admin
- `POST /api/auth/validate` - Validar token

## 🎨 Screenshots

### Página Inicial
<img src="docs/images/home.png" alt="Página Inicial" width="600"/>

### Formulário de Inscrição
<img src="docs/images/form.png" alt="Formulário" width="600"/>

### Dashboard Administrativo
<img src="docs/images/admin.png" alt="Admin Dashboard" width="600"/>

### Modal de Edição
<img src="docs/images/edit-modal.png" alt="Modal de Edição" width="600"/>

## 🔐 Credenciais de Acesso

### Painel Administrativo
```
Usuário: admin
Senha: eje2025
```

## 🚀 Deploy

### Frontend (Vercel)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/seu-usuario/eje-2025)

### Backend (Railway)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/seu-usuario/eje-2025)

## 📝 Variáveis de Ambiente

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8080/api
```

### Backend (.env)
```env
DATABASE_URL=jdbc:postgresql://localhost:5432/ejedb
DB_USERNAME=postgres
DB_PASSWORD=postgres
UPLOAD_PATH=uploads
```

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Equipe

- **Desenvolvimento**: [Seu Nome]
- **Design**: [Nome do Designer]
- **Coordenação**: Equipe EJE 2025

## 📞 Contato

- **Email**: contato@eje2025.com.br
- **Instagram**: [@eje2025](https://instagram.com/eje2025)
- **WhatsApp**: (61) 9999-9999

---

<div align="center">
  <p>Feito com ❤️ para o EJE 2025</p>
  <p>🔥 Incendiando corações para Cristo 🔥</p>
</div>
