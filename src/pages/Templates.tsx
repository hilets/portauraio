import { motion } from 'framer-motion';
import { Eye, Sparkles, Star, Zap, Layers, MousePointer2, Box, Palette, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import CustomCursor from '@/components/CustomCursor';
import ScrollToTop from '@/components/ScrollToTop';
import templateImage from '@/assets/template-aura-infinity.jpg';

const features = [
  { icon: Box, label: 'Three.js 3D Hero' },
  { icon: MousePointer2, label: 'Magnetic Buttons' },
  { icon: Layers, label: 'Glassmorphism UI' },
  { icon: Zap, label: 'Smooth Animations' },
  { icon: Palette, label: 'Custom Colors & Fonts' },
  { icon: Monitor, label: 'Fully Responsive' },
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/30 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-heading font-semibold tracking-wider uppercase">
                Flagship Template
              </span>
            </motion.div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
              Aura Infinity{' '}
              <span className="text-gradient">Template</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              An ultra-modern, interactive portfolio experience with Three.js 3D effects,
              cinematic animations & glassmorphism design. Built to impress.
            </p>
          </motion.div>

          {/* Template Card — Large Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="group relative rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_60px_hsl(var(--primary)_/_0.2)] mb-12"
          >
            {/* Image */}
            <div className="relative aspect-video overflow-hidden">
              <img
                src={templateImage}
                alt="Aura Infinity Portfolio Template"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent opacity-60" />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <div className="px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-heading font-bold shadow-lg">
                  FREE
                </div>
                <div className="px-3 py-1.5 rounded-full bg-background/70 backdrop-blur-md text-xs text-foreground font-medium flex items-center gap-1">
                  <Star className="w-3 h-3 fill-primary text-primary" /> Top Seller
                </div>
              </div>

              {/* Hover CTA */}
              <div className="absolute inset-0 bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center">
                <Button
                  variant="hero"
                  size="lg"
                  className="gap-2"
                  onClick={() => navigate('/order')}
                >
                  <Sparkles className="w-4 h-4" />
                  Build Your Portfolio
                </Button>
              </div>
            </div>

            {/* Info */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="text-sm font-semibold text-foreground">4.9</span>
                <span className="text-xs text-muted-foreground">(1,200+ portfolios created)</span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-3">
                Aura Infinity
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base mb-6 leading-relaxed max-w-2xl">
                A futuristic dark-luxury portfolio featuring interactive Three.js 3D backgrounds,
                magnetic hover effects, bento-grid layouts, animated timelines, glassmorphism testimonials,
                and a cinematic contact section. Perfect for developers, designers, freelancers & creators.
              </p>

              {/* Features grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {features.map((f, i) => (
                  <motion.div
                    key={f.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border/30 bg-muted/20"
                  >
                    <f.icon className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-foreground">{f.label}</span>
                  </motion.div>
                ))}
              </div>

              <Button
                variant="hero"
                size="xl"
                className="w-full sm:w-auto gap-2"
                onClick={() => navigate('/order')}
              >
                <Sparkles className="w-4 h-4" /> Start Building — Free
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Templates;
