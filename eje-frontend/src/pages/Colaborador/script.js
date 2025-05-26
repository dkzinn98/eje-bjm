// script.js - Lógica da página Colaborador
import { useState, useRef, useCallback } from 'react';
import api from '../../../src/services/api';

// ========================
// DADOS DA APLICAÇÃO
// ========================
export const COLABORADOR_DATA = {
  formFields: [
    { name: 'nome', type: 'text', placeholder: 'Nome completo *', required: true },
    { name: 'email', type: 'email', placeholder: 'E-mail principal *', required: true },
    { name: 'whatsapp', type: 'text', placeholder: 'WhatsApp *', required: true },
    { name: 'instagram', type: 'text', placeholder: 'Instagram @usuario *', required: true },
    { name: 'idade', type: 'number', placeholder: 'Idade *', required: true },
    { name: 'dataDeNascimento', type: 'date', placeholder: 'Data de nascimento *', required: true },
  ],

  validationRules: {
    nome: { minLength: 2, maxLength: 100 },
    email: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    whatsapp: { pattern: /^\(\d{2}\)\s\d{4,5}-\d{4}$|^\d{10,11}$/ },
    instagram: { pattern: /^@?[a-zA-Z0-9._]{1,30}$/ },
    idade: { min: 15, max: 80 },
    apresentacao: { minLength: 30, maxLength: 900 }
  },

  messages: {
    success: 'Cadastro realizado com sucesso! Entraremos em contato em breve.',
    error: 'Erro ao cadastrar. Por favor, verifique os dados e tente novamente.',
    termsRequired: 'Você deve aceitar os termos para continuar.',
    fillRequired: 'Por favor, preencha todos os campos obrigatórios.',
    invalidEmail: 'Por favor, insira um e-mail válido.',
    invalidWhatsApp: 'Por favor, insira um WhatsApp válido.',
    invalidInstagram: 'Por favor, insira um @ do Instagram válido (ex: @seuusuario).',
    invalidAge: 'Idade deve estar entre 16 e 80 anos.',
    shortPresentation: 'A apresentação deve ter pelo menos 50 caracteres.'
  }
};

// ========================
// HOOK PARA FORMULÁRIO
// ========================
export const useColaboradorForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const inputRefs = {
    nome: useRef(),
    email: useRef(),
    whatsapp: useRef(),
    instagram: useRef(),
    idade: useRef(),
    dataDeNascimento: useRef(),
    fotoDePerfil: useRef(),
    apresentacao: useRef(),
    terms: useRef()
  };

  // Validação de campo individual
  const validateField = useCallback((fieldName, value) => {
    const rules = COLABORADOR_DATA.validationRules[fieldName];
    if (!rules) return '';

    if (fieldName === 'email' && !rules.pattern.test(value)) {
      return COLABORADOR_DATA.messages.invalidEmail;
    }

    if (fieldName === 'whatsapp' && !rules.pattern.test(value)) {
      return COLABORADOR_DATA.messages.invalidWhatsApp;
    }

    if (fieldName === 'instagram' && !rules.pattern.test(value)) {
      return COLABORADOR_DATA.messages.invalidInstagram;
    }

    if (fieldName === 'idade') {
      const age = Number.parseInt(value);
      if (age < rules.min || age > rules.max) {
        return COLABORADOR_DATA.messages.invalidAge;
      }
    }

    if (fieldName === 'nome' || fieldName === 'apresentacao') {
      if (value.length < rules.minLength) {
        return fieldName === 'apresentacao' 
          ? COLABORADOR_DATA.messages.shortPresentation
          : `Campo deve ter pelo menos ${rules.minLength} caracteres`;
      }
    }

    return '';
  }, []);

  // Validação completa do formulário
    const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    // Validar campos obrigatórios
    // biome-ignore lint/complexity/noForEach: <explanation>
        Object.keys(inputRefs).forEach(fieldName => {
      if (fieldName === 'terms' || fieldName === 'fotoDePerfil') return;
      
      const value = inputRefs[fieldName].current?.value?.trim();
      if (!value) {
        newErrors[fieldName] = 'Campo obrigatório';
        isValid = false;
      } else {
        const error = validateField(fieldName, value);
        if (error) {
          newErrors[fieldName] = error;
          isValid = false;
        }
      }
    });

    // Validar apresentação
    const apresentacao = inputRefs.apresentacao.current?.value?.trim();
    if (!apresentacao) {
      newErrors.apresentacao = 'Campo obrigatório';
      isValid = false;
    } else {
      const error = validateField('apresentacao', apresentacao);
      if (error) {
        newErrors.apresentacao = error;
        isValid = false;
      }
    }

    // Validar termos
    if (!inputRefs.terms.current?.checked) {
      newErrors.terms = COLABORADOR_DATA.messages.termsRequired;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  }, [inputRefs, validateField]);

  // Limpar erros de um campo específico
  const clearFieldError = useCallback((fieldName) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  return {
    inputRefs,
    isLoading,
    errors,
    success,
    setIsLoading,
    setErrors,
    setSuccess,
    validateField,
    validateForm,
    clearFieldError
  };
};

