import { motion } from 'framer-motion';
import { Check, Crown, Sparkles, Star } from 'lucide-react';
import type { PortfolioData } from '@/pages/OrderWizard';
import themeCyberBento from '@/assets/theme-cyber-bento.jpg';
import themeMinimalistZen from '@/assets/theme-minimalist-zen.jpg';
import themeDynamicPro from '@/assets/theme-dynamic-pro.jpg';
import themeCreativeStudio from '@/assets/theme-creative-studio.jpg';
import themeExecutive from '@/assets/theme-executive.jpg';

interface Props {
  data: PortfolioData;
  updateData: (updates: Partial<PortfolioData>) => void;
}

const themes = [
  {
    id: 'cyber-bento' as const,
    name: 'The Aura Pro',
    tagline: 'Our #1 Most Popular',
    description: 'A full-blown professional website with 3D animations, Three.js effects, smooth scrolling, bento grid, and interactive sections. Perfect for ANY profession.',
    image: themeCyberBento,
    featured: true,
    badge: 'RECOMMENDED',
    features: ['3D & Three.js Effects', 'Bento Grid Layout', 'Interactive Animations', 'Multi-Section Website', 'Scroll Animations', 'Glassmorphism'],
  },
  {
    id: 'minimalist-zen' as const,
    name: 'The Minimalist Zen',
    tagline: 'Clean & Elegant',
    description: 'High whitespace, elegant serif typography, and subtle fade-in effects. Ideal for writers, designers & artists.',
    image: themeMinimalistZen,
    featured: false,
    features: ['Elegant Typography', 'Generous Whitespace', 'Subtle Fade-ins', 'Refined Design'],
  },
  {
    id: 'dynamic-pro' as const,
    name: 'The Dynamic Pro',
    tagline: 'Bold & Energetic',
    description: 'Bold, high-contrast layout with horizontal scrolling sections. Great for photographers & videographers.',
    image: themeDynamicPro,
    featured: false,
    features: ['High-Contrast', 'Horizontal Scroll', 'Bold Typography', 'Impactful'],
  },
  {
    id: 'creative-studio' as const,
    name: 'The Creative Studio',
    tagline: 'Vibrant & Playful',
    description: 'Colorful gradient mesh backgrounds with modern cards. Perfect for creative agencies & designers.',
    image: themeCreativeStudio,
    featured: false,
    features: ['Gradient Mesh', 'Playful Colors', 'Modern Cards', 'Creative Vibe'],
  },
  {
    id: 'executive' as const,
    name: 'The Executive',
    tagline: 'Luxury & Premium',
    description: 'Elegant dark theme with gold accents and sophisticated typography. Ideal for executives & consultants.',
    image: themeExecutive,
    featured: false,
    features: ['Gold Accents', 'Luxury Feel', 'Premium Design', 'Sophisticated'],
  },
];

const ThemeSelector = ({ data, updateData }: Props) => {
  const featured = themes[0];
  const others = themes.slice(1);

  return (
    <div>
      <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-2">Choose Your Template</h2>
      <p className="text-muted-foreground mb-6">Select a visual style for your portfolio.</p>

      {/* Featured Theme - Large Card */}
      <motion.button
        onClick={() => updateData({ theme: featured.id })}
        className={`w-full text-left rounded-2xl border-2 overflow-hidden mb-6 transition-all relative ${
          data.theme === featured.id
            ? 'border-primary shadow-[0_0_30px_hsl(var(--primary)/0.3)]'
            : 'border-border/50 hover:border-primary/40'
        }`}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.995 }}
      >
        {/* Badge */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold tracking-wider">
          <Crown className="w-3 h-3" /> {featured.badge}
        </div>

        {data.theme === featured.id && (
          <motion.div
            layoutId="theme-check"
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-primary flex items-center justify-center"
          >
            <Check className="w-4 h-4 text-primary-foreground" />
          </motion.div>
        )}

        {/* Image */}
        <div className="relative h-44 sm:h-52 overflow-hidden">
          <img
            src={featured.image}
            alt={featured.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-5 -mt-8 relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-[10px] uppercase tracking-widest text-primary font-semibold">{featured.tagline}</span>
          </div>
          <h3 className="font-heading text-xl font-bold mb-2">{featured.name}</h3>
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{featured.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {featured.features.map((f) => (
              <span key={f} className="text-[9px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                {f}
              </span>
            ))}
          </div>
        </div>
      </motion.button>

      {/* Other Themes - 2-column grid */}
      <div className="grid grid-cols-2 gap-3">
        {others.map((theme) => {
          const isSelected = data.theme === theme.id;
          return (
            <motion.button
              key={theme.id}
              onClick={() => updateData({ theme: theme.id })}
              className={`text-left rounded-xl border-2 overflow-hidden transition-all relative ${
                isSelected
                  ? 'border-primary shadow-lg shadow-primary/10'
                  : 'border-border/50 hover:border-primary/30'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSelected && (
                <motion.div
                  layoutId="theme-check"
                  className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                >
                  <Check className="w-3 h-3 text-primary-foreground" />
                </motion.div>
              )}

              {/* Image */}
              <div className="relative h-24 sm:h-28 overflow-hidden">
                <img
                  src={theme.image}
                  alt={theme.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-3 -mt-4 relative z-10">
                <p className="text-[9px] uppercase tracking-wider text-muted-foreground mb-0.5">{theme.tagline}</p>
                <h3 className="font-heading text-xs sm:text-sm font-bold mb-1 truncate">{theme.name}</h3>
                <p className="text-[10px] text-muted-foreground leading-snug line-clamp-2">{theme.description}</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeSelector;
