import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, TrendingUp, Users, Award, Briefcase, Eye } from 'lucide-react';

const benefits = [
  {
    icon: Eye,
    title: 'First Impressions Matter',
    description: 'Your portfolio is often the first thing employers see. Make it unforgettable.',
  },
  {
    icon: Target,
    title: 'Stand Out From Competition',
    description: 'In a sea of generic resumes, a stunning portfolio sets you apart instantly.',
  },
  {
    icon: TrendingUp,
    title: 'Boost Your Credibility',
    description: 'Showcase your skills with visual proof that speaks louder than words.',
  },
  {
    icon: Award,
    title: 'Demonstrate Expertise',
    description: 'Let your work tell your story through carefully curated projects.',
  },
  {
    icon: Briefcase,
    title: 'Open More Doors',
    description: 'A professional portfolio attracts better opportunities and higher offers.',
  },
  {
    icon: Users,
    title: 'Build Trust Instantly',
    description: 'Clients and employers trust professionals who present themselves well.',
  },
];

const WhyPortfolioSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="why-portfolio" ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16 md:mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">The Power of Presentation</span>
          </motion.div>

          {/* Main Heading */}
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Your Work Deserves</span>
            <br />
            <span className="text-primary">A Stunning Stage</span>
          </h2>

          {/* Paragraph */}
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            In today's competitive landscape, talent alone isn't enough. You need a professional portfolio 
            that captures attention, tells your story, and converts visitors into opportunities. 
            <span className="text-foreground font-medium"> We make that happen.</span>
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              className="group relative"
            >
              <div className="relative p-6 md:p-8 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:bg-card/80">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon */}
                <div className="relative z-10 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="font-heading text-lg md:text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl">
                  <div className="absolute -top-8 -right-8 w-16 h-16 bg-primary/10 rotate-45 transform origin-center opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Accent */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        />
      </div>
    </section>
  );
};

export default WhyPortfolioSection;
