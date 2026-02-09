import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import { Palette, Layout, Code, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Palette,
    title: 'Custom Design',
    description: 'Every portfolio is designed from scratch to match your unique personality and career goals.',
  },
  {
    icon: Layout,
    title: 'Responsive Layout',
    description: 'Your portfolio will look stunning on all devices - desktop, tablet, and mobile.',
  },
  {
    icon: Code,
    title: 'Clean Code',
    description: 'Built with modern technologies for fast loading times and optimal performance.',
  },
  {
    icon: Sparkles,
    title: 'Interactive Elements',
    description: 'Engaging animations and interactions that make your portfolio memorable.',
  },
];

const PortfolioDesign = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />
      <Header />
      <main className="relative z-10 pt-32 pb-20">
        <div className="container-custom">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary font-medium text-sm tracking-widest uppercase mb-4 block">
              Services
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Portfolio <span className="text-gradient">Design</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Stand out with a stunning, custom-designed portfolio that showcases your skills and captures your unique personality.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-8 rounded-2xl bg-card/50 border border-border/50"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center p-12 rounded-3xl bg-primary/5 border border-primary/20"
          >
            <h2 className="font-heading text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Let's create a portfolio that truly represents who you are and helps you achieve your career goals.
            </p>
            <Button variant="hero" size="xl" className="group">
              Start Your Project
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioDesign;
