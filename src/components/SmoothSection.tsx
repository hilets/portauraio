import { ReactNode } from 'react';

interface SmoothSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const SmoothSection = ({ children, className = '', id }: SmoothSectionProps) => {
  return (
    <section id={id} className={className}>
      {children}
    </section>
  );
};

export default SmoothSection;
