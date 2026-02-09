import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import { FileText, Target, Award, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const benefits = [
  'ATS-optimized formatting',
  'Keyword optimization for your industry',
  'Professional summary writing',
  'Achievement-focused bullet points',
  'Multiple format options (PDF, Word, Plain Text)',
  'Unlimited revisions',
];

const ResumeWriting = () => {
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
              Resume <span className="text-gradient">Writing</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Get a professionally written resume that passes ATS systems and catches recruiters' attention.
            </p>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16"
          >
            <div>
              <h2 className="font-heading text-2xl font-bold mb-6">What's Included</h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="p-8 rounded-2xl bg-card/50 border border-border/50">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileText className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold">Professional Resume</h3>
                  <p className="text-muted-foreground text-sm">Starting at $199</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">
                Our expert writers will craft a resume that highlights your achievements and positions you for success.
              </p>
              <Button variant="hero" className="w-full group">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResumeWriting;
