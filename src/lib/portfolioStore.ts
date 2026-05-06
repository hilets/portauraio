import type { PortfolioData } from '@/pages/OrderWizard';

export interface StoredPortfolio extends PortfolioData {
  id: string;
  createdAt: string;
}

const STORAGE_KEY = 'portaura_portfolios';
const memoryPortfolios: StoredPortfolio[] = [];

const generateId = (name: string): string => {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const randomPart =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID().slice(0, 6)
      : Math.random().toString(36).substring(2, 8);
  return `${slug || 'portfolio'}-${randomPart.toLowerCase()}`;
};

const readFromLocalStorage = (): StoredPortfolio[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeToLocalStorage = (portfolios: StoredPortfolio[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolios));
    return true;
  } catch {
    return false;
  }
};

export const savePortfolio = (data: PortfolioData): StoredPortfolio => {
  const fromStorage = readFromLocalStorage();
  const stored: StoredPortfolio = {
    ...data,
    id: generateId(data.name),
    createdAt: new Date().toISOString(),
  };
  const next = [...fromStorage, stored];
  const persisted = writeToLocalStorage(next);
  if (!persisted) {
    memoryPortfolios.push(stored);
  } else {
    memoryPortfolios.push(stored);
  }
  return stored;
};

export const getPortfolio = (id: string): StoredPortfolio | null => {
  const local = readFromLocalStorage();
  const fromLocal = local.find((p) => p.id === id);
  if (fromLocal) return fromLocal;
  return memoryPortfolios.find((p) => p.id === id) || null;
};

export const getAllPortfolios = (): StoredPortfolio[] => {
  const local = readFromLocalStorage();
  if (local.length === 0) return [...memoryPortfolios];
  const merged = [...local];
  memoryPortfolios.forEach((portfolio) => {
    if (!merged.some((item) => item.id === portfolio.id)) {
      merged.push(portfolio);
    }
  });
  return merged;
};

export const updatePortfolio = (id: string, updates: Partial<PortfolioData>): boolean => {
  const local = readFromLocalStorage();
  const idx = local.findIndex((p) => p.id === id);
  if (idx === -1) {
    // Try memory
    const memIdx = memoryPortfolios.findIndex((p) => p.id === id);
    if (memIdx === -1) return false;
    Object.assign(memoryPortfolios[memIdx], updates);
    return true;
  }
  local[idx] = { ...local[idx], ...updates };
  writeToLocalStorage(local);
  // Also update memory copy
  const memIdx = memoryPortfolios.findIndex((p) => p.id === id);
  if (memIdx !== -1) Object.assign(memoryPortfolios[memIdx], updates);
  return true;
};
