import { motion } from 'framer-motion';
import { Sparkles, Star, Zap, Layers, MousePointer2, Box, Palette, Monitor, Type, ArrowRight, ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import CustomCursor from '@/components/CustomCursor';
import ScrollToTop from '@/components/ScrollToTop';

const templates = [
  {
    id: 'aura-infinity' as const,
    name: 'Aura Infinity',
    badge: 'Flagship',
    price: 'Free',
    originalPrice: '$49',
    rating: '4.9',
    reviews: '1,200+',
    description: 'Futuristic dark-luxury portfolio with interactive 3D backgrounds, magnetic hover effects, bento-grid layouts, and glassmorphism UI.',
    bg: 'linear-gradient(135deg, #060912 0%, #0a1628 40%, #061220 100%)',
    accent: '#00e5ff',
    features: [
      { icon: Box, label: 'Three.js 3D Hero' },
      { icon: MousePointer2, label: 'Magnetic Buttons' },
      { icon: Layers, label: 'Glassmorphism UI' },
      { icon: Zap, label: 'Smooth Animations' },
      { icon: Palette, label: 'Custom Colors' },
      { icon: Monitor, label: 'Fully Responsive' },
    ],
    highlights: ['3D Interactive Background', 'Bento Grid Layout', 'Animated Timeline', 'Cinematic Contact'],
  },
  {
    id: 'quantum-studio' as const,
    name: 'Quantum Studio',
    badge: 'Premium',
    price: 'Free',
    originalPrice: '$39',
    rating: '4.8',
    reviews: '850+',
    description: 'Editorial masterpiece with cinematic text reveals, scroll-driven animations, skill progress bars, and staggered project listings.',
    bg: 'linear-gradient(135deg, #0a0a0a 0%, #141414 40%, #0d0d0d 100%)',
    accent: '#00e5ff',
    features: [
      { icon: Type, label: 'Text Reveal Animation' },
      { icon: Zap, label: 'Scroll-Driven Motion' },
      { icon: MousePointer2, label: 'Interactive Hover' },
      { icon: Palette, label: 'Editorial Layout' },
      { icon: Layers, label: 'Stagger Animations' },
      { icon: Monitor, label: 'Fully Responsive' },
    ],
    highlights: ['Cinematic Text Reveals', 'Parallax Scaling', 'Skill Progress Bars', 'Sophisticated Forms'],
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

          {/* Template Cards - E-commerce style */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templates.map((tpl, idx) => (
              <motion.div
                key={tpl.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.15, duration: 0.6 }}
                className="group relative rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_hsl(var(--primary)_/_0.12)] flex flex-col"
              >
                {/* Template Preview - gradient bg */}
                <div className="relative h-48 sm:h-56 overflow-hidden" style={{ background: tpl.bg }}>
                  {/* Decorative elements */}
                  <div className="absolute top-6 right-6 w-20 h-20 rounded-full opacity-20 blur-2xl" style={{ background: tpl.accent }} />
                  <div className="absolute bottom-4 left-4 w-28 h-28 rounded-3xl border opacity-10 rotate-12" style={{ borderColor: tpl.accent }} />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-xl opacity-15" style={{ background: tpl.accent, filter: 'blur(20px)' }} />
                  
                  {/* Mock UI elements */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center px-6">
                      <motion.div className="w-8 h-8 rounded-lg mx-auto mb-3 flex items-center justify-center"
                        style={{ background: `${tpl.accent}30`, border: `1px solid ${tpl.accent}50` }}
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}>
                        <div className="w-3 h-3 rounded-sm" style={{ background: tpl.accent }} />
                      </motion.div>
                      <p className="text-white text-lg font-bold mb-1">{tpl.name}</p>
                      <p className="text-[11px]" style={{ color: `${tpl.accent}bb` }}>{tpl.badge} Template</p>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <div className="px-2.5 py-1 rounded-full text-[10px] font-bold shadow-lg"
                      style={{ background: tpl.accent, color: '#050a14' }}>
                      <Sparkles className="w-2.5 h-2.5 inline mr-1" />{tpl.badge}
                    </div>
                  </div>

                  {/* Rating badge */}
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-[10px] text-white flex items-center gap-1">
                    <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" /> {tpl.rating}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5 flex-1 flex flex-col">
                  {/* Name & Price */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-heading text-xl font-bold text-foreground">{tpl.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{tpl.reviews} portfolios created</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">{tpl.price}</p>
                      <p className="text-[10px] text-muted-foreground line-through">{tpl.originalPrice}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{tpl.description}</p>

                  {/* Highlights */}
                  <div className="space-y-1.5 mb-4">
                    {tpl.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2 text-xs text-foreground">
                        <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        {h}
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {tpl.features.slice(0, 4).map((f) => (
                      <span key={f.label} className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] border border-border/30 text-muted-foreground bg-muted/10">
                        <f.icon className="w-3 h-3 text-primary" />
                        {f.label}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-auto">
                    <Button variant="hero" className="w-full gap-2" onClick={() => navigate('/order')}>
                      <ShoppingCart className="w-4 h-4" /> Build Now — Free
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="text-center mt-16">
            <p className="text-muted-foreground text-sm mb-4">Can't decide? Start building and switch templates anytime.</p>
            <Button variant="outline" size="lg" className="gap-2" onClick={() => navigate('/order')}>
              Start Building <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Templates;
