

import React from 'react';
import { ArrowLeft, Users, Calendar, MapPin, ArrowRight, Lightbulb } from 'lucide-react';
import { FORUMS_DATA } from '../constants';
import * as Icons from 'lucide-react';
import { Forum } from '../types';

interface ForumsOverviewPageProps {
  onBack: () => void;
  onForumClick: (forum: Forum) => void;
}

const ForumsOverviewPage: React.FC<ForumsOverviewPageProps> = ({ onBack, onForumClick }) => {
  return (
    <div className="bg-gray-50 min-h-screen pb-12 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-rio-blue to-indigo-900 text-white pt-8 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-10 -mb-10 blur-2xl" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para Dashboard
          </button>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
              <Users className="w-16 h-16 text-rio-gold" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Fóruns da Hotelaria</h1>
              <p className="text-blue-100 text-lg md:text-xl max-w-2xl leading-relaxed">
                Participe dos comitês estratégicos que definem o futuro do turismo no Rio. Networking, aprendizado e alinhamento de interesses em um só lugar.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 relative z-20">
        
        {/* Intro Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-8 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-rio-gold" />
                    Por que participar?
                </h2>
                <p className="text-gray-600 leading-relaxed">
                    Os fóruns são espaços exclusivos para associados ABIH-RJ. Aqui, gestores de diferentes áreas (RH, Comercial, Segurança, etc.) se reúnem periodicamente para trocar experiências, resolver problemas comuns e definir estratégias unificadas para o destino Rio de Janeiro.
                </p>
            </div>
            <div className="flex gap-4">
                 <div className="text-center bg-gray-50 p-4 rounded-xl border border-gray-100 min-w-[120px]">
                     <span className="block text-2xl font-bold text-rio-blue">5</span>
                     <span className="text-xs text-gray-500 uppercase font-bold">Comitês Ativos</span>
                 </div>
                 <div className="text-center bg-gray-50 p-4 rounded-xl border border-gray-100 min-w-[120px]">
                     <span className="block text-2xl font-bold text-green-600">Mensal</span>
                     <span className="text-xs text-gray-500 uppercase font-bold">Frequência</span>
                 </div>
            </div>
        </div>

        {/* Forum List */}
        <div className="grid grid-cols-1 gap-6">
            {FORUMS_DATA.map((forum) => {
                 const IconComponent = (Icons as any)[forum.iconName] || Icons.Users;
                 return (
                    <div 
                        key={forum.id}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow p-6 flex flex-col md:flex-row gap-6 items-start"
                    >
                        {/* Icon & Title */}
                        <div className="flex-1 flex gap-4">
                            <div className="shrink-0 bg-blue-50 text-rio-blue p-4 rounded-xl h-fit">
                                <IconComponent className="w-8 h-8" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{forum.title}</h3>
                                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{forum.description}</p>
                                
                                <div className="flex flex-wrap gap-4 text-xs font-medium text-gray-500">
                                    <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                                        <Calendar className="w-3.5 h-3.5" />
                                        Próximo: {forum.nextEdition.date.split(',')[0]}
                                    </span>
                                    <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                                        <MapPin className="w-3.5 h-3.5" />
                                        {forum.nextEdition.location}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Action */}
                        <div className="w-full md:w-auto flex flex-col gap-2 mt-2 md:mt-0">
                             <button 
                                onClick={() => onForumClick(forum)}
                                className="w-full md:w-48 bg-rio-blue hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 text-sm"
                             >
                                Ver Detalhes
                                <ArrowRight className="w-4 h-4" />
                             </button>
                             <div className="text-center">
                                 <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">
                                     Inscrições Abertas
                                 </span>
                             </div>
                        </div>
                    </div>
                 )
            })}
        </div>

      </div>
    </div>
  );
};

export default ForumsOverviewPage;