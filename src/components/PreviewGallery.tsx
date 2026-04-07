import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Sparkles, ArrowRight, Star } from 'lucide-react';
import PortfolioRenderer from '@/components/portfolio/PortfolioRenderer';
import { PreviewModeProvider } from '@/contexts/PreviewModeContext';

interface Props {
  userName: string;
  onSelectTemplate: (templateId: 'aura-infinity' | 'quantum-studio') => void;
}

const templates: {
  id: 'aura-infinity' | 'quantum-studio';
  name: string;
  badge: string;
  desc: string;
}[] = [
  {
    id: 'aura-infinity',
    name: 'Aura Infinity',
    badge: 'Flagship',
    desc: 'Futuristic 3D hero with bento-grid layout & cinematic effects',
  },
  {
    id: 'quantum-studio',
    name: 'Quantum Studio',
    badge: 'Premium',
    desc: 'Luxury editorial design with cinematic text reveals & parallax',
  },
];

const SCALE = 0.22;
const INNER_WIDTH = 1280;

const TemplateThumbnail = ({
  template,
  userName,
  onSelect,
  index,
}: {
  template: (typeof templates)[0];
  userName: string;
  onSelect: () => void;
  index: number;
}) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const [scaledHeight, setScaledHeight] = useState(400);

  useEffect(() => {
    if (!innerRef.current) return;
    // Only measure hero section height (first screen)
    const timer = setTimeout(() => {
      if (innerRef.current) {
        const heroHeight = Math.min(innerRef.current.scrollHeight, 900);
        setScaledHeight(heroHeight * SCALE);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
      className="group relative cursor-pointer"
      onClick={onSelect}
    >
      <motion.div
        className="rounded-2xl border-2 border-border/50 overflow-hidden bg-card/50 backdrop-blur-sm transition-all duration-500 group-hover:border-primary/60 group-hover:shadow-[0_0_40px_hsl(var(--primary)_/_0.15)]"
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
      >
        {/* Badge */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-[10px] sm:text-xs font-bold shadow-lg">
          <Sparkles className="w-3 h-3" />
          {template.badge}
        </div>

        {/* Rating */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm text-[10px] sm:text-xs text-foreground">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          4.9
        </div>

        {/* Template Preview - rendered live with user's name */}
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
                transform: `scale(${SCALE})`,
                overflowX: 'hidden',
              }}
            >
              <PortfolioRenderer
                name={userName}
                title="Creative Professional"
                bio="Crafting exceptional digital experiences through thoughtful design, clean code, and strategic thinking."
                email="hello@studio.com"
                phone=""
                socialLinks={[]}
                primaryColor="#00e5ff"
                font="Inter"
                template={template.id}
              />
            </div>
          </PreviewModeProvider>
        </div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8"
        >
          <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-xl">
            Select This Template
            <ArrowRight className="w-4 h-4" />
          </div>
        </motion.div>
      </motion.div>

      {/* Template Info */}
      <div className="mt-4 px-1">
        <h3 className="font-heading text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors">
          {template.name}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">{template.desc}</p>
      </div>
    </motion.div>
  );
};

const PreviewGallery = ({ userName, onSelectTemplate }: Props) => {
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
              Preview for <span className="font-bold">{userName}</span>
            </span>
          </motion.div>

          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Your Portfolio,{' '}
            <span className="text-gradient">Your Style</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-xl mx-auto">
            Each template below shows YOUR name. Pick one to see the full experience.
          </p>
        </motion.div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {templates.map((tpl, i) => (
            <TemplateThumbnail
              key={tpl.id}
              template={tpl}
              userName={userName}
              onSelect={() => onSelectTemplate(tpl.id)}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreviewGallery;
