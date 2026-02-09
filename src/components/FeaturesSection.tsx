import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Palette, Zap, Shield, Users, Settings, Star } from 'lucide-react';
import GlowingCard from './GlowingCard';
import SmoothSection from './SmoothSection';

const features = [
  {
    icon: Palette,
    title: 'Custom Design',
    description: 'Every portfolio is uniquely crafted to reflect your personal brand and style.',
    gradient: 'from-pink-500/20 to-purple-500/20',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Get your professional portfolio delivered within 24-48 hours.',
    gradient: 'from-yellow-500/20 to-orange-500/20',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your data is protected with enterprise-grade security measures.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Our skilled engineers and designers bring years of experience.',
    gradient: 'from-green-500/20 to-emerald-500/20',
  },
  {
    icon: Settings,
    title: 'Admin Panel',
    description: "Full control over your portfolio with an intuitive dashboard to update content anytime.",
    gradient: 'from-violet-500/20 to-indigo-500/20',
  },
  {
    icon: Star,
    title: 'Premium Quality',
    description: 'Pixel-perfect designs that impress recruiters and clients.',
    gradient: 'from-primary/20 to-lime-glow/20',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  },
};

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <SmoothSection id="features" className="section-padding relative overflow-hidden">
      <div ref={ref}>
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-card/50 via-transparent to-card/50" />
        
        <div className="container-custom relative z-10">
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
              Why Choose Us
            </motion.span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              WHAT WE <span className="text-primary">DELIVER</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              We combine creativity with technical excellence to deliver portfolios that truly stand out.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div key={feature.title} variants={itemVariants}>
                <GlowingCard className="p-8 rounded-3xl bg-card border border-border/50 h-full">
                  {/* Icon with gradient background */}
                  <motion.div 
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 relative group`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <feature.icon className="w-8 h-8 text-primary relative z-10" />
                  </motion.div>

                  {/* Number indicator */}
                  <div className="absolute top-6 right-6 font-heading text-6xl font-bold text-primary/5">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <h3 className="font-heading text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </GlowingCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </SmoothSection>
  );
};

export default FeaturesSection;
