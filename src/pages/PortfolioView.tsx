import { useParams, useNavigate } from 'react-router-dom';
import { getPortfolio } from '@/lib/portfolioStore';
import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram, Mail, Phone, ExternalLink, ArrowUpRight, ChevronDown, ArrowUp } from 'lucide-react';
import type { StoredPortfolio } from '@/lib/portfolioStore';
import auraHeroOne from '@/assets/theme-aura-infinity.jpg';
import auraHeroTwo from '@/assets/theme-aura-infinity-alt.jpg';

const getFontFamily = (font: string) => {
  switch (font) {
    case 'Playfair Display': return "'Playfair Display', serif";
    case 'JetBrains Mono': return "'JetBrains Mono', monospace";
    default: return "'Inter', sans-serif";
  }
};

const getSocialIcon = (platform: string) => {
  const p = platform.toLowerCase();
  if (p.includes('github')) return Github;
  if (p.includes('linkedin')) return Linkedin;
  if (p.includes('twitter') || p.includes('x')) return Twitter;
  if (p.includes('instagram')) return Instagram;
  if (p.includes('mail') || p.includes('email')) return Mail;
  if (p.includes('phone')) return Phone;
  return ExternalLink;
};

// --- Reveal animation wrapper ---
const Reveal = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- Magnetic Button ---
const MagneticButton = ({ children, className = '', style = {}, onClick }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; onClick?: () => void }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    setPos({ x, y });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
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

// --- Scroll Progress Bar ---
const ScrollProgress = ({ color }: { color: string }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left"
      style={{ scaleX, background: color }}
    />
  );
};

