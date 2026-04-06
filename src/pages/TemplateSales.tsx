import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Star, Check, ShoppingCart, ArrowLeft, Box, MousePointer2, Layers, Zap, Palette, Monitor, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import ScrollToTop from '@/components/ScrollToTop';

const templateData: Record<string, {
  name: string; badge: string; price: string; originalPrice: string; rating: string; reviews: string;
  description: string; bg: string; accent: string;
  features: { icon: any; label: string }[];
  highlights: string[];
  details: string[];
}> = {
  'aura-infinity': {
    name: 'Aura Infinity',
    badge: 'Flagship',
    price: '$129',
    originalPrice: '$249',
    rating: '4.9',
    reviews: '1,200+',
    description: 'Futuristic dark-luxury portfolio with interactive 3D backgrounds, magnetic hover effects, bento-grid layouts, and glassmorphism UI. Designed for creative professionals who demand the extraordinary.',
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
    highlights: ['3D Interactive Background', 'Bento Grid Layout', 'Animated Timeline', 'Cinematic Contact Section', 'Custom Cursor Effects', 'Scroll Progress Bar'],
    details: [
      'Built with Three.js for immersive 3D hero backgrounds',
      'Glassmorphism cards with backdrop-blur and transparency effects',
      'Framer Motion powered scroll-triggered animations',
      'Magnetic hover buttons that follow your cursor',
      'Bento-grid project showcase with tilt effects',
      'Fully responsive — looks stunning on every device',
    ],
  },
  'quantum-studio': {
    name: 'Quantum Studio',
    badge: 'Premium',
    price: '$99',
    originalPrice: '$199',
    rating: '4.8',
    reviews: '850+',
    description: 'Editorial masterpiece with cinematic text reveals, scroll-driven animations, skill progress bars, and staggered project listings. Perfect for designers and storytellers.',
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
    highlights: ['Cinematic Text Reveals', 'Parallax Scaling', 'Skill Progress Bars', 'Sophisticated Contact Forms', 'Word-by-Word Animation', 'Large Serif Typography'],
    details: [
      'Cinematic word-by-word text reveal animations',
      'Large editorial serif typography for premium feel',
      'Scroll-driven parallax scaling effects',
      'Staggered project grid with hover interactions',
      'Animated skill bars with percentage counters',
      'Elegant contact form with subtle animations',
    ],
  },
};

const TemplateSales = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const tpl = templateData[id || ''];

  if (!tpl) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Template not found</h1>
          <Button onClick={() => navigate('/templates')}>Back to Templates</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <CustomCursor />
      <Header />
      <main className="relative z-10 pt-28 pb-20">
        <div className="container-custom max-w-4xl">
          {/* Back */}
          <Button variant="ghost" size="sm" className="gap-1.5 mb-6 text-muted-foreground" onClick={() => navigate('/templates')}>
            <ArrowLeft className="w-4 h-4" /> All Templates
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Preview */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <div className="rounded-2xl overflow-hidden border border-border/30 sticky top-28">
                <div className="relative aspect-[4/3]" style={{ background: tpl.bg }}>
                  <div className="absolute top-4 right-4 w-16 h-16 rounded-full opacity-20 blur-2xl" style={{ background: tpl.accent }} />
                  <div className="absolute bottom-4 left-4 w-24 h-24 rounded-3xl border opacity-10 rotate-12" style={{ borderColor: tpl.accent }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <motion.div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center"
                        style={{ background: `${tpl.accent}30`, border: `1px solid ${tpl.accent}50` }}
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 6 }}>
                        <div className="w-4 h-4 rounded-sm" style={{ background: tpl.accent }} />
                      </motion.div>
                      <p className="text-white text-xl font-bold">{tpl.name}</p>
                      <p className="text-xs mt-1" style={{ color: `${tpl.accent}bb` }}>{tpl.badge} Template</p>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold"
                    style={{ background: tpl.accent, color: '#050a14' }}>
                    <Sparkles className="w-2.5 h-2.5 inline mr-1" />{tpl.badge}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Details */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{tpl.rating} ({tpl.reviews} reviews)</span>
              </div>

              <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">{tpl.name}</h1>

              {/* Price */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-primary">{tpl.price}</span>
                <span className="text-lg text-muted-foreground line-through">{tpl.originalPrice}</span>
                <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-xs font-semibold">
                  {Math.round((1 - parseInt(tpl.price.slice(1)) / parseInt(tpl.originalPrice.slice(1))) * 100)}% OFF
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">{tpl.description}</p>

              {/* CTA */}
              <Button variant="hero" size="xl" className="w-full gap-2 mb-6" onClick={() => navigate(`/order`)}>
                <ShoppingCart className="w-5 h-5" /> Buy Now — Free
              </Button>

              {/* Highlights */}
              <div className="space-y-2 mb-6">
                <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">What's Included</h3>
                <div className="grid grid-cols-2 gap-2">
                  {tpl.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2 mb-6">
                <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {tpl.features.map((f) => (
                    <span key={f.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border border-border/40 text-muted-foreground bg-muted/10">
                      <f.icon className="w-3.5 h-3.5 text-primary" />
                      {f.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2">
                <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">Details</h3>
                <ul className="space-y-2">
                  {tpl.details.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default TemplateSales;
