import React, { useState, useMemo } from 'react';
import { BENEFITS_DATA } from '../constants';
import { Menu, X } from 'lucide-react';

interface QuickAccessMenuProps {
  onUse: (id: string) => void;
}

const QUICK_IDS = ['juridico-01', 'portal-fornecedores-new', 'rio-international-press'];

const QuickAccessMenu: React.FC<QuickAccessMenuProps> = ({ onUse }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const allItems = useMemo(() => {
    return BENEFITS_DATA.slice().sort((a, b) => (a.title || '').localeCompare(b.title || ''));
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return allItems;
    const q = query.toLowerCase();
    return allItems.filter(b => (b.title + ' ' + (b.description || '')).toLowerCase().includes(q)).slice(0, 200);
  }, [query, allItems]);

  const handleClick = (id: string) => {
    onUse(id);
    setOpen(false);
    setQuery('');
  };

  return (
    <div className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-40 flex flex-col items-end">
      {open && (
        <div className="mb-3 w-80 bg-gradient-to-br from-rio-blue to-blue-600 text-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-3 flex items-center justify-between">
            <h4 className="text-sm font-semibold">Acesso Rápido</h4>
            <button onClick={() => { setOpen(false); setQuery(''); }} className="text-white/90 hover:text-white"><X className="w-4 h-4" /></button>
          </div>

          <div className="px-3 pb-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pesquisar benefícios..."
              className="w-full mb-2 px-3 py-2 rounded-lg text-sm bg-white/10 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>

          <div className="max-h-64 overflow-y-auto px-2 pb-3">
            <div className="space-y-2">
              {filtered.map(b => (
                <button key={b.id} onClick={() => handleClick(b.id)} className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition">
                  <div className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center text-white font-semibold">{b.title.charAt(0)}</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium truncate">{b.title}</div>
                    <div className="text-xs text-white/80 truncate">{b.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <button onClick={() => setOpen(!open)} className="bg-gradient-to-r from-rio-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center">
        <Menu className="w-5 h-5" />
      </button>
    </div>
  );
};

export default QuickAccessMenu;
