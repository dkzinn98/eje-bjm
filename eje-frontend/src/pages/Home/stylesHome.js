import styled, { createGlobalStyle, keyframes } from 'styled-components';

// Animações
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInFromTop = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% { left: -100%; }
  100% { left: 100%; }
`;

const pulseGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
  }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Estilos globais
export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #19223F 0%, #19223F 100%);
    min-height: 100vh;
    color: white;
    line-height: 1.6;
    overflow-x: hidden;
  }

  #root {
    min-height: 100vh;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: inherit;
  }
`;

// Container principal - VOLTANDO AO ORIGINAL FUNCIONAL
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: 768px) {
    padding: 30px 15px;
    gap: 3rem;
  }

  @media (max-width: 480px) {
    padding: 20px 10px;
    gap: 2.5rem;
  }
`;

// Header com logo - TAMANHOS ORIGINAIS
export const HeaderSection = styled.header`
  text-align: center;
  animation: ${slideInFromTop} 1s ease-out;
  width: 100%;
`;

export const LogoContainer = styled.div`
  display: inline-block;
  transition: all 0.4s ease;
  position: relative;

  &:hover {
    transform: scale(1.05) rotate(1deg);
  }

  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    border-radius: 50%;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  img {
    max-width: 600px;
    height: auto;
    filter: drop-shadow(0 15px 35px rgba(0, 0, 0, 0.4));
    transition: filter 0.3s ease;
    
    &:hover {
      filter: drop-shadow(0 20px 45px rgba(0, 0, 0, 0.5)) brightness(1.1);
    }
    
    @media (max-width: 768px) {
      max-width: 400px;
    }
    
    @media (max-width: 480px) {
      max-width: 300px;
    }
  }
`;

// Seção principal - ORIGINAL
export const HeroSection = styled.main`
  text-align: center;
  animation: ${fadeIn} 1.2s ease-out 0.3s both;
  width: 100%;
  max-width: 900px;
`;

export const WelcomeText = styled.div`
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(20px);
  border-radius: 30px;
  padding: 3rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
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
    animation: ${shimmer} 3s infinite;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    text-align: justify;
    color: rgba(255, 255, 255, 0.95);
    line-height: 1.8;
    text-indent: 2rem;
    
    &:last-child {
      margin-bottom: 0;
      font-weight: 600;
      font-style: italic;
      text-align: center;
      color: #ffd700;
      text-shadow: 0 2px 10px rgba(255, 215, 0, 0.3);
      font-size: 1.3rem;
      text-indent: 0;
      background-color: #E56F09;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    &.intro-paragraph {
      position: relative;
      padding-left: 1rem;
      border-left: 4px solid rgba(255, 215, 0, 0.5);
    }
  }

  @media (max-width: 768px) {
    padding: 2.5rem;
    border-radius: 25px;
    
    p {
      font-size: 1.1rem;
      text-align: left;
      text-indent: 1rem;
      
      &:last-child {
        font-size: 1.2rem;
      }
    }
  }

  @media (max-width: 480px) {
    padding: 2rem;
    border-radius: 20px;
    
    p {
      font-size: 1rem;
      text-indent: 0.5rem;
      
      &:last-child {
        font-size: 1.1rem;
      }
    }
  }
`;

// Seção de botões - ORIGINAL
export const ButtonSection = styled.section`
  display: flex;
  justify-content: center;
  gap: 5rem;
  flex-wrap: wrap;
  animation: ${fadeIn} 1.8s ease-out 0.6s both;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

export const ActionButton = styled.button`
  background-color: #E56F09;
  color: white;
  padding: 1.5rem 3rem;
  border-radius: 60px;
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 
    0 15px 30px rgba(0, 0, 0, 0.3),
    0 5px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  border: none;
  min-width: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  cursor: pointer;

  /* Efeito de brilho interno */
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
    transition: left 0.6s;
  }

  /* Efeito de ondas */
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  &:hover {
    transform: translateY(-8px) scale(1.05);
    box-shadow: 
      0 25px 50px rgba(0, 0, 0, 0.4),
      0 10px 25px rgba(0, 0, 0, 0.3);
    
    &::before {
      left: 100%;
    }

    &::after {
      width: 300px;
      height: 300px;
    }
  }

  &:active {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 
      0 15px 30px rgba(0, 0, 0, 0.35),
      0 5px 15px rgba(0, 0, 0, 0.25);
  }

  &:focus {
    outline: 3px solid rgba(255, 255, 255, 0.6);
    outline-offset: 4px;
  }

  &.loading {
    pointer-events: none;
    animation: ${pulseGlow} 1.5s infinite;
    
    .button-icon {
      animation: ${spin} 1s linear infinite;
    }
  }

  .button-icon {
    font-size: 1.5rem;
    transition: transform 0.3s ease;
  }

  .button-text {
    font-size: 1.1rem;
    position: relative;
    z-index: 2;
  }

  &:hover .button-icon {
    transform: scale(1.2) rotate(5deg);
  }

  @media (max-width: 768px) {
    min-width: 320px;
    padding: 1.3rem 2.5rem;
    font-size: 1.1rem;
    
    .button-text {
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    min-width: 280px;
    padding: 1.2rem 2rem;
    font-size: 1rem;
    
    .button-text {
      font-size: 0.95rem;
    }
    
    .button-icon {
      font-size: 1.3rem;
    }
  }
`;

// Componentes legados (mantidos para compatibilidade)
export const HeaderTop = HeaderSection;
export const ButtonContainer = ButtonSection;
export const Buttons = ActionButton;
export const ContainerImage = LogoContainer;
export const EjeBio = WelcomeText;