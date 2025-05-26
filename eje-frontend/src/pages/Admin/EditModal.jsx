// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { userService } from '../../services/api';

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const ModalContainer = styled.div`
  background: linear-gradient(135deg, rgb(30, 41, 59) 0%, rgb(25, 34, 63) 100%);
  border-radius: 20px;
  padding: 2rem;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  border: 2px solid rgba(255, 123, 0, 0.3);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  
  &::-webkit-scrollbar {
    width: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, rgb(177, 88, 28), #ff7b00);
    border-radius: 5px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: rotate(90deg);
  }
`;

const Title = styled.h2`
  color: white;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 1.8rem;
  background: linear-gradient(45deg, #ff7b00, #ffaa00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Input = styled.input`
  padding: 0.8rem;
  border-radius: 10px;
  border: 2px solid rgba(177, 88, 28, 0.5);
  background: rgba(30, 41, 59, 0.7);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #ff7b00;
    box-shadow: 0 0 20px rgba(255, 123, 0, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border-radius: 10px;
  border: 2px solid rgba(177, 88, 28, 0.5);
  background: rgba(30, 41, 59, 0.7);
  color: white;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #ff7b00;
    box-shadow: 0 0 20px rgba(255, 123, 0, 0.3);
  }
`;

const Select = styled.select`
  padding: 0.8rem;
  border-radius: 10px;
  border: 2px solid rgba(177, 88, 28, 0.5);
  background: rgba(30, 41, 59, 0.7);
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #ff7b00;
    box-shadow: 0 0 20px rgba(255, 123, 0, 0.3);
  }
  
  option {
    background: rgb(30, 41, 59);
  }
`;

const FileInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.label`
  padding: 0.8rem;
  border-radius: 10px;
  border: 2px dashed rgba(177, 88, 28, 0.5);
  background: rgba(30, 41, 59, 0.7);
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    border-color: #ff7b00;
    background: rgba(30, 41, 59, 0.9);
    color: white;
  }
