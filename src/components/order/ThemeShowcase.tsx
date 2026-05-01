import { motion } from 'framer-motion';
import { Check, Sparkles, Box, MousePointer2, Layers, Zap, Type, Palette } from 'lucide-react';
import type { PortfolioData } from '@/pages/OrderWizard';

const templates = [
  {
    id: 'aura-infinity' as const,
    name: 'Aura Infinity',
    tagline: 'Dark luxury with 3D effects & glassmorphism',
    badge: 'Flagship',
    bg: 'linear-gradient(135deg, #060912 0%, #0a1628 40%, #061220 100%)',
    accent: '#00e5ff',
    features: [
      { icon: Box, text: '3D Hero' },
      { icon: MousePointer2, text: 'Magnetic Btns' },
      { icon: Layers, text: 'Glassmorphism' },
      { icon: Zap, text: 'Scroll FX' },
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
      <p className="text-muted-foreground mb-6 text-sm">
        Select a premium template for your portfolio.
      </p>

      <div className="grid grid-cols-2 gap-3">
        {templates.map((tpl) => {
          const isSelected = selected === tpl.id;
          return (
            <motion.button
              key={tpl.id}
              onClick={() => updateData({ template: tpl.id })}
              className={`text-left rounded-xl border-2 overflow-hidden transition-all ${
                isSelected
                  ? 'border-primary shadow-[0_0_24px_hsl(var(--primary)_/_0.2)]'
                  : 'border-border/40 hover:border-primary/30'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Colored preview area */}
              <div
                className="relative h-24 sm:h-28 flex items-end p-3"
                style={{ background: tpl.bg }}
              >
                {/* Decorative accent elements */}
                <div className="absolute top-3 right-3 w-12 h-12 rounded-full opacity-20 blur-lg" style={{ background: tpl.accent }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-2xl border opacity-10 rotate-12" style={{ borderColor: tpl.accent }} />

                <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-bold z-10"
                  style={{ background: tpl.accent, color: '#050a14' }}>
                  <Sparkles className="w-2.5 h-2.5" /> {tpl.badge}
                </div>

                {isSelected && (
                  <motion.div
                    className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center z-10"
                    style={{ background: tpl.accent }}
                    layoutId="theme-check"
                  >
                    <Check className="w-3 h-3" style={{ color: '#050a14' }} />
                  </motion.div>
                )}

                {/* Template name overlay */}
                <div className="relative z-10">
                  <p className="text-white text-sm font-bold leading-tight">{tpl.name}</p>
                </div>
              </div>

              {/* Features */}
              <div className="p-2.5 space-y-1.5">
                <p className="text-muted-foreground text-[10px] leading-snug">{tpl.tagline}</p>
                <div className="flex flex-wrap gap-1">
                  {tpl.features.map((f) => (
                    <span
                      key={f.text}
                      className="flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] border border-border/30 text-muted-foreground"
                    >
                      <f.icon className="w-2.5 h-2.5 text-primary" />
                      {f.text}
                    </span>
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
