
import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2, Building, Mail, Phone, User, FileText, Tag, AlignLeft } from 'lucide-react';
import { conexDemandasService } from '../services/conexDemandasService';
import { brevoService } from '../services/brevoService';

const TIPOS_DEMANDA = [
  'Assessoria Jurídica',
  'Ordem Pública',
  'Comercial / Parcerias',
  'Marketing',
  'RH / Talentos',
  'Financeiro',
  'Eventos',
  'Outro',
];

const ConexDemandaForm: React.FC = () => {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    hotel: '',
    telefone: '',
    tipoDemanda: '',
    assunto: '',
    descricao: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const now = new Date().toISOString();

      await conexDemandasService.save({
        nome: form.nome,
        email: form.email,
        hotel: form.hotel,
        telefone: form.telefone || undefined,
        tipoDemanda: form.tipoDemanda,
        assunto: form.assunto,
        descricao: form.descricao,
      });

      await brevoService.sendConexDemandaEmail({
        nome: form.nome,
        email: form.email,
        hotel: form.hotel,
        telefone: form.telefone || undefined,
        tipoDemanda: form.tipoDemanda,
        assunto: form.assunto,
        descricao: form.descricao,
        createdAt: now,
      });

      setStatus('success');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Erro ao enviar. Tente novamente.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Demanda enviada!</h2>
          <p className="text-gray-500 mb-2">
            Sua solicitação foi registrada com sucesso. Nossa equipe entrará em contato em breve.
          </p>
          <p className="text-sm text-gray-400 mb-8">
            Uma cópia foi enviada para <strong>{form.email}</strong>.
          </p>
          <button
            onClick={() => { setStatus('idle'); setForm({ nome: '', email: '', hotel: '', telefone: '', tipoDemanda: '', assunto: '', descricao: '' }); }}
            className="w-full bg-[#1a3c6e] hover:bg-blue-800 text-white font-bold py-3 rounded-xl transition-colors"
          >
            Enviar nova demanda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-[#1a3c6e] px-8 py-8 text-center">
          <img
            src="https://sindhoteisrj.com.br/wp-content/uploads/2023/04/Logo-HoteisRIO-Branca-Fundo-Transparente.png"
            alt="HoteisRio"
            className="h-10 mx-auto mb-4 opacity-90"
          />
          <h1 className="text-2xl font-bold text-white">Portal Conex</h1>
          <p className="text-blue-200 text-sm mt-1">Envie sua demanda para a equipe HoteisRio</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Nome */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nome completo *</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text" required
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                  placeholder="Seu nome"
                  value={form.nome} onChange={set('nome')}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">E-mail *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="email" required
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                  placeholder="seu@email.com"
                  value={form.email} onChange={set('email')}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Hotel */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Hotel / Empresa *</label>
              <div className="relative">
                <Building className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text" required
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                  placeholder="Nome do hotel ou empresa"
                  value={form.hotel} onChange={set('hotel')}
                />
              </div>
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Telefone / WhatsApp <span className="text-gray-400 font-normal">(opcional)</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                  placeholder="(21) 99999-9999"
                  value={form.telefone} onChange={set('telefone')}
                />
              </div>
            </div>
          </div>

          {/* Tipo de Demanda */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Tipo de demanda *</label>
            <div className="relative">
              <Tag className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
              <select
                required
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm appearance-none bg-white"
                value={form.tipoDemanda} onChange={set('tipoDemanda')}
              >
                <option value="">Selecione o tipo...</option>
                {TIPOS_DEMANDA.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Assunto */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Assunto *</label>
            <div className="relative">
              <FileText className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text" required
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                placeholder="Resumo da sua demanda"
                value={form.assunto} onChange={set('assunto')}
              />
            </div>
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Descrição *</label>
            <div className="relative">
              <AlignLeft className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <textarea
                required rows={5}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm resize-none"
                placeholder="Descreva sua demanda em detalhes..."
                value={form.descricao} onChange={set('descricao')}
              />
            </div>
          </div>

          {status === 'error' && (
            <div className="flex items-center gap-2 bg-red-50 text-red-700 border border-red-200 rounded-lg px-4 py-3 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-[#1a3c6e] hover:bg-blue-800 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
          >
            {status === 'loading' ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Enviando...</>
            ) : (
              <><Send className="w-4 h-4" /> Enviar Demanda</>
            )}
          </button>

          <p className="text-xs text-gray-400 text-center">
            Ao enviar, você receberá uma cópia no seu e-mail com os detalhes da demanda.
          </p>
        </form>
      </div>
    </div>
  );
};

export default ConexDemandaForm;
