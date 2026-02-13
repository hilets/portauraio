import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import portfolioVideo from '@/assets/portfolio-importance.mp4';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-28 md:pt-36 pb-8 px-4 sm:px-6 md:px-10 lg:px-16">
      {/* Main Hero Card - Rounded Corners */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative rounded-[2rem] md:rounded-[3rem] border border-border/50 bg-card/60 backdrop-blur-md overflow-hidden"
      >
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

        {/* Content Area */}
        <div className="relative z-10 px-6 sm:px-10 md:px-16 pt-12 sm:pt-16 md:pt-20 pb-0">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6 sm:mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary animate-spin" style={{ animationDuration: '4s' }} />
            <span className="text-xs sm:text-sm font-medium text-primary">Our Engineers Are Waiting For Your Order</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4"
          >
            Transform Your
            <br />
            <span className="text-gradient">Career Story</span>
            <br />
            Into <span className="relative inline-block">
              <span className="relative z-10">Art</span>
              <motion.span
                className="absolute -inset-2 bg-primary/20 rounded-lg -z-0"
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
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 sm:mb-10 leading-relaxed"
          >
            We craft stunning, personalized portfolios that showcase your unique talents
            and help you stand out in today's competitive world.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 md:mb-0"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button variant="hero" size="xl" className="group w-full sm:w-auto">
                <span className="flex items-center gap-2">
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
                onClick={() => {
                  const section = document.getElementById('portfolio-examples');
                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                View Example
              </Button>
            </motion.div>
          </motion.div>

        </div>

        {/* Bottom Section: L-shaped layout with Video */}
        <div className="relative z-10 flex flex-col md:flex-row gap-0">
          {/* Video Section - Bottom Left with rounded top-right */}
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

          {/* Right spacer block for L-shape effect (hidden on mobile) */}
          <div className="hidden md:block flex-1" />
        </div>
      </motion.div>

    </section>
  );
};

export default HeroSection;
