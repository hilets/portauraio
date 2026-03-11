import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Type, User, Eye, Sparkles, Copy, CheckCheck, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import LivePreview from '@/components/order/LivePreview';
import ProfileForm from '@/components/order/ProfileForm';
import DesignForm from '@/components/order/DesignForm';
import ReviewStep from '@/components/order/ReviewStep';
import ThemeShowcase from '@/components/order/ThemeShowcase';
import { savePortfolio, type StoredPortfolio } from '@/lib/portfolioStore';

export interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  socialLinks: { platform: string; url: string }[];
  adminPassword: string;
  primaryColor: string;
  font: 'Inter' | 'Playfair Display' | 'JetBrains Mono';
  profileImage: string;
  template: 'aura-infinity' | 'quantum-studio';
}

const defaultData: PortfolioData = {
  name: '',
  title: '',
  bio: '',
  email: '',
  phone: '',
  socialLinks: [
    { platform: 'GitHub', url: '' },
    { platform: 'LinkedIn', url: '' },
    { platform: 'Twitter', url: '' },
  ],
  adminPassword: '',
  primaryColor: '#00e5ff',
  font: 'Inter',
  profileImage: '',
  template: 'aura-infinity',
};

const steps = [
  { id: 1, label: 'Template', icon: Sparkles },
  { id: 2, label: 'Profile', icon: User },
  { id: 3, label: 'Design', icon: Type },
  { id: 4, label: 'Review', icon: Eye },
];

const OrderWizard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<PortfolioData>({ ...defaultData });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [savedPortfolio, setSavedPortfolio] = useState<StoredPortfolio | null>(null);
  const [copied, setCopied] = useState(false);
  const [publishError, setPublishError] = useState('');

  const updateData = useCallback((updates: Partial<PortfolioData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  }, []);

  const canProceed = () => {
    if (step === 2) return data.name.trim().length > 0;
    return true;
  };

  const handleSubmit = () => {
    try {
      const stored = savePortfolio(data);
      setSavedPortfolio(stored);
      setPublishError('');
      setIsSubmitted(true);
    } catch {
      setPublishError('Publish failed. Please try again.');
    }
  };

  const portfolioPath = savedPortfolio ? `/p/${savedPortfolio.id}` : '';
  const portfolioUrl = savedPortfolio ? `${window.location.origin}${portfolioPath}` : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(portfolioUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background relative">
        <CustomCursor />
        <Header />
        <main className="relative z-10 pt-32 pb-20">
          <div className="container-custom max-w-2xl text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
              className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mx-auto mb-8">
              <Sparkles className="w-12 h-12 text-primary" />
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Your Portfolio is Live! 🎉
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="text-muted-foreground text-lg mb-8">
              <span className="text-primary font-semibold">{data.name}'s</span> portfolio has been published.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
              className="rounded-2xl border border-primary/30 bg-primary/5 backdrop-blur-sm p-6 mb-8 mx-auto max-w-lg">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Your Portfolio Link</p>
              <div className="flex items-center gap-2 bg-background/80 rounded-xl border border-border/50 p-3">
                <code className="text-sm text-primary flex-1 truncate text-left">{portfolioUrl}</code>
                <button onClick={handleCopy}
                  className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-colors">
                  {copied ? <CheckCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              {copied && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-primary mt-2">
                  Link copied to clipboard!
                </motion.p>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" onClick={() => navigate(portfolioPath)} className="gap-2">
                <ExternalLink className="w-4 h-4" /> View Portfolio
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/')}>Go Home</Button>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <CustomCursor />
      <Header />
      <main className="relative z-10 pt-28 pb-20">
        <div className="container-custom max-w-2xl">
          {/* Back */}
          <motion.button onClick={() => (step > 1 ? setStep(step - 1) : navigate(-1))}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors text-sm" whileHover={{ x: -4 }}>
            <ArrowLeft className="w-4 h-4" />
            {step > 1 ? 'Previous Step' : 'Back'}
          </motion.button>

          {/* Step Indicators */}
          <div className="flex items-center gap-0 mb-8 bg-muted/20 rounded-2xl p-1.5 border border-border/20">
            {steps.map((s) => {
              const Icon = s.icon;
              const isActive = step === s.id;
              const isDone = step > s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => { if (isDone) setStep(s.id); }}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                      : isDone
                        ? 'text-primary hover:bg-primary/10 cursor-pointer'
                        : 'text-muted-foreground cursor-default'
                  }`}
                >
                  {isDone ? (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  ) : (
                    <Icon className="w-3.5 h-3.5" />
                  )}
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
              );
            })}
          </div>

          {/* Live Preview */}
          <motion.div layout className="rounded-2xl border border-border/30 bg-card/50 backdrop-blur-sm overflow-hidden mb-4">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border/30 bg-muted/30">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-destructive/60" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                <div className="w-2 h-2 rounded-full bg-green-500/60" />
              </div>
              <span className="text-[10px] text-muted-foreground ml-2 font-mono truncate">
                {data.name ? `${data.name.toLowerCase().replace(/\s+/g, '-')}.portaura.dev` : 'your-portfolio.portaura.dev'}
              </span>
            </div>
            <div className="h-[280px] sm:h-[340px] overflow-y-auto overflow-x-hidden">
              <LivePreview data={data} />
            </div>
          </motion.div>

          <p className="text-[10px] text-muted-foreground text-center mb-6 flex items-center justify-center gap-1">
            <Eye className="w-3 h-3" /> Live preview — scroll to explore
          </p>

          {/* Form */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <ThemeShowcase data={data} updateData={updateData} />
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <ProfileForm data={data} updateData={updateData} />
              </motion.div>
            )}
            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <DesignForm data={data} updateData={updateData} />
              </motion.div>
            )}
            {step === 4 && (
              <motion.div key="s4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <ReviewStep data={data} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Nav */}
          <div className="mt-8 pb-4">
            {publishError && <p className="text-sm text-destructive mb-3 text-center">{publishError}</p>}
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1} className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
              {step < 4 ? (
                <Button variant="hero" onClick={() => setStep(step + 1)} disabled={!canProceed()} className="gap-2">
                  Next <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button variant="hero" size="xl" onClick={handleSubmit} className="gap-2">
                  <Sparkles className="w-4 h-4" /> Publish Portfolio
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderWizard;
