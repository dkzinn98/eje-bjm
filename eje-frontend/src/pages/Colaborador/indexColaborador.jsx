/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService, handleApiError } from '../../services/api';
import {
  Container,
  ImageEje,
  Form,
  Title,
  DadosContainer,
  TextoContainer,
  InputFull,
  Input,
  InputLabel,
  TextoFoto,
  Button,
  CheckboxContainer,
  NeonCheckbox,
  CheckboxLabel,
  ErrorMessage,
  BackButton
} from './stylesColaborador';

const IndexColaborador = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    instagram: '',
    idade: '',
    dataNascimento: '',
    motivacao: '',
    foto: null,
    aceiteTermos: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Função para atualizar campos do formulário
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Remover erro do campo quando usuário começa a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Função para upload de arquivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de arquivo
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          foto: 'Por favor, selecione apenas arquivos de imagem'
        }));
        return;
      }

      // Validar tamanho (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          foto: 'A imagem deve ter no máximo 5MB'
        }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        foto: file
      }));

      setErrors(prev => ({
        ...prev,
        foto: ''
      }));
    }
  };

  // Validação do formulário
  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    } else if (formData.nome.trim().length < 2) {
      newErrors.nome = 'Nome deve ter pelo menos 2 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email deve ser válido';
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp é obrigatório';
    } else if (!/^\(\d{2}\) \d{4,5}-\d{4}$/.test(formData.whatsapp)) {
      newErrors.whatsapp = 'WhatsApp deve estar no formato (XX) XXXXX-XXXX';
    }

    if (!formData.instagram.trim()) {
      newErrors.instagram = 'Instagram é obrigatório';
    } else if (!/^@[a-zA-Z0-9._]+$/.test(formData.instagram)) {
      newErrors.instagram = 'Instagram deve começar com @ e conter apenas letras, números, pontos e underlines';
    }

    if (!formData.idade) {
      newErrors.idade = 'Idade é obrigatória';
    } else if (formData.idade < 16 || formData.idade > 35) {
      newErrors.idade = 'Idade deve estar entre 16 e 35 anos';
    }

    if (!formData.dataNascimento) {
      newErrors.dataNascimento = 'Data de nascimento é obrigatória';
    }

    if (!formData.motivacao.trim()) {
      newErrors.motivacao = 'Motivação é obrigatória';
    } else if (formData.motivacao.trim().length < 50) {
      newErrors.motivacao = 'Motivação deve ter pelo menos 50 caracteres';
    }

    if (!formData.foto) {
      newErrors.foto = 'Foto é obrigatória';
    }

    if (!formData.aceiteTermos) {
      newErrors.aceiteTermos = 'Você deve aceitar os termos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submissão do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Criar usuário
      const userData = {
        nome: formData.nome.trim(),
        email: formData.email.trim(),
        whatsapp: formData.whatsapp.trim(),
        instagram: formData.instagram.trim(),
        idade: Number.parseInt(formData.idade),
        dataNascimento: formData.dataNascimento,
        tipo: 'COLABORADOR',
        motivacao: formData.motivacao.trim()
      };

      console.log('Enviando dados:', userData);

      const newUser = await userService.create(userData);
      console.log('Usuário criado:', newUser);

      // 2. Upload da foto se o usuário foi criado
      if (formData.foto && newUser.id) {
        console.log('Fazendo upload da foto...');
        await userService.uploadPhoto(newUser.id, formData.foto);
        console.log('Foto enviada com sucesso');
      }

      // 3. Sucesso
      setSuccess(true);
      
      // Resetar formulário após 3 segundos
      setTimeout(() => {
        setFormData({
          nome: '',
          email: '',
          whatsapp: '',
          instagram: '',
          idade: '',
          dataNascimento: '',
          motivacao: '',
          foto: null,
          aceiteTermos: false
        });
        setSuccess(false);
        
        // Resetar input de arquivo
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
        
      }, 3000);

    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      
      const errorMessage = handleApiError(error);
      
      // Se for erro de duplicação, mostrar no campo específico
      if (errorMessage.includes('Email já cadastrado')) {
        setErrors({ email: 'Este email já está cadastrado' });
      } else if (errorMessage.includes('WhatsApp já cadastrado')) {
        setErrors({ whatsapp: 'Este WhatsApp já está cadastrado' });
      } else {
        // Erro geral
        setErrors({ submit: errorMessage });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Formatação automática do WhatsApp
  const formatWhatsApp = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const handleWhatsAppChange = (e) => {
    const formatted = formatWhatsApp(e.target.value);
    handleInputChange('whatsapp', formatted);
  };

  // Formatação automática do Instagram
  const handleInstagramChange = (e) => {
    let value = e.target.value;
    if (value && !value.startsWith('@')) {
      // biome-ignore lint/style/useTemplate: <explanation>
      value = '@' + value;
    }
    handleInputChange('instagram', value);
  };

  return (
    <Container>
      <BackButton onClick={() => navigate('/')}>
        Voltar ao Início
      </BackButton>
      
      <ImageEje>
        <img src="/src/assets/EJE_titulo.png" alt="EJE 2025" />
      </ImageEje>

      <Form onSubmit={handleSubmit}>
        <Title>Cadastro de Colaboradores EJE 2025</Title>

        {/* Mensagem de sucesso */}
        {success && (
          <div style={{
            background: 'linear-gradient(45deg, #059669, #10b981)',
            color: 'white',
            padding: '15px',
            borderRadius: '10px',
            textAlign: 'center',
            marginBottom: '20px',
            fontWeight: '600'
          }}>
            🎉 Cadastro realizado com sucesso! Obrigado por se voluntariar para o EJE 2025!
          </div>
        )}

        {/* Erro geral */}
        {errors.submit && (
          <ErrorMessage>{errors.submit}</ErrorMessage>
        )}




        <DadosContainer>
          <InputFull>
            <InputLabel>Nome Completo *</InputLabel>
            <Input
              type="text"
              placeholder="Digite seu nome completo"
              value={formData.nome}
              onChange={(e) => handleInputChange('nome', e.target.value)}
              className={errors.nome ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.nome && <ErrorMessage>{errors.nome}</ErrorMessage>}
          </InputFull>
          <InputFull>
            <InputLabel>Email Principal *</InputLabel>
            <Input
              type="email"
              placeholder="seuemail@exemplo.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={errors.email ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </InputFull>

          <InputFull>
            <InputLabel>WhatsApp *</InputLabel>
            <Input
              type="tel"
              placeholder="(61) 99999-9999"
              value={formData.whatsapp}
              onChange={handleWhatsAppChange}
              className={errors.whatsapp ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.whatsapp && <ErrorMessage>{errors.whatsapp}</ErrorMessage>}
          </InputFull>

          <InputFull>
            <InputLabel>Instagram *</InputLabel>
            <Input
              type="text"
              placeholder="@seuinstagram"
              value={formData.instagram}
              onChange={handleInstagramChange}
              className={errors.instagram ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.instagram && <ErrorMessage>{errors.instagram}</ErrorMessage>}
          </InputFull>
          <InputFull>
            <InputLabel>Idade *</InputLabel>
            <Input
              type="number"
              min="16"
              max="35"
              placeholder="Sua idade"
              value={formData.idade}
              onChange={(e) => handleInputChange('idade', e.target.value)}
              className={errors.idade ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.idade && <ErrorMessage>{errors.idade}</ErrorMessage>}
          </InputFull>

          <InputFull>
            <InputLabel>Nascimento *</InputLabel>
            <Input
              type="date"
              value={formData.dataNascimento}
              onChange={(e) => handleInputChange('dataNascimento', e.target.value)}
              className={errors.dataNascimento ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.dataNascimento && <ErrorMessage>{errors.dataNascimento}</ErrorMessage>}
          </InputFull>
        </DadosContainer>



        <div>
          <TextoFoto>Nos envie uma foto de perfil (obrigatório)</TextoFoto>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={errors.foto ? 'error' : ''}
            disabled={isSubmitting}
          />
          {errors.foto && <ErrorMessage>{errors.foto}</ErrorMessage>}
        </div>

        <TextoContainer>
          <InputLabel>Por que devemos te escolher para trabalhar em 2025? *</InputLabel>
          <textarea
            placeholder="Conte-nos resumidamente sobre sua experiência, motivação e como você pode contribuir com o EJE 2025. (Mínimo 50 caracteres e máximo 500)"
            value={formData.motivacao}
            onChange={(e) => handleInputChange('motivacao', e.target.value)}
            className={errors.motivacao ? 'error' : ''}
            disabled={isSubmitting}
          />
          {errors.motivacao && <ErrorMessage>{errors.motivacao}</ErrorMessage>}
          <small style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.8rem' }}>
            {formData.motivacao.length}/500 caracteres
          </small>
        </TextoContainer>

        <CheckboxContainer>
          <NeonCheckbox>
            <input 
              type="checkbox" 
              checked={formData.aceiteTermos}
              onChange={(e) => handleInputChange('aceiteTermos', e.target.checked)}
              disabled={isSubmitting}
            />
            <div className="neon-checkbox__frame">
              {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
              <div className="neon-checkbox__box"></div>
              <div className="neon-checkbox__check-container">
                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                <svg className="neon-checkbox__check" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
            </div>
          </NeonCheckbox>
          <CheckboxLabel>
            Aceito compartilhar minhas informações e imagem para fins do EJE 2025 *
          </CheckboxLabel>
        </CheckboxContainer>
        {errors.aceiteTermos && <ErrorMessage>{errors.aceiteTermos}</ErrorMessage>}

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className={isSubmitting ? 'loading' : ''}
        >
          {isSubmitting ? '🔄 Enviando...' : '🚀 Enviar Solicitação'}
        </Button>
      </Form>
    </Container>
  );
};

export default IndexColaborador;