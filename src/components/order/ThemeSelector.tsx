import { motion } from 'framer-motion';
import { Grid3X3, Minus, Zap, Check } from 'lucide-react';
import type { PortfolioData } from '@/pages/OrderWizard';

interface Props {
  data: PortfolioData;
  updateData: (updates: Partial<PortfolioData>) => void;
}

const themes = [
  {
    id: 'cyber-bento' as const,
    name: 'The Cyber-Bento',
    description: 'Futuristic grid layout with neon glow borders and glassmorphism effects. Perfect for tech & creative professionals.',
    icon: Grid3X3,
    gradient: 'from-cyan-500 to-blue-600',
    features: ['Neon glow borders', 'Glassmorphism cards', 'Bento grid layout', 'Dark futuristic vibe'],
    preview: 'bg-gradient-to-br from-gray-950 via-gray-900 to-cyan-950',
  },
  {
    id: 'minimalist-zen' as const,
    name: 'The Minimalist Zen',
    description: 'High whitespace with elegant serif typography and subtle fade-in effects. Ideal for writers, designers & artists.',
    icon: Minus,
    gradient: 'from-stone-400 to-stone-600',
    features: ['Elegant serif typography', 'Generous whitespace', 'Subtle fade-ins', 'Clean & refined'],
    preview: 'bg-gradient-to-br from-stone-100 via-white to-stone-50',
  },
  {
    id: 'dynamic-pro' as const,
    name: 'The Dynamic Pro',
    description: 'Bold, high-contrast layout with horizontal scrolling for projects. Great for photographers & videographers.',
    icon: Zap,
    gradient: 'from-orange-500 to-red-600',
    features: ['High-contrast design', 'Horizontal scroll sections', 'Bold typography', 'Energetic & impactful'],
    preview: 'bg-gradient-to-br from-gray-950 via-gray-900 to-orange-950',
  },
];

const ThemeSelector = ({ data, updateData }: Props) => {
  return (
    <div>
      <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-2">Choose Your Theme</h2>
      <p className="text-muted-foreground mb-8">Select a visual style for your portfolio. You can always change this later from your admin panel.</p>

      <div className="space-y-4">
        {themes.map((theme) => {
          const isSelected = data.theme === theme.id;
          return (
            <motion.button
              key={theme.id}
              onClick={() => updateData({ theme: theme.id })}
              className={`w-full text-left rounded-2xl border-2 p-5 transition-all relative overflow-hidden ${
                isSelected
                  ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                  : 'border-border/50 bg-card/50 hover:border-primary/30 hover:bg-card/80'
              }`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {isSelected && (
                <motion.div
                  layoutId="theme-check"
                  className="absolute top-4 right-4 w-7 h-7 rounded-full bg-primary flex items-center justify-center"
                >
                  <Check className="w-4 h-4 text-primary-foreground" />
                </motion.div>
              )}

              <div className="flex items-start gap-4">
                {/* Mini preview */}
                <div className={`w-20 h-14 rounded-xl ${theme.preview} flex-shrink-0 border border-border/20 flex items-center justify-center`}>
                  <theme.icon className={`w-6 h-6 ${theme.id === 'minimalist-zen' ? 'text-stone-600' : 'text-white/70'}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-heading text-lg font-bold mb-1">{theme.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{theme.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {theme.features.map((f) => (
                      <span key={f} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeSelector;
