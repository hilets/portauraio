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
    <section className="relative pt-32 md:pt-44 pb-20 md:pb-32 px-4 sm:px-6 md:px-10 lg:px-16">
      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-primary">Free Preview • No Sign Up Required</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-center"
        >
          Visualize Your
          <br />
          <span className="text-gradient">Personal Brand</span>
          <br />
          in 10 Seconds
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed text-center"
        >
          Just enter your name and see a premium portfolio built just for you — instantly.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-2xl border-2 border-border/30 bg-card/60 backdrop-blur-sm p-4 sm:p-5"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Your Name"
                autoFocus
                className="w-full pl-11 pr-4 py-4 rounded-xl border border-border/50 bg-background/50 text-foreground text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-muted-foreground/50"
              />
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="w-full sm:w-auto group whitespace-nowrap"
                disabled={!name.trim()}
              >
                <Sparkles className="w-4 h-4" />
                Create Preview
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </motion.div>
          </div>
          <p className="text-xs text-muted-foreground/60 text-center mt-4">
            No sign up • No credit card • See results instantly
          </p>
        </motion.form>
      </div>
    </section>
  );
};

export default HeroSection;
