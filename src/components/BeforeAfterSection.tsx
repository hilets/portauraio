import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import beforeImage from '@/assets/before-portfolio.jpg';
import afterImage from '@/assets/after-portfolio.jpg';
import { Check, X, MousePointerClick } from 'lucide-react';
import SmoothSection from './SmoothSection';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const BeforeAfterSection = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(position, 5), 95));
  };

  return (
    <SmoothSection id="before-after" className="section-padding relative overflow-hidden">
      <div ref={ref}>
        <div className="container-custom" ref={containerRef}>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-16"
          >
            <motion.span 
              className="text-primary font-medium text-sm tracking-widest uppercase mb-4 block"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              The Transformation
            </motion.span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              BEFORE & <span className="text-gradient">AFTER</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              See the dramatic difference our team makes. Drag the slider to compare.
            </p>
          </motion.div>

          {/* Interactive Before/After Slider */}
          <motion.div
            style={{ scale: imageScale }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="relative rounded-section overflow-hidden border border-border/50 cursor-ew-resize select-none"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onTouchMove={handleMove}
          >
            {/* After Image (Full) */}
            <img
              src={afterImage}
              alt="After Portfolio Transformation"
              className="w-full h-auto"
              draggable={false}
            />
            
            {/* Before Image (Clipped) */}
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src={beforeImage}
                alt="Before Portfolio"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>

            {/* Slider Handle */}
            <motion.div
              className="absolute top-0 bottom-0 w-1 bg-primary cursor-ew-resize"
              style={{ left: `${sliderPosition}%` }}
              animate={{ boxShadow: isDragging ? '0 0 20px hsl(185 100% 50% / 0.6)' : '0 0 10px hsl(185 100% 50% / 0.3)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <div className="flex gap-1">
                  <div className="w-0.5 h-4 bg-primary-foreground rounded-full" />
                  <div className="w-0.5 h-4 bg-primary-foreground rounded-full" />
                </div>
              </div>
            </motion.div>

            {/* Labels */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute top-6 left-6 md:top-8 md:left-8 font-heading text-base md:text-xl font-bold px-4 py-2 md:px-5 md:py-2.5 bg-background/80 backdrop-blur-sm rounded-full border border-border/50"
            >
              BEFORE
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute top-6 right-6 md:top-8 md:right-8 font-heading text-base md:text-xl font-bold px-4 py-2 md:px-5 md:py-2.5 bg-primary text-primary-foreground rounded-full shadow-lg"
            >
              AFTER
            </motion.div>
          </motion.div>

          {/* Comparison Points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-10 md:mt-12"
          >
            <motion.div 
              className="p-6 md:p-8 rounded-3xl bg-card/50 border border-border/50 relative overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-muted-foreground/50 to-transparent" />
              <h3 className="font-heading text-lg md:text-xl font-bold mb-6 text-muted-foreground flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <X className="w-5 h-5 text-muted-foreground" />
                </div>
                Traditional Resume
              </h3>
              <ul className="space-y-3 md:space-y-4 text-muted-foreground text-sm md:text-base">
                {['Plain text format', 'Limited visual appeal', 'Easily forgotten', 'No personality shown'].map((item, i) => (
                  <motion.li 
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.05, duration: 0.4 }}
                  >
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              className="p-6 md:p-8 rounded-3xl bg-primary/5 border border-primary/30 relative overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent" />
              <h3 className="font-heading text-lg md:text-xl font-bold mb-6 text-primary flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                Portaura Portfolio
              </h3>
              <ul className="space-y-3 md:space-y-4 text-foreground text-sm md:text-base">
                {['Interactive & modern design', 'Showcases your personality', 'Memorable & impactful', 'Stands out from competition'].map((item, i) => (
                  <motion.li 
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.05, duration: 0.4 }}
                  >
                    <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
            className="flex justify-center mt-12"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button variant="hero" size="xl" className="group relative overflow-hidden">
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10 flex items-center gap-3">
                  <MousePointerClick className="w-5 h-5" />
                  One Click — Portfolio Ready
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </SmoothSection>
  );
};

export default BeforeAfterSection;
