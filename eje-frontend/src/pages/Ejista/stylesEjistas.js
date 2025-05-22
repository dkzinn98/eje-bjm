import styled, { createGlobalStyle, keyframes } from "styled-components";

// Animações aprimoradas
const neonPulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(255, 123, 0, 0.4);
  }
  50% {
    box-shadow: 0 0 40px rgba(255, 123, 0, 0.8);
  }
`;

const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const slideInFromBottom = keyframes`
  from {
    opacity: 0;
    transform: translateY(100px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const glowBorder = keyframes`
  0% {
    border-color: rgb(177, 88, 28);
    box-shadow: 0 0 10px rgba(177, 88, 28, 0.3);
  }
  50% {
    border-color: #ff7b00;
    box-shadow: 0 0 25px rgba(255, 123, 0, 0.6);
  }
  100% {
    border-color: rgb(177, 88, 28);
    box-shadow: 0 0 10px rgba(177, 88, 28, 0.3);
  }
`;

const shimmerEffect = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const starFloat = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 1;
  }
`;

const starTwinkle = keyframes`
  0%, 100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
`;

// Estilos globais renovados
export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: 
      radial-gradient(ellipse at top, rgba(177, 88, 28, 0.1) 0%, transparent 50%),
      radial-gradient(ellipse at bottom, rgba(255, 123, 0, 0.05) 0%, transparent 50%),
      linear-gradient(135deg, rgb(15, 23, 42) 0%, rgb(30, 41, 59) 50%, rgb(25, 34, 63) 100%);
    min-height: 100vh;
    color: white;
    line-height: 1.6;
    overflow-x: hidden;
  }

  #root {
    min-height: 100vh;
    position: relative;
  }

  /* Scrollbar personalizada mais elegante */
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, rgb(177, 88, 28), #ff7b00);
    border-radius: 10px;
    border: 2px solid rgba(0, 0, 0, 0.2);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(45deg, #ff7b00, #ffaa00);
  }
`;

// Container principal redesenhado
export const Container = styled.div`
  height: 70%;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;

  display: flex;
  flex-direction: column ;

  gap: 1.5rem; 
  max-width: 1100px; 
  width: 100%;
  z-index: 1;
  margin-left: auto; 
  margin-right: auto; 


  @media (min-width: 1600px) {
    max-width: 1200px; 
    gap: 3rem; 
  }

  @media (max-width: 1200px) {
    flex-direction: column;
    gap: 2rem; 
    text-align: center;
    max-width: 95%; /* alterei aqui = Ajusta a largura máxima quando em coluna para melhor aproveitamento */
  }

  @media (max-width: 768px) {
    padding: 15px;
    gap: 1.5rem; 
  }
`;

// Seção da imagem redesenhada
export const ImageEje = styled.div`
  position: relative;
  display: inline-block;
  animation: ${floatAnimation} 6s ease-in-out infinite;
  flex-shrink: 1; 
  
  &::before,
  &::after {
    content: '✨';
    position: absolute;
    font-size: 20px;
    animation: ${starFloat} 4s ease-in-out infinite;
    color: #ffaa00; 
  }

  &::before {
    top: 10%;
    left: -30px;
    animation-delay: 0s;
  }

  &::after {
    bottom: 15%;
    right: -30px;
    animation-delay: 2s;
  }

  & > *::before,
  & > *::after {
    content: '✨';
    position: absolute;
    font-size: 16px;
    animation: ${starTwinkle} 3s ease-in-out infinite;
    z-index: -1;
  }

  & > *::before {
    top: -20px;
    right: 20%;
    animation-delay: 1s;
  }

  & > *::after {
    bottom: -10px;
    left: 10%;
    animation-delay: 3s;
  }

  img {
    display: block;
    max-width: 400px; 
    height: auto;
    object-fit: contain;
    margin-bottom: 0; 
    margin-right: 0;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1;
    position: relative;
  }

  @media (max-width: 1200px) {
    img {
      max-width: 350px; 
    }
  }

  @media (max-width: 768px) {
    img {
      max-width: 280px; 
    }
    
    &::before,
    &::after {
      font-size: 16px;
    }
    
    &::before {
      left: -20px;
    }
    
    &::after {
      right: -20px;
    }
  }
`;

// Formulário completamente redesenhado
export const Form = styled.form`
  backdrop-filter: blur(20px);
  border-radius: 30px;
  padding: 2.5rem; 
  border: 2px solid transparent;
  background-clip: padding-box;
  position: relative;
  animation: ${slideInFromBottom} 1s ease-out;
  height: auto;
  width: 100%; /* alterei aqui = Para ocupar o espaço disponível dado pelo flex-grow ou max-width do container pai quando em coluna */
  max-width: 660px; /* alterei aqui = Aumentei a largura máxima do formulário para acomodar 3 colunas de inputs (de 550px para 660px) */
  flex-grow: 1; 


  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background-size: 400% 400%; 
    border-radius: 32px;
    z-index: -1;
    animation: ${glowBorder} 4s ease-in-out infinite, ${shimmerEffect} 2s ease-in-out infinite; 
  }

  display: flex;
  flex-direction: column;
  align-items: center; 

  @media (max-width: 768px) {
    padding: 1.5rem; 
    border-radius: 25px;
    max-width: 100%; /* alterei aqui = Permite que o formulário ocupe a largura total disponível em telas menores */
    
    &::before {
      border-radius: 27px;
    }
  }

  @media (max-width: 480px) {
    padding: 1rem; 
    border-radius: 20px;
    
    &::before {
      border-radius: 22px;
    }
  }
`;

// Título com efeito holográfico
export const Title = styled.h2`
  font-size: clamp(22px, 3.5vw, 32px); 
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem; 
  position: relative;
  
  background: linear-gradient(
    45deg,
    #ff7b00 0%,
    #ffaa00 25%,
    #ff7b00 50%,
    #ffcc00 75%,
    #ff7b00 100%
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmerEffect} 3s ease-in-out infinite;
`;

// Containers com animações escalonadas
export const NameContainer = styled.div`
  width: 100%; 
  margin-bottom: 1.2rem; 
  animation: ${slideInFromBottom} 0.8s ease-out 0.2s both;
`;

export const DadosContainer = styled.div`
  width: 100%; 
  margin-bottom: 0.5rem; 
  animation: ${slideInFromBottom} 0.8s ease-out 0.4s both;
  display: grid; 
  grid-template-columns: repeat(3, 1fr); /* alterei aqui = Definido para 3 colunas por padrão */
  gap: 15px; 

  @media (max-width: 992px) { /* alterei aqui = Adicionada media query para telas médias/tablets */
    grid-template-columns: repeat(2, 1fr); /* alterei aqui = Volta para 2 colunas */
  }

  @media (max-width: 600px) { /* Mantida media query para telas pequenas */
    grid-template-columns: 1fr; /* alterei aqui = 1 coluna em telas muito pequenas */
  }
`;

export const TextoContainer = styled.div`
  width: 100%; 
  margin-top: 1.5rem; 
  margin-bottom: 1.2rem; 
  animation: ${slideInFromBottom} 0.8s ease-out 0.8s both;

  textarea {
    width: 100%;
    min-height: 100px; 
    padding: 12px; 
    border-radius: 12px; 
    border: 2px solid rgba(177, 88, 28, 0.5);
    background: rgba(30, 41, 59, 0.7);
    color: white;
    font-family: inherit;
    font-size: 14px;
    resize: vertical;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(10px);

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }

    &:focus {
      outline: none;
      border-color: #ff7b00;
      background: rgba(30, 41, 59, 0.9);
      box-shadow: 
        0 0 25px rgba(255, 123, 0, 0.3),
        inset 0 0 20px rgba(255, 123, 0, 0.1);
      transform: translateY(-2px);
    }

    &.error {
      border-color: #ef4444;
      box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
    }
  }
`;

// Inputs redesenhados
export const InputFull = styled.div`
  position: relative;
  margin-bottom: 15px; 
  width: 100%; 
`;

export const Input = styled.input`
  width: 100%;
  height: auto;
  padding: 12px 18px; 
  border-radius: 12px; 
  border: 2px solid rgba(177, 88, 28, 0.5);
  background: rgba(30, 41, 59, 0.7);
  color: white;
  font-family: inherit;
  font-size: 14px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  position: relative;
  margin-top: 5px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: #ff7b00;
    background: rgba(30, 41, 59, 0.9);
    box-shadow: 
      0 0 25px rgba(255, 123, 0, 0.3),
      inset 0 0 20px rgba(255, 123, 0, 0.1);
    transform: translateY(-2px);
  }

  &:hover {
    border-color: rgba(255, 123, 0, 0.7);
  }

  &[type="file"] {
    padding: 10px 12px; 
    cursor: pointer;
    
    &::-webkit-file-upload-button {
      background: linear-gradient(45deg, rgb(177, 88, 28), #ff7b00);
      color: white;
      border: none;
      padding: 7px 14px; 
      border-radius: 8px;
      cursor: pointer;
      margin-right: 10px; 
      font-size: 12px;
      font-weight: 500;
      transition: all 0.3s ease;

      &:hover {
        background: linear-gradient(45deg, #ff7b00, #ffaa00);
        transform: translateY(-1px);
      }
    }
  }

  &.error {
    border-color: #ef4444;
    box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
  }
`;

export const InputLabel = styled.label`
  color: rgba(255, 255, 255, 0.9);
  font-size: 15px; 
  font-weight: 600;
  margin-bottom: 8px; 
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  
  padding-left: 12px; 

  &::before {
    content: '';
    position: absolute;
    left: 0; 
    top: 50%;
    transform: translateY(-50%);
    width: 3px; 
    height: 100%;
    background: linear-gradient(45deg, rgb(177, 88, 28), #ff7b00); 
    border-radius: 2px;
  }
`;

export const TextoFoto = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 15px; 
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  display: flex; 
  align-items: center;
  justify-content: center;

  &::after {
    content: '📸';
    margin-left: 8px; 
    font-size: 18px; 
  }
`;

// Botão principal redesenhado
export const Button = styled.button`
  width: 100%;
  max-width: 280px; 
  height: 55px; 
  display: block;
  align-items: center;
  justify-content: center;
  border-radius: 18px; 
  border: none;
  background: linear-gradient(
    45deg,
    rgb(177, 88, 28) 0%,
    #ff7b00 50%,
    rgb(177, 88, 28) 100%
  );
  background-size: 200% 200%;
  color: white;
  font-size: 15px; 
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px; 
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${slideInFromBottom} 0.8s ease-out 1s both;
  
  box-shadow: 
    0 8px 25px rgba(177, 88, 28, 0.4), 
    0 0 18px rgba(255, 123, 0, 0.2); 

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
      rgba(255, 255, 255, 0.4),
      transparent
    );
    transition: left 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    transform: translateY(-4px) scale(1.02); 
    box-shadow: 
      0 15px 35px rgba(177, 88, 28, 0.5), 
      0 0 35px rgba(255, 123, 0, 0.3); 
    background-position: 100% 0;
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-2px) scale(0.98);
  }

  &:disabled {
    background: rgba(177, 88, 28, 0.3);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;

    &::before {
      display: none;
    }
  }

  &.loading {
    background: linear-gradient(
      45deg,
      rgb(177, 88, 28),
      #ff7b00,
      #ffaa00,
      #ff7b00,
      rgb(177, 88, 28)
    );
    background-size: 400% 400%;
    animation: ${shimmerEffect} 2s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    max-width: 230px; 
    height: 50px; 
    font-size: 14px; 
  }
