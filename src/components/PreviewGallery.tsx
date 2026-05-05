import { motion } from 'framer-motion';
import { useRef, useEffect, useState, useCallback } from 'react';
import { Sparkles, ArrowRight, Star } from 'lucide-react';
import PortfolioRenderer from '@/components/portfolio/PortfolioRenderer';
import { PreviewModeProvider } from '@/contexts/PreviewModeContext';
import type { PersonalData } from '@/components/HeroSection';

interface Props {
  personalData: PersonalData;
  onSelectTemplate: () => void;
}

const INNER_WIDTH = 1280;

const PreviewGallery = ({ personalData, onSelectTemplate }: Props) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.28);
  const [scaledHeight, setScaledHeight] = useState(450);

  const recalculate = useCallback(() => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    const newScale = containerWidth / INNER_WIDTH;
    setScale(newScale);

    setTimeout(() => {
      if (innerRef.current) {
        const heroHeight = Math.min(innerRef.current.scrollHeight, 900);
        setScaledHeight(heroHeight * newScale);
      }
    }, 300);
  }, []);

  useEffect(() => {
    recalculate();
    window.addEventListener('resize', recalculate);
    return () => window.removeEventListener('resize', recalculate);
  }, [recalculate]);

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-10 lg:px-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs sm:text-sm text-primary font-medium">
              Preview for <span className="font-bold">{personalData.name}</span>
            </span>
          </motion.div>

          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Your Portfolio,{' '}
            <span className="text-gradient">Ready to Go</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-xl mx-auto">
            Here's how your premium portfolio looks. Click to explore the full experience.
          </p>
        </motion.div>

        {/* Single Template Card - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="group relative cursor-pointer"
          onClick={onSelectTemplate}
        >
          <motion.div
            ref={containerRef}
            className="rounded-2xl border-2 border-border/50 overflow-hidden bg-card/50 backdrop-blur-sm transition-all duration-500 group-hover:border-primary/60 group-hover:shadow-[0_0_40px_hsl(var(--primary)_/_0.15)]"
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {/* Badge */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-lg">
              <Sparkles className="w-3.5 h-3.5" />
              Premium Template
            </div>

            {/* Rating */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-background/80 backdrop-blur-sm text-xs text-foreground">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              4.9
            </div>

            {/* Template Preview */}
            <div
              style={{
                height: scaledHeight,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <PreviewModeProvider>
                <div
                  ref={innerRef}
                  className="origin-top-left pointer-events-none"
                  style={{
                    width: INNER_WIDTH,
                    transform: `scale(${scale})`,
                    overflowX: 'hidden',
                  }}
                >
                  <PortfolioRenderer
                    name={personalData.name}
                    title={personalData.title || 'Creative Professional'}
                    bio={personalData.bio || 'Crafting exceptional digital experiences through thoughtful design, clean code, and strategic thinking.'}
                    email="hello@studio.com"
                    phone=""
                    socialLinks={[]}
                    primaryColor="#00e5ff"
                    font="Inter"
                    template="aura-infinity"
                  />
                </div>
              </PreviewModeProvider>
            </div>

            {/* Hover overlay */}
            <motion.div
              className="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-10"
            >
              <div className="flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-base shadow-xl">
                Explore Full Preview
                <ArrowRight className="w-5 h-5" />
              </div>
            </motion.div>
          </motion.div>

          {/* Template Info */}
          <div className="mt-5 px-1 text-center">
            <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              Aura Infinity
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Futuristic 3D hero with bento-grid layout & cinematic effects
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PreviewGallery;
