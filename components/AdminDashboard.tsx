
import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types';
import { adminService } from '../services/adminService';
import { 
  Users, Search, Download, Key, Edit, Trash2, 
  ShieldCheck, Mail, Building2, ArrowLeft, Loader2, CheckCircle2,
  Upload, FileSpreadsheet, AlertTriangle, X
} from 'lucide-react';
import * as XLSX from 'xlsx';

interface AdminDashboardProps {
  onBack: () => void;
  currentUserEmail: string;
}

interface ImportPreviewData {
  name: string;
  email: string;
  hotel: string;
  role: string;
  status: 'PENDING' | 'SUCCESS' | 'ERROR';
  message?: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack, currentUserEmail }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('Todos');
  const [notification, setNotification] = useState<{type: 'success'|'error', msg: string} | null>(null);

  // Import State
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importData, setImportData] = useState<ImportPreviewData[]>([]);
  const [isProcessingImport, setIsProcessingImport] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Hardcoded check for security visualization
  const isAdmin = currentUserEmail === 'marketing@hoteisrio.com.br';

  useEffect(() => {
    const loadUsers = async () => {
      if (isAdmin) {
        await refreshUsers();
      }
    };
    loadUsers();
  }, [isAdmin]);

  const refreshUsers = async () => {
      setLoading(true);
      const fetchedUsers = await adminService.getAllUsers();
      if (fetchedUsers.length === 0) {
         setUsers([
            { id: '1', name: 'Carlos Silva', email: 'gerencia@copacabanapalace.com', hotel: 'Copacabana Palace', role: 'Gerente Geral' },
            { id: '2', name: 'Ana Souza', email: 'ana.souza@windsor.com', hotel: 'Windsor Barra', role: 'RH' },
            { id: '3', name: 'Roberto Lima', email: 'roberto@fasano.com', hotel: 'Fasano Rio', role: 'Comercial' },
            { id: '4', name: 'Marketing HoteisRio', email: 'marketing@hoteisrio.com.br', hotel: 'Sede', role: 'Admin' },
         ]);
      } else {
         setUsers(fetchedUsers);
      }
      setLoading(false);
  };

  const handleResetPassword = async (email: string) => {
    if (!confirm(`Deseja enviar um e-mail de redefinição de senha para ${email}?`)) return;
    
    const result = await adminService.sendUserPasswordReset(email);
    setNotification({
        type: result.success ? 'success' : 'error',
        msg: result.message
    });
    
    setTimeout(() => setNotification(null), 4000);
  };

  const handleExport = () => {
    adminService.exportUsersToCSV(filteredUsers);
  };

  // --- IMPORT LOGIC ---

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
        try {
            const bstr = evt.target?.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][];

            // Parse Data: Assume Header is Row 0
            // Headers expected roughly: Name, Email, Hotel, Role
            const headers = data[0].map((h: string) => h.toLowerCase().trim());
            
            const nameIdx = headers.findIndex(h => h.includes('nome'));
            const emailIdx = headers.findIndex(h => h.includes('email') || h.includes('e-mail'));
            const hotelIdx = headers.findIndex(h => h.includes('hotel') || h.includes('empresa'));
            const roleIdx = headers.findIndex(h => h.includes('cargo') || h.includes('função'));

            if (nameIdx === -1 || emailIdx === -1) {
                alert("Formato inválido. A planilha precisa ter colunas 'Nome' e 'Email'. Baixe o modelo.");
                return;
            }

            const parsed: ImportPreviewData[] = [];
            
            // Start from row 1
            for (let i = 1; i < data.length; i++) {
                const row = data[i];
                if (row.length === 0) continue;
                
                const email = row[emailIdx]?.toString().trim();
                const name = row[nameIdx]?.toString().trim();

                if (email && name) {
                    parsed.push({
                        name: name,
                        email: email,
                        hotel: hotelIdx > -1 ? row[hotelIdx]?.toString().trim() || 'Não informado' : 'Não informado',
                        role: roleIdx > -1 ? row[roleIdx]?.toString().trim() || 'Associado' : 'Associado',
                        status: 'PENDING'
                    });
                }
            }

            setImportData(parsed);
        } catch (error) {
            console.error(error);
            alert("Erro ao ler arquivo. Certifique-se que é um Excel (.xlsx) ou CSV válido.");
        }
    };
    reader.readAsBinaryString(file);
  };

  const executeImport = async () => {
    if (importData.length === 0) return;
    setIsProcessingImport(true);
    let successCount = 0;

    // Clone array to update status locally
    const currentData = [...importData];

    for (let i = 0; i < currentData.length; i++) {
        const user = currentData[i];
        
        // Skip already processed
        if (user.status === 'SUCCESS') {
            successCount++;
            continue;
        }

        try {
            const result = await adminService.registerUserWithoutLogout({
                name: user.name,
                email: user.email,
                hotel: user.hotel,
                role: user.role
            });

            if (result.success) {
                currentData[i].status = 'SUCCESS';
                currentData[i].message = 'Criado com sucesso';
                successCount++;
                // Optional: Send password reset immediately so they set their own password
                await adminService.sendUserPasswordReset(user.email);
            } else {
                currentData[i].status = 'ERROR';
                currentData[i].message = result.error?.includes('email-already-in-use') 
                    ? 'Email já cadastrado' 
                    : result.error || 'Erro desconhecido';
            }
        } catch (err: any) {
            currentData[i].status = 'ERROR';
            currentData[i].message = err.message;
        }

        // Update progress UI
        setImportData([...currentData]);
        setImportProgress(Math.round(((i + 1) / currentData.length) * 100));
    }

    setIsProcessingImport(false);
    if (successCount > 0) {
        setNotification({ type: 'success', msg: `${successCount} usuários importados com sucesso!` });
        refreshUsers();
    }
  };

  // --- FILTERS ---

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.hotel.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'Todos' || 
       (filterRole === 'Gestores' && (user.role.includes('Gerente') || user.role.includes('Diretor'))) ||
       (filterRole === 'Operacional' && (!user.role.includes('Gerente') && !user.role.includes('Diretor')));

    return matchesSearch && matchesRole;
  });

  if (!isAdmin) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <ShieldCheck className="w-16 h-16 text-red-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-800">Acesso Negado</h1>
            <p className="text-gray-600 mb-6">Esta área é restrita a administradores.</p>
            <button onClick={onBack} className="bg-rio-blue text-white px-6 py-2 rounded-lg">Voltar</button>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12 animate-fade-in">
      {/* Header */}
      <div className="bg-slate-900 text-white pt-8 pb-20 px-6 relative overflow-hidden shadow-lg">
        <div className="max-w-7xl mx-auto relative z-10">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-5 h-5" /> Voltar ao App
          </button>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
             <div className="flex items-center gap-4">
                <div className="bg-indigo-600 p-3 rounded-xl shadow-lg shadow-indigo-900/50">
                   <ShieldCheck className="w-8 h-8 text-white" />
                </div>
                <div>
                   <h1 className="text-3xl font-bold">Painel Administrativo</h1>
                   <p className="text-slate-400">Gestão de usuários e controle de acesso.</p>
                </div>
             </div>
             
             <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg px-4 py-2 flex items-center gap-3">
                <Users className="w-5 h-5 text-rio-gold" />
                <span className="text-2xl font-bold">{users.length}</span>
                <span className="text-xs uppercase tracking-wide text-slate-400">Usuários Totais</span>
             </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 relative z-20">
        
        {/* Notification Toast */}
        {notification && (
            <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-xl flex items-center gap-3 z-50 animate-slide-in-right ${notification.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                <span className="font-medium">{notification.msg}</span>
            </div>
        )}

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
           
           {/* Filters Bar */}
           <div className="p-6 border-b border-gray-200 bg-gray-50/50 flex flex-col lg:flex-row gap-4 justify-between items-center">
              <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
                 <div className="relative flex-1 lg:w-80">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                       type="text" 
                       placeholder="Buscar por nome, email ou hotel..." 
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                       className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                 </div>
                 <select 
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                 >
                    <option value="Todos">Todos os Cargos</option>
                    <option value="Gestores">Gestores (GM/Dir)</option>
                    <option value="Operacional">Operacional</option>
                 </select>
              </div>

              <div className="flex gap-2 w-full lg:w-auto">
                <button 
                    onClick={() => {
                        setImportData([]);
                        setIsImportModalOpen(true);
                    }}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm flex-1 lg:flex-none justify-center"
                >
                    <Upload className="w-4 h-4" />
                    Importar Excel
                </button>
                <button 
                    onClick={handleExport}
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm flex-1 lg:flex-none justify-center"
                >
                    <Download className="w-4 h-4" />
                    CSV
                </button>
              </div>
           </div>

           {/* Table */}
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                       <th className="px-6 py-4">Usuário</th>
                       <th className="px-6 py-4">Hotel</th>
                       <th className="px-6 py-4">Cargo</th>
                       <th className="px-6 py-4">Status</th>
                       <th className="px-6 py-4 text-right">Ações</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                    {loading ? (
                       <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                             <div className="flex items-center justify-center gap-2">
                                <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
                                Carregando base de dados...
                             </div>
                          </td>
                       </tr>
                    ) : filteredUsers.length === 0 ? (
                       <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                             Nenhum usuário encontrado com estes filtros.
                          </td>
                       </tr>
                    ) : (
                       filteredUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-indigo-50/30 transition-colors group">
                             <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
                                      {user.name.charAt(0)}
                                   </div>
                                   <div>
                                      <p className="font-bold text-gray-800 text-sm">{user.name}</p>
                                      <div className="flex items-center gap-1 text-gray-500 text-xs">
                                         <Mail className="w-3 h-3" />
                                         {user.email}
                                      </div>
                                   </div>
                                </div>
                             </td>
                             <td className="px-6 py-4">
                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                   <Building2 className="w-4 h-4 text-gray-400" />
                                   {user.hotel}
                                </div>
                             </td>
                             <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                   {user.role}
                                </span>
                             </td>
                             <td className="px-6 py-4">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                                   <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                   Ativo
                                </span>
                             </td>
                             <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                   <button 
                                      onClick={() => handleResetPassword(user.email)}
                                      className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 text-gray-400 transition-all"
                                      title="Enviar E-mail de Redefinição de Senha"
                                   >
                                      <Key className="w-4 h-4" />
                                   </button>
                                   <button 
                                      className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 text-gray-400 transition-all"
                                      title="Editar Dados (Mock)"
                                      onClick={() => alert("Funcionalidade de edição completa requer backend dedicado.")}
                                   >
                                      <Edit className="w-4 h-4" />
                                   </button>
                                </div>
                             </td>
                          </tr>
                       ))
                    )}
                 </tbody>
              </table>
           </div>
           
           <div className="p-4 border-t border-gray-200 bg-gray-50 text-xs text-gray-500 flex justify-between items-center">
              <span>Mostrando {filteredUsers.length} de {users.length} registros</span>
              <span>Acesso seguro: {currentUserEmail}</span>
           </div>
        </div>
      </div>

      {/* IMPORT MODAL */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => !isProcessingImport && setIsImportModalOpen(false)}></div>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col relative z-10 animate-fade-in-up">
                
                {/* Modal Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <Upload className="w-5 h-5 text-indigo-600" />
                            Importação em Massa
                        </h2>
                        <p className="text-sm text-gray-500">Cadastre usuários via Excel (.xlsx) ou CSV</p>
                    </div>
                    {!isProcessingImport && (
                        <button onClick={() => setIsImportModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                            <X className="w-6 h-6" />
                        </button>
                    )}
                </div>

                {/* Modal Body */}
                <div className="p-6 overflow-y-auto flex-1 bg-gray-50">
                    
                    {importData.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-xl bg-white">
                            <div className="bg-indigo-50 p-4 rounded-full mb-4">
                                <FileSpreadsheet className="w-10 h-10 text-indigo-600" />
                            </div>
                            <p className="text-gray-600 font-medium mb-4">Arraste sua planilha ou clique para selecionar</p>
                            <input 
                                type="file" 
                                ref={fileInputRef}
                                accept=".xlsx, .xls, .csv" 
                                className="hidden" 
                                onChange={handleFileChange}
                            />
                            <div className="flex gap-4">
                                <button 
                                    onClick={() => fileInputRef.current?.click()}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-bold transition-colors shadow-md"
                                >
                                    Selecionar Arquivo
                                </button>
                                <button 
                                    onClick={adminService.downloadImportTemplate}
                                    className="text-indigo-600 hover:text-indigo-800 px-4 py-2 text-sm font-semibold underline"
                                >
                                    Baixar Modelo
                                </button>
                            </div>
                            <p className="text-xs text-gray-400 mt-4">Colunas obrigatórias: Nome, Email. Opcionais: Hotel, Cargo.</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                <span className="font-bold text-gray-700 text-sm">{importData.length} registros encontrados</span>
                                {isProcessingImport && (
                                    <div className="flex items-center gap-3">
                                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: `${importProgress}%` }}></div>
                                        </div>
                                        <span className="text-xs font-bold text-indigo-600">{importProgress}%</span>
                                    </div>
                                )}
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-50 text-gray-500 font-semibold sticky top-0">
                                        <tr>
                                            <th className="p-3">Nome</th>
                                            <th className="p-3">Email</th>
                                            <th className="p-3">Hotel</th>
                                            <th className="p-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {importData.map((row, idx) => (
                                            <tr key={idx} className={row.status === 'ERROR' ? 'bg-red-50' : row.status === 'SUCCESS' ? 'bg-green-50' : ''}>
                                                <td className="p-3 text-gray-800">{row.name}</td>
                                                <td className="p-3 text-gray-600">{row.email}</td>
                                                <td className="p-3 text-gray-600">{row.hotel}</td>
                                                <td className="p-3">
                                                    {row.status === 'PENDING' && <span className="text-gray-400">Pendente</span>}
                                                    {row.status === 'SUCCESS' && <span className="text-green-600 font-bold flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> OK</span>}
                                                    {row.status === 'ERROR' && <span className="text-red-600 font-bold flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> {row.message}</span>}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-gray-100 flex justify-between items-center">
                    {importData.length > 0 && !isProcessingImport ? (
                        <>
                            <button 
                                onClick={() => setImportData([])}
                                className="text-red-500 hover:text-red-700 font-medium text-sm"
                            >
                                Cancelar / Limpar
                            </button>
                            <button 
                                onClick={executeImport}
                                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
                            >
                                <Upload className="w-4 h-4" />
                                Confirmar Importação
                            </button>
                        </>
                    ) : isProcessingImport ? (
                        <div className="w-full text-center text-gray-500 text-sm flex items-center justify-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Processando... Por favor não feche a janela.
                        </div>
                    ) : (
                        <div className="w-full text-right">
                            <button onClick={() => setIsImportModalOpen(false)} className="text-gray-500 hover:text-gray-800">Fechar</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
