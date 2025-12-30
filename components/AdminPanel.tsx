
// Autor: Gabriel Salles
// Suporte do SO: Windows11
// Descrição: Painel Administrativo para visualização de logs de acesso

import React, { useEffect, useState } from 'react';
import { User } from '../types';
import { ShieldAlert, ArrowLeft, RefreshCw, UserCheck, Clock, Building } from 'lucide-react';
import { authService } from '../services/authService';

interface AdminPanelProps {
  user: User;
  onBack: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ user, onBack }) => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Verificação de segurança (Case Insensitive)
  const isAdmin = user.email.toLowerCase() === 'marketing@hoteisrio.com.br';

  useEffect(() => {
    if (isAdmin) {
      fetchLogs();
    }
  }, [isAdmin]);

  const fetchLogs = async () => {
    setLoading(true);
    const data = await authService.getLogs();
    setLogs(data);
    setLoading(false);
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

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="bg-white/10 p-3 rounded-xl border border-white/20">
                 <ShieldAlert className="w-8 h-8 text-red-400" />
               </div>
               <div>
                  <h1 className="text-3xl font-bold">Painel Administrativo</h1>
                  <p className="text-slate-400">Log de Acessos e Auditoria do Sistema</p>
               </div>
            </div>
            <button 
              onClick={fetchLogs}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Atualizar
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-700 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-gray-500" />
              Últimos Acessos
            </h3>
            <span className="text-xs font-mono bg-slate-200 text-slate-700 px-2 py-1 rounded">
              Total: {logs.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">Usuário</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Hotel / Empresa</th>
                  <th className="px-6 py-4">Cargo</th>
                  <th className="px-6 py-4">Data/Hora</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {logs.length > 0 ? (
                  logs.map((log, idx) => (
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
                        {new Date(log.timestamp).toLocaleString('pt-BR')}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                      Nenhum registro de acesso encontrado.
                    </td>
                  </tr>
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