// --- Custom Cursor ---
const PortfolioCursor = ({ color }: { color: string }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(!!t.closest('a, button, [role="button"]'));
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[999] rounded-full border-2 hidden md:block"
        style={{ borderColor: color }}
        animate={{
          x: pos.x - (hovering ? 20 : 10),
          y: pos.y - (hovering ? 20 : 10),
          width: hovering ? 40 : 20,
          height: hovering ? 40 : 20,
          opacity: hovering ? 0.8 : 0.5,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[999] w-1 h-1 rounded-full hidden md:block"
        style={{ background: color }}
        animate={{ x: pos.x - 2, y: pos.y - 2 }}
        transition={{ type: 'spring', stiffness: 800, damping: 35 }}
      />
    </>
  );
};

// --- Back to Top ---
const BackToTop = ({ color }: { color: string }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  if (!show) return null;
  return (
    <MagneticButton
      className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl"
      style={{ background: color, color: '#000' }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ArrowUp className="w-5 h-5" />
    </MagneticButton>
  );
};

// =============================================
// AURA INFINITY THEME - Flagship Portfolio
// =============================================
const AuraInfinityPortfolio = ({ data }: { data: StoredPortfolio }) => {
  const c = data.primaryColor;
  const font = getFontFamily(data.font);

  const portfolioPillars = [
    'Hero Cinematic Intro',
    'Case Study Storytelling',
    'Service + Offer Sections',
    'Client Trust Blocks',
    'Big Work Showcase',
    'Conversion CTA Flow',
  ];

  const professions = [
    'Developers',
    'Designers',
    'Photographers',
    'Videographers',
    'Consultants',
    'Founders',
    'Artists',
    'Marketers',
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(140deg, #04060b 0%, #071120 55%, #04060c 100%)', fontFamily: font, cursor: 'none' }}>
      <PortfolioCursor color={c} />
      <ScrollProgress color={c} />
      <BackToTop color={c} />

      <section className="min-h-screen flex items-center relative px-4 sm:px-8 pt-24">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-16 -left-12 w-72 h-72 rounded-full blur-[90px] opacity-25"
            style={{ background: c }}
            animate={{ x: [0, 20, 0], y: [0, -12, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-[100px] opacity-20"
            style={{ background: c }}
            animate={{ x: [0, -24, 0], y: [0, 16, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.35em] mb-4" style={{ color: `${c}c7` }}>
                Aura Infinity X
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] mb-5">
                {data.name || 'Your Name'}
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg sm:text-2xl font-semibold mb-4" style={{ color: c }}>
                {data.title || 'Interactive Professional Portfolio Website'}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-xl mb-8">
                {data.bio || 'A full-scale modern portfolio engineered to impress at first glance and convert visitors into clients with high-end visuals, interactive sections, and storytelling flow.'}
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="flex flex-wrap gap-3">
                <MagneticButton className="px-8 py-4 rounded-2xl font-semibold" style={{ background: c, color: '#03070e' }}>
                  Start a Project
                </MagneticButton>
                <MagneticButton className="px-8 py-4 rounded-2xl border font-semibold" style={{ borderColor: `${c}55`, color: c, background: `${c}10` }}>
                  View Case Studies
                </MagneticButton>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.25} className="relative">
            <motion.div
              className="rounded-3xl overflow-hidden border shadow-2xl"
              style={{ borderColor: `${c}35`, boxShadow: `0 20px 80px ${c}22` }}
              whileHover={{ rotateX: 2, rotateY: -4, y: -4 }}
              transition={{ duration: 0.4 }}
            >
              <img src={auraHeroOne} alt="Aura Infinity website hero preview" className="w-full h-[300px] sm:h-[420px] object-cover" />
            </motion.div>
            <motion.div
              className="absolute -bottom-8 -left-5 sm:-left-8 w-44 sm:w-56 rounded-2xl overflow-hidden border shadow-2xl"
              style={{ borderColor: `${c}40` }}
              initial={{ opacity: 0, y: 16, rotate: -4 }}
              animate={{ opacity: 1, y: 0, rotate: -3 }}
              transition={{ delay: 0.5 }}
            >
              <img src={auraHeroTwo} alt="Aura Infinity interaction section preview" className="w-full h-28 sm:h-36 object-cover" />
            </motion.div>
          </Reveal>
        </div>

        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2 }}
        >
          <span className="text-[10px] uppercase tracking-widest text-gray-500">Scroll</span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </motion.div>
      </section>

      <section className="px-4 sm:px-8 py-20 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.28em] mb-4" style={{ color: `${c}b8` }}>Website Architecture</p>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-10">Built to Feel Premium at Every Scroll</h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolioPillars.map((pillar, index) => (
            <Reveal key={pillar} delay={index * 0.06}>
              <motion.div
                className="rounded-2xl border p-5 h-full"
                style={{ borderColor: `${c}25`, background: `${c}08` }}
                whileHover={{ y: -4, rotateX: 2, rotateY: -2 }}
                transition={{ duration: 0.25 }}
              >
                <p className="text-[10px] uppercase tracking-[0.22em] mb-2" style={{ color: `${c}d2` }}>
                  Section {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="text-lg font-bold text-white mb-2">{pillar}</h3>
                <p className="text-sm text-gray-400">Designed for strong first impression + easy conversion.</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-8 py-20 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.28em] mb-3" style={{ color: `${c}b8` }}>Portfolio Showcase</p>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-10">Big Visual Blocks, Strong Storytelling</h2>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-4">
          <Reveal className="lg:col-span-7">
            <motion.div className="rounded-3xl overflow-hidden border h-full" style={{ borderColor: `${c}30` }} whileHover={{ y: -3 }}>
              <img src={auraHeroTwo} alt="Large case-study visual for premium portfolio" className="w-full h-full min-h-[280px] object-cover" />
            </motion.div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="rounded-3xl border p-6 h-full flex flex-col" style={{ borderColor: `${c}30`, background: `${c}08` }}>
              <p className="text-[10px] uppercase tracking-[0.3em] mb-3" style={{ color: `${c}d2` }}>Case Study Flow</p>
              <div className="space-y-2 mb-6">
                {['Challenge', 'Solution', 'Impact', 'Client Result'].map((item, i) => (
                  <motion.div
                    key={item}
                    className="flex items-center justify-between py-2 border-b"
                    style={{ borderColor: `${c}18` }}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-sm text-gray-300">{item}</span>
                    <ArrowUpRight className="w-4 h-4" style={{ color: c }} />
                  </motion.div>
                ))}
              </div>
              <MagneticButton className="mt-auto px-6 py-3 rounded-xl font-semibold" style={{ background: c, color: '#03101a' }}>
                Explore Full Portfolio
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 sm:px-8 py-20 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.28em] mb-3" style={{ color: `${c}b8` }}>For Every Profession</p>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-8">Universal Template, Premium Execution</h2>
        </Reveal>
        <div className="flex flex-wrap gap-2">
          {professions.map((profession, index) => (
            <Reveal key={profession} delay={index * 0.03}>
              <span className="px-4 py-2 rounded-full border text-sm" style={{ borderColor: `${c}35`, color: `${c}e8`, background: `${c}0f` }}>
                {profession}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-8 py-20 max-w-7xl mx-auto">
        <Reveal>
          <div className="rounded-3xl border p-10 sm:p-16 text-center" style={{ borderColor: `${c}30`, background: `linear-gradient(135deg, ${c}16, ${c}05)` }}>
            <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: `${c}c7` }}>Let's Connect</p>
            <h2 className="text-4xl sm:text-6xl font-black text-white mb-6">Ready to turn visitors into clients?</h2>
            {data.email && (
              <MagneticButton
                className="px-10 py-5 rounded-2xl text-base font-bold"
                style={{ background: c, color: '#021018' }}
                onClick={() => {
                  window.location.href = `mailto:${data.email}`;
                }}
              >
                <Mail className="w-5 h-5 inline mr-2" />
                {data.email}
              </MagneticButton>
            )}
            <div className="flex justify-center gap-3 mt-8">
              {data.socialLinks.filter((link) => link.url.trim()).map((link, i) => {
                const Icon = getSocialIcon(link.platform);
                return (
                  <MagneticButton
                    key={i}
                    className="w-12 h-12 rounded-xl border flex items-center justify-center"
                    style={{ borderColor: `${c}35`, color: c }}
                    onClick={() => window.open(link.url, '_blank')}
                  >
                    <Icon className="w-5 h-5" />
                  </MagneticButton>
                );
              })}
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

// =============================================
// MINIMALIST ZEN THEME - Full Portfolio
// =============================================
const MinimalistZenPortfolio = ({ data }: { data: StoredPortfolio }) => {
  const c = data.primaryColor;
  const font = getFontFamily(data.font);

  return (
    <div className="min-h-screen" style={{ background: '#faf9f7', fontFamily: font, cursor: 'none', color: '#1a1a1a' }}>
      <PortfolioCursor color={c} />
      <ScrollProgress color="#1a1a1a" />
      <BackToTop color="#1a1a1a" />

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-32 relative">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.4em] text-stone-400 mb-8">Portfolio</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-stone-900 leading-[0.9] mb-6">
            {data.name}
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="w-16 h-[2px] mb-6" style={{ background: c }} />
        </Reveal>
        <Reveal delay={0.3}>
          <p className="text-xl sm:text-2xl text-stone-500 max-w-xl leading-relaxed mb-10">
            {data.title || 'Creative Professional'}
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="flex gap-4">
            <MagneticButton
              className="px-8 py-4 rounded-full text-sm font-medium border-2 border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white transition-colors"
            >
              View Work
            </MagneticButton>
            <MagneticButton
              className="px-8 py-4 rounded-full text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors"
            >
              About Me →
            </MagneticButton>
          </div>
        </Reveal>

        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
        >
          <ChevronDown className="w-5 h-5 text-stone-300" />
        </motion.div>
      </section>

      {/* About */}
      <section className="px-6 sm:px-12 md:px-20 lg:px-32 py-24 border-t border-stone-200">
        <div className="max-w-4xl">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-stone-400 mb-8">About</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-2xl sm:text-3xl md:text-4xl text-stone-700 leading-relaxed">
              {data.bio || 'I believe in the power of simplicity. Every project is an opportunity to distill complexity into something elegant, intuitive, and meaningful.'}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Selected Work */}
      <section className="px-6 sm:px-12 md:px-20 lg:px-32 py-24 border-t border-stone-200">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.4em] text-stone-400 mb-16">Selected Work</p>
        </Reveal>

        <div className="space-y-0">
          {[
            { name: 'Selected Work I', category: 'Brand & Identity', year: '2024' },
            { name: 'Selected Work II', category: 'Web Design', year: '2024' },
            { name: 'Selected Work III', category: 'Art Direction', year: '2023' },
            { name: 'Selected Work IV', category: 'Photography', year: '2023' },
          ].map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05}>
              <motion.div
                className="group flex items-center justify-between py-8 border-b border-stone-200 cursor-pointer"
                whileHover={{ x: 12 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-8">
                  <span className="text-sm text-stone-300 font-mono">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-stone-800 group-hover:text-stone-600 transition-colors">{p.name}</h3>
                    <p className="text-sm text-stone-400 mt-1">{p.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-stone-400 hidden sm:block">{p.year}</span>
                  <ArrowUpRight className="w-5 h-5 text-stone-300 group-hover:text-stone-800 group-hover:rotate-0 -rotate-45 transition-all" />
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="px-6 sm:px-12 md:px-20 lg:px-32 py-32 border-t border-stone-200 text-center">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.4em] text-stone-400 mb-6">Get in Touch</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold text-stone-800 mb-10">
            Let's create<br />something beautiful
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          {data.email ? (
            <MagneticButton
              className="px-10 py-5 rounded-full text-base font-medium border-2 border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white transition-colors"
              onClick={() => window.location.href = `mailto:${data.email}`}
            >
              {data.email}
            </MagneticButton>
          ) : (
            <MagneticButton className="px-10 py-5 rounded-full text-base font-medium border-2 border-stone-800 text-stone-800">
              Say Hello
            </MagneticButton>
          )}
        </Reveal>
        <Reveal delay={0.3}>
          <div className="flex justify-center gap-6 mt-10">
            {data.socialLinks.filter(l => l.url.trim()).map((link, i) => {
              const Icon = getSocialIcon(link.platform);
              return (
                <MagneticButton
                  key={i}
                  className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:text-stone-800 hover:border-stone-800 transition-colors"
                  onClick={() => window.open(link.url, '_blank')}
                >
                  <Icon className="w-5 h-5" />
                </MagneticButton>
              );
            })}
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <p className="text-xs text-stone-300 mt-20">
            © {new Date().getFullYear()} {data.name} — Built with Portaura
          </p>
        </Reveal>
      </section>
    </div>
  );
};

// =============================================
// DYNAMIC PRO THEME - Full Portfolio
// =============================================
const DynamicProPortfolio = ({ data }: { data: StoredPortfolio }) => {
  const c = data.primaryColor;
  const font = getFontFamily(data.font);

  return (
    <div className="min-h-screen" style={{ background: '#060606', fontFamily: font, cursor: 'none' }}>
      <PortfolioCursor color={c} />
      <ScrollProgress color={c} />
      <BackToTop color={c} />

      {/* Hero */}
      <section className="min-h-screen flex items-end relative px-6 sm:px-10 pb-20">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-full" style={{ background: `linear-gradient(180deg, ${c}08, transparent)` }} />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <Reveal>
            <div className="flex items-baseline gap-4 mb-6">
              <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: c }} />
              <span className="text-xs uppercase tracking-[0.3em] text-gray-500">Available for projects</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black leading-[0.85] mb-8">
              <span style={{ color: c }}>{data.name.split(' ')[0] || 'YOUR'}</span>
              <br />
              <span className="text-white">{data.name.split(' ').slice(1).join(' ') || 'NAME'}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-full sm:w-auto h-[2px] sm:h-auto sm:w-[2px] sm:min-h-[60px]" style={{ background: c }} />
              <div>
                <p className="text-xl sm:text-2xl text-white font-bold mb-1">{data.title || 'Creative Professional'}</p>
                <p className="text-sm text-gray-500 max-w-md">
                  {data.bio ? data.bio.slice(0, 120) : 'Driven by impact. Fueled by creativity. Building the future.'}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Horizontal Scroll Projects */}
      <section className="py-20 overflow-hidden">
        <div className="px-6 sm:px-10 max-w-7xl mx-auto mb-12">
          <Reveal>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">Featured Projects</p>
                <h2 className="text-3xl sm:text-5xl font-black text-white">Latest Work</h2>
              </div>
              <span className="text-xs text-gray-600 hidden sm:block">SCROLL →</span>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="flex gap-6 overflow-x-auto px-6 sm:px-10 pb-6 snap-x snap-mandatory scrollbar-hide">
            {[
              { name: 'Project Alpha', tag: 'Design', desc: 'Brand identity system' },
              { name: 'Beta Platform', tag: 'Development', desc: 'Full-stack web app' },
              { name: 'Gamma Studio', tag: 'Creative', desc: 'Art direction & design' },
              { name: 'Delta Mobile', tag: 'Mobile', desc: 'iOS & Android app' },
            ].map((p, i) => (
              <motion.div
                key={p.name}
                className="flex-shrink-0 w-80 sm:w-96 snap-start group"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="rounded-3xl p-1 border transition-colors" style={{ borderColor: `${c}15` }}>
                  <div className="aspect-[4/3] rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${c}15, ${c}05)` }}>
                    <span className="text-7xl font-black" style={{ color: `${c}15` }}>{String(i + 1).padStart(2, '0')}</span>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" style={{ background: `${c}20` }}>
                      <MagneticButton className="px-6 py-3 rounded-full text-sm font-bold" style={{ background: c, color: '#000' }}>
                        View Project
                      </MagneticButton>
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase" style={{ background: `${c}15`, color: c }}>{p.tag}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{p.name}</h3>
                    <p className="text-sm text-gray-500">{p.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Stats + Skills */}
      <section className="px-6 sm:px-10 py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { num: '50+', label: 'Projects' },
            { num: '30+', label: 'Clients' },
            { num: '5+', label: 'Years' },
            { num: '99%', label: 'Satisfaction' },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <div className="rounded-2xl p-6 border text-center" style={{ borderColor: `${c}15`, background: `${c}04` }}>
                <motion.p
                  className="text-3xl sm:text-4xl font-black mb-1"
                  style={{ color: c }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 + i * 0.05 }}
                  viewport={{ once: true }}
                >
                  {s.num}
                </motion.p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="px-6 sm:px-10 py-20 max-w-7xl mx-auto">
        <Reveal>
          <div className="rounded-3xl p-10 sm:p-20 relative overflow-hidden" style={{ background: c }}>
            <div className="relative z-10 text-center">
              <p className="text-sm uppercase tracking-widest mb-4 opacity-60" style={{ color: '#000' }}>Get In Touch</p>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black mb-8" style={{ color: '#000' }}>
                Let's Build<br />Something Bold
              </h2>
              {data.email && (
                <MagneticButton
                  className="px-10 py-5 rounded-full text-base font-bold bg-black text-white"
                  onClick={() => window.location.href = `mailto:${data.email}`}
                >
                  {data.email}
                </MagneticButton>
              )}
              <div className="flex justify-center gap-4 mt-8">
                {data.socialLinks.filter(l => l.url.trim()).map((link, i) => {
                  const Icon = getSocialIcon(link.platform);
                  return (
                    <MagneticButton
                      key={i}
                      className="w-12 h-12 rounded-full bg-black/20 flex items-center justify-center"
                      style={{ color: '#000' }}
                      onClick={() => window.open(link.url, '_blank')}
                    >
                      <Icon className="w-5 h-5" />
                    </MagneticButton>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-center text-xs text-gray-600 mt-12">
            © {new Date().getFullYear()} {data.name} — Powered by <span style={{ color: c }}>Portaura</span>
          </p>
        </Reveal>
      </section>
    </div>
  );
};

// =============================================
// MAIN PORTFOLIO VIEW
// =============================================
const PortfolioView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState<StoredPortfolio | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) { setNotFound(true); return; }
    const p = getPortfolio(id);
    if (p) setPortfolio(p);
    else setNotFound(true);
  }, [id]);

  // Load fonts
  useEffect(() => {
    if (!portfolio) return;
    const links: HTMLLinkElement[] = [];
    const fonts = ['Inter:wght@300;400;500;600;700;800;900', 'Playfair+Display:wght@400;500;600;700;800;900', 'JetBrains+Mono:wght@300;400;500;600;700'];
    fonts.forEach(f => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `https://fonts.googleapis.com/css2?family=${f}&display=swap`;
      document.head.appendChild(link);
      links.push(link);
    });
    return () => links.forEach(l => l.remove());
  }, [portfolio]);

  if (notFound) {
    return (
      <div className="min-h-screen bg-[#060606] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-6xl font-black text-white mb-4">404</h1>
          <p className="text-gray-500 mb-8">Portfolio not found</p>
          <button onClick={() => navigate('/')} className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-[#060606] flex items-center justify-center">
        <motion.div
          className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        />
      </div>
    );
  }

  switch (portfolio.theme) {
    case 'minimalist-zen':
      return <MinimalistZenPortfolio data={portfolio} />;
    case 'dynamic-pro':
      return <DynamicProPortfolio data={portfolio} />;
    case 'aura-infinity':
    case 'creative-studio':
    case 'executive':
    case 'editorial-flow':
    case 'bold-grid':
    case 'cyber-bento':
    default:
      return <AuraInfinityPortfolio data={portfolio} />;
  }
};

export default PortfolioView;