`;

// Checkbox com design futurista
export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px; 
  margin: 20px 0; 
  animation: ${slideInFromBottom} 0.8s ease-out 0.9s both;
`;

export const NeonCheckbox = styled.label`
  --primary: #ff7b00;
  --primary-dark: #cc5500;
  --primary-light: rgba(255, 123, 0, 0.3);
  --size: 22px; 

  position: relative;
  width: var(--size);
  height: var(--size);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  input {
    display: none;
  }

  .neon-checkbox__frame {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .neon-checkbox__box {
    position: absolute;
    inset: 0;
    background: rgba(30, 41, 59, 0.8);
    border-radius: 7px; 
    border: 2px solid var(--primary-dark); 
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 
      0 0 12px var(--primary-light), 
      inset 0 0 8px rgba(0, 0, 0, 0.3); 
    backdrop-filter: blur(10px);
  }

  .neon-checkbox__check-container {
    position: absolute;
    inset: 2px; 
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .neon-checkbox__check {
    width: 70%;
    height: 70%;
    fill: none;
    stroke: var(--primary);
    stroke-width: 3; 
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 50;
    stroke-dashoffset: 50;
    transform-origin: center;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    filter: drop-shadow(0 0 5px var(--primary));
  }

  &:hover .neon-checkbox__box {
    border-color: var(--primary);
    transform: scale(1.1);
    box-shadow: 
      0 0 20px var(--primary-light), 
      inset 0 0 12px rgba(0, 0, 0, 0.4); 
  }

  input:checked ~ .neon-checkbox__frame .neon-checkbox__box {
    border-color: var(--primary);
    background: rgba(255, 123, 0, 0.2);
    box-shadow: 
      0 0 25px var(--primary), 
      inset 0 0 18px rgba(255, 123, 0, 0.1); 
    animation: ${neonPulse} 2s ease-in-out infinite;
  }

  input:checked ~ .neon-checkbox__frame .neon-checkbox__check {
    stroke-dashoffset: 0;
    transform: scale(1.2);
    filter: drop-shadow(0 0 10px var(--primary));
  }
`;

