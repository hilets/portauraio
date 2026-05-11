import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <section className="relative pt-28 md:pt-40 pb-20 md:pb-28 px-4 sm:px-6">
      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/8 border border-primary/20 mb-7">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-primary tracking-wide">Free Preview · No Sign Up</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6 text-center"
        >
          Visualize Your{' '}
          <span className="text-gradient">Personal Brand</span>
          <br className="hidden sm:block" />
          <span className="text-foreground/80 font-medium"> in 10 Seconds</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed text-center"
        >
          Just enter your name and see a premium portfolio built just for you — instantly.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative max-w-xl mx-auto group"
        >
          <div className="relative flex items-center gap-2 p-2 rounded-2xl bg-card border border-border/60 shadow-[0_8px_30px_-8px_hsl(220_40%_20%/0.12)] focus-within:border-primary/40 focus-within:shadow-[0_12px_40px_-8px_hsl(220_70%_32%/0.25)] transition-all duration-300">
            <div className="relative flex-1">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                autoFocus
                className="w-full pl-11 pr-3 py-3.5 sm:py-4 rounded-xl bg-transparent text-foreground text-base sm:text-lg font-medium focus:outline-none placeholder:text-muted-foreground/50"
              />
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="group whitespace-nowrap rounded-xl px-5 sm:px-6"
                disabled={!name.trim()}
              >
                <span className="hidden sm:inline">Create Preview</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </motion.div>
          </div>
          <p className="text-xs text-muted-foreground/70 text-center mt-4">
            No sign up · No credit card · Results in seconds
          </p>
        </motion.form>
      </div>
    </section>
  );
};

export default HeroSection;
