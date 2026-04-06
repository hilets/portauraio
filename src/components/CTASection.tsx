import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const navigate = useNavigate();

  return (
    <section className="py-20 md:py-28 relative overflow-hidden" ref={ref}>
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/30 mb-8 backdrop-blur-sm"
          >
            <Link2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">It takes less than 2 minutes</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            Ready to Build
            <br />
            <span className="text-gradient">From Your Links?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Paste your social media links and get a premium portfolio in minutes. No design skills, no coding — just your links.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center mb-6"
          >
            <Button 
              variant="hero"
              size="xl" 
              className="group"
              onClick={() => navigate('/order')}
            >
              <Link2 className="w-5 h-5 mr-2" />
              BUILD MY PORTFOLIO
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-sm text-muted-foreground"
          >
            Free to build • No credit card required • Live in minutes
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
