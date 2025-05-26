import styled, { keyframes } from 'styled-components';

// Animações
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const neonGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 10px rgba(255, 123, 0, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(255, 123, 0, 0.6);
  }
`;

// eslint-disable-next-line no-unused-vars
const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

// Container principal
export const AdminContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, rgb(15, 23, 42) 0%, rgb(30, 41, 59) 50%, rgb(25, 34, 63) 100%);
  color: white;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

// Header do admin
export const AdminHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 2px solid rgba(177, 88, 28, 0.3);
  animation: ${fadeInUp} 0.6s ease-out;

  h1 {
    background: linear-gradient(45deg,rgb(255, 255, 255),rgb(170, 166, 166));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text; /* Added for compatibility */
    color: transparent; /* Ensures text is transparent */
    font-size: clamp(1.2rem, 4vw, 2rem);
    font-weight: 700;
    margin: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    padding: 15px;
  }
`;

export const LogoutButton = styled.button`
  padding: 10px 20px;
  background: linear-gradient(45deg, #dc2626, #ef4444);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(220, 38, 38, 0.4);
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 13px;
  }
`;

// Estatísticas
export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

export const StatCard = styled.div`
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(15px);
  padding: 25px;
  border-radius: 15px;
  border: 2px solid rgba(177, 88, 28, 0.3);
  text-align: center;
  animation: ${fadeInUp} 0.6s ease-out;
  animation-delay: ${props => props.delay || '0s'};
  animation-fill-mode: both;
  transition: all 0.3s ease;

  h3 {
    color: #ff7b00;
    font-size: clamp(1.5rem, 5vw, 2rem);
    font-weight: 700;
    margin: 0 0 10px 0;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    font-size: clamp(0.8rem, 2vw, 1rem);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 0;
  }

  &:hover {
    animation: ${neonGlow} 2s ease-in-out infinite;
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

// Filtros
export const FiltersContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
  animation: ${fadeInUp} 0.6s ease-out 0.4s both;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const FilterButton = styled.button`
  padding: 12px 20px;
  background: ${props => props.active ? 
    'linear-gradient(45deg, rgb(177, 88, 28), #ff7b00)' : 
    'rgba(30, 41, 59, 0.8)'};
  color: white;
  border: 2px solid ${props => props.active ? '#ff7b00' : 'rgba(177, 88, 28, 0.3)'};
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(15px);
  font-size: 14px;

  &:hover {
    border-color: #ff7b00;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 13px;
  }
`;

export const SearchInput = styled.input`
  padding: 12px 20px;
  background: rgba(30, 41, 59, 0.8);
  border: 2px solid rgba(177, 88, 28, 0.3);
  border-radius: 12px;
  color: white;
  font-size: 14px;
  backdrop-filter: blur(15px);
  flex: 1;
  min-width: 250px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: #ff7b00;
    box-shadow: 0 0 15px rgba(255, 123, 0, 0.3);
  }

  @media (max-width: 768px) {
    min-width: 100%;
    padding: 10px 16px;
    font-size: 13px;
  }
`;

// Grid de cards
export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  animation: ${fadeInUp} 0.6s ease-out 0.6s both;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

// Card individual
export const PersonCard = styled.div`
  background: rgba(30, 41, 59, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 25px;
  border: 2px solid rgba(177, 88, 28, 0.3);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: left 0.6s;
  }

  &:hover {
    transform: translateY(-8px);
    border-color: #ff7b00;
    box-shadow: 0 15px 40px rgba(177, 88, 28, 0.4);
    
    &::before {
      left: 100%;
    }
  }

  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 15px;
    
    &:hover {
      transform: translateY(-4px);
    }
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    gap: 12px;
    margin-bottom: 15px;
  }
`;

export const Avatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(45deg, rgb(177, 88, 28), #ff7b00);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 18px;
  }
`;

