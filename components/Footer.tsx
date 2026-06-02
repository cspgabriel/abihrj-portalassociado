
import React from 'react';
import { FOOTER_DATA, WHATSAPP_GROUPS } from '../constants';
import { MapPin, Phone, Mail, Instagram, Linkedin, Youtube, Facebook, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate?: (view: string) => void;
  onBenefitClick?: (id: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, onBenefitClick }) => {
  const currentYear = new Date().getFullYear();

  const handleNav = (view: string) => onNavigate?.(view);
  const handleBenefit = (id: string) => onBenefitClick?.(id);

  return (
    <footer className="bg-rio-blue text-blue-100 pt-16 pb-8 border-t border-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 border-b border-blue-800 pb-12">
          
          {/* Coluna 1: Sobre */}
          <div className="space-y-6">
            <img 
              src="https://sindhoteisrj.com.br/wp-content/uploads/2023/04/Logo-HoteisRIO-Branca-Fundo-Transparente.png" 
              alt="HoteisRio" 
              className="h-12 brightness-0 invert opacity-90"
            />
            <p className="text-sm leading-relaxed text-blue-100">
              Fortalecendo a hotelaria carioca há décadas. Defendemos os interesses do setor, promovemos o turismo e oferecemos soluções estratégicas para nossos associados.
            </p>
            <div className="flex gap-4">
               {FOOTER_DATA.socials.instagram && (
                 <a href={FOOTER_DATA.socials.instagram} target="_blank" rel="noreferrer" className="bg-blue-800 p-2 rounded-lg hover:bg-rio-gold hover:text-rio-blue transition-colors text-white">
                   <Instagram className="w-5 h-5" />
                 </a>
               )}
               {FOOTER_DATA.socials.linkedin && (
                 <a href={FOOTER_DATA.socials.linkedin} target="_blank" rel="noreferrer" className="bg-blue-800 p-2 rounded-lg hover:bg-rio-gold hover:text-rio-blue transition-colors text-white">
                   <Linkedin className="w-5 h-5" />
                 </a>
               )}
               {FOOTER_DATA.socials.youtube && (
                 <a href={FOOTER_DATA.socials.youtube} target="_blank" rel="noreferrer" className="bg-blue-800 p-2 rounded-lg hover:bg-rio-gold hover:text-rio-blue transition-colors text-white">
                   <Youtube className="w-5 h-5" />
                 </a>
               )}
               {FOOTER_DATA.socials.facebook && (
                 <a href={FOOTER_DATA.socials.facebook} target="_blank" rel="noreferrer" className="bg-blue-800 p-2 rounded-lg hover:bg-rio-gold hover:text-rio-blue transition-colors text-white">
                   <Facebook className="w-5 h-5" />
                 </a>
               )}
            </div>
          </div>

          {/* Coluna 2: Acesso Rápido */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-rio-gold rounded-full"></span>
              Acesso Rápido
            </h3>
            <ul className="space-y-3">
              <li>
                <span className="flex items-center gap-2 text-sm text-white/30 cursor-not-allowed">
                  <ArrowUpRight className="w-3 h-3" /> Calendário de Eventos <span className="text-xs bg-white/10 px-1.5 py-0.5 rounded-full">Em breve</span>
                </span>
              </li>
              <li>
                <button onClick={() => handleBenefit('portal-fornecedores-new')} className="hover:text-rio-gold transition-colors flex items-center gap-2 text-sm">
                  <ArrowUpRight className="w-3 h-3" /> Fornecedores
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('COURSES_V2')} className="hover:text-rio-gold transition-colors flex items-center gap-2 text-sm">
                  <ArrowUpRight className="w-3 h-3" /> Cursos &amp; Treinamentos
                </button>
              </li>
              <li>
                <button onClick={() => handleBenefit('leis-decretos-app')} className="hover:text-rio-gold transition-colors flex items-center gap-2 text-sm">
                  <ArrowUpRight className="w-3 h-3" /> Leis e Decretos
                </button>
              </li>
              {/* MUDANÇA: Kit de Marketing adicionado ao rodapé */}
              <li>
                <button onClick={() => handleNav('MARKETING_KIT')} className="hover:text-rio-gold transition-colors flex items-center gap-2 text-sm">
                  <ArrowUpRight className="w-3 h-3" /> Kit de Marketing
                </button>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Grupos e Comunidade */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-white rounded-full"></span>
              Grupos do WhatsApp
            </h3>
            <ul className="space-y-3">
              {WHATSAPP_GROUPS.slice(0, 5).map(group => (
                 <li key={group.id}>
                   <a href={group.link} target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-2 text-sm">
                     <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                     {group.name}
                   </a>
                 </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4: Contato */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-rio-gold rounded-full"></span>
              Fale Conosco
            </h3>
            <div className="space-y-4 text-sm text-blue-50">
              <div className="flex items-start gap-3">
                 <MapPin className="w-5 h-5 text-rio-gold shrink-0 mt-0.5" />
                 {/* MUDANÇA: Endereço correto conforme solicitado */}
                 <p>{FOOTER_DATA.address}<br/>CEP: {FOOTER_DATA.cep}</p>
              </div>
              <div className="flex items-center gap-3">
                 <Phone className="w-5 h-5 text-rio-gold shrink-0" />
                 <p>{FOOTER_DATA.phone}</p>
              </div>
              <div className="flex items-center gap-3">
                 <Mail className="w-5 h-5 text-rio-gold shrink-0" />
                 <a href={`mailto:${FOOTER_DATA.email}`} className="hover:text-white transition-colors">{FOOTER_DATA.email}</a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-blue-300 gap-4">
          <p>&copy; {currentYear} {FOOTER_DATA.razaoSocial}. Todos os direitos reservados. (v2.0)</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              CNPJ: {FOOTER_DATA.cnpj}
            </span>
            <a href="#" className="hover:text-white">Política de Privacidade</a>
            <a href="#" className="hover:text-white">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
