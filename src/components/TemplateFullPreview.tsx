import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Upload, Camera, X, CreditCard, Sparkles, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PortfolioRenderer from '@/components/portfolio/PortfolioRenderer';
import { PreviewModeProvider } from '@/contexts/PreviewModeContext';

interface Props {
  userName: string;
  templateId: 'aura-infinity' | 'quantum-studio';
  onBack: () => void;
  onPayment: () => void;
}

const TemplateFullPreview = ({ userName, templateId, onBack, onPayment }: Props) => {
  const [headshot, setHeadshot] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setHeadshot(url);
    }
  };

  useEffect(() => {
    return () => {
      if (headshot) URL.revokeObjectURL(headshot);
    };
  }, [headshot]);

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

      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar - Quick Polishing */}
        <AnimatePresence>
          {showSidebar && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="w-72 sm:w-80 flex-shrink-0 border-r border-border/30 bg-card/80 backdrop-blur-md p-5 flex flex-col gap-6 overflow-y-auto z-10"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-sm font-bold text-foreground flex items-center gap-2">
                  <Camera className="w-4 h-4 text-primary" />
                  Quick Polishing
                </h3>
                <button
                  onClick={() => setShowSidebar(false)}
                  className="p-1 rounded-lg hover:bg-muted/50 text-muted-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Headshot Upload */}
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Add your photo to see it fully personalized.
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                {headshot ? (
                  <div className="relative">
                    <img
                      src={headshot}
                      alt="Your headshot"
                      className="w-full aspect-square object-cover rounded-2xl border-2 border-primary/30"
                    />
                    <button
                      onClick={() => {
                        setHeadshot(null);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                    >
                      <Check className="w-3.5 h-3.5 text-primary-foreground" />
                    </motion.div>
                  </div>
                ) : (
                  <motion.button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full aspect-square rounded-2xl border-2 border-dashed border-border/50 bg-muted/20 flex flex-col items-center justify-center gap-3 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <Upload className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">Upload Your Headshot</p>
                      <p className="text-[10px] text-muted-foreground mt-1">JPG, PNG • Max 5MB</p>
                    </div>
                  </motion.button>
                )}
              </div>

              {/* Personalization status */}
              <div className="rounded-xl border border-border/30 bg-muted/20 p-4">
                <p className="text-xs font-medium text-foreground mb-3">Personalization</p>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-primary-foreground" />
                    </div>
                    <span className="text-xs text-foreground">Name: {userName}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${headshot ? 'bg-primary' : 'bg-muted border border-border/50'}`}>
                      {headshot && <Check className="w-2.5 h-2.5 text-primary-foreground" />}
                    </div>
                    <span className={`text-xs ${headshot ? 'text-foreground' : 'text-muted-foreground'}`}>
                      Photo {headshot ? 'uploaded' : 'not uploaded'}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA in sidebar */}
              <div className="mt-auto pt-4 border-t border-border/30">
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full gap-2"
                  onClick={onPayment}
                >
                  <CreditCard className="w-4 h-4" />
                  Claim for $49
                </Button>
                <p className="text-[10px] text-muted-foreground text-center mt-2">
                  One-time payment • No subscription
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle sidebar button (when hidden) */}
        {!showSidebar && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowSidebar(true)}
            className="absolute top-4 left-4 z-20 p-2.5 rounded-xl bg-card/80 backdrop-blur-sm border border-border/30 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Camera className="w-5 h-5" />
          </motion.button>
        )}

        {/* Full Preview */}
        <div ref={previewRef} className="flex-1 overflow-y-auto overflow-x-hidden">
          <PreviewModeProvider>
            <PortfolioRenderer
              name={userName}
              title="Creative Professional"
              bio="Crafting exceptional digital experiences through thoughtful design, clean code, and strategic thinking."
              email="hello@studio.com"
              phone=""
              socialLinks={[]}
              primaryColor="#00e5ff"
              font="Inter"
              template={templateId}
            />
          </PreviewModeProvider>
        </div>
      </div>
    </div>
  );
};

export default TemplateFullPreview;
