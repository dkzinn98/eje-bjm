/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { LoginModal, LoginForm, LoginInput, LoginButton } from './stylesAdmin';
import { authService, handleApiError } from '../../services/api';

// eslint-disable-next-line react/prop-types
const AdminLogin = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    try {
      const response = await authService.login(loginData.username, loginData.password);
      
      // Login bem-sucedido
      console.log('Login successful:', response);
      
      // Salvar token no localStorage (opcional)
      if (response.token) {
        localStorage.setItem('eje_admin_token', response.token);
      }
      
      onLogin(true);
    } catch (error) {
      setLoginError(handleApiError(error));
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setLoginData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpa erro quando usuário começa a digitar
    if (loginError) {
      setLoginError('');
    }
  };

  return (
    <LoginModal>
      <LoginForm onSubmit={handleSubmit}>
        <h2>Painel Admin EJE 2025</h2>
        
        {loginError && (
          <div style={{ 
            color: '#ef4444', 
            textAlign: 'center', 
            marginBottom: '20px',
            padding: '12px',
            background: 'rgba(239, 68, 68, 0.1)',
            borderRadius: '8px',
            border: '1px solid rgba(239, 68, 68, 0.3)'
          }}>
            ⚠️ {loginError}
          </div>
        )}
        
        <LoginInput
          type="text"
          placeholder="Usuário"
          value={loginData.username}
          onChange={(e) => handleInputChange('username', e.target.value)}
          disabled={isLoading}
          required
        />
        
        <LoginInput
          type="password"
          placeholder="Senha"
          value={loginData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          disabled={isLoading}
          required
        />
        
        <LoginButton type="submit" disabled={isLoading}>
          {isLoading ? '🔄 Conectando...' : '🚀 Entrar'}
        </LoginButton>
        
        <div style={{ 
          textAlign: 'center', 
          marginTop: '20px', 
          fontSize: '0.85rem',
          color: 'rgba(255, 255, 255, 0.6)',
          padding: '10px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '6px'
        }}>

        </div>
      </LoginForm>
    </LoginModal>
  );
};

export default AdminLogin;