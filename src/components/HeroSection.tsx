import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import portfolioVideo from '@/assets/portfolio-importance.mp4';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-28 md:pt-36 pb-8 px-4 sm:px-6 md:px-10 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative rounded-[2rem] md:rounded-[3rem] border border-border/50 bg-card/60 backdrop-blur-md overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

        <div className="relative z-10 px-6 sm:px-10 md:px-16 pt-12 sm:pt-16 md:pt-20 pb-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6 sm:mb-8"
          >
            <Link2 className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-primary">Paste Links → Get Portfolio</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4"
          >
            Your Social Links,
            <br />
            <span className="text-gradient">One Portfolio</span>
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">Instantly</span>
              <motion.span
                className="absolute -inset-2 bg-primary/20 rounded-lg -z-0"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: 'spring' }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 sm:mb-10 leading-relaxed"
          >
            Just paste your social media links — GitHub, LinkedIn, Twitter — and 
            we'll create a stunning portfolio website for you in minutes. No coding needed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 md:mb-0"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button variant="hero" size="xl" className="group w-full sm:w-auto" onClick={() => navigate('/order')}>
                <span className="flex items-center gap-2">
                  <Link2 className="w-5 h-5" />
                  Build From Your Links
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="heroOutline"
                size="lg"
                className="backdrop-blur-sm w-full sm:w-auto px-6"
                onClick={() => {
                  const section = document.getElementById('portfolio-examples');
                  if (section) section.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View Example
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row gap-0">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="w-full md:w-[60%] lg:w-[55%] p-4 sm:p-6 md:p-8"
          >
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-border/30 bg-background/50">
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
          <div className="hidden md:block flex-1" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
