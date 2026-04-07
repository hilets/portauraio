import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  onCreatePreview: (name: string) => void;
}

const HeroSection = ({ onCreatePreview }: Props) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim()) {
      onCreatePreview(name.trim());
    }
  };

  return (
    <section className="relative pt-32 md:pt-44 pb-20 md:pb-32 px-4 sm:px-6 md:px-10 lg:px-16">
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs sm:text-sm font-medium text-primary">Free Preview • No Sign Up Required</span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
        >
          Visualize Your
          <br />
          <span className="text-gradient">Personal Brand</span>
          <br />
          in 10 Seconds
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Enter your name below and see how a premium portfolio looks with YOUR brand — instantly.
        </motion.p>

        {/* Input + Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-md mx-auto"
        >
          <div className="relative mb-4">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Enter Your Name (e.g., Ibrahim Khalil)"
              className="w-full pl-12 pr-4 py-4 sm:py-5 rounded-2xl border-2 border-border/50 bg-card/80 backdrop-blur-sm text-foreground text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-muted-foreground/40"
            />
          </div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="hero"
              size="xl"
              className="w-full group text-base sm:text-lg py-5 sm:py-6"
              onClick={handleSubmit}
              disabled={!name.trim()}
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Create My Free Preview
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </span>
            </Button>
          </motion.div>

          <p className="text-xs text-muted-foreground/60 mt-4">
            No sign up • No credit card • See results instantly
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
