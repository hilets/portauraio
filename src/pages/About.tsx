import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import { Users, Target, Award, Heart } from 'lucide-react';
import teamImage from '@/assets/team.jpg';

const values = [
  {
    icon: Target,
    title: 'Mission-Driven',
    description: 'We believe everyone deserves a portfolio that tells their unique story.',
  },
  {
    icon: Users,
    title: 'Client-Focused',
    description: 'Your success is our priority. We work closely with you at every step.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We deliver nothing but the highest quality in design and development.',
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'We love what we do, and it shows in every portfolio we create.',
  },
];

const About = () => {
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
              About Us
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              We're <span className="text-gradient">Portaura</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              A team of passionate designers and developers dedicated to transforming careers through stunning portfolio designs.
            </p>
          </motion.div>

          {/* Team Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-3xl overflow-hidden mb-20"
          >
            <img
              src={teamImage}
              alt="Our Team"
              className="w-full h-[400px] object-cover"
            />
          </motion.div>

          {/* Story Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-3xl mx-auto text-center mb-20"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Our <span className="text-gradient">Story</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Founded in 2020, Portaura began with a simple idea: everyone deserves a portfolio that truly represents their skills and personality. We noticed that talented professionals were being overlooked because their resumes couldn't capture their essence.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Today, we've helped over 500 professionals transform their careers with stunning, personalized portfolios. Our team of designers and developers works tirelessly to ensure each portfolio is a masterpiece.
            </p>
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
              Our <span className="text-gradient">Values</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="p-6 rounded-2xl bg-card/50 border border-border/50 text-center"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
