import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PortfolioRenderer from '@/components/portfolio/PortfolioRenderer';
import { PreviewModeProvider } from '@/contexts/PreviewModeContext';
import type { PersonalData } from '@/components/HeroSection';

interface Props {
  personalData: PersonalData;
  onBack: () => void;
  onPayment: () => void;
}

const TemplateFullPreview = ({ personalData, onBack, onPayment }: Props) => {
  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Top Banner - Paywall */}
      <motion.div
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
        className="relative z-20 flex items-center justify-between px-4 sm:px-6 py-3 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-b border-primary/20 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>
          <div className="w-px h-5 bg-border/50" />
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs sm:text-sm text-foreground font-medium">
              Your site is <span className="text-primary font-bold">95% ready</span>. Only 1 step left.
            </span>
          </div>
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="hero"
            size="sm"
            className="gap-1.5 text-xs sm:text-sm shadow-xl"
            onClick={onPayment}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Claim Your Site for just</span> $49
          </Button>
        </motion.div>
      </motion.div>

      {/* Full Preview - No sidebar */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <PreviewModeProvider>
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
        </PreviewModeProvider>
      </div>
    </div>
  );
};

export default TemplateFullPreview;