// ========================
// HOOK PARA API
// ========================
export const useColaboradorAPI = () => {
  const [uploadProgress, setUploadProgress] = useState(0);

  const submitColaborador = useCallback(async (formData, inputRefs) => {
    try {
      // Preparar dados para envio
      const colaboradorData = {
        name: inputRefs.nome.current.value.trim(),
        email: inputRefs.email.current.value.trim(),
        whatsapp: inputRefs.whatsapp.current.value.trim(),
        instagram: inputRefs.instagram.current.value.trim(),
        age: Number.parseInt(inputRefs.idade.current.value),
        data: new Date(inputRefs.dataDeNascimento.current.value).toISOString(),
        biography: inputRefs.apresentacao.current.value.trim(),
        profileImage: inputRefs.fotoDePerfil.current.files[0]?.name || ''
      };

      // Se há arquivo de imagem, usar FormData
      if (inputRefs.fotoDePerfil.current.files[0]) {
        const formDataWithFile = new FormData();
        
        // Adicionar dados do colaborador
        // biome-ignore lint/complexity/noForEach: <explanation>
                        Object.keys(colaboradorData).forEach(key => {
          if (key !== 'profileImage') {
            formDataWithFile.append(key, colaboradorData[key]);
          }
        });

        // Adicionar arquivo
        formDataWithFile.append('profileImage', inputRefs.fotoDePerfil.current.files[0]);

        // Enviar com progress tracking
        const response = await api.post('/colaborador', formDataWithFile, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          }
        });

        return response.data;
      // biome-ignore lint/style/noUselessElse: <explanation>
      } else {
        // Enviar apenas dados JSON
        const response = await api.post('/colaborador', colaboradorData);
        return response.data;
      }
    } catch (error) {
      console.error('Erro na API:', error);
      throw error;
    } finally {
      setUploadProgress(0);
    }
  }, []);

  return {
    submitColaborador,
    uploadProgress
  };
};

// ========================
// HOOK PARA FORMATAÇÃO
// ========================
export const useInputFormatters = () => {
  const formatWhatsApp = useCallback((value) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Aplica formatação
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    // biome-ignore lint/style/noUselessElse: <explanation>
    } else {
      return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
  }, []);

  const formatAge = useCallback((value) => {
    // Só permite números e limita a 2 dígitos
    const numbers = value.replace(/\D/g, '');
    return numbers.slice(0, 2);
  }, []);

  const formatInstagram = useCallback((value) => {
    // Remove espaços e caracteres especiais inválidos
    let formatted = value.replace(/[^a-zA-Z0-9._@]/g, '');
    
    // Adiciona @ no início se não tiver
    if (formatted && !formatted.startsWith('@')) {
      // biome-ignore lint/style/useTemplate: <explanation>
      formatted = '@' + formatted;
    }
    
    // Limita a 31 caracteres (30 + @)
    return formatted.slice(0, 31);
  }, []);

  return {
    formatWhatsApp,
    formatAge,
    formatInstagram
  };
};

