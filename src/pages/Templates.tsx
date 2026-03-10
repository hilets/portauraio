import { motion } from 'framer-motion';
import { Eye, Sparkles, Star, Zap, Layers, MousePointer2, Box, Palette, Monitor, Type, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import CustomCursor from '@/components/CustomCursor';
import ScrollToTop from '@/components/ScrollToTop';
import PortfolioRenderer from '@/components/portfolio/PortfolioRenderer';

const templates = [
  {
    id: 'aura-infinity' as const,
    name: 'Aura Infinity',
    badge: 'Flagship',
    rating: '4.9',
    users: '1,200+',
    description: 'A futuristic dark-luxury portfolio featuring interactive Three.js 3D backgrounds, magnetic hover effects, bento-grid layouts, animated timelines, glassmorphism testimonials, and a cinematic contact section.',
    features: [
      { icon: Box, label: 'Three.js 3D Hero' },
      { icon: MousePointer2, label: 'Magnetic Buttons' },
      { icon: Layers, label: 'Glassmorphism UI' },
      { icon: Zap, label: 'Smooth Animations' },
      { icon: Palette, label: 'Custom Colors' },
      { icon: Monitor, label: 'Fully Responsive' },
    ],
  },
  {
    id: 'quantum-studio' as const,
    name: 'Quantum Studio',
    badge: 'Premium',
    rating: '4.8',
    users: '850+',
    description: 'An editorial masterpiece with cinematic text reveals, scroll-driven animations, skill progress bars, staggered project listings, and a sophisticated contact form. Built for creative professionals who demand elegance.',
    features: [
      { icon: Type, label: 'Text Reveal Animation' },
      { icon: Zap, label: 'Scroll-Driven Motion' },
      { icon: MousePointer2, label: 'Interactive Hover' },
      { icon: Palette, label: 'Editorial Layout' },
      { icon: Layers, label: 'Stagger Animations' },
      { icon: Monitor, label: 'Fully Responsive' },
    ],
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
            className="text-center mb-16">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/30 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-heading font-semibold tracking-wider uppercase">
                Premium Templates
              </span>
            </motion.div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
              Choose Your{' '}
              <span className="text-gradient">Template</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Hand-crafted, interactive portfolio templates designed to make an unforgettable impression.
            </p>
          </motion.div>

          {/* Template Cards */}
          <div className="space-y-12">
            {templates.map((tpl, idx) => (
              <motion.div
                key={tpl.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.2, duration: 0.6 }}
                className="group relative rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_60px_hsl(var(--primary)_/_0.15)]"
              >
                {/* Live Preview */}
                <div className="relative aspect-video overflow-hidden">
                  <div className="w-full h-full overflow-hidden">
                    <PortfolioRenderer
                      name="Alex Morgan"
                      title="Creative Designer & Developer"
                      bio="Crafting exceptional digital experiences that push boundaries."
                      email="hello@alexmorgan.dev"
                      phone=""
                      socialLinks={[{ platform: 'GitHub', url: '#' }, { platform: 'LinkedIn', url: '#' }]}
                      primaryColor="#00e5ff"
                      font="Inter"
                      template={tpl.id}
                      compact
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent opacity-60 pointer-events-none" />

                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className="px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-heading font-bold shadow-lg">
                      FREE
                    </div>
                    <div className="px-3 py-1.5 rounded-full bg-background/70 backdrop-blur-md text-xs text-foreground font-medium flex items-center gap-1">
                      <Star className="w-3 h-3 fill-primary text-primary" /> {tpl.badge}
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center">
                    <Button variant="hero" size="lg" className="gap-2" onClick={() => navigate('/order')}>
                      <Sparkles className="w-4 h-4" /> Use This Template
                    </Button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="text-sm font-semibold text-foreground">{tpl.rating}</span>
                    <span className="text-xs text-muted-foreground">({tpl.users} portfolios created)</span>
                  </div>

                  <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-3">{tpl.name}</h2>
                  <p className="text-muted-foreground text-sm sm:text-base mb-6 leading-relaxed max-w-2xl">{tpl.description}</p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                    {tpl.features.map((f, i) => (
                      <motion.div key={f.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.05 }}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border/30 bg-muted/20">
                        <f.icon className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-foreground">{f.label}</span>
                      </motion.div>
                    ))}
                  </div>

                  <Button variant="hero" size="xl" className="w-full sm:w-auto gap-2" onClick={() => navigate('/order')}>
                    <Sparkles className="w-4 h-4" /> Start Building — Free
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
