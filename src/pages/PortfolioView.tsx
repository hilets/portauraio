import { useParams, useNavigate } from 'react-router-dom';
import { getPortfolio } from '@/lib/portfolioStore';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PortfolioRenderer from '@/components/portfolio/PortfolioRenderer';
import type { StoredPortfolio } from '@/lib/portfolioStore';

const PortfolioView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState<StoredPortfolio | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) { setNotFound(true); return; }
    const p = getPortfolio(id);
    if (p) setPortfolio(p);
    else setNotFound(true);
  }, [id]);

  useEffect(() => {
    if (!portfolio) return;
    const links: HTMLLinkElement[] = [];
    const fonts = [
      'Inter:wght@300;400;500;600;700;800;900',
      'Playfair+Display:wght@400;500;600;700;800;900',
      'JetBrains+Mono:wght@300;400;500;600;700',
    ];
    fonts.forEach((f) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `https://fonts.googleapis.com/css2?family=${f}&display=swap`;
      document.head.appendChild(link);
      links.push(link);
    });
    return () => links.forEach((l) => l.remove());
  }, [portfolio]);

  if (notFound) {
    return (
      <div className="min-h-screen bg-[#060606] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-6xl font-black text-white mb-4">404</h1>
          <p className="text-gray-500 mb-8">Portfolio not found</p>
          <button onClick={() => navigate('/')} className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-[#060606] flex items-center justify-center">
        <motion.div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} />
      </div>
    );
  }

  return (
    <PortfolioRenderer
      name={portfolio.name}
      title={portfolio.title}
      bio={portfolio.bio}
      email={portfolio.email}
      phone={portfolio.phone}
      socialLinks={portfolio.socialLinks}
      primaryColor={portfolio.primaryColor}
      font={portfolio.font}
      template={(portfolio as any).template || 'aura-infinity'}
    />
  );
};

export default PortfolioView;