`;

const PhotoPreview = styled.div`
  width: 150px;
  height: 150px;
  margin: 1rem auto;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid rgba(177, 88, 28, 0.5);
  background: rgba(30, 41, 59, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .placeholder {
    font-size: 3rem;
    color: rgba(255, 255, 255, 0.5);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  justify-content: center;
`;

const Button = styled.button`
  padding: 0.8rem 2rem;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SaveButton = styled(Button)`
  background: linear-gradient(45deg, rgb(177, 88, 28), #ff7b00);
  color: white;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(255, 123, 0, 0.4);
  }
`;

const CancelButton = styled(Button)`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.5);
  color: #ff6b6b;
  padding: 0.8rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
`;

const SuccessMessage = styled.div`
  background: rgba(34, 197, 94, 0.2);
  border: 1px solid rgba(34, 197, 94, 0.5);
  color: #4ade80;
  padding: 0.8rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
`;

// Componente EditModal
// eslint-disable-next-line react/prop-types
export const EditModal = ({ user, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    instagram: '',
    idade: '',
    dataNascimento: '',
    motivacao: '',
    tipo: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [newPhoto, setNewPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  // Carregar dados do usuário
  useEffect(() => {
    if (user) {
      setFormData({
        // eslint-disable-next-line react/prop-types
        nome: user.nome || '',
        // eslint-disable-next-line react/prop-types
        email: user.email || '',
        // eslint-disable-next-line react/prop-types
        whatsapp: user.whatsapp || '',
        // eslint-disable-next-line react/prop-types
        instagram: user.instagram || '',
        // eslint-disable-next-line react/prop-types
        idade: user.idade || '',
        // eslint-disable-next-line react/prop-types
        dataNascimento: user.dataNascimento || '',
        // eslint-disable-next-line react/prop-types
        motivacao: user.motivacao || '',
        // eslint-disable-next-line react/prop-types
        tipo: user.tipo || ''
      });
    }
  }, [user]);

  // Manipular mudanças nos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Limpar erro ao digitar
  };

  // Formatar WhatsApp
  const handleWhatsAppChange = (e) => {
    let value = e.target.value;
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      value = numbers.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
    }
    setFormData(prev => ({
      ...prev,
      whatsapp: value
    }));
  };

  // Formatar Instagram
  const handleInstagramChange = (e) => {
    let value = e.target.value;
    if (value && !value.startsWith('@')) {
      // biome-ignore lint/style/useTemplate: <explanation>
      value = '@' + value;
    }
    setFormData(prev => ({
      ...prev,
      instagram: value
    }));
  };

  // Manipular upload de foto
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo
      if (!file.type.startsWith('image/')) {
        setError('Por favor, selecione apenas arquivos de imagem');
        return;
      }
      
      // Validar tamanho (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('A imagem deve ter no máximo 5MB');
        return;
      }
      
      setNewPhoto(file);
      
      // Criar preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submeter formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Validações básicas
      if (!formData.nome || !formData.email || !formData.whatsapp) {
        throw new Error('Preencha todos os campos obrigatórios');
      }

      // Chamar API para atualizar dados
      // eslint-disable-next-line react/prop-types
      const updatedUser = await userService.update(user.id, formData);
      
      // Se houver nova foto, fazer upload
      if (newPhoto) {
        // eslint-disable-next-line react/prop-types
        await userService.uploadPhoto(user.id, newPhoto);
        // Atualizar a URL da foto no usuário
        // eslint-disable-next-line react/prop-types
        updatedUser.fotoUrl = `photo_${user.id}_${Date.now()}`;
      }
      
      setSuccess(true);
      
      // Atualizar lista após 1 segundo
      setTimeout(() => {
        onUpdate(updatedUser);
        onClose();
      }, 1000);
      
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Erro ao atualizar usuário');
    } finally {
      setLoading(false);
    }
  };

  // Prevenir fechamento ao clicar no modal
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={handleModalClick}>
        <CloseButton onClick={onClose}>✕</CloseButton>
        
        <Title>Editar Usuário</Title>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>Usuário atualizado com sucesso!</SuccessMessage>}
        
        <Form onSubmit={handleSubmit}>
          <FormRow>
            <InputGroup>
              <Label>Nome Completo *</Label>
              <Input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </InputGroup>
            
            <InputGroup>
              <Label>Email *</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </InputGroup>
          </FormRow>
          
          <FormRow>
            <InputGroup>
              <Label>WhatsApp *</Label>
              <Input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleWhatsAppChange}
                placeholder="(00) 00000-0000"
                required
                disabled={loading}
              />
            </InputGroup>
            
            <InputGroup>
              <Label>Instagram</Label>
              <Input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleInstagramChange}
                placeholder="@usuario"
                disabled={loading}
              />
            </InputGroup>
          </FormRow>
          
          <FormRow>
            <InputGroup>
              <Label>Idade</Label>
              <Input
                type="number"
                name="idade"
                value={formData.idade}
                onChange={handleChange}
                min="14"
                max="35"
                disabled={loading}
              />
            </InputGroup>
            
            <InputGroup>
              <Label>Data de Nascimento</Label>
              <Input
                type="date"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleChange}
                disabled={loading}
              />
            </InputGroup>
          </FormRow>
          
          <InputGroup>
            <Label>Tipo</Label>
            <Select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="COLABORADOR">Colaborador</option>
              <option value="EJISTA">Ejista</option>
            </Select>
          </InputGroup>
          
          <InputGroup>
            <Label>Motivação</Label>
            <TextArea
              name="motivacao"
              value={formData.motivacao}
              onChange={handleChange}
              placeholder="Por que quer participar do EJE 2025?"
              disabled={loading}
            />
          </InputGroup>
          
          <FileInputGroup>
            <Label>Foto de Perfil</Label>
            <PhotoPreview>
              {/* eslint-disable-next-line react/prop-types */}
              {photoPreview || user.fotoUrl ? (
                <img 
                  // eslint-disable-next-line react/prop-types
                  src={photoPreview || `http://localhost:8080/api/users/${user.id}/photo`}
                  alt="Preview"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
              ) : null}
              {/* eslint-disable-next-line react/prop-types */}
              <div className="placeholder" style={{ display: photoPreview || user.fotoUrl ? 'none' : 'block' }}>
                📷
              </div>
            </PhotoPreview>
            
            <FileInputLabel htmlFor="photo-upload">
              📸 {newPhoto ? 'Trocar Foto' : 'Adicionar Nova Foto'}
            </FileInputLabel>
            <FileInput
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              disabled={loading}
            />
            
            {newPhoto && (
              <small style={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center' }}>
                Nova foto selecionada: {newPhoto.name}
              </small>
            )}
          </FileInputGroup>
          
          <ButtonGroup>
            <CancelButton type="button" onClick={onClose} disabled={loading}>
              Cancelar
            </CancelButton>
            <SaveButton type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </SaveButton>
          </ButtonGroup>
        </Form>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default EditModal;