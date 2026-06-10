
// Autor: Gabriel Salles
// Suporte do SO: Windows11
// Descrição: Banner automático de Fornecedores/Parceiros (embed em múltiplas colunas)

import React from 'react';

// URL base do widget de divulgação de fornecedores/parceiros
const EMBED_BASE = 'https://sistema-divulgacao-fornecedores.vercel.app/#/embed';

// Cada coluna gira com velocidade distinta → carrosséis fora de sincronia,
// criando o efeito de várias colunas com rotação aleatória.
// `show` controla a partir de qual breakpoint a coluna aparece, mantendo
// a quantidade de colunas visíveis alinhada ao grid (1 / 2 / 3 / 4).
const COLUMNS = [
  { speed: 2600, show: '' },
  { speed: 3000, show: 'hidden sm:block' },
  { speed: 3400, show: 'hidden lg:block' },
  { speed: 3800, show: 'hidden xl:block' },
];

const buildSrc = (speed: number) =>
  `${EMBED_BASE}?theme=light&color=0284c7&speed=${speed}&desc=true`;

const SuppliersBanner: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {COLUMNS.map((col, i) => (
        <div
          key={i}
          className={`overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm ${col.show}`}
        >
          <iframe
            src={buildSrc(col.speed)}
            title={`Fornecedores parceiros — coluna ${i + 1}`}
            className="block w-full"
            style={{ height: 300, border: 'none', overflow: 'hidden' }}
            scrolling="no"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

export default SuppliersBanner;
