import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import portfolioVideo from '@/assets/portfolio-importance.mp4';

const portfolios = [
  { id: 'portfolio-example', name: 'Photographer Portfolio', description: 'Editorial & Wedding' },
  { id: 'portfolio-skills', name: 'Personal Skills Portfolio', description: 'Skills & Gaming' },
];

const HeroSection = () => {
  const [showPortfolios, setShowPortfolios] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="relative pt-28 md:pt-36 pb-4 px-3 sm:px-4 md:px-8 lg:px-14">
      {/* Main Hero Card - Rounded Corners */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[3rem] border border-border/50 bg-card/60 backdrop-blur-md overflow-hidden"
      >
        {/* Glow line top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

        {/* Upper content area */}
        <div className="relative z-10 px-5 sm:px-8 md:px-12 pt-8 sm:pt-12 md:pt-16">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-5 sm:mb-6"
          >
            <Sparkles className="w-3 h-3 text-primary animate-spin" style={{ animationDuration: '4s' }} />
            <span className="text-[10px] sm:text-xs font-medium text-primary">Our Engineers Are Waiting</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-heading text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3 sm:mb-4"
          >
            Transform Your
            <br />
            <span className="text-gradient">Career Story</span>
            <br />
            Into{' '}
            <span className="relative inline-block">
              <span className="relative z-10">Art</span>
              <motion.span
                className="absolute -inset-1.5 sm:-inset-2 bg-primary/20 rounded-lg -z-0"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: 'spring' }}
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mb-6 sm:mb-8 leading-relaxed"
          >
            We craft stunning, personalized portfolios that showcase your unique talents
            and help you stand out.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-row gap-3"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button variant="hero" size="lg" className="group text-xs sm:text-sm">
                <span className="flex items-center gap-1.5">
                  Start Your Journey
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="heroOutline"
                size="lg"
                className="backdrop-blur-sm text-xs sm:text-sm"
                onClick={() => setShowPortfolios(true)}
              >
                View Example
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom L-Shape: Video bottom-left, empty space right */}
        <div className="relative z-10 mt-6 sm:mt-8 md:mt-10">
          <div className="flex">
            {/* Video - bottom left, smaller */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="w-[55%] sm:w-[50%] md:w-[45%] p-3 sm:p-4 md:p-6"
            >
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-border/30">
                <video
                  src={portfolioVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full aspect-video object-cover"
                />
              </div>
            </motion.div>

            {/* Right empty space - part of the L shape */}
            <div className="flex-1" />
          </div>
        </div>
      </motion.div>

      {/* Portfolio Popup Modal */}
      <AnimatePresence>
        {showPortfolios && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
            onClick={() => setShowPortfolios(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-card border border-border/50 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowPortfolios(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
              <h3 className="font-heading text-xl font-bold mb-2">Portfolio Examples</h3>
              <p className="text-muted-foreground text-sm mb-6">Choose a portfolio to explore</p>
              <div className="flex flex-col gap-3">
                {portfolios.map((portfolio, index) => (
                  <motion.button
                    key={portfolio.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => {
                      navigate(`/${portfolio.id}`);
                      setShowPortfolios(false);
                    }}
                    className="w-full p-4 text-left bg-muted/50 hover:bg-primary/10 border border-border/50 hover:border-primary/30 rounded-2xl transition-all group"
                  >
                    <div className="font-heading text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                      {portfolio.name}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {portfolio.description}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
