
// Autor: Gabriel Salles
// Suporte do SO: Windows11
// Descrição: Painel Administrativo para visualização de logs e usuários com exportação e ordenação

import React, { useEffect, useState } from 'react';
import { User } from '../types';
import { ShieldAlert, ArrowLeft, RefreshCw, UserCheck, Clock, Building, Download, Users, FileText, Filter, ArrowDownAZ, ArrowUpAZ, Calendar } from 'lucide-react';
import { authService } from '../services/authService';

interface AdminPanelProps {
  user: User;
  onBack: () => void;
}

type SortOption = 'NEWEST' | 'OLDEST' | 'AZ' | 'ZA';

const AdminPanel: React.FC<AdminPanelProps> = ({ user, onBack }) => {
  const [activeTab, setActiveTab] = useState<'LOGS' | 'USERS'>('LOGS');
  const [logs, setLogs] = useState<any[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<SortOption>('NEWEST');

  // Verificação de segurança (Case Insensitive)
  const isAdmin = user.email.toLowerCase() === 'marketing@hoteisrio.com.br';

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin, activeTab]);

  // Reset sort when tab changes
  useEffect(() => {
    setSortOrder('NEWEST');
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    if (activeTab === 'LOGS') {
        const data = await authService.getLogs();
        setLogs(data);
    } else {
        const data = await authService.getUsers();
        setUsersList(data);
    }
    setLoading(false);
  };

  const getSortedData = () => {
    const data = activeTab === 'LOGS' ? logs : usersList;
    
    return [...data].sort((a, b) => {
        // Logica para Data (Logs usa 'timestamp', Users usa 'createdAt')
        const dateA = new Date(activeTab === 'LOGS' ? (a.timestamp || 0) : (a.createdAt || 0)).getTime();
        const dateB = new Date(activeTab === 'LOGS' ? (b.timestamp || 0) : (b.createdAt || 0)).getTime();

        // Logica para Nome (Logs usa 'userName', Users usa 'name')
        const nameA = (activeTab === 'LOGS' ? a.userName : a.name) || '';
        const nameB = (activeTab === 'LOGS' ? b.userName : b.name) || '';

        switch (sortOrder) {
            case 'NEWEST':
                return dateB - dateA;
            case 'OLDEST':
                return dateA - dateB;
            case 'AZ':
                return nameA.localeCompare(nameB);
            case 'ZA':
                return nameB.localeCompare(nameA);
            default:
                return 0;
        }
    });
  };

  const sortedData = getSortedData();

  const handleExportCSV = () => {
    if (sortedData.length === 0) return;

    // Obter headers dinamicamente
    const headers = Object.keys(sortedData[0]);
    
    // Criar conteúdo CSV
    const csvContent = [
      headers.join(','), // Header row
      ...sortedData.map(row => 
        headers.map(fieldName => {
          let value = row[fieldName] || '';
          // Escapar aspas e vírgulas para CSV válido
          if (typeof value === 'string') {
             value = `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(',')
      )
    ].join('\n');

    // Adiciona BOM para o Excel abrir corretamente com acentos
    const bom = "\uFEFF";
    const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `hoteisrio_${activeTab.toLowerCase()}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 text-center max-w-md w-full border border-red-100">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Acesso Negado</h1>
          <p className="text-gray-500 mb-6">
            Você não tem permissão para acessar esta área administrativa. Este incidente foi registrado.
          </p>
          <button 
            onClick={onBack}
            className="w-full bg-gray-800 text-white font-bold py-3 rounded-lg hover:bg-gray-900 transition-colors"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12 animate-fade-in">
      {/* Header */}
      <div className="bg-slate-900 text-white pt-8 pb-20 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para Dashboard
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
               <div className="bg-white/10 p-3 rounded-xl border border-white/20">
                 <ShieldAlert className="w-8 h-8 text-red-400" />
               </div>
               <div>
                  <h1 className="text-3xl font-bold">Painel Administrativo</h1>
                  <p className="text-slate-400">Auditoria e gestão de usuários</p>
               </div>
            </div>
            
            <div className="flex items-center gap-3">
                <button 
                  onClick={fetchData}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  Atualizar
                </button>
                <button 
                  onClick={handleExportCSV}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors text-sm font-bold shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  Exportar CSV
                </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        
        {/* Tabs & Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center mb-4 gap-4">
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
                <button 
                onClick={() => setActiveTab('LOGS')}
                className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-bold transition-all ${activeTab === 'LOGS' ? 'bg-white text-slate-900 shadow-sm translate-y-1' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                >
                    <Clock className="w-4 h-4" />
                    Logs de Acesso
                </button>
                <button 
                onClick={() => setActiveTab('USERS')}
                className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-bold transition-all ${activeTab === 'USERS' ? 'bg-white text-slate-900 shadow-sm translate-y-1' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                >
                    <Users className="w-4 h-4" />
                    Usuários Cadastrados
                </button>
            </div>

            {/* Sort Controls */}
            <div className="bg-white p-1.5 rounded-lg shadow-sm flex items-center gap-1 border border-gray-200">
                <span className="text-xs font-bold text-gray-400 px-2 uppercase tracking-wide hidden sm:inline">Ordenar:</span>
                <button 
                    onClick={() => setSortOrder('NEWEST')}
                    className={`p-2 rounded hover:bg-gray-100 transition-colors ${sortOrder === 'NEWEST' ? 'bg-blue-50 text-blue-600' : 'text-gray-500'}`}
                    title="Mais Recentes"
                >
                    <Calendar className="w-4 h-4" />
                </button>
                <button 
                    onClick={() => setSortOrder('AZ')}
                    className={`p-2 rounded hover:bg-gray-100 transition-colors ${sortOrder === 'AZ' ? 'bg-blue-50 text-blue-600' : 'text-gray-500'}`}
                    title="A-Z"
                >
                    <ArrowDownAZ className="w-4 h-4" />
                </button>
                <button 
                    onClick={() => setSortOrder('ZA')}
                    className={`p-2 rounded hover:bg-gray-100 transition-colors ${sortOrder === 'ZA' ? 'bg-blue-50 text-blue-600' : 'text-gray-500'}`}
                    title="Z-A"
                >
                    <ArrowUpAZ className="w-4 h-4" />
                </button>
            </div>
        </div>

        <div className="bg-white rounded-b-xl rounded-tr-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-700 flex items-center gap-2">
              {activeTab === 'LOGS' ? <FileText className="w-5 h-5 text-gray-500" /> : <UserCheck className="w-5 h-5 text-gray-500" />}
              {activeTab === 'LOGS' ? 'Registros Recentes' : 'Base de Usuários'}
            </h3>
            <span className="text-xs font-mono bg-slate-200 text-slate-700 px-2 py-1 rounded">
              Total: {sortedData.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200 uppercase text-xs">
                {activeTab === 'LOGS' ? (
                    <tr>
                        <th className="px-6 py-4">Usuário</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">Hotel / Empresa</th>
                        <th className="px-6 py-4">Cargo</th>
                        <th className="px-6 py-4">Acesso em</th>
                    </tr>
                ) : (
                    <tr>
                        <th className="px-6 py-4">Nome</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">Hotel</th>
                        <th className="px-6 py-4">Cargo</th>
                        <th className="px-6 py-4">Data Cadastro</th>
                    </tr>
                )}
              </thead>
              <tbody className="divide-y divide-gray-100">
                {activeTab === 'LOGS' ? (
                    sortedData.length > 0 ? (
                    sortedData.map((log, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-gray-800">{log.userName}</td>
                        <td className="px-6 py-4 text-gray-600 font-mono text-xs">{log.userEmail}</td>
                        <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                            <Building className="w-3 h-3 text-gray-400" />
                            {log.userHotel}
                        </td>
                        <td className="px-6 py-4">
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs border border-gray-200">
                            {log.userRole}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-gray-500 flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            {log.timestamp ? new Date(log.timestamp).toLocaleString('pt-BR') : '-'}
                        </td>
                        </tr>
                    ))
                    ) : (
                    <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                        Nenhum registro de acesso encontrado.
                        </td>
                    </tr>
                    )
                ) : (
                    sortedData.length > 0 ? (
                        sortedData.map((usr, idx) => (
                            <tr key={idx} className="hover:bg-green-50/50 transition-colors">
                            <td className="px-6 py-4 font-bold text-gray-800">{usr.name}</td>
                            <td className="px-6 py-4 text-gray-600 font-mono text-xs">{usr.email}</td>
                            <td className="px-6 py-4 text-gray-600">{usr.hotel}</td>
                            <td className="px-6 py-4 text-gray-600">{usr.role}</td>
                            <td className="px-6 py-4 text-gray-500 text-xs">
                                {usr.createdAt ? new Date(usr.createdAt).toLocaleDateString('pt-BR') : 'N/A'}
                            </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                            Nenhum usuário encontrado na base.
                            </td>
                        </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
// --- Fim de components/AdminPanel.tsx ---
