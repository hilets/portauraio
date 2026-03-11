import { motion } from 'framer-motion';
import { Check, Sparkles, Box, MousePointer2, Layers, Zap, Type, Palette } from 'lucide-react';
import PortfolioRenderer from '@/components/portfolio/PortfolioRenderer';
import type { PortfolioData } from '@/pages/OrderWizard';

const templates = [
  {
    id: 'aura-infinity' as const,
    name: 'Aura Infinity',
    tagline: 'Dark luxury with Three.js 3D effects & glassmorphism',
    badge: 'Flagship',
    features: [
      { icon: Box, text: '3D Interactive Hero' },
      { icon: MousePointer2, text: 'Magnetic Buttons' },
      { icon: Layers, text: 'Glassmorphism Cards' },
      { icon: Zap, text: 'Smooth Scroll Effects' },
    ],
  },
  {
    id: 'quantum-studio' as const,
    name: 'Quantum Studio',
    tagline: 'Editorial minimalism with cinematic text reveals & fluid motion',
    badge: 'Premium',
    features: [
      { icon: Type, text: 'Animated Text Reveals' },
      { icon: Palette, text: 'Editorial Layout' },
      { icon: Zap, text: 'Scroll-Driven Motion' },
      { icon: MousePointer2, text: 'Interactive Hover Effects' },
    ],
  },
];

interface Props {
  data: PortfolioData;
  updateData: (updates: Partial<PortfolioData>) => void;
}

const ThemeShowcase = ({ data, updateData }: Props) => {
  const selected = data.template || 'aura-infinity';

  return (
    <div>
      <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-2">Choose Your Template</h2>
      <p className="text-muted-foreground mb-6">
        Select a premium template for your portfolio. Both are fully interactive with live preview.
      </p>

      <div className="space-y-4">
        {templates.map((tpl) => {
          const isSelected = selected === tpl.id;
          return (
            <motion.button
              key={tpl.id}
              onClick={() => updateData({ template: tpl.id })}
              className={`w-full text-left rounded-2xl border-2 overflow-hidden transition-all ${
                isSelected
                  ? 'border-primary shadow-[0_0_30px_hsl(var(--primary)_/_0.15)]'
                  : 'border-border/50 hover:border-primary/30'
              }`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.995 }}
            >
              {/* Scaled full preview */}
              <div className="relative h-[200px] sm:h-[240px] overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="w-[1280px] origin-top-left" style={{ transform: 'scale(0.35)' }}>
                    <PortfolioRenderer
                      name={data.name || 'Alex Morgan'}
                      title={data.title || 'Creative Designer'}
                      bio={data.bio || 'Crafting exceptional digital experiences.'}
                      email={data.email || 'hello@studio.com'}
                      phone=""
                      socialLinks={data.socialLinks}
                      primaryColor={data.primaryColor}
                      font={data.font}
                      template={tpl.id}
                    />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold z-10">
                  <Sparkles className="w-3 h-3" /> {tpl.badge}
                </div>
                {isSelected && (
                  <div className="absolute top-3 right-3 z-10">
                    <motion.div
                      className="w-7 h-7 rounded-full bg-primary flex items-center justify-center"
                      layoutId="theme-selected"
                    >
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </motion.div>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4 sm:p-5">
                <h3 className="font-heading text-lg font-bold mb-1">{tpl.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{tpl.tagline}</p>
                <div className="grid grid-cols-2 gap-2">
                  {tpl.features.map((f) => (
                    <div
                      key={f.text}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border/30 bg-muted/20"
                    >
                      <f.icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <span className="text-xs text-foreground">{f.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeShowcase;