export const CheckboxLabel = styled.span`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem; 
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.3px;
`;

// Mensagem de sucesso estilizada (movida para cá para consistência)
export const SuccessMessage = styled.div`
  background: linear-gradient(45deg, #059669, #10b981); 
  color: white;
  padding: 12px; 
  border-radius: 8px; 
  text-align: center;
  margin-bottom: 15px; 
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px; 
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.5); 
  animation: ${slideInFromBottom} 0.5s ease-out; 

  &::before {
    content: '🎉'; 
    font-size: 1.1em; 
  }
`;

// Componentes auxiliares aprimorados
export const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 12px; 
  margin-top: 6px; 
  display: flex;
  align-items: center;
  gap: 6px; 
  padding: 7px 10px; 
  background: rgba(239, 68, 68, 0.1);
  border-radius: 6px; 
  border-left: 3px solid #ef4444; 

  &::before {
    content: '⚠️';
    font-size: 13px; 
    filter: drop-shadow(0 0 5px rgba(239, 68, 68, 0.5));
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 5px; 
  background: rgba(30, 41, 59, 0.8);
  border-radius: 8px; 
  margin: 12px 0; 
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(177, 88, 28, 0.3);

  &::after {
    content: '';
    display: block;
    height: 100%;
    background: linear-gradient(
      45deg,
      rgb(177, 88, 28),
      #ff7b00,
      #ffaa00
    );
    width: ${(props) => props.progress || 0}%;
    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 8px; 
    box-shadow: 0 0 8px rgba(255, 123, 0, 0.5); 
    position: relative;
    
    background-size: 200% 100%;
    animation: ${shimmerEffect} 2s ease-in-out infinite;
  }
`;

export const ImagePreview = styled.div`
  width: 100px; 
  height: 100px; 
  border-radius: 18px; 
  overflow: hidden;
  margin: 12px auto; 
  border: 2px solid rgb(177, 88, 28); 
  position: relative;
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 
    0 8px 20px rgba(177, 88, 28, 0.3), 
    inset 0 0 15px rgba(0, 0, 0, 0.2); 

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.1);
    }
  }

  &::after {
    content: '📷';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 28px; 
    color: rgba(255, 255, 255, 0.4);
    filter: drop-shadow(0 0 8px rgba(255, 123, 0, 0.3)); 
  }

  &:hover {
    border-color: #ff7b00;
    box-shadow: 
      0 12px 30px rgba(255, 123, 0, 0.4), 
      inset 0 0 20px rgba(0, 0, 0, 0.3); 
  }
`;

// Manter componente legado para compatibilidade
export const TextoDataDeNascimento = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  font-weight: 500;
`;

// Botão de voltar para home
export const BackButton = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  background: rgba(30, 41, 59, 0.9);
  border: 2px solid rgba(177, 88, 28, 0.5);
  color: white;
  padding: 10px 20px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  z-index: 1000;

  &::before {
    content: '←';
    font-size: 18px;
    transition: transform 0.3s ease;
  }

  &:hover {
    background: rgba(177, 88, 28, 0.9);
    border-color: #ff7b00;
    transform: translateX(-5px);
    box-shadow: 
      0 0 20px rgba(255, 123, 0, 0.3),
      0 5px 15px rgba(0, 0, 0, 0.2);

    &::before {
      transform: translateX(-3px);
    }
  }

  &:active {
    transform: translateX(-3px) scale(0.98);
  }

  @media (max-width: 768px) {
    top: 10px;
    left: 10px;
    padding: 8px 16px;
    font-size: 13px;
  }
`;