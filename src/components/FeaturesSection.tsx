import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link2, Zap, Shield, Palette, Settings, Star } from 'lucide-react';

const features = [
  {
    icon: Link2,
    title: 'Paste & Build',
    description: 'Just drop your social media links — GitHub, LinkedIn, Twitter — and your portfolio builds itself.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    icon: Zap,
    title: 'Ready in Minutes',
    description: 'No waiting. Your professional portfolio is live instantly after pasting your links.',
    gradient: 'from-yellow-500/20 to-orange-500/20',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your data is protected with enterprise-grade security measures.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    icon: Palette,
    title: 'Fully Customizable',
    description: 'Choose templates, colors, and fonts. Make it truly yours with zero design skills.',
    gradient: 'from-pink-500/20 to-purple-500/20',
  },
  {
    icon: Settings,
    title: 'Admin Panel',
    description: 'Full control over your portfolio with an intuitive dashboard to update content anytime.',
    gradient: 'from-violet-500/20 to-indigo-500/20',
  },
  {
    icon: Star,
    title: 'Premium Quality',
    description: 'Pixel-perfect designs that impress recruiters and clients.',
    gradient: 'from-primary/20 to-lime-glow/20',
  },
];

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="features" className="section-padding relative overflow-hidden">
      <div ref={ref}>
        <div className="absolute inset-0 bg-gradient-to-b from-card/50 via-transparent to-card/50" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="text-primary font-medium text-sm tracking-widest uppercase mb-4 block">
              Why Choose Us
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              WHAT WE <span className="text-primary">DELIVER</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              From social links to stunning portfolio — here's what makes us different.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/40 transition-colors duration-300 h-full relative group"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6`}>
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="absolute top-6 right-6 font-heading text-6xl font-bold text-primary/5">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="font-heading text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