export const PersonInfo = styled.div`
  h3 {
    color: white;
    margin: 0 0 8px 0;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .tipo {
    background: ${props => {
      if (props.tipo === 'EJISTA') return 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'; // Verde vibrante
      if (props.tipo === 'COLABORADOR') return 'linear-gradient(135deg, #dc3545 0%, #e74c3c 100%)'; // Vermelho vibrante
      return 'linear-gradient(135deg, #6c757d 0%, #5a6268 100%)'; // Cinza padrão
    }};
    color: white;
    padding: 6px 14px;
    border-radius: 25px;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    display: inline-block;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
    transition: all 0.3s ease;
    border: 2px solid transparent;
  }

  /* Efeito hover na badge do tipo */
  .tipo:hover {
    transform: scale(1.08) translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

export const CardBody = styled.div`
  .info-group {
    margin-bottom: 15px;
    
    label {
      color: #ff7b00;
      font-size: 0.85rem;
      font-weight: 600;
      display: block;
      margin-bottom: 5px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    span {
      color: rgba(255, 255, 255, 0.9);
      font-size: 0.9rem;
      display: block;
      padding: 8px 12px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 8px;
      border-left: 3px solid #ff7b00;
      line-height: 1.4;
      word-break: break-word;
    }
  }

  @media (max-width: 768px) {
    .info-group {
      margin-bottom: 12px;
      
      label {
        font-size: 0.8rem;
      }
      
      span {
        font-size: 0.85rem;
        padding: 6px 10px;
      }
    }
  }
`;

export const CardActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(177, 88, 28, 0.3);

  @media (max-width: 768px) {
    gap: 8px;
    margin-top: 15px;
    padding-top: 15px;
  }
`;

export const ActionButton = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 13px;
  
  &.edit {
    background: linear-gradient(45deg, #0891b2, #06b6d4);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(8, 145, 178, 0.4);
    }
  }
  
  &.delete {
    background: linear-gradient(45deg, #dc2626, #ef4444);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(220, 38, 38, 0.4);
    }
  }

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 12px;
  }
`;

// Modal de Login
export const LoginModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

export const LoginForm = styled.form`
  background: rgba(30, 41, 59, 0.95);
  backdrop-filter: blur(20px);
  padding: 40px;
  border-radius: 20px;
  border: 2px solid rgba(177, 88, 28, 0.5);
  width: 100%;
  max-width: 400px;
  animation: ${fadeInUp} 0.5s ease-out;

  h2 {
    text-align: center;
    margin-bottom: 30px;
    background: linear-gradient(45deg, #ff7b00, #ffaa00);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: clamp(1.5rem, 4vw, 1.8rem);
    font-weight: 700;
  }

  @media (max-width: 480px) {
    padding: 30px 20px;
    border-radius: 15px;
  }
`;

export const LoginInput = styled.input`
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
  background: rgba(15, 23, 42, 0.8);
  border: 2px solid rgba(177, 88, 28, 0.3);
  border-radius: 12px;
  color: white;
  font-size: 16px;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: #ff7b00;
    box-shadow: 0 0 15px rgba(255, 123, 0, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    padding: 12px;
    font-size: 14px;
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 15px;
  background: linear-gradient(45deg, rgb(177, 88, 28), #ff7b00);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(177, 88, 28, 0.4);
    background: linear-gradient(45deg, #ff7b00, #ffaa00);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (max-width: 480px) {
    padding: 12px;
    font-size: 14px;
  }
`;

// Adicione este styled component junto com os outros no stylesAdmin.js

export const RefreshButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
  position: relative;
  overflow: hidden;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #357abd 0%, #2968a3 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(74, 144, 226, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  svg {
    transition: transform 0.3s ease;
  }

  /* Animação de rotação para o ícone quando estiver atualizando */
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* Efeito de ondulação quando clicado */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  &:active:not(:disabled)::before {
    width: 300px;
    height: 300px;
  }

  /* Responsividade */
  @media (max-width: 768px) {
    padding: 10px 14px;
    font-size: 13px;
    gap: 6px;

    svg {
      width: 16px;
      height: 16px;
    }
  }

  @media (max-width: 480px) {
    span {
      display: none; /* Esconder texto em telas muito pequenas */
    }
    padding: 10px 12px;
  }
`;