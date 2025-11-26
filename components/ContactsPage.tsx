import React from 'react';
import { ArrowLeft, Mail, Phone, Users, UserCircle } from 'lucide-react';
import { TEAM_CONTACTS } from '../constants';

interface ContactsPageProps {
  onBack: () => void;
}

const ContactsPage: React.FC<ContactsPageProps> = ({ onBack }) => {
  return (
    <div className="animate-fade-in">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-rio-blue transition mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar para o Dashboard
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-rio-blue to-blue-800 p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Equipe e Contatos</h1>
          <p className="text-blue-100">Canais diretos de comunicação com os departamentos do HoteisRio.</p>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM_CONTACTS.map((contact, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-md transition-all border border-gray-200">
                <div className="flex items-center gap-3 mb-4 border-b border-gray-200 pb-3">
                  <div className="bg-blue-100 text-rio-blue p-2 rounded-lg">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm">{contact.sector}</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <UserCircle className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="text-sm text-gray-700 font-medium">{contact.manager}</span>
                  </div>

                  <a href={`mailto:${contact.email}`} className="flex items-center gap-3 group text-sm">
                    <div className="bg-white p-1.5 rounded-full shadow-sm group-hover:bg-rio-blue group-hover:text-white transition-colors text-gray-500">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-gray-600 group-hover:text-rio-blue transition-colors truncate">{contact.email}</span>
                  </a>

                  <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group text-sm">
                    <div className="bg-white p-1.5 rounded-full shadow-sm group-hover:bg-green-500 group-hover:text-white transition-colors text-gray-500">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="text-gray-600 group-hover:text-green-600 transition-colors">WhatsApp Oficial</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;