// ========================
// HOOK PARA UPLOAD DE ARQUIVO
// ========================
export const useFileUpload = () => {
  const [preview, setPreview] = useState(null);
  const [fileError, setFileError] = useState('');

  const handleFileSelect = useCallback((file) => {
    setFileError('');

    if (!file) {
      setPreview(null);
      return;
    }

    // Validar tipo de arquivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setFileError('Por favor, selecione apenas arquivos JPG, PNG ou WebP.');
      return;
    }

    // Validar tamanho (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setFileError('O arquivo deve ter no máximo 5MB.');
      return;
    }

    // Criar preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const clearFile = useCallback(() => {
    setPreview(null);
    setFileError('');
  }, []);

  return {
    preview,
    fileError,
    handleFileSelect,
    clearFile
  };
};

// ========================
// HOOK PRINCIPAL DO COLABORADOR
// ========================
export const useColaborador = () => {
  const form = useColaboradorForm();
  const api = useColaboradorAPI();
  const formatters = useInputFormatters();
  const fileUpload = useFileUpload();

  // Função principal de submissão
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (form.isLoading) return;

    // Validar formulário
    if (!form.validateForm()) {
      return;
    }

    form.setIsLoading(true);
    form.setSuccess(false);

    try {
      await api.submitColaborador(null, form.inputRefs);
      
      // Resetar formulário
      // biome-ignore lint/complexity/noForEach: <explanation>
                  Object.values(form.inputRefs).forEach(ref => {
        if (ref.current) {
          if (ref.current.type === 'checkbox') {
            ref.current.checked = false;
          } else if (ref.current.type === 'file') {
            ref.current.value = '';
          } else {
            ref.current.value = '';
          }
        }
      });

      fileUpload.clearFile();
      form.setErrors({});
      form.setSuccess(true);

      // Mostrar mensagem de sucesso
      alert(COLABORADOR_DATA.messages.success);

    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert(COLABORADOR_DATA.messages.error);
    } finally {
      form.setIsLoading(false);
    }
  }, [form, api, fileUpload]);

  // Manipular mudança de arquivo
  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    fileUpload.handleFileSelect(file);
  }, [fileUpload]);

  // Manipular mudança de WhatsApp
  const handleWhatsAppChange = useCallback((e) => {
    const formatted = formatters.formatWhatsApp(e.target.value);
    e.target.value = formatted;
    form.clearFieldError('whatsapp');
  }, [formatters, form]);

  // Manipular mudança de Instagram
  const handleInstagramChange = useCallback((e) => {
    const formatted = formatters.formatInstagram(e.target.value);
    e.target.value = formatted;
    form.clearFieldError('instagram');
  }, [formatters, form]);

  // Manipular mudança de idade
  const handleAgeChange = useCallback((e) => {
    const formatted = formatters.formatAge(e.target.value);
    e.target.value = formatted;
    form.clearFieldError('idade');
  }, [formatters, form]);

  // Manipular mudança de campo genérico
  const handleFieldChange = useCallback((fieldName) => {
    form.clearFieldError(fieldName);
  }, [form]);

  return {
    // Estados
    ...form,
    uploadProgress: api.uploadProgress,
    filePreview: fileUpload.preview,
    fileError: fileUpload.fileError,

    // Funções
    handleSubmit,
    handleFileChange,
    handleWhatsAppChange,
    handleInstagramChange,
    handleAgeChange,
    handleFieldChange,

    // Dados
    formFields: COLABORADOR_DATA.formFields,
    messages: COLABORADOR_DATA.messages
  };
};

// ========================
// UTILITÁRIOS
// ========================
export const ColaboradorUtils = {
  // Validar CPF (se necessário no futuro)
  validateCPF: (cpf) => {
    if (cpf.length !== 11) return false;
    // Lógica de validação do CPF aqui
    return true;
  },

  // Formatar telefone para exibição
  formatPhoneDisplay: (phone) => {
    const numbers = phone.replace(/\D/g, '');
    if (numbers.length === 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    }
    return phone;
  },

  // Calcular idade a partir da data
  calculateAge: (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  },

  // Log estruturado
  log: (message, type = 'info', data = null) => {
    const emoji = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌'
    };
    
    console.log(`${emoji[type]} [Colaborador] ${message}`, data ? data : '');
  }
};

// ========================
// EXPORTAÇÕES DEFAULT
// ========================
export default {
  useColaborador,
  useColaboradorForm,
  useColaboradorAPI,
  useInputFormatters,
  useFileUpload,
  ColaboradorUtils,
  COLABORADOR_DATA
};