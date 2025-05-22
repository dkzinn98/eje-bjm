// Configuração base da API
const API_BASE_URL = 'http://localhost:8080/api';

// Função helper para requisições
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

// ========================================
// AUTH SERVICES
// ========================================
export const authService = {
  login: async (username, password) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },

  validateToken: async (token) => {
    return apiRequest('/auth/validate', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  },
};

// ========================================
// USER SERVICES
// ========================================
export const userService = {
  // Listar todos os usuários
  getAll: async () => {
    return apiRequest('/users');
  },

  // Buscar usuário por ID
  getById: async (id) => {
    return apiRequest(`/users/${id}`);
  },

  // Buscar por tipo
  getByTipo: async (tipo) => {
    return apiRequest(`/users/tipo/${tipo}`);
  },

  // Buscar (search)
  search: async (query) => {
    return apiRequest(`/users/search?q=${encodeURIComponent(query)}`);
  },

  // Criar usuário
  create: async (userData) => {
    return apiRequest('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Atualizar usuário
  update: async (id, userData) => {
    return apiRequest(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  // Deletar usuário
  delete: async (id) => {
    return apiRequest(`/users/${id}`, {
      method: 'DELETE',
    });
  },

  // Upload de foto
  uploadPhoto: async (userId, file) => {
    const formData = new FormData();
    formData.append('file', file);

    return apiRequest(`/users/${userId}/photo`, {
      method: 'POST',
      headers: {}, // Remove Content-Type para FormData
      body: formData,
    });
  },

  // Estatísticas
  getStats: async () => {
    return apiRequest('/users/stats');
  },
};

// ========================================
// PHOTO SERVICE
// ========================================
export const photoService = {
  getPhotoUrl: (filename) => {
    return `${API_BASE_URL}/photos/${filename}`;
  },
};

// ========================================
// ERROR HANDLER
// ========================================
export const handleApiError = (error) => {
  if (error.message.includes('Failed to fetch')) {
    return 'Erro de conexão. Verifique se o backend está rodando.';
  }
  
  if (error.message.includes('HTTP 404')) {
    return 'Recurso não encontrado.';
  }
  
  if (error.message.includes('HTTP 500')) {
    return 'Erro interno do servidor.';
  }
  
  return error.message || 'Erro desconhecido.';
};

export default {
  authService,
  userService,
  photoService,
  handleApiError,
};