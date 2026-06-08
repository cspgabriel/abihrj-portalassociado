
import React, { useState } from 'react';
import { X, Calculator, ArrowRight, RefreshCw, TrendingUp, Info, Scale, HelpCircle } from 'lucide-react';
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
  const [comparisonPeriod, setComparisonPeriod] = useState('30');
  const [comparisonInventory, setComparisonInventory] = useState('100');
  const [comparisonOccupancy, setComparisonOccupancy] = useState('86');
  const [comparisonCurrentAdr, setComparisonCurrentAdr] = useState('500');
  const [comparisonSimulatedAdr, setComparisonSimulatedAdr] = useState('600');
  const [showAdrHelp, setShowAdrHelp] = useState(false);

  const [result, setResult] = useState<string | null>(null);
  const [detailedResult, setDetailedResult] = useState<any | null>(null);

  const isAllInOne = benefit?.id === 'calc-all-in-one';
  const type = benefit?.id || 'calc-adr'; // Default fallback
  const isAdrCalculator = type === 'calc-adr';

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const formatPercent = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(val / 100);
  };

  const parseBrazilianNumber = (value: string) => {
    const raw = String(value ?? '').trim().replace(/\s/g, '');
    if (!raw) return NaN;

    const hasComma = raw.includes(',');
    const hasDot = raw.includes('.');

    if (hasComma && hasDot) {
      return parseFloat(raw.replace(/\./g, '').replace(',', '.'));
    }

    if (hasComma) {
      return parseFloat(raw.replace(',', '.'));
    }

    if (hasDot) {
      const looksLikeThousands = /^\d{1,3}(\.\d{3})+$/.test(raw);
      return parseFloat(looksLikeThousands ? raw.replace(/\./g, '') : raw);
    }

    return parseFloat(raw);
  };

  const getAdrComparison = () => {
    const p = parseBrazilianNumber(comparisonPeriod);
    const inv = parseBrazilianNumber(comparisonInventory);
    const occ = parseBrazilianNumber(comparisonOccupancy);
    const currentAdr = parseBrazilianNumber(comparisonCurrentAdr);
    const simulatedAdr = parseBrazilianNumber(comparisonSimulatedAdr);

    if (!p || !inv || !occ || !currentAdr || !simulatedAdr) return null;

    const availableRoomNights = p * inv;
    const occupiedRoomNights = availableRoomNights * (occ / 100);
    const currentRevenue = occupiedRoomNights * currentAdr;
    const simulatedRevenue = occupiedRoomNights * simulatedAdr;
    const currentRevPar = currentRevenue / availableRoomNights;
    const simulatedRevPar = simulatedRevenue / availableRoomNights;
    const revenueDifference = simulatedRevenue - currentRevenue;
    const differencePercent = currentRevenue > 0 ? (revenueDifference / currentRevenue) * 100 : 0;

    return {
      occupiedRoomNights,
      currentRevenue,
      simulatedRevenue,
      currentRevPar,
      simulatedRevPar,
      revenueDifference,
      differencePercent,
      occupancy: occ,
      currentAdr,
      simulatedAdr
    };
  };

  const adrComparison = isAdrCalculator ? getAdrComparison() : null;

  const handleCalculate = () => {
    if (isAllInOne) {
       // All-in-one logic
       const p = parseBrazilianNumber(period);
       const inv = parseBrazilianNumber(inventory);
       const sold = parseBrazilianNumber(roomsSold);
       const rev = parseBrazilianNumber(revenue);
       const comm = parseBrazilianNumber(commissions || '0');
       const mRevPar = parseBrazilianNumber(marketRevPar || '0');
       const mOcc = parseBrazilianNumber(marketOcc || '0');

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
    const rev = parseBrazilianNumber(revenue);
    const sold = parseBrazilianNumber(roomsSold);
    const avail = parseBrazilianNumber(roomsAvailable);
    const profit = parseBrazilianNumber(grossProfit);
    const beds = parseBrazilianNumber(bedsAvailable);

    let res = 0;
    let unit = '';

    switch (type) {
      case 'calc-adr':
        if (rev && sold) {
          res = rev / sold;
          unit = 'BRL';
          setComparisonCurrentAdr(res.toFixed(2));

          const comparisonAvailable = parseBrazilianNumber(comparisonPeriod) * parseBrazilianNumber(comparisonInventory);
          if (comparisonAvailable > 0) {
            setComparisonOccupancy(((sold / comparisonAvailable) * 100).toFixed(1));
          }
        }
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
    setComparisonPeriod('30');
    setComparisonInventory('100');
    setComparisonOccupancy('86');
    setComparisonCurrentAdr('500');
    setComparisonSimulatedAdr('600');
    setShowAdrHelp(false);
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
      <div className={`relative bg-white rounded-2xl shadow-2xl w-full ${isAdrCalculator ? 'max-w-4xl' : 'max-w-2xl'} animate-scale-in overflow-hidden flex flex-col max-h-[92vh]`}>
        
        {/* Header */}
        <div className={`bg-gradient-to-r from-rio-blue to-blue-900 ${isAdrCalculator ? 'p-4' : 'p-6'} text-white shrink-0`}>
          <div className="flex justify-between items-start">
             <div className="flex items-center gap-3">
               <div className="bg-white/20 p-2 rounded-lg">
                 <Calculator className="w-6 h-6 text-white" />
               </div>
               <div>
                 <h2 className={`${isAdrCalculator ? 'text-lg' : 'text-xl'} font-bold`}>{getTitle()}</h2>
                 <p className="text-blue-100 text-sm leading-snug">{benefit?.description}</p>
               </div>
             </div>
             <button onClick={onClose} className="text-white/80 hover:text-white">
               <X className="w-6 h-6" />
             </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className={`${isAdrCalculator ? 'p-4 md:p-5' : 'p-6 md:p-8'} overflow-y-auto flex-1`}>
          
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
            isAdrCalculator ? (
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3 items-end">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Receita Total do Período (R$)</label>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={revenue}
                      onChange={(e) => setRevenue(e.target.value)}
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rio-blue outline-none"
                      placeholder="Ex: 1290000"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Diárias Vendidas</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={roomsSold}
                      onChange={(e) => setRoomsSold(e.target.value)}
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rio-blue outline-none"
                      placeholder="Ex: 2580"
                    />
                  </div>
                  <button
                    onClick={handleCalculate}
                    className="bg-rio-blue hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    Calcular
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {result && (
                  <div className="bg-green-50 border border-green-200 px-4 py-2.5 rounded-xl animate-fade-in flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                    <p className="text-xs text-gray-500 uppercase font-black">Diária média calculada na etapa 1</p>
                    <p className="text-2xl font-black text-green-700 tracking-tight">{result}</p>
                  </div>
                )}

                <div className="bg-gradient-to-br from-blue-50 via-white to-amber-50 border border-blue-100 rounded-2xl p-4 shadow-sm space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="font-black text-rio-blue flex items-center gap-2 text-base">
                        <Scale className="w-4 h-4 text-rio-gold" />
                        Comparador de diária média
                      </h3>
                      <p className="text-xs text-gray-600 mt-0.5">
                        A diária atual e a ocupação são preenchidas pela etapa 1 quando possível.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShowAdrHelp(prev => !prev)}
                        className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border transition-colors ${
                          showAdrHelp
                            ? 'bg-rio-blue text-white border-rio-blue'
                            : 'bg-white text-blue-900 border-blue-100 hover:border-rio-blue'
                        }`}
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        Ajuda
                      </button>
                      <span className="hidden md:inline-flex text-[11px] font-bold text-blue-900 bg-white border border-blue-100 px-2.5 py-1 rounded-full">
                        Editável
                      </span>
                    </div>
                  </div>

                  {showAdrHelp && (
                    <div className="rounded-xl border border-blue-100 bg-white/80 p-3 text-xs text-slate-700 leading-relaxed animate-fade-in">
                      <p className="font-black text-rio-blue mb-1">Como personalizar o comparador</p>
                      <p>
                        Primeiro calcule a diária média pela receita e diárias vendidas. Depois ajuste dias, apartamentos,
                        ocupação e diária simulada para ver receita, RevPAR e ganho/perda no mesmo período.
                      </p>
                      <p className="mt-1 text-slate-500">
                        Exemplo: 30 dias x 100 aptos = 3.000 diárias disponíveis. Se vendeu 250 diárias, a ocupação é 8,3%.
                        Para simular 83%, use aproximadamente 2.490 diárias vendidas ou edite a ocupação manualmente.
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 mb-1">Dias</label>
                      <input type="text" inputMode="numeric" value={comparisonPeriod} onChange={e => setComparisonPeriod(e.target.value)} className="w-full border border-blue-100 rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-rio-blue outline-none" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 mb-1">Aptos</label>
                      <input type="text" inputMode="numeric" value={comparisonInventory} onChange={e => setComparisonInventory(e.target.value)} className="w-full border border-blue-100 rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-rio-blue outline-none" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 mb-1">Ocup. %</label>
                      <input type="text" inputMode="decimal" value={comparisonOccupancy} onChange={e => setComparisonOccupancy(e.target.value)} className="w-full border border-blue-100 rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-rio-blue outline-none" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 mb-1">Atual R$</label>
                      <input type="text" inputMode="decimal" value={comparisonCurrentAdr} onChange={e => setComparisonCurrentAdr(e.target.value)} className="w-full border border-blue-100 rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-rio-blue outline-none" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 mb-1">Simul. R$</label>
                      <input type="text" inputMode="decimal" value={comparisonSimulatedAdr} onChange={e => setComparisonSimulatedAdr(e.target.value)} className="w-full border border-blue-100 rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-rio-blue outline-none" />
                    </div>
                  </div>

                  {adrComparison && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="bg-white rounded-xl border border-gray-100 p-3">
                        <p className="text-[11px] uppercase font-bold text-gray-400">Cenário A</p>
                        <p className="font-black text-xl text-gray-900">{formatCurrency(adrComparison.currentRevenue)}</p>
                        <div className="mt-2 flex items-center justify-between text-xs">
                          <span className="text-gray-500">Diária</span>
                          <span className="font-bold text-gray-800">{formatCurrency(adrComparison.currentAdr)}</span>
                        </div>
                        <div className="mt-1 flex items-center justify-between text-xs">
                          <span className="text-gray-500">RevPAR</span>
                          <span className="font-bold text-rio-blue">{formatCurrency(adrComparison.currentRevPar)}</span>
                        </div>
                      </div>

                      <div className="bg-blue-900 rounded-xl border border-blue-800 p-3 text-white shadow-md">
                        <p className="text-[11px] uppercase font-bold text-blue-200">Cenário B</p>
                        <p className="font-black text-xl">{formatCurrency(adrComparison.simulatedRevenue)}</p>
                        <div className="mt-2 flex items-center justify-between text-xs">
                          <span className="text-blue-100">Diária</span>
                          <span className="font-bold">{formatCurrency(adrComparison.simulatedAdr)}</span>
                        </div>
                        <div className="mt-1 flex items-center justify-between text-xs">
                          <span className="text-blue-100">RevPAR</span>
                          <span className="font-bold text-rio-gold">{formatCurrency(adrComparison.simulatedRevPar)}</span>
                        </div>
                      </div>

                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                        <p className="text-[11px] uppercase font-black text-amber-700">Ganho/perda</p>
                        <p className={`text-2xl font-black ${adrComparison.revenueDifference >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                          {formatCurrency(adrComparison.revenueDifference)}
                        </p>
                        <p className="text-xs text-gray-700 mt-1 leading-snug">
                          {formatPercent(adrComparison.occupancy)} de ocupação, {Math.round(adrComparison.occupiedRoomNights).toLocaleString('pt-BR')} diárias vendidas. Diferença de {adrComparison.differencePercent.toFixed(1).replace('.', ',')}%.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {['calc-revpar', 'calc-trevpar'].includes(type) && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Receita Total do Período (R$)</label>
                    <input type="number" value={revenue} onChange={(e) => setRevenue(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rio-blue outline-none" placeholder="Ex: 50000" />
                  </div>
                )}

                {type === 'calc-occ' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Número de Diárias Vendidas</label>
                    <input type="number" value={roomsSold} onChange={(e) => setRoomsSold(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rio-blue outline-none" placeholder="Ex: 150" />
                  </div>
                )}

                {['calc-revpar', 'calc-occ', 'calc-goppar', 'calc-trevpar'].includes(type) && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Número de Quartos Disponíveis (Inventário x Dias)</label>
                    <input type="number" value={roomsAvailable} onChange={(e) => setRoomsAvailable(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rio-blue outline-none" placeholder="Ex: 300" />
                  </div>
                )}
                
                {type === 'calc-goppar' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Lucro Operacional Bruto (GOP)</label>
                    <input type="number" value={grossProfit} onChange={(e) => setGrossProfit(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rio-blue outline-none" placeholder="Ex: 20000" />
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

                <button onClick={handleCalculate} className="w-full bg-rio-blue hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
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
            )
          )}
        </div>

        {/* Footer */}
        <div className={`${isAdrCalculator ? 'p-3' : 'p-4'} bg-gray-50 border-t border-gray-200 flex justify-between shrink-0`}>
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
