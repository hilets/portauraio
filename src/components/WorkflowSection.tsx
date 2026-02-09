import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MessageSquare, Palette, Code, Rocket } from 'lucide-react';
import SmoothSection from './SmoothSection';

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Share Your Story',
    description: 'Tell us about yourself, your achievements, and your goals. We listen carefully to understand your unique journey.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    number: '02',
    icon: Palette,
    title: 'Design Magic',
    description: 'Our creative team crafts a stunning visual design that perfectly represents your personal brand.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    number: '03',
    icon: Code,
    title: 'Development',
    description: 'Our engineers bring the design to life with clean, responsive, and fast-loading code.',
    color: 'from-orange-500 to-yellow-500',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Launch & Shine',
    description: 'Your portfolio goes live! We help you share it with the world and make a lasting impression.',
    color: 'from-primary to-lime-glow',
  },
];

const WorkflowSection = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineProgress = useTransform(scrollYProgress, [0.3, 0.7], ['0%', '100%']);

  return (
    <SmoothSection id="workflow" className="section-padding relative overflow-hidden">
      <div ref={ref}>
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-card/50 via-transparent to-card/50" />
        
        <div className="container-custom relative z-10" ref={containerRef}>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-16 md:mb-20"
          >
            <motion.span 
              className="text-primary font-medium text-sm tracking-widest uppercase mb-4 block"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              How It Works
            </motion.span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              OUR <span className="text-gradient">WORKFLOW</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              A simple, streamlined process designed to deliver exceptional results.
            </p>
          </motion.div>

          {/* Timeline View for Desktop */}
          <div className="hidden lg:block relative">
            {/* Animated Progress Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-border/30 -translate-y-1/2">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-primary to-primary/50"
                style={{ width: lineProgress }}
              />
            </div>

            <div className="grid grid-cols-4 gap-6 relative">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                  className="relative pt-16"
                >
                  {/* Connector Node */}
                  <motion.div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-card border-4 border-primary z-10"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.2 + index * 0.1, type: 'spring', stiffness: 200 }}
                  />

                  <motion.div 
                    className="group p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 h-full relative overflow-hidden"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    
                    {/* Step Number */}
                    <div className="font-heading text-5xl font-bold text-primary/10 mb-4 group-hover:text-primary/20 transition-colors duration-300">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg`}>
                      <step.icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="font-heading text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile/Tablet View */}
          <div className="lg:hidden space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
                className="relative"
              >
                <motion.div 
                  className="group p-5 md:p-6 rounded-2xl md:rounded-3xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 flex gap-4 md:gap-6 items-start"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Icon */}
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <step.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-heading text-xl md:text-2xl font-bold text-primary/30">
                        {step.number}
                      </span>
                      <h3 className="font-heading text-base md:text-lg font-bold group-hover:text-primary transition-colors duration-300">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>

                {/* Connector */}
                {index < steps.length - 1 && (
                  <div className="w-0.5 h-4 bg-gradient-to-b from-primary/50 to-transparent mx-auto" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SmoothSection>
  );
};

export default WorkflowSection;
