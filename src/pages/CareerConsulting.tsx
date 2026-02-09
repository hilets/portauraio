import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import { Users, Target, TrendingUp, MessageSquare, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Target,
    title: 'Career Strategy',
    description: 'Define your career goals and create a roadmap to achieve them.',
  },
  {
    icon: MessageSquare,
    title: 'Interview Coaching',
    description: 'Practice with mock interviews and get feedback to improve.',
  },
  {
    icon: TrendingUp,
    title: 'Salary Negotiation',
    description: 'Learn strategies to negotiate the compensation you deserve.',
  },
  {
    icon: Users,
    title: 'Network Building',
    description: 'Build meaningful connections in your industry.',
  },
];

const CareerConsulting = () => {
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
              Career <span className="text-gradient">Consulting</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Get personalized guidance from industry experts to accelerate your career growth and achieve your professional goals.
            </p>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-8 rounded-2xl bg-card/50 border border-border/50"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
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
            <h2 className="font-heading text-3xl font-bold mb-4">Book a Consultation</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Schedule a free 30-minute consultation to discuss your career goals.
            </p>
            <Button variant="hero" size="xl" className="group">
              Schedule Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CareerConsulting;
