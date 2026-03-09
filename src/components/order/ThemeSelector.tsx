import { motion } from 'framer-motion';
import { Check, Crown, Sparkles } from 'lucide-react';
import type { PortfolioData } from '@/pages/OrderWizard';
import themeAuraInfinity from '@/assets/theme-aura-infinity.jpg';
import themeAuraInfinityAlt from '@/assets/theme-aura-infinity-alt.jpg';
import themeMinimalistZen from '@/assets/theme-minimalist-zen.jpg';
import themeDynamicPro from '@/assets/theme-dynamic-pro.jpg';
import themeCreativeStudio from '@/assets/theme-creative-studio.jpg';
import themeExecutive from '@/assets/theme-executive.jpg';
import themeCyberBento from '@/assets/theme-cyber-bento.jpg';

interface Props {
  data: PortfolioData;
  updateData: (updates: Partial<PortfolioData>) => void;
}

const themes = [
  {
    id: 'aura-infinity' as const,
    name: 'Aura Infinity X',
    tagline: 'Most Premium • High Conversion',
    description:
      'Massive interactive website with cinematic hero, layered project stories, smooth scrolling, bold motion, pseudo-3D sections, and conversion-focused structure for any profession.',
    image: themeAuraInfinity,
    accentImage: themeAuraInfinityAlt,
    featured: true,
    badge: 'TOP SELLER',
    features: ['Cinematic Hero', 'Interactive Sections', 'Big Portfolio Showcase', 'Smooth Scroll Storytelling', 'Premium Motion', 'Impulse-Buy Design'],
  },
  {
    id: 'minimalist-zen' as const,
    name: 'The Minimalist Zen',
    tagline: 'Clean & Elegant',
    description: 'Quiet editorial style with whitespace and refined typography.',
    image: themeMinimalistZen,
    featured: false,
  },
  {
    id: 'dynamic-pro' as const,
    name: 'The Dynamic Pro',
    tagline: 'Bold & Energetic',
    description: 'High-contrast layout with dynamic motion and strong hierarchy.',
    image: themeDynamicPro,
    featured: false,
  },
  {
    id: 'creative-studio' as const,
    name: 'The Creative Studio',
    tagline: 'Vibrant & Playful',
    description: 'Colorful creative direction for agencies and visual creators.',
    image: themeCreativeStudio,
    featured: false,
  },
  {
    id: 'executive' as const,
    name: 'The Executive',
    tagline: 'Luxury & Premium',
    description: 'Elegant, premium structure for consultants and leaders.',
    image: themeExecutive,
    featured: false,
  },
  {
    id: 'editorial-flow' as const,
    name: 'The Editorial Flow',
    tagline: 'Story Driven',
    description: 'Magazine-like storytelling for creators and thought leaders.',
    image: themeAuraInfinityAlt,
    featured: false,
  },
  {
    id: 'bold-grid' as const,
    name: 'The Bold Grid',
    tagline: 'Modern Grid',
    description: 'Card-heavy conversion layout with impact-focused visual rhythm.',
    image: themeCyberBento,
    featured: false,
  },
];

const ThemeSelector = ({ data, updateData }: Props) => {
  const featured = themes[0];
  const others = themes.slice(1);

  return (
    <div>
      <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-2">Choose Your Template</h2>
      <p className="text-muted-foreground mb-6">Pick your style — everything updates live above while you fill the form.</p>

      <motion.button
        onClick={() => updateData({ theme: featured.id })}
        className={`w-full text-left rounded-2xl border-2 overflow-hidden mb-6 transition-all relative ${
          data.theme === featured.id ? 'border-primary shadow-[0_0_36px_hsl(var(--primary)/0.28)]' : 'border-border/50 hover:border-primary/40'
        }`}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.995 }}
      >
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold tracking-wider">
          <Crown className="w-3 h-3" /> {featured.badge}
        </div>

        {data.theme === featured.id && (
          <motion.div
            layoutId="theme-check"
            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-primary flex items-center justify-center"
          >
            <Check className="w-4 h-4 text-primary-foreground" />
          </motion.div>
        )}

        <div className="relative h-48 sm:h-56 overflow-hidden">
          <img src={featured.image} alt={featured.name} className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute right-3 bottom-3 w-28 h-20 sm:w-36 sm:h-24 rounded-xl overflow-hidden border border-border/60 shadow-xl">
            <img src={featured.accentImage} alt="Aura Infinity detail preview" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>

        <div className="p-5 -mt-10 relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-[10px] uppercase tracking-widest text-primary font-semibold">{featured.tagline}</span>
          </div>
          <h3 className="font-heading text-xl font-bold mb-2">{featured.name}</h3>
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{featured.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {featured.features.map((feature) => (
              <span key={feature} className="text-[9px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                {feature}
              </span>
            ))}
          </div>
        </div>
      </motion.button>

      <div className="grid grid-cols-2 gap-3">
        {others.map((theme) => {
          const isSelected = data.theme === theme.id;
          return (
            <motion.button
              key={theme.id}
              onClick={() => updateData({ theme: theme.id })}
              className={`text-left rounded-xl border-2 overflow-hidden transition-all relative ${
                isSelected ? 'border-primary shadow-lg shadow-primary/10' : 'border-border/50 hover:border-primary/30'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.985 }}
            >
              {isSelected && (
                <motion.div
                  layoutId="theme-check"
                  className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                >
                  <Check className="w-3 h-3 text-primary-foreground" />
                </motion.div>
              )}

              <div className="relative h-24 sm:h-28 overflow-hidden">
                <img src={theme.image} alt={theme.name} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              </div>

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
