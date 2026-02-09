import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const jobs = [
  {
    title: 'Senior UI/UX Designer',
    location: 'Remote',
    type: 'Full-time',
    description: 'Join our design team to create stunning portfolio experiences for our clients.',
  },
  {
    title: 'Frontend Developer',
    location: 'Remote',
    type: 'Full-time',
    description: 'Build beautiful, responsive portfolio websites using React and modern technologies.',
  },
  {
    title: 'Project Manager',
    location: 'New York, NY',
    type: 'Full-time',
    description: 'Coordinate with clients and teams to deliver exceptional portfolio projects on time.',
  },
  {
    title: 'Content Writer',
    location: 'Remote',
    type: 'Part-time',
    description: 'Craft compelling copy that helps our clients tell their unique career stories.',
  },
];

const Careers = () => {
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
              Careers
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Join Our <span className="text-gradient">Team</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Help us transform careers through stunning portfolio designs. We're always looking for talented individuals to join our team.
            </p>
          </motion.div>

          {/* Why Work With Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            {[
              { title: 'Remote First', desc: 'Work from anywhere in the world' },
              { title: 'Great Benefits', desc: 'Health, dental, and unlimited PTO' },
              { title: 'Growth', desc: 'Learn and grow with our team' },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-primary/5 border border-primary/20 text-center"
              >
                <h3 className="font-heading text-xl font-bold mb-2 text-primary">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* Open Positions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
              Open <span className="text-gradient">Positions</span>
            </h2>
            <div className="space-y-4">
              {jobs.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  className="p-6 rounded-2xl bg-card/50 border border-border/50 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div>
                    <h3 className="font-heading text-xl font-bold mb-2">{job.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{job.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {job.type}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" className="shrink-0 group">
                    Apply Now
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
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

export default Careers;
