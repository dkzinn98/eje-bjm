// Home.jsx - Componente unificado (HTML + Conexão com Script)
import { useHome } from './script';
import {
  Container,
  HeaderSection,
  HeroSection,
  ButtonSection,
  ActionButton,
  LogoContainer,
  WelcomeText,
  GlobalStyles,
} from "./stylesHome";
import EjeImage from "../../assets/EJE_titulo.png";

function Home() {
  // Importa toda a lógica do script.js
  const {
    handleNavigation,
    loadingStates,
    welcomeMessage,
    navigationOptions,
    isVisible
  } = useHome();

  return (
    <>
      <GlobalStyles />
      <Container className={isVisible ? 'visible' : ''}>
        {/* Header com Logo */}
        <HeaderSection>
          <LogoContainer>
            <img 
              src={EjeImage} 
              alt="Logotipo do Encontro de Jovens Escolares - EJE 2025"
              id="logo-image"
            />
          </LogoContainer>
        </HeaderSection>

        {/* Seção Principal com Texto de Boas-vindas */}
        <HeroSection>
          <WelcomeText>
            <h1 style={{ 
              position: 'absolute', 
              left: '-10000px', 
              width: '1px', 
              height: '1px', 
              overflow: 'hidden' 
            }}>
              {welcomeMessage.title}
            </h1>
            
            <p className="intro-paragraph">
              {welcomeMessage.content}
            </p>
            
            <p className="mission-paragraph">
              {welcomeMessage.mission}
            </p>
            
            <p className="blessing-paragraph">
              {welcomeMessage.blessing}
            </p>
          </WelcomeText>
        </HeroSection>

        {/* Botões de Ação */}
        <ButtonSection>
          {navigationOptions.map((option) => (
            <ActionButton
              key={option.id}
              $variant={option.variant}
              className={`nav-button ${loadingStates[option.id] ? 'loading' : ''}`}
              onClick={() => handleNavigation(option.path)}
              disabled={loadingStates[option.id]}
              data-path={option.path}
              aria-label={`${option.text} - Navegar para página ${option.id}`}
            >
              <span className="button-icon" aria-hidden="true">
                {loadingStates[option.id] ? '⏳' : option.icon}
              </span>
              <span className="button-text">
                {loadingStates[option.id] ? 'Carregando...' : option.text}
              </span>
            </ActionButton>
          ))}
        </ButtonSection>
      </Container>
    </>
  );
}

export default Home;