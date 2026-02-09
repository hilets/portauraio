import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, X } from 'lucide-react';
import SmoothSection from './SmoothSection';

const comparisonData = [
  { feature: 'Instagram-Ready Portfolio Design', us: true, others: false },
  { feature: 'Link-in-Bio Optimized Layout', us: true, others: false },
  { feature: 'Mobile-First Experience', us: true, others: true },
  { feature: 'Admin Panel for Easy Updates', us: true, others: false },
  { feature: '24-48 Hour Delivery', us: true, others: false },
];

const ComparisonChart = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <SmoothSection className="section-padding relative overflow-hidden">
      <div ref={ref}>
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent" />

        <div className="container-custom relative z-10">
          {/* Comparison Table - Animate from bottom */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto"
          >
            <div className="rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-3 gap-4 p-6 bg-gradient-to-r from-primary/10 to-lime-glow/10 border-b border-border/50">
                <div className="text-left font-heading font-bold text-lg">Features</div>
                <div className="text-center">
                  <span className="font-heading font-bold text-lg text-primary">PortAura</span>
                </div>
                <div className="text-center">
                  <span className="font-heading font-bold text-lg text-muted-foreground">Others</span>
                </div>
              </div>

              {/* Rows */}
              {comparisonData.map((item, index) => (
                <motion.div
                  key={item.feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                  className={`grid grid-cols-3 gap-4 p-6 items-center ${
                    index !== comparisonData.length - 1 ? 'border-b border-border/30' : ''
                  } hover:bg-primary/5 transition-colors duration-300`}
                >
                  <div className="text-foreground font-medium">{item.feature}</div>
                  <div className="flex justify-center">
                    {item.us ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                        className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"
                      >
                        <Check className="w-5 h-5 text-primary" />
                      </motion.div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
                        <X className="w-5 h-5 text-destructive" />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center">
                    {item.others ? (
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <Check className="w-5 h-5 text-primary" />
                      </div>
                    ) : (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                        className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center"
                      >
                        <X className="w-5 h-5 text-destructive" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center mt-8 text-muted-foreground italic"
            >
              "We don't just build portfolios — we craft your professional identity"
            </motion.p>
          </motion.div>
        </div>
      </div>
    </SmoothSection>
  );
};

export default ComparisonChart;
