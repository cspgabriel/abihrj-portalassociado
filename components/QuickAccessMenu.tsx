import React, { useState } from 'react';
import { BENEFITS_DATA } from '../constants';
import { ButtonHTMLAttributes } from 'react';
import { Menu, X, Grid, Search } from 'lucide-react';

interface QuickAccessMenuProps {
  onUse: (benefitId: string) => void;
}

const QUICK_IDS = ['juridico-01', 'calendar-2026', 'occupancy-reports', 'portal-fornecedores-new', 'rio-international-press'];

const QuickAccessMenu: React.FC<QuickAccessMenuProps> = ({ onUse }) => {
  const [open, setOpen] = useState(false);

  const handleClick = (id: string) => {
    const benefit = BENEFITS_DATA.find(b => b.id === id);
    if (benefit) onUse(id);
    setOpen(false);
  };

  return (
    <div className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-40 flex flex-col items-end">
      {open && (
        <div className="mb-3 w-64 bg-white rounded-2xl shadow-2xl p-3 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-bold">Acesso Rápido</h4>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-700"><X className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {QUICK_IDS.map(id => {
              const b = BENEFITS_DATA.find(x => x.id === id);
              if (!b) return null;
              return (
                <button key={id} onClick={() => handleClick(id)} className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition">
                  <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center text-gray-700 font-semibold">{b.title.charAt(0)}</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-800 truncate">{b.title}</div>
                    <div className="text-xs text-gray-500 truncate">{b.description}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <button onClick={() => setOpen(!open)} className="bg-rio-blue hover:bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center">
        <Menu className="w-5 h-5" />
      </button>
    </div>
  );
};

export default QuickAccessMenu;
