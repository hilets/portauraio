import { motion } from 'framer-motion';
import { Check, Sparkles, Palette } from 'lucide-react';
import type { PortfolioData } from '@/pages/OrderWizard';

interface Props {
  data: PortfolioData;
  updateData: (updates: Partial<PortfolioData>) => void;
}

const templates: { id: PortfolioData['template']; name: string; desc: string }[] = [
  { id: 'aura-infinity', name: 'Aura Infinity', desc: 'Futuristic 3D hero with bento-grid layout' },
];

const presetColors = [
  '#00e5ff', '#6366f1', '#f43f5e', '#22c55e', '#f59e0b', '#ec4899', '#8b5cf6', '#14b8a6',
  '#ff6b35', '#3b82f6', '#a855f7', '#ef4444',
];

const fonts: { id: PortfolioData['font']; name: string; style: string }[] = [
  { id: 'Inter', name: 'Inter', style: 'font-sans' },
  { id: 'Playfair Display', name: 'Playfair', style: 'font-serif' },
  { id: 'JetBrains Mono', name: 'Mono', style: 'font-mono' },
];

const PreviewPublishStep = ({ data, updateData }: Props) => {
  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-2">
          Customize & <span className="text-primary">Publish</span>
        </h2>
        <p className="text-muted-foreground text-sm">
          Choose your template, colors, and hit publish!
        </p>
      </div>

      {/* Template Selection */}
      <div className="mb-6">
        <label className="text-sm font-medium mb-3 block flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" /> Choose Template
        </label>
        <div className="grid grid-cols-2 gap-3">
          {templates.map((tpl) => {
            const isSelected = data.template === tpl.id;
            return (
              <motion.button
                key={tpl.id}
                onClick={() => updateData({ template: tpl.id })}
                className={`relative text-left rounded-xl border-2 p-4 transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/5 shadow-[0_0_20px_hsl(var(--primary)_/_0.15)]'
                    : 'border-border/50 bg-card/50 hover:border-primary/30'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <p className="font-heading text-sm font-bold">{tpl.name}</p>
                <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">{tpl.desc}</p>
                {isSelected && (
                  <motion.div
                    layoutId="tpl-check"
                    className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                  >
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Color */}
      <div className="mb-6">
        <label className="text-sm font-medium mb-3 block flex items-center gap-2">
          <Palette className="w-4 h-4 text-primary" /> Brand Color
        </label>
        <div className="flex flex-wrap gap-2.5">
          {presetColors.map((color) => (
            <motion.button
              key={color}
              onClick={() => updateData({ primaryColor: color })}
              className="relative w-8 h-8 rounded-lg border-2 transition-all"
              style={{
                backgroundColor: color,
                borderColor: data.primaryColor === color ? 'white' : 'transparent',
                boxShadow: data.primaryColor === color ? `0 0 16px ${color}60` : 'none',
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {data.primaryColor === color && (
                <Check className="w-3.5 h-3.5 text-white absolute inset-0 m-auto drop-shadow-md" />
              )}
            </motion.button>
          ))}
          <div className="flex items-center gap-2 ml-2">
            <input
              type="color"
              value={data.primaryColor}
              onChange={(e) => updateData({ primaryColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* Font */}
      <div className="mb-4">
        <label className="text-sm font-medium mb-3 block">Typography</label>
        <div className="flex gap-2">
          {fonts.map((font) => {
            const isSelected = data.font === font.id;
            return (
              <motion.button
                key={font.id}
                onClick={() => updateData({ font: font.id })}
                className={`flex-1 text-center rounded-xl border-2 py-3 px-2 transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/5'
                    : 'border-border/50 bg-card/50 hover:border-primary/30'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                <p className={`text-sm font-bold ${font.style}`}>{font.name}</p>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xs text-muted-foreground/60 text-center pt-4 border-t border-border/30"
      >
        All settings are editable from the admin panel after publishing.
      </motion.div>
    </div>
  );
};

export default PreviewPublishStep;
