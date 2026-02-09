import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Star, Rocket, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HeroBackground from './HeroBackground';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Interactive floating element
const FloatingIcon = ({ 
  icon: Icon,
  delay, 
  position 
}: { 
  icon: React.ElementType; 
  delay: number; 
  position: { x: string; y: string } 
}) => (
  <motion.div
    className="absolute hidden md:flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 border border-primary/30 backdrop-blur-sm"
    style={{ left: position.x, top: position.y }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: 1, 
      scale: 1,
      y: [0, -10, 0],
    }}
    transition={{ 
      opacity: { delay, duration: 0.5 },
      scale: { delay, duration: 0.5, type: 'spring' },
      y: { delay: delay + 0.5, duration: 3, repeat: Infinity, ease: 'easeInOut' }
    }}
    whileHover={{ scale: 1.2, rotate: 10 }}
  >
    <Icon className="w-5 h-5 text-primary" />
  </motion.div>
);

// Interactive word that glows on hover
const GlowWord = ({ children, delay }: { children: string; delay: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.span
      className="relative inline-block cursor-default"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={`transition-all duration-300 ${isHovered ? 'text-primary' : ''}`}>
        {children}
      </span>
      {isHovered && (
        <motion.span
          className="absolute inset-0 blur-xl bg-primary/30 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.span>
  );
};

const portfolios = [
  { id: 'portfolio-example', name: 'Photographer Portfolio', description: 'Editorial & Wedding' },
  { id: 'portfolio-skills', name: 'Personal Skills Portfolio', description: 'Skills & Gaming' },
];

const HeroSection = () => {
  const [showPortfolios, setShowPortfolios] = useState(false);
  const navigate = useNavigate();

  return (
    <section 
      className="relative min-h-[85vh] flex items-center justify-center pt-64 md:pt-72 pb-8 overflow-hidden"
    >
      {/* Interactive Background */}
      <div className="absolute inset-0 mt-24 mx-6 sm:mx-10 md:mx-16 lg:mx-20 rounded-section overflow-hidden">
        <HeroBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      </div>

      {/* Floating Icons */}
      <FloatingIcon icon={Zap} delay={0.8} position={{ x: '10%', y: '25%' }} />
      <FloatingIcon icon={Star} delay={1.0} position={{ x: '85%', y: '30%' }} />
      <FloatingIcon icon={Rocket} delay={1.2} position={{ x: '15%', y: '65%' }} />
      <FloatingIcon icon={Sparkles} delay={1.4} position={{ x: '80%', y: '60%' }} />

      <div className="container-custom relative z-10 px-6 sm:px-10 md:px-16 lg:px-20">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge with pulse effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-primary/10 border border-primary/30 mb-6 sm:mb-8 backdrop-blur-sm relative overflow-hidden group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Animated shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full"
              animate={{ translateX: ['100%', '-100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary animate-spin" style={{ animationDuration: '4s' }} />
            <span className="text-xs sm:text-sm font-medium text-primary relative z-10">Our Engineers Are Waiting For Your Order</span>
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-pulse" />
          </motion.div>

          {/* Main Heading with Interactive Words */}
          <div className="mb-4 sm:mb-6">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <GlowWord delay={0.1}>Transform</GlowWord>{' '}
              <GlowWord delay={0.15}>Your</GlowWord>
            </h1>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <motion.span 
                className="text-gradient inline-block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                Career Story
              </motion.span>
            </h1>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <GlowWord delay={0.3}>Into</GlowWord>{' '}
              <motion.span
                className="relative inline-block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                <span className="relative z-10">Art</span>
                <motion.span
                  className="absolute -inset-2 bg-primary/20 rounded-lg -z-0"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: 'spring' }}
                />
              </motion.span>
            </h1>
          </div>

          {/* Subtitle with stagger */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2"
          >
            We craft stunning, personalized portfolios that showcase your unique talents
            and help you stand out in today's competitive world.
          </motion.p>

          {/* CTA Buttons with enhanced hover */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button variant="hero" size="xl" className="group w-full sm:w-auto relative overflow-hidden">
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button 
                variant="heroOutline" 
                size="lg" 
                className="backdrop-blur-sm w-full sm:w-auto px-6"
                onClick={() => setShowPortfolios(true)}
              >
                View Example
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

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
