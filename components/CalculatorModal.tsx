
import React, { useState } from 'react';
import { X, Calculator, ArrowRight, RefreshCw, TrendingUp, Info } from 'lucide-react';
import { Benefit } from '../types';

interface CalculatorModalProps {
  onClose: () => void;
  benefit?: Benefit;
}

const CalculatorModal: React.FC<CalculatorModalProps> = ({ onClose, benefit }) => {
  // Common inputs
  const [revenue, setRevenue] = useState('');
  const [roomsSold, setRoomsSold] = useState('');
  const [roomsAvailable, setRoomsAvailable] = useState('');
  const [bedsAvailable, setBedsAvailable] = useState('');
  const [grossProfit, setGrossProfit] = useState('');

  // All-in-one calculator inputs
  const [period, setPeriod] = useState('30'); // Default 30 days
  const [inventory, setInventory] = useState('100'); // Default 100 rooms
  const [commissions, setCommissions] = useState('');
  const [marketRevPar, setMarketRevPar] = useState('');
  const [marketOcc, setMarketOcc] = useState('');

  const [result, setResult] = useState<string | null>(null);
  const [detailedResult, setDetailedResult] = useState<any | null>(null);

  const isAllInOne = benefit?.id === 'calc-all-in-one';
  const type = benefit?.id || 'calc-adr'; // Default fallback

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const formatPercent = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(val / 100);
  };

  const handleCalculate = () => {
    if (isAllInOne) {
       // All-in-one logic
       const p = parseFloat(period);
       const inv = parseFloat(inventory);
       const sold = parseFloat(roomsSold);
       const rev = parseFloat(revenue.replace(/\./g, '').replace(',', '.')); // Simple handling for copy paste, ideally better input masking
       const comm = parseFloat(commissions.replace(/\./g, '').replace(',', '.') || '0');
       const mRevPar = parseFloat(marketRevPar.replace(/\./g, '').replace(',', '.') || '0');
       const mOcc = parseFloat(marketOcc.replace(',', '.') || '0');

       if (!p || !inv || !sold || !rev) {
           setResult("Preencha os campos principais.");
           return;
       }

       const totalAvailable = p * inv;
       const occ = (sold / totalAvailable) * 100;
       const adr = rev / sold;
       const revPar = rev / totalAvailable;
       const netRev = rev - comm;
       const netRevPar = netRev / totalAvailable;

       // Indexes
       const mpi = mOcc > 0 ? (occ / mOcc) * 100 : 0; // Market Penetration Index
       const rgi = mRevPar > 0 ? (revPar / mRevPar) * 100 : 0; // Revenue Generation Index

       setDetailedResult({
           adr: formatCurrency(adr),
           revPar: formatCurrency(revPar),
           netRevPar: formatCurrency(netRevPar),
           occ: formatPercent(occ),
           mpi: mpi.toFixed(1) + '%',
           rgi: rgi.toFixed(1) + '%'
       });
       return;
    }

    // Individual calculators
    const rev = parseFloat(revenue.replace(',', '.'));
    const sold = parseFloat(roomsSold);
    const avail = parseFloat(roomsAvailable);
    const profit = parseFloat(grossProfit.replace(',', '.'));
    const beds = parseFloat(bedsAvailable);

    let res = 0;
    let unit = '';

    switch (type) {
      case 'calc-adr':
        if (rev && sold) { res = rev / sold; unit = 'BRL'; }
        break;
      case 'calc-revpar':
        if (rev && avail) { res = rev / avail; unit = 'BRL'; }
        break;
      case 'calc-occ':
        if (sold && avail) { res = (sold / avail) * 100; unit = '%'; }
        break;
      case 'calc-goppar':
        if (profit && avail) { res = profit / avail; unit = 'BRL'; }
        break;
      case 'calc-trevpar':
        if (rev && avail) { res = rev / avail; unit = 'BRL'; } // Same logic as revpar but explicitly Total Revenue
        break;
      case 'calc-trevpab':
        if (rev && beds) { res = rev / beds; unit = 'BRL'; }
        break;
      default:
        setResult("Calculadora não encontrada.");
        return;
    }

    if (unit === 'BRL') {
        setResult(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(res));
    } else {
        setResult(res.toFixed(1) + '%');
    }
  };

  const clear = () => {
    setRevenue('');
    setRoomsSold('');
    setRoomsAvailable('');
    setBedsAvailable('');
    setGrossProfit('');
    setCommissions('');
    setMarketRevPar('');
    setMarketOcc('');
    setResult(null);
    setDetailedResult(null);
  };

  const getTitle = () => {
     if(isAllInOne) return "Calculadora Hoteleira Completa";
     return benefit?.title || "Calculadora";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl animate-scale-in overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-rio-blue to-blue-900 p-6 text-white shrink-0">
          <div className="flex justify-between items-start">
             <div className="flex items-center gap-3">
               <div className="bg-white/20 p-2 rounded-lg">
                 <Calculator className="w-6 h-6 text-white" />
               </div>
               <div>
                 <h2 className="text-xl font-bold">{getTitle()}</h2>
                 <p className="text-blue-100 text-sm">{benefit?.description}</p>
               </div>
             </div>
             <button onClick={onClose} className="text-white/80 hover:text-white">
               <X className="w-6 h-6" />
             </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1">
          
          {isAllInOne ? (
             <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                   <h3 className="font-bold text-rio-blue mb-3 text-sm uppercase flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" /> Métricas do seu Hotel
                   </h3>
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Período (Dias)</label>
                        <input type="number" value={period} onChange={e => setPeriod(e.target.value)} className="w-full border rounded p-2 text-sm" placeholder="Ex: 30" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Nº Apartamentos</label>
                        <input type="number" value={inventory} onChange={e => setInventory(e.target.value)} className="w-full border rounded p-2 text-sm" placeholder="Ex: 100" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Diárias Vendidas</label>
                        <input type="number" value={roomsSold} onChange={e => setRoomsSold(e.target.value)} className="w-full border rounded p-2 text-sm" placeholder="Ex: 2100" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Receita Total (R$)</label>
                        <input type="number" value={revenue} onChange={e => setRevenue(e.target.value)} className="w-full border rounded p-2 text-sm" placeholder="370000" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Comissões Totais (R$)</label>
                        <input type="number" value={commissions} onChange={e => setCommissions(e.target.value)} className="w-full border rounded p-2 text-sm" placeholder="70000" />
                      </div>
                   </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                   <h3 className="font-bold text-gray-600 mb-3 text-sm uppercase flex items-center gap-2">
                      <Info className="w-4 h-4" /> Métricas de Mercado
                   </h3>
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">RevPAR Médio Concorrentes</label>
                        <input type="number" value={marketRevPar} onChange={e => setMarketRevPar(e.target.value)} className="w-full border rounded p-2 text-sm" placeholder="Ex: 145.00" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Ocupação Média (%)</label>
                        <input type="number" value={marketOcc} onChange={e => setMarketOcc(e.target.value)} className="w-full border rounded p-2 text-sm" placeholder="Ex: 80" />
                      </div>
                   </div>
                </div>

                <button 
                  onClick={handleCalculate}
                  className="w-full bg-rio-gold text-blue-900 font-bold py-3 rounded-lg hover:bg-yellow-500 transition shadow-md"
                >
                  Calcular Relatório Completo
                </button>

                {detailedResult && (
                  <div className="bg-white border-2 border-rio-blue rounded-xl p-4 shadow-lg animate-fade-in">
                      <h3 className="font-bold text-gray-800 border-b pb-2 mb-3">Resultados</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-2">
                          <div>
                             <p className="text-xs text-gray-500">RevPAR</p>
                             <p className="font-bold text-lg text-rio-blue">{detailedResult.revPar}</p>
                          </div>
                          <div>
                             <p className="text-xs text-gray-500">Net RevPAR</p>
                             <p className="font-bold text-lg text-green-600">{detailedResult.netRevPar}</p>
                          </div>
                          <div>
                             <p className="text-xs text-gray-500">ADR (Diária Média)</p>
                             <p className="font-bold text-lg text-gray-800">{detailedResult.adr}</p>
                          </div>
                          <div>
                             <p className="text-xs text-gray-500">Ocupação (OCC)</p>
                             <p className="font-bold text-lg text-gray-800">{detailedResult.occ}</p>
                          </div>
                          <div>
                             <p className="text-xs text-gray-500">MPI (Penetração)</p>
                             <p className="font-bold text-lg text-purple-600">{detailedResult.mpi}</p>
                          </div>
                          <div>
                             <p className="text-xs text-gray-500">RGI (Receita)</p>
                             <p className="font-bold text-lg text-purple-600">{detailedResult.rgi}</p>
                          </div>
                      </div>
                  </div>
                )}
             </div>
          ) : (
            // Individual Calculators Logic
            <div className="space-y-6">
              {['calc-adr', 'calc-revpar', 'calc-trevpar'].includes(type) && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Receita Total do Período (R$)</label>
                  <input 
                    type="number" 
                    value={revenue} 
                    onChange={(e) => setRevenue(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rio-blue outline-none"
                    placeholder="Ex: 50000"
                  />
                </div>
              )}

              {['calc-adr', 'calc-occ'].includes(type) && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Número de Diárias Vendidas</label>
                  <input 
                    type="number" 
                    value={roomsSold} 
                    onChange={(e) => setRoomsSold(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rio-blue outline-none"
                    placeholder="Ex: 150"
                  />
                </div>
              )}

              {['calc-revpar', 'calc-occ', 'calc-goppar', 'calc-trevpar'].includes(type) && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Número de Quartos Disponíveis (Inventário x Dias)</label>
                  <input 
                    type="number" 
                    value={roomsAvailable} 
                    onChange={(e) => setRoomsAvailable(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rio-blue outline-none"
                    placeholder="Ex: 300"
                  />
                </div>
              )}
              
              {type === 'calc-goppar' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Lucro Operacional Bruto (GOP)</label>
                  <input 
                    type="number" 
                    value={grossProfit} 
                    onChange={(e) => setGrossProfit(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rio-blue outline-none"
                    placeholder="Ex: 20000"
                  />
                </div>
              )}

              {type === 'calc-trevpab' && (
                <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Receita Total</label>
                  <input type="number" value={revenue} onChange={e => setRevenue(e.target.value)} className="w-full p-3 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Número de Camas Disponíveis</label>
                  <input type="number" value={bedsAvailable} onChange={e => setBedsAvailable(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="Ex: 50" />
                </div>
                </>
              )}

              <button 
                onClick={handleCalculate}
                className="w-full bg-rio-blue hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                Calcular Agora
                <ArrowRight className="w-5 h-5" />
              </button>

              {result && (
                <div className="bg-green-50 border border-green-200 p-6 rounded-xl text-center animate-fade-in">
                  <p className="text-gray-500 text-sm uppercase font-bold mb-1">Resultado</p>
                  <p className="text-4xl font-black text-green-600 tracking-tight">{result}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between shrink-0">
          <button 
            onClick={clear}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            <RefreshCw className="w-4 h-4" />
            Limpar
          </button>
        </div>

      </div>
    </div>
  );
};

export default CalculatorModal;