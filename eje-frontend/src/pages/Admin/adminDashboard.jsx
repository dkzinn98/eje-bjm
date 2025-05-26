/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { 
  AdminContainer, 
  AdminHeader, 
  LogoutButton,
  RefreshButton,
  StatsContainer,
  StatCard,
  FiltersContainer,
  FilterButton,
  SearchInput,
  CardsGrid,
  PersonCard,
  CardHeader,
  Avatar,
  PersonInfo,
  CardBody,
  CardActions,
  ActionButton 
} from './stylesAdmin';
import AdminLogin from './AdminLogin';
import { EditModal } from './EditModal';
import { userService, handleApiError } from '../../services/api';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filter, setFilter] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [pessoas, setPessoas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Carregar dados quando autenticar
  useEffect(() => {
    if (isAuthenticated) {
      loadUsers();
    }
  }, [isAuthenticated]);

  const loadUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await userService.getAll();
      setPessoas(data);
      setLastUpdate(new Date());
    } catch (error) {
      setError(handleApiError(error));
      console.error('Erro ao carregar usuários:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    setError('');
    try {
      const data = await userService.getAll();
      setPessoas(data);
      setLastUpdate(new Date());
      
      // Feedback visual de sucesso
      const refreshBtn = document.querySelector('[data-refresh-button]');
      if (refreshBtn) {
        refreshBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
          refreshBtn.style.transform = 'scale(1)';
        }, 150);
      }
    } catch (error) {
      setError(handleApiError(error));
      console.error('Erro ao atualizar dados:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPessoas([]);
    setLastUpdate(null);
  };

  const handleEdit = (pessoa) => {
    setEditingUser(pessoa);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setEditingUser(null);
    setShowEditModal(false);
  };

  const handleUpdateUser = (updatedUser) => {
    setPessoas(prevUsers => 
      prevUsers.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      )
    );
    // Recarregar para atualizar estatísticas se necessário
    loadUsers();
  };

  const handleDelete = async (pessoaId) => {
    if (window.confirm('Tem certeza que deseja excluir este cadastro?')) {
      try {
        await userService.delete(pessoaId);
        // Remover da lista local
        setPessoas(prev => prev.filter(p => p.id !== pessoaId));
        setLastUpdate(new Date());
        alert('Usuário excluído com sucesso!');
      } catch (error) {
        // biome-ignore lint/style/useTemplate: <explanation>
        alert('Erro ao excluir usuário: ' + handleApiError(error));
      }
    }
  };

  // Filtrar pessoas
  const pessoasFiltradas = pessoas.filter(pessoa => {
    const matchFilter = filter === 'todos' || pessoa.tipo.toLowerCase() === filter.toLowerCase();
    const matchSearch = pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       pessoa.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  // Estatísticas calculadas dinamicamente
  const stats = {
    total: pessoas.length,
    colaboradores: pessoas.filter(p => p.tipo === 'COLABORADOR').length,
    ejistas: pessoas.filter(p => p.tipo === 'EJISTA').length
  };

  const getInitials = (nome) => {
    return nome.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const formatLastUpdate = (date) => {
    if (!date) return '';
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Atualizado agora';
    // biome-ignore lint/style/noUselessElse: <explanation>
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `Atualizado há ${minutes} min`;
    // biome-ignore lint/style/noUselessElse: <explanation>
    } else {
      return `Atualizado às ${date.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })}`;
    }
  };

  // Se não autenticado, mostra tela de login
  if (!isAuthenticated) {
    return <AdminLogin onLogin={setIsAuthenticated} />;
  }

  return (
    <AdminContainer>
      <AdminHeader>
        <h1>Painel Administrativo EJE 2025</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <RefreshButton 
            onClick={handleRefresh}
            disabled={refreshing || loading}
            data-refresh-button
            title={lastUpdate ? formatLastUpdate(lastUpdate) : 'Atualizar dados'}
          >
            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
<svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              style={{ 
                animation: refreshing ? 'spin 1s linear infinite' : 'none',
                transition: 'transform 0.2s ease'
              }}
            >
              {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
              {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
<path d="M21 3v5h-5"></path>
              {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
<path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
              {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
<path d="M3 21v-5h5"></path>
            </svg>
            {refreshing ? 'Atualizando...' : 'Atualizar'}
          </RefreshButton>
          <LogoutButton onClick={handleLogout}>
            Sair
          </LogoutButton>
        </div>
      </AdminHeader>

      {/* Mostrar horário da última atualização */}
      {lastUpdate && (
        <div style={{
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '0.9rem',
          marginBottom: '10px'
        }}>
          {formatLastUpdate(lastUpdate)}
        </div>
      )}

      {/* Mostrar erro se houver */}
      {error && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid #ef4444',
          borderRadius: '10px',
          padding: '15px',
          marginBottom: '20px',
          color: '#ef4444',
          textAlign: 'center'
        }}>
          ⚠️ {error}
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button 
            onClick={loadUsers}
            style={{
              marginLeft: '10px',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Tentar Novamente
          </button>
        </div>
      )}

      {/* Estatísticas */}
      <StatsContainer>
        <StatCard delay="0.1s">
          <h3>{stats.total}</h3>
          <p>Total de Cadastros</p>
        </StatCard>
        <StatCard delay="0.2s">
          <h3>{stats.colaboradores}</h3>
          <p>Colaboradores</p>
        </StatCard>
        <StatCard delay="0.3s">
          <h3>{stats.ejistas}</h3>
          <p>EJistas</p>
        </StatCard>
      </StatsContainer>

      {/* Filtros e busca */}
      <FiltersContainer>
        <FilterButton 
          active={filter === 'todos'} 
          onClick={() => setFilter('todos')}
        >
          Todos ({stats.total})
        </FilterButton>
        <FilterButton 
          active={filter === 'colaborador'} 
          onClick={() => setFilter('colaborador')}
        >
          Colaboradores ({stats.colaboradores})
        </FilterButton>
        <FilterButton 
          active={filter === 'ejista'} 
          onClick={() => setFilter('ejista')}
        >
          EJistas ({stats.ejistas})
        </FilterButton>
        <SearchInput
          type="text"
          placeholder="Buscar por nome ou email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </FiltersContainer>

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '40px', color: 'white' }}>
          🔄 Carregando dados...
        </div>
      )}

      {/* Grid de cards */}
      {!loading && (
        <CardsGrid>
          {pessoasFiltradas.map((pessoa, index) => (
            <PersonCard key={pessoa.id} style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader>
                <Avatar>
                  {pessoa.fotoUrl ? (
                    <img 
                      src={`http://localhost:8080${pessoa.fotoUrl}`}
                      alt={pessoa.nome}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                  ) : null}
                  <span style={{ display: pessoa.fotoUrl ? 'none' : 'block' }}>
                    {getInitials(pessoa.nome)}
                  </span>
                </Avatar>
                <PersonInfo tipo={pessoa.tipo}>
                  <h3>{pessoa.nome}</h3>
                  <span className="tipo">{pessoa.tipo}</span>
                </PersonInfo>
              </CardHeader>
              
              <CardBody>
                <div className="info-group">
                  {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                  <label>E-mail:</label>
                  <span>{pessoa.email}</span>
                </div>
                
                <div className="info-group">
                  {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                  <label>WhatsApp:</label>
                  <span>{pessoa.whatsapp}</span>
                </div>
                
                <div className="info-group">
                  {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                  <label>Instagram:</label>
                  <span>{pessoa.instagram}</span>
                </div>
                
                <div className="info-group">
                  {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                  <label>Idade:</label>
                  <span>{pessoa.idade} anos</span>
                </div>
                
                <div className="info-group">
                  {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                  <label>Motivação:</label>
                  <span>{pessoa.motivacao}</span>
                </div>
              </CardBody>
              
              <CardActions>
                <ActionButton 
                  className="edit"
                  onClick={() => handleEdit(pessoa)}
                >
                  ✏️ Editar
                </ActionButton>
                <ActionButton 
                  className="delete"
                  onClick={() => handleDelete(pessoa.id)}
                >
                  🗑️ Excluir
                </ActionButton>
              </CardActions>
            </PersonCard>
          ))}
        </CardsGrid>
      )}

      {/* Mensagem quando não há resultados */}
      {!loading && pessoasFiltradas.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '1.2rem'
        }}>
          {searchTerm ? 
            `Nenhum cadastro encontrado para "${searchTerm}"` : 
            `Nenhum ${filter === 'todos' ? 'cadastro' : filter.toLowerCase()} encontrado.`
          }
        </div>
      )}

      {/* Modal de Edição */}
      {showEditModal && editingUser && (
        <EditModal
          user={editingUser}
          onClose={handleCloseModal}
          onUpdate={handleUpdateUser}
        />
      )}
    </AdminContainer>
  );
};

export default AdminDashboard;