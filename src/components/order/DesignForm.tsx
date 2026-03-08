import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { PortfolioData } from '@/pages/OrderWizard';

interface Props {
  data: PortfolioData;
  updateData: (updates: Partial<PortfolioData>) => void;
}

const presetColors = [
  '#00e5ff', '#6366f1', '#f43f5e', '#22c55e', '#f59e0b', '#ec4899', '#8b5cf6', '#14b8a6',
  '#ff6b35', '#3b82f6', '#a855f7', '#ef4444',
];

const fonts: { id: PortfolioData['font']; name: string; sample: string; style: string }[] = [
  { id: 'Inter', name: 'Inter', sample: 'Clean & Modern', style: 'font-sans' },
  { id: 'Playfair Display', name: 'Playfair Display', sample: 'Elegant & Serif', style: 'font-serif' },
  { id: 'JetBrains Mono', name: 'JetBrains Mono', sample: 'Code & Technical', style: 'font-mono' },
];

const DesignForm = ({ data, updateData }: Props) => {
  return (
    <div>
      <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-2">Design Customization</h2>
      <p className="text-muted-foreground mb-8">
        Pick your brand color and font. All optional — defaults look great too. Changeable from admin panel.
      </p>

      {/* Color Picker */}
      <div className="mb-8">
        <label className="text-sm font-medium mb-3 block">Primary Brand Color</label>
        <div className="flex flex-wrap gap-3 mb-4">
          {presetColors.map((color) => (
            <motion.button
              key={color}
              onClick={() => updateData({ primaryColor: color })}
              className="relative w-10 h-10 rounded-xl border-2 transition-all"
              style={{
                backgroundColor: color,
                borderColor: data.primaryColor === color ? 'white' : 'transparent',
                boxShadow: data.primaryColor === color ? `0 0 20px ${color}60` : 'none',
              }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            >
              {data.primaryColor === color && (
                <Check className="w-4 h-4 text-white absolute inset-0 m-auto drop-shadow-md" />
              )}
            </motion.button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <label className="text-xs text-muted-foreground">Custom:</label>
          <div className="relative">
            <input
              type="color"
              value={data.primaryColor}
              onChange={(e) => updateData({ primaryColor: e.target.value })}
              className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent"
            />
          </div>
          <span className="text-xs font-mono text-muted-foreground">{data.primaryColor}</span>
          <div
            className="w-full h-2 rounded-full ml-2"
            style={{ background: `linear-gradient(90deg, ${data.primaryColor}20, ${data.primaryColor}, ${data.primaryColor}20)` }}
          />
        </div>
      </div>

      {/* Font Selection */}
      <div>
        <label className="text-sm font-medium mb-3 block">Typography</label>
        <div className="space-y-3">
          {fonts.map((font) => {
            const isSelected = data.font === font.id;
            return (
              <motion.button
                key={font.id}
                onClick={() => updateData({ font: font.id })}
                className={`w-full text-left rounded-xl border-2 p-4 transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-primary bg-primary/5'
                    : 'border-border/50 bg-card/50 hover:border-primary/30'
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div>
                  <p className={`text-lg font-bold ${font.style}`}>{font.name}</p>
                  <p className={`text-sm text-muted-foreground ${font.style}`}>{font.sample}</p>
                </div>
                {isSelected && (
                  <motion.div
                    layoutId="font-check"
                    className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                  >
                    <Check className="w-3.5 h-3.5 text-primary-foreground" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DesignForm;
