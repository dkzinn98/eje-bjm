// script.js - Lógica da página Home
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

// ========================
// DADOS DA APLICAÇÃO
// ========================
export const APP_DATA = {
  welcomeMessage: {
    title: "Bem-vindos ao EJE 2025!",
    content: `Queridos jovens, sejam todos bem-vindos a este momento especial de 
    fé, união e partilha! O Encontro de Jovens Escolares (EJE) é mais do 
    que um simples evento — é um convite para que cada coração aqui presente 
    se conecte com o amor infinito de Deus e com a força transformadora do 
    Espírito Santo.`,
    
    mission: `Aqui, somos chamados a viver intensamente a verdadeira alegria 
    cristã, construir amizades que nos aproximam do bem e renovar nosso 
    compromisso com a esperança. Que este encontro seja um marco em nossas 
    vidas, um espaço onde possamos experimentar o abraço acolhedor do Pai e 
    redescobrir a beleza de sermos jovens cheios de fé, coragem e sonhos.`,
    
    blessing: `Que o Bom Jesus dos Migrantes abençoe cada passo nosso durante 
    este encontro e nos fortaleça para sermos luz no mundo!`
  },

  navigationOptions: [
    {
      id: 'colaborador',
      path: '/Colaborador',
      text: 'Trabalhar no Encontro',
      variant: 'primary',
      icon: '🤝'
    },
    {
      id: 'ejista', 
      path: '/Ejista',
      text: 'Participar do Encontro',
      variant: 'secondary',
      icon: '✨'
    }
  ]
};

// ========================
// HOOK CUSTOMIZADO PARA NAVEGAÇÃO
// ========================
export const useHomeNavigation = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Função otimizada de navegação
  const handleNavigation = useCallback(async (path) => {
    if (!path || isLoading) return;

    try {
      setIsLoading(true);
      
      // Adiciona delay para UX suave
      setTimeout(() => {
        navigate(path);
        setIsLoading(false);
      }, 300);

      // Log para debug
      console.log(`🔄 Navegando para: ${path}`);
      
    } catch (error) {
      console.error('❌ Erro na navegação:', error);
      setIsLoading(false);
    }
  }, [navigate, isLoading]);

  return { handleNavigation };
};

// ========================
// HOOK PARA ANIMAÇÕES
// ========================
export const useHomeAnimations = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animações após montagem
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return { isVisible };
};

// ========================
// HOOK PARA GERENCIAMENTO DE ESTADOS
// ========================
export const useHomeState = () => {
  const [loadingStates, setLoadingStates] = useState({});

  const setButtonLoading = useCallback((buttonId, loading) => {
    setLoadingStates(prev => ({
      ...prev,
      [buttonId]: loading
    }));
  }, []);

  return {
    loadingStates,
    setButtonLoading
  };
};

// ========================
// HOOK PARA EVENTOS DE TECLADO
// ========================
export const useKeyboardNavigation = (onNavigate) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Enter ou Espaço em botões focados
      if ((event.key === 'Enter' || event.key === ' ') && 
          event.target.classList.contains('nav-button')) {
        event.preventDefault();
        const path = event.target.dataset.path;
        if (path) onNavigate(path);
      }

      // Atalhos de teclado
      if (event.ctrlKey || event.metaKey) {
        switch(event.key) {
          case '1':
            event.preventDefault();
            onNavigate('/Colaborador');
            break;
          case '2':
            event.preventDefault();
            onNavigate('/Ejista');
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [onNavigate]);
};

// ========================
// HOOK PRINCIPAL DA HOME
// ========================
export const useHome = () => {
  const { handleNavigation } = useHomeNavigation();
  const { isVisible } = useHomeAnimations();
  const { loadingStates, setButtonLoading } = useHomeState();

  // Combina navegação com estados de loading
  const navigateWithLoading = useCallback(async (path, buttonId) => {
    setButtonLoading(buttonId, true);
    await handleNavigation(path);
    setButtonLoading(buttonId, false);
  }, [handleNavigation, setButtonLoading]);

  // Configuração de eventos de teclado
  useKeyboardNavigation(handleNavigation);

  // Log de inicialização
  useEffect(() => {
    console.log('🚀 EJE 2025 - Home inicializada');
  }, []);

  return {
    // Estados
    isVisible,
    loadingStates,
    
    // Funções
    handleNavigation,
    navigateWithLoading,
    
    // Dados
    welcomeMessage: APP_DATA.welcomeMessage,
    navigationOptions: APP_DATA.navigationOptions
  };
};

// ========================
// UTILITÁRIOS
// ========================
export const HomeUtils = {
  // Debounce para otimizar eventos
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle para scroll events
  throttle: (func, limit) => {
    let inThrottle;
    return function() {
      // biome-ignore lint/style/noArguments: <explanation>
      const args = arguments;
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Formatação de textos
  formatText: (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    // biome-ignore lint/style/useTemplate: <explanation>
    return text.substring(0, maxLength) + '...';
  },

  // Validação de rotas
  isValidRoute: (path) => {
    const validRoutes = ['/Colaborador', '/Ejista', '/'];
    return validRoutes.includes(path);
  },

  // Log estruturado
  log: (message, type = 'info') => {
    const emoji = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌'
    };
    
    console.log(`${emoji[type]} [EJE Home] ${message}`);
  }
};

// ========================
// EXPORTAÇÕES DEFAULT
// ========================
export default {
  useHome,
  useHomeNavigation,
  useHomeAnimations,
  useHomeState,
  useKeyboardNavigation,
  HomeUtils,
  APP_DATA
};