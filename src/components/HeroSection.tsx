import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, User } from 'lucide-react';

export interface PersonalData {
  name: string;
  title: string;
  bio: string;
  location: string;
  skills: string[];
}

interface Props {
  onCreatePreview: (data: PersonalData) => void;
}

const HeroSection = ({ onCreatePreview }: Props) => {
  const [name, setName] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!name.trim()) return;
    onCreatePreview({
      name: name.trim(),
      title: '',
      bio: '',
      location: '',
      skills: [],
    });
  };

  return (
    <section className="relative pt-32 md:pt-44 pb-24 md:pb-32 px-4 sm:px-6 overflow-hidden">
      {/* Soft warm-to-cool ambient backdrop (nas.com inspired) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(1200px 600px at 50% -10%, hsl(35 90% 92% / 0.55), transparent 60%), radial-gradient(900px 500px at 50% 110%, hsl(220 80% 92% / 0.6), transparent 60%), linear-gradient(180deg, hsl(220 30% 99%) 0%, hsl(220 30% 97%) 100%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-7"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-foreground/[0.04] border border-foreground/10 text-xs font-medium text-foreground/70 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Free preview · No sign up
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="text-center text-foreground font-semibold tracking-[-0.03em] leading-[0.95]
                     text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        >
          Build your portfolio{' '}
          <span
            className="italic font-normal text-primary"
            style={{ fontFamily: "'Instrument Serif', serif", letterSpacing: '-0.02em' }}
          >
            from a single name
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mt-7 leading-relaxed"
        >
          We design your storefront, write your copy, and visualize your personal brand. All in seconds.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 mx-auto max-w-xl"
        >
          <div
            className="relative flex items-center gap-1.5 p-1.5 rounded-full bg-card border border-foreground/10
                       shadow-[0_10px_40px_-12px_hsl(220_40%_30%/0.18)]
                       focus-within:border-primary/40 focus-within:shadow-[0_18px_50px_-12px_hsl(220_70%_32%/0.28)]
                       transition-all duration-300"
          >
            <div className="relative flex-1 min-w-0">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name…"
                autoFocus
                className="w-full pl-12 pr-3 py-3.5 sm:py-4 bg-transparent text-foreground text-base sm:text-[1.05rem] font-medium focus:outline-none placeholder:text-muted-foreground/50 placeholder:font-normal"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              disabled={!name.trim()}
              className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground
                         px-5 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base font-semibold
                         disabled:opacity-50 disabled:cursor-not-allowed transition-all
                         hover:shadow-[0_8px_24px_-6px_hsl(220_70%_32%/0.5)] whitespace-nowrap"
            >
              <span className="hidden sm:inline">Start for free</span>
              <span className="sm:hidden">Start</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          </div>

          <p className="text-center text-xs text-muted-foreground/70 mt-5">
            Trusted by <span className="font-semibold text-foreground/80">12,000+</span> creators · No credit card required
          </p>
        </motion.form>
      </div>
    </section>
  );
};

export default HeroSection;
