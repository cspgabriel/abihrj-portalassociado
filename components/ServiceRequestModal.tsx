import React, { useState } from 'react';
import { X, Send, AlertTriangle, ShieldCheck, Camera, Loader2 } from 'lucide-react';
import { Benefit } from '../types';
import { requestService } from '../services/requestService';
import { auth } from '../firebaseConfig';

interface ServiceRequestModalProps {
  benefit: Benefit;
  onClose: () => void;
}

const ServiceRequestModal: React.FC<ServiceRequestModalProps> = ({ benefit, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  // Form States
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Segurança'); // For Public Order

  const isLegal = benefit.id === 'juridico-01';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const currentUser = auth.currentUser;
    if (!currentUser) {
      setError("Você precisa estar logado para enviar uma solicitação.");
      setLoading(false);
      return;
    }

    try {
      // Enviando para o Banco de Dados Real
      await requestService.createRequest({
        userId: currentUser.uid,
        userEmail: currentUser.email || 'sem-email',
        type: isLegal ? 'JURIDICO' : 'ORDEM_PUBLICA',
        category: isLegal ? 'Dúvida Jurídica' : type,
        subject: subject,
        description: description,
        status: 'PENDENTE'
      });
      
      setSuccess(true);
    } catch (err: any) {
      setError("Erro ao salvar: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
         <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
         <div className="relative bg-white rounded-2xl p-8 max-w-md w-full text-center animate-scale-in">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Solicitação Salva!</h2>
            <p className="text-gray-600 mb-6">
              {isLegal 
                ? 'Sua solicitação foi registrada no sistema jurídico e nosso time foi notificado.'
                : 'Demanda registrada no banco de dados de Ordem Pública.'}
            </p>
            <button onClick={onClose} className="w-full bg-rio-blue text-white py-2.5 rounded-lg font-bold hover:bg-blue-700 transition">
              Voltar ao Portal
            </button>
         </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full flex flex-col animate-scale-in max-h-[90vh]">
        
        {/* Header */}
        <div className={`p-6 rounded-t-2xl flex justify-between items-center text-white ${isLegal ? 'bg-slate-800' : 'bg-red-700'}`}>
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              {isLegal ? <ShieldCheck className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
            </div>
            <div>
              <h2 className="text-xl font-bold">{isLegal ? 'Assessoria Jurídica' : 'Reportar Ordem Pública'}</h2>
              <p className="text-xs opacity-80">
                {isLegal ? 'Canal exclusivo para associados' : 'Conexão direta com a Prefeitura'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 overflow-y-auto">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {!isLegal && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Ocorrência</label>
                <select 
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-rio-blue outline-none"
                >
                  <option>Segurança / Policiamento</option>
                  <option>Comércio Ambulante Irregular</option>
                  <option>Lixo / Limpeza Urbana</option>
                  <option>Iluminação Pública</option>
                  <option>Perturbação do Sossego (Barulho)</option>
                  <option>População em Situação de Rua</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isLegal ? 'Assunto' : 'Localização Exata'}
              </label>
              <input 
                type="text" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={isLegal ? "Ex: Dúvida sobre Convenção Coletiva" : "Ex: Em frente à entrada principal do hotel"}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-rio-blue outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição Detalhada</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                placeholder={isLegal ? "Descreva sua dúvida jurídica..." : "Descreva o problema observado para enviarmos à autoridade competente..."}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-rio-blue outline-none resize-none"
                required
              />
            </div>

            {!isLegal && (
               <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition cursor-pointer">
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Adicionar foto da ocorrência (Opcional)</p>
               </div>
            )}

            <div className="pt-4 flex justify-end gap-3">
               <button 
                 type="button" 
                 onClick={onClose}
                 className="px-6 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 font-medium"
               >
                 Cancelar
               </button>
               <button 
                 type="submit" 
                 disabled={loading}
                 className={`
                   px-6 py-2.5 rounded-lg text-white font-bold shadow-lg flex items-center gap-2
                   ${isLegal ? 'bg-slate-800 hover:bg-slate-900' : 'bg-red-700 hover:bg-red-800'}
                 `}
               >
                 {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4" />}
                 {isLegal ? 'Enviar Consulta' : 'Registrar Ocorrência'}
               </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequestModal;