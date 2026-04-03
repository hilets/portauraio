import { motion } from 'framer-motion';
import { Sparkles, Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import CustomCursor from '@/components/CustomCursor';
import ScrollToTop from '@/components/ScrollToTop';

const templates = [
  {
    id: 'aura-infinity',
    name: 'Aura Infinity',
    badge: 'Flagship',
    price: '$129',
    originalPrice: '$249',
    rating: '4.9',
    bg: 'linear-gradient(135deg, #060912 0%, #0a1628 40%, #061220 100%)',
    accent: '#00e5ff',
  },
  {
    id: 'quantum-studio',
    name: 'Quantum Studio',
    badge: 'Premium',
    price: '$99',
    originalPrice: '$199',
    rating: '4.8',
    bg: 'linear-gradient(135deg, #0a0a0a 0%, #141414 40%, #0d0d0d 100%)',
    accent: '#00e5ff',
  },
];

const Templates = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative">
      <CustomCursor />
      <ParticleBackground />
      <Header />
      <main className="relative z-10 pt-32 pb-20">
        <div className="container-custom max-w-5xl">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-center mb-12">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/30 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-heading font-semibold tracking-wider uppercase">
                Premium Templates
              </span>
            </motion.div>
            <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Choose Your <span className="text-gradient">Template</span>
            </h1>
            <p className="text-muted-foreground text-base max-w-xl mx-auto">
              Hand-crafted portfolio templates designed to impress.
            </p>
          </motion.div>

          {/* Product Grid - compact e-commerce cards */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {templates.map((tpl, idx) => (
              <motion.div
                key={tpl.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
                className="group rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_24px_hsl(var(--primary)_/_0.1)] cursor-pointer"
                onClick={() => navigate(`/templates/${tpl.id}`)}
              >
                {/* Image area */}
                <div className="relative aspect-[4/3] overflow-hidden" style={{ background: tpl.bg }}>
                  <div className="absolute top-2 right-2 w-10 h-10 rounded-full opacity-20 blur-xl" style={{ background: tpl.accent }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div className="w-6 h-6 rounded-lg flex items-center justify-center"
                      style={{ background: `${tpl.accent}30`, border: `1px solid ${tpl.accent}50` }}
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}>
                      <div className="w-2.5 h-2.5 rounded-sm" style={{ background: tpl.accent }} />
                    </motion.div>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-bold"
                    style={{ background: tpl.accent, color: '#050a14' }}>
                    <Sparkles className="w-2 h-2 inline mr-0.5" />{tpl.badge}
                  </div>

                  {/* Rating */}
                  <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-[8px] sm:text-[9px] text-white flex items-center gap-0.5">
                    <Star className="w-2 h-2 fill-yellow-400 text-yellow-400" /> {tpl.rating}
                  </div>
                </div>

                {/* Info */}
                <div className="p-2.5 sm:p-3">
                  <h3 className="font-heading text-xs sm:text-sm font-bold text-foreground truncate">{tpl.name}</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-sm sm:text-base font-bold text-primary">{tpl.price}</span>
                    <span className="text-[9px] sm:text-[10px] text-muted-foreground line-through">{tpl.originalPrice}</span>
                  </div>
                  <Button variant="hero" size="sm" className="w-full mt-2 text-[10px] sm:text-xs h-7 sm:h-8 gap-1"
                    onClick={(e) => { e.stopPropagation(); navigate(`/templates/${tpl.id}`); }}>
                    <ShoppingCart className="w-3 h-3" /> Buy Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Templates;
