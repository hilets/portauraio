import type { PortfolioData } from '@/pages/OrderWizard';

export interface StoredPortfolio extends PortfolioData {
  id: string;
  createdAt: string;
}

const STORAGE_KEY = 'portaura_portfolios';

const generateId = (name: string): string => {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const short = Math.random().toString(36).substring(2, 6);
  return `${slug || 'portfolio'}-${short}`;
};

export const savePortfolio = (data: PortfolioData): StoredPortfolio => {
  const portfolios = getAllPortfolios();
  const stored: StoredPortfolio = {
    ...data,
    id: generateId(data.name),
    createdAt: new Date().toISOString(),
  };
  portfolios.push(stored);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolios));
  return stored;
};

export const getPortfolio = (id: string): StoredPortfolio | null => {
  const portfolios = getAllPortfolios();
  return portfolios.find(p => p.id === id) || null;
};

export const getAllPortfolios = (): StoredPortfolio[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};
