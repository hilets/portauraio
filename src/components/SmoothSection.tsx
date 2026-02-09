import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface SmoothSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const SmoothSection = ({ children, className = '', id }: SmoothSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: '-50px',
    amount: 0.1
  });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        ease: [0.25, 0.4, 0.25, 1]
      }}
    >
      {children}
    </motion.section>
  );
};

export default SmoothSection;
