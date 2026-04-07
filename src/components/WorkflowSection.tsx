import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { User, Eye, Palette, CreditCard } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: User,
    title: 'Enter Your Name',
    description: 'Type your name and see premium portfolio templates personalized with YOUR brand — instantly.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    number: '02',
    icon: Palette,
    title: 'Pick a Template',
    description: 'Browse stunning templates that already showcase your name. Click the one you love.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    number: '03',
    icon: Eye,
    title: 'Upload & Polish',
    description: 'Add your headshot, customize colors and see the full site come alive with your identity.',
    color: 'from-orange-500 to-yellow-500',
  },
  {
    number: '04',
    icon: CreditCard,
    title: 'Claim & Go Live',
    description: 'One click, one payment — your premium portfolio is live at your-name.portaura.com.',
    color: 'from-primary to-lime-glow',
  },
];

const WorkflowSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="workflow" className="section-padding relative overflow-hidden">
      <div ref={ref}>
        <div className="absolute inset-0 bg-gradient-to-b from-card/50 via-transparent to-card/50" />
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-16 md:mb-20"
          >
            <span className="text-primary font-medium text-sm tracking-widest uppercase mb-4 block">
              How It Works
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              NAME TO <span className="text-gradient">PORTFOLIO</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Four simple steps from your name to a live, premium portfolio site.
            </p>
          </motion.div>

          {/* Desktop */}
          <div className="hidden lg:grid grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/50 transition-colors duration-300 h-full"
              >
                <div className="font-heading text-5xl font-bold text-primary/10 mb-4">{step.number}</div>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Mobile */}
          <div className="lg:hidden space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <div className="group p-5 md:p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-colors duration-300 flex gap-4 md:gap-6 items-start">
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <step.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-heading text-xl font-bold text-primary/30">{step.number}</span>
                      <h3 className="font-heading text-base md:text-lg font-bold group-hover:text-primary transition-colors duration-300">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 h-4 bg-gradient-to-b from-primary/50 to-transparent mx-auto" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
