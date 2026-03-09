import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Palette, Type, User, Eye, Sparkles, X, Copy, CheckCheck, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import LivePreview from '@/components/order/LivePreview';
import ThemeSelector from '@/components/order/ThemeSelector';
import ProfileForm from '@/components/order/ProfileForm';
import DesignForm from '@/components/order/DesignForm';
import ReviewStep from '@/components/order/ReviewStep';
import { savePortfolio, type StoredPortfolio } from '@/lib/portfolioStore';

export interface PortfolioData {
  theme:
    | 'aura-infinity'
    | 'minimalist-zen'
    | 'dynamic-pro'
    | 'creative-studio'
    | 'executive'
    | 'editorial-flow'
    | 'bold-grid'
    | 'cyber-bento';
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
}

const defaultData: PortfolioData = {
  theme: 'aura-infinity',
  name: '',
  title: '',
  bio: '',
  email: '',
  phone: '',
  socialLinks: [{ platform: 'GitHub', url: '' }, { platform: 'LinkedIn', url: '' }, { platform: 'Twitter', url: '' }],
  adminPassword: '',
  primaryColor: '#00e5ff',
  font: 'Inter',
  profileImage: '',
};

const steps = [
  { id: 1, label: 'Theme', icon: Palette },
  { id: 2, label: 'Profile', icon: User },
  { id: 3, label: 'Design', icon: Type },
  { id: 4, label: 'Review', icon: Eye },
];

const OrderWizard = () => {
  const navigate = useNavigate();
  const { templateId } = useParams();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<PortfolioData>(() => {
    const initial = { ...defaultData };
    if (templateId === 'aura-infinity') initial.theme = 'aura-infinity';
    else if (templateId === 'minimalist-zen') initial.theme = 'minimalist-zen';
    else if (templateId === 'dynamic-pro') initial.theme = 'dynamic-pro';
    else if (templateId === 'creative-studio') initial.theme = 'creative-studio';
    else if (templateId === 'executive') initial.theme = 'executive';
    else if (templateId === 'editorial-flow') initial.theme = 'editorial-flow';
    else if (templateId === 'bold-grid') initial.theme = 'bold-grid';
    return initial;
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [savedPortfolio, setSavedPortfolio] = useState<StoredPortfolio | null>(null);
  const [copied, setCopied] = useState(false);
  const [publishError, setPublishError] = useState('');

  const updateData = useCallback((updates: Partial<PortfolioData>) => {
    setData(prev => ({ ...prev, ...updates }));
  }, []);

  const canProceed = () => {
    if (step === 1) return true;
    if (step === 2) return data.name.trim().length > 0;
    if (step === 3) return true;
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

  // Success screen
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background relative">
        <CustomCursor />
        <Header />
        <main className="relative z-10 pt-32 pb-20">
          <div className="container-custom max-w-2xl text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mx-auto mb-8"
            >
              <Sparkles className="w-12 h-12 text-primary" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-heading text-4xl md:text-5xl font-bold mb-4"
            >
              Your Portfolio is Live! 🎉
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-muted-foreground text-lg mb-8"
            >
              <span className="text-primary font-semibold">{data.name}'s</span> portfolio has been published.
            </motion.p>

            {/* Portfolio Link Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="rounded-2xl border border-primary/30 bg-primary/5 backdrop-blur-sm p-6 mb-8 mx-auto max-w-lg"
            >
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Your Portfolio Link</p>
              <div className="flex items-center gap-2 bg-background/80 rounded-xl border border-border/50 p-3">
                <code className="text-sm text-primary flex-1 truncate text-left">{portfolioUrl}</code>
                <button
                  onClick={handleCopy}
                  className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-colors"
                >
                  {copied ? <CheckCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              {copied && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-primary mt-2">
                  Link copied to clipboard!
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
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
          {/* Back button */}
          <motion.button
            onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors text-sm"
            whileHover={{ x: -4 }}
          >
            <ArrowLeft className="w-4 h-4" />
            {step > 1 ? 'Previous Step' : 'Back'}
          </motion.button>

          {/* Step progress bar - like reference */}
          <div className="flex items-center gap-1 mb-2">
            {steps.map((s) => (
              <div
                key={s.id}
                className={`flex-1 h-1 rounded-full transition-all duration-500 ${
                  step >= s.id ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs text-muted-foreground">Step {step}/{steps.length}</p>
            <p className="text-xs text-muted-foreground">{steps[step - 1].label}</p>
          </div>

          {/* Live Preview at top - scrollable like reference */}
          <motion.div
            layout
            className="rounded-2xl border border-border/30 bg-card/50 backdrop-blur-sm overflow-hidden mb-6"
          >
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/30 bg-muted/30">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="text-[10px] text-muted-foreground ml-2 font-mono truncate">
                {data.name ? `${data.name.toLowerCase().replace(/\s+/g, '-')}.portaura.dev` : 'your-portfolio.portaura.dev'}
              </span>
            </div>
            <div className="h-[280px] sm:h-[320px] overflow-y-auto">
              <LivePreview data={data} />
            </div>
          </motion.div>

          <p className="text-[10px] text-muted-foreground text-center mb-6 flex items-center justify-center gap-1">
            <Eye className="w-3 h-3" /> Live preview — changes update in real-time
          </p>

          {/* Form content below preview */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <ThemeSelector data={data} updateData={updateData} />
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <ProfileForm data={data} updateData={updateData} />
              </motion.div>
            )}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <DesignForm data={data} updateData={updateData} />
              </motion.div>
            )}
            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <ReviewStep data={data} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="mt-8 pb-4">
            {publishError && (
              <p className="text-sm text-destructive mb-3 text-center">{publishError}</p>
            )}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
              {step < 4 ? (
                <Button
                  variant="hero"
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className="gap-2"
                >
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
