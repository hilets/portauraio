import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram, Mail, Phone, ExternalLink, ArrowUp } from 'lucide-react';
import { usePreviewMode } from '@/contexts/PreviewModeContext';

/* ---- Reveal on scroll ---- */
export const Reveal = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const isPreview = usePreviewMode();
  const visible = isPreview || isInView;
  return (
    <motion.div
      ref={ref}
      initial={isPreview ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: isPreview ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ---- Magnetic button ---- */
export const MagneticBtn = ({
  children,
  className = '',
  style = {},
  onClick,
  as = 'button',
  href,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  as?: 'button' | 'a';
  href?: string;
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const move = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3 });
  };
  return (
    <motion.button
      ref={ref}
      onMouseMove={move}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={className}
      style={style}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

/* ---- Scroll progress bar ---- */
export const ScrollBar = ({ color }: { color: string }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return <motion.div className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left" style={{ scaleX, background: color }} />;
};

/* ---- Custom cursor ---- */
export const Cursor = ({ color }: { color: string }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  useEffect(() => {
    const m = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const o = (e: MouseEvent) => setHovering(!!(e.target as HTMLElement).closest('a,button,[role="button"]'));
    window.addEventListener('mousemove', m);
    window.addEventListener('mouseover', o);
    return () => { window.removeEventListener('mousemove', m); window.removeEventListener('mouseover', o); };
  }, []);
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[999] rounded-full border-2 hidden md:block mix-blend-difference"
        style={{ borderColor: color }}
        animate={{
          x: pos.x - (hovering ? 24 : 12),
          y: pos.y - (hovering ? 24 : 12),
          width: hovering ? 48 : 24,
          height: hovering ? 48 : 24,
          opacity: hovering ? 0.9 : 0.5,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[999] w-1.5 h-1.5 rounded-full hidden md:block"
        style={{ background: color }}
        animate={{ x: pos.x - 3, y: pos.y - 3 }}
        transition={{ type: 'spring', stiffness: 800, damping: 35 }}
      />
    </>
  );
};

/* ---- Back to top ---- */
export const BackToTop = ({ color }: { color: string }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  if (!show) return null;
  return (
    <MagneticBtn
      className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm"
      style={{ background: `${color}dd`, color: '#000' }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ArrowUp className="w-5 h-5" />
    </MagneticBtn>
  );
};

/* ---- 3D tilt card ---- */
export const TiltCard = ({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(800px) rotateX(0deg) rotateY(0deg)');

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTransform(`perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale3d(1.03,1.03,1.03)`);
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, transform, transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d' }}
      onMouseMove={handleMove}
      onMouseLeave={() => setTransform('perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)')}
    >
      {children}
    </div>
  );
};

/* ---- Social icon lookup ---- */
export const getSocialIcon = (platform: string) => {
  const p = platform.toLowerCase();
  if (p.includes('github')) return Github;
  if (p.includes('linkedin')) return Linkedin;
  if (p.includes('twitter') || p.includes('x')) return Twitter;
  if (p.includes('instagram')) return Instagram;
  if (p.includes('mail') || p.includes('email')) return Mail;
  if (p.includes('phone')) return Phone;
  return ExternalLink;
};

/* ---- Font family ---- */
export const getFontFamily = (font: string) => {
  switch (font) {
    case 'Playfair Display': return "'Playfair Display', serif";
    case 'JetBrains Mono': return "'JetBrains Mono', monospace";
    default: return "'Inter', sans-serif";
  }
};

/* ---- Glowing line divider ---- */
export const GlowDivider = ({ color }: { color: string }) => (
  <div className="relative h-px w-full max-w-7xl mx-auto my-4">
    <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, transparent, ${color}50, transparent)` }} />
    <div className="absolute inset-0 blur-sm" style={{ background: `linear-gradient(90deg, transparent, ${color}30, transparent)` }} />
  </div>
);
