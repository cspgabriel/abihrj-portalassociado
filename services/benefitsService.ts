import { Benefit } from '../types';

// cada fornecedor externo expõe um endpoint que devolve um array de beneficios
// com a mesma forma que o portal espera (o mínimo obrigatório: id, title, category, externalLink)
// a configuração pode vir de "constants" ou de uma variável de ambiente.

const EXTERNAL_SOURCES: string[] = [
  // exemplos de URLs de outros projetos
  'https://hotel-a.example.com/api/benefits',
  'https://hotel-b.example.com/api/benefits',
  // etc.
];

// para evitar overfetch, armazenamos em cache simples no localStorage com TTL.
const CACHE_KEY = 'aggregated_benefits';
const CACHE_TTL_MS = 1000 * 60 * 15; // 15 minutos

interface CacheEntry {
  timestamp: number;
  data: Benefit[];
}

async function fetchFromSource(url: string): Promise<Benefit[]> {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return Array.isArray(json) ? json : [];
  } catch (e) {
    console.warn('Falha ao carregar benefícios de', url, e);
    return [];
  }
}

export const benefitsService = {
  getAll: async (): Promise<Benefit[]> => {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const entry: CacheEntry = JSON.parse(raw);
        if (Date.now() - entry.timestamp < CACHE_TTL_MS) {
          return entry.data;
        }
      }
    } catch {}

    const lists = await Promise.all(EXTERNAL_SOURCES.map(fetchFromSource));
    const merged = lists.flat();

    try {
      const entry: CacheEntry = { timestamp: Date.now(), data: merged };
      localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
    } catch {}

    return merged;
  }
};
