import { motion } from 'framer-motion';
import { Check, Sparkles, Box, MousePointer2, Layers, Zap } from 'lucide-react';
import templateImage from '@/assets/template-aura-infinity.jpg';

const features = [
  { icon: Box, text: '3D Interactive Hero' },
  { icon: MousePointer2, text: 'Magnetic Buttons' },
  { icon: Layers, text: 'Glassmorphism Cards' },
  { icon: Zap, text: 'Smooth Scroll Animations' },
];

const ThemeShowcase = () => (
  <div>
    <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-2">Your Template</h2>
    <p className="text-muted-foreground mb-6">
      Your portfolio will use our flagship interactive template — Aura Infinity.
    </p>

    <motion.div
      className="rounded-2xl border-2 border-primary bg-primary/5 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Image preview */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={templateImage}
          alt="Aura Infinity Template"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
          <Sparkles className="w-3 h-3" /> Flagship Template
        </div>
        <div className="absolute top-3 right-3">
          <motion.div
            className="w-7 h-7 rounded-full bg-primary flex items-center justify-center"
            layoutId="theme-selected"
          >
            <Check className="w-4 h-4 text-primary-foreground" />
          </motion.div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 sm:p-5">
        <h3 className="font-heading text-lg font-bold mb-1">Aura Infinity</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Dark luxury portfolio with Three.js 3D effects, cinematic animations & glassmorphism design.
        </p>

        <div className="grid grid-cols-2 gap-2">
          {features.map((f) => (
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
    </motion.div>
  </div>
);

export default ThemeShowcase;
