import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram, Mail, Phone, ExternalLink, ArrowUpRight, ChevronDown, ArrowUp, Briefcase, Code, Palette, Camera, Star } from 'lucide-react';

export interface PortfolioProps {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  socialLinks: { platform: string; url: string }[];
  primaryColor: string;
  font: string;
  /** When true, renders a compact miniature for the wizard live-preview */
  compact?: boolean;
}

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

/* ---- small helpers ---- */
const Reveal = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
};

const MagneticBtn = ({ children, className = '', style = {}, onClick }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; onClick?: () => void }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const move = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.25 });
  };
  return (
    <motion.button ref={ref} onMouseMove={move} onMouseLeave={() => setPos({ x: 0, y: 0 })} animate={{ x: pos.x, y: pos.y }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className={className} style={style} onClick={onClick}>
      {children}
    </motion.button>
  );
};

/* ---- scroll progress ---- */
const ScrollBar = ({ color }: { color: string }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return <motion.div className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left" style={{ scaleX, background: color }} />;
};

/* ---- custom cursor ---- */
const Cursor = ({ color }: { color: string }) => {
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
      <motion.div className="fixed top-0 left-0 pointer-events-none z-[999] rounded-full border-2 hidden md:block" style={{ borderColor: color }} animate={{ x: pos.x - (hovering ? 20 : 10), y: pos.y - (hovering ? 20 : 10), width: hovering ? 40 : 20, height: hovering ? 40 : 20, opacity: hovering ? 0.8 : 0.5 }} transition={{ type: 'spring', stiffness: 500, damping: 28 }} />
      <motion.div className="fixed top-0 left-0 pointer-events-none z-[999] w-1 h-1 rounded-full hidden md:block" style={{ background: color }} animate={{ x: pos.x - 2, y: pos.y - 2 }} transition={{ type: 'spring', stiffness: 800, damping: 35 }} />
    </>
  );
};

/* ---- back to top ---- */
const BackToTop = ({ color }: { color: string }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  if (!show) return null;
  return (
    <MagneticBtn className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl" style={{ background: color, color: '#000' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <ArrowUp className="w-5 h-5" />
    </MagneticBtn>
  );
};

/* ================================================================
   COMPACT LIVE-PREVIEW (mirrors structure of full portfolio)
   ================================================================ */
const CompactPortfolio = ({ name, title, bio, email, socialLinks, primaryColor: c, font }: PortfolioProps) => {
  const fontFamily = getFontFamily(font);
  return (
    <div className="min-h-full" style={{ background: 'linear-gradient(145deg, #060912, #081426, #050811)', fontFamily }}>
      {/* progress bar */}
      <div className="w-full h-[3px] overflow-hidden" style={{ background: '#111c30' }}>
        <motion.div className="h-full" style={{ background: c }} animate={{ width: ['0%', '30%'] }} transition={{ duration: 1, delay: 0.3 }} />
      </div>

      {/* hero */}
      <div className="p-4 pb-2">
        <div className="rounded-2xl border p-5 mb-3" style={{ borderColor: `${c}35`, background: `linear-gradient(135deg, ${c}14, transparent)`, boxShadow: `0 0 60px ${c}10` }}>
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-base font-black"
              style={{ background: `linear-gradient(135deg, ${c}, ${c}90)`, color: '#050a14' }}
              animate={{ rotate: [0, 3, -3, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
            >
              {name ? name.charAt(0).toUpperCase() : '?'}
            </motion.div>
            <div>
              <h1 className="text-lg font-black text-white leading-tight">{name || 'Your Name'}</h1>
              <p className="text-[11px]" style={{ color: c }}>{title || 'Professional Title'}</p>
            </div>
          </div>
          <p className="text-[11px] text-gray-400 leading-relaxed mb-3">
            {bio ? (bio.length > 90 ? bio.slice(0, 90) + '…' : bio) : 'Your bio and story will appear here with smooth animations.'}
          </p>
          <div className="flex gap-2">
            <div className="rounded-lg px-3 py-1.5 text-[10px] font-bold" style={{ background: c, color: '#050a14' }}>Hire Me</div>
            <div className="rounded-lg border px-3 py-1.5 text-[10px]" style={{ borderColor: `${c}50`, color: c }}>Projects</div>
          </div>
        </div>

        {/* about + stats bento */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="col-span-2 rounded-xl border p-3" style={{ borderColor: `${c}20`, background: `${c}06` }}>
            <p className="text-[9px] uppercase tracking-wider mb-1" style={{ color: `${c}b0` }}>About</p>
            <p className="text-[10px] text-gray-400 leading-relaxed">{bio ? bio.slice(0, 50) + '…' : 'Brief introduction section.'}</p>
          </div>
          <div className="rounded-xl border p-3 flex flex-col items-center justify-center" style={{ borderColor: `${c}20`, background: `linear-gradient(135deg, ${c}12, ${c}04)` }}>
            <motion.p className="text-xl font-black text-white" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.4 }}>12+</motion.p>
            <p className="text-[8px] text-gray-500 uppercase">Projects</p>
          </div>
        </div>

        {/* skills */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {['Design', 'Dev', 'Strategy', 'Brand', 'UI/UX'].map((s) => (
            <span key={s} className="px-2 py-1 rounded-full text-[9px] border" style={{ borderColor: `${c}25`, color: `${c}cc` }}>{s}</span>
          ))}
        </div>

        {/* featured work */}
        <div className="rounded-xl border p-3 mb-3" style={{ borderColor: `${c}20`, background: `${c}06` }}>
          <p className="text-[9px] uppercase tracking-wider mb-2" style={{ color: `${c}b0` }}>Featured Work</p>
          <div className="space-y-1.5">
            {['Project Alpha', 'Design System', 'Mobile App'].map((p, i) => (
              <motion.div key={p} className="flex items-center justify-between py-1.5 px-2 rounded-lg" style={{ background: `${c}08` }} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
                <span className="text-[10px] text-gray-300">{p}</span>
                <ArrowUpRight className="w-2.5 h-2.5" style={{ color: c }} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* social links */}
        <div className="flex gap-1.5">
          {(socialLinks.filter((l) => l.platform).length > 0
            ? socialLinks.filter((l) => l.platform).slice(0, 3)
            : [{ platform: 'GitHub' }, { platform: 'LinkedIn' }, { platform: 'Twitter' }]
          ).map((link, i) => (
            <div key={i} className="flex-1 rounded-lg py-1.5 text-center text-[9px] border" style={{ borderColor: `${c}25`, color: c }}>{link.platform}</div>
          ))}
        </div>

        {/* contact */}
        <div className="rounded-xl border p-3 mt-3 text-center" style={{ borderColor: `${c}25`, background: `linear-gradient(135deg, ${c}12, ${c}04)` }}>
          <p className="text-[9px] uppercase tracking-wider mb-1.5" style={{ color: `${c}b0` }}>Get In Touch</p>
          <p className="text-[10px] text-gray-400">{email || 'your@email.com'}</p>
        </div>
      </div>
    </div>
  );
};

/* ================================================================
   FULL PORTFOLIO (published /p/:id page)
   ================================================================ */
const FullPortfolio = (props: PortfolioProps) => {
  const { name, title, bio, email, phone, socialLinks, primaryColor: c, font } = props;
  const fontFamily = getFontFamily(font);

  const projects = [
    { name: 'Project Alpha', desc: 'Brand identity & web design', tag: 'Design', year: '2024' },
    { name: 'Platform Beta', desc: 'Full-stack web application', tag: 'Development', year: '2024' },
    { name: 'Studio Gamma', desc: 'Art direction & creative campaign', tag: 'Creative', year: '2023' },
    { name: 'App Delta', desc: 'Cross-platform mobile application', tag: 'Mobile', year: '2023' },
  ];

  const skills = ['UI/UX Design', 'Web Development', 'Brand Strategy', 'Motion Design', 'Photography', 'Consulting'];

  const stats = [
    { value: '50+', label: 'Projects' },
    { value: '30+', label: 'Clients' },
    { value: '5+', label: 'Years' },
    { value: '99%', label: 'Satisfaction' },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(145deg, #04060b 0%, #071120 50%, #04060c 100%)', fontFamily, cursor: 'none' }}>
      <Cursor color={c} />
      <ScrollBar color={c} />
      <BackToTop color={c} />

      {/* ===== HERO ===== */}
      <section className="min-h-screen flex items-center relative px-5 sm:px-10 lg:px-20">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full blur-[130px] opacity-20" style={{ background: c }} animate={{ x: [0, 30, 0], y: [0, -20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-[100px] opacity-15" style={{ background: c }} animate={{ x: [0, -30, 0], y: [0, 20, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />
          {/* grid lines */}
          <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(${c}08 1px, transparent 1px), linear-gradient(90deg, ${c}08 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <Reveal>
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6" style={{ borderColor: `${c}40`, background: `${c}10` }} animate={{ boxShadow: [`0 0 0px ${c}00`, `0 0 20px ${c}30`, `0 0 0px ${c}00`] }} transition={{ duration: 3, repeat: Infinity }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: c }} />
              <span className="text-xs uppercase tracking-widest" style={{ color: c }}>Available for projects</span>
            </motion.div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white leading-[0.88] mb-6">
              {name || 'Your Name'}
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-xl sm:text-3xl font-semibold mb-5" style={{ color: c }}>
              {title || 'Creative Professional'}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-2xl mb-10">
              {bio || 'Crafting exceptional digital experiences through thoughtful design, clean code, and strategic thinking. Every project is an opportunity to create something extraordinary.'}
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex flex-wrap gap-4">
              <MagneticBtn className="px-10 py-5 rounded-2xl font-bold text-base tracking-wide" style={{ background: c, color: '#04080e' }}>
                Start a Project
              </MagneticBtn>
              <MagneticBtn className="px-10 py-5 rounded-2xl border font-bold text-base tracking-wide" style={{ borderColor: `${c}50`, color: c, background: `${c}0c` }}>
                View Work
              </MagneticBtn>
            </div>
          </Reveal>

          <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2.2 }}>
            <span className="text-[10px] uppercase tracking-widest text-gray-500">Scroll</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </motion.div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="px-5 sm:px-10 lg:px-20 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <div className="rounded-2xl border p-6 text-center" style={{ borderColor: `${c}20`, background: `${c}06` }}>
                <motion.p className="text-3xl sm:text-4xl font-black mb-1" style={{ color: c }} initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ type: 'spring', delay: 0.15 + i * 0.05 }} viewport={{ once: true }}>
                  {s.value}
                </motion.p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== ABOUT BENTO ===== */}
      <section className="px-5 sm:px-10 lg:px-20 py-16 max-w-7xl mx-auto">
        <Reveal><p className="text-xs uppercase tracking-[0.3em] mb-8" style={{ color: `${c}90` }}>About Me</p></Reveal>
        <div className="grid md:grid-cols-3 gap-4">
          <Reveal delay={0.1} className="md:col-span-2">
            <div className="rounded-3xl border p-8 h-full" style={{ borderColor: `${c}18`, background: `${c}06`, boxShadow: `inset 0 1px 0 ${c}12` }}>
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: `${c}80` }}>Bio</p>
              <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
                {bio || 'A passionate creator dedicated to building innovative digital solutions. With an eye for design and a love for clean code, I bring ideas to life through thoughtful craftsmanship.'}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="rounded-3xl border p-8 flex flex-col items-center justify-center text-center" style={{ borderColor: `${c}18`, background: `linear-gradient(135deg, ${c}14, ${c}06)` }}>
              <motion.p className="text-6xl font-black text-white mb-2" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ type: 'spring', delay: 0.3 }} viewport={{ once: true }}>∞</motion.p>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Possibilities</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== SKILLS ===== */}
      <section className="px-5 sm:px-10 lg:px-20 py-16 max-w-7xl mx-auto">
        <Reveal><p className="text-xs uppercase tracking-[0.3em] mb-8" style={{ color: `${c}90` }}>Skills & Expertise</p></Reveal>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, i) => (
            <Reveal key={skill} delay={i * 0.04}>
              <motion.span className="px-5 py-3 rounded-2xl border text-sm font-medium" style={{ borderColor: `${c}30`, color: `${c}e0`, background: `${c}0a` }} whileHover={{ scale: 1.06, background: `${c}20`, borderColor: `${c}60` }}>
                {skill}
              </motion.span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <section className="px-5 sm:px-10 lg:px-20 py-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: `${c}90` }}>Featured Work</p>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-12">Selected Projects</h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <motion.div
                className="group rounded-3xl border p-6 sm:p-8 relative overflow-hidden"
                style={{ borderColor: `${c}15`, background: `${c}05` }}
                whileHover={{ y: -6, borderColor: `${c}45` }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(90deg, ${c}, transparent)` }} />
                <div className="aspect-video rounded-2xl mb-5 flex items-center justify-center relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${c}14, ${c}06)` }}>
                  <span className="text-5xl font-black" style={{ color: `${c}25` }}>{String(i + 1).padStart(2, '0')}</span>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" style={{ background: `${c}1a` }}>
                    <span className="px-5 py-2.5 rounded-full text-sm font-bold" style={{ background: c, color: '#04080e' }}>View Project</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase" style={{ background: `${c}18`, color: c }}>{p.tag}</span>
                  <span className="text-xs text-gray-600">{p.year}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{p.name}</h3>
                <p className="text-sm text-gray-500">{p.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== EXPERIENCE ===== */}
      <section className="px-5 sm:px-10 lg:px-20 py-16 max-w-7xl mx-auto">
        <Reveal><p className="text-xs uppercase tracking-[0.3em] mb-8" style={{ color: `${c}90` }}>Experience</p></Reveal>
        <div className="rounded-3xl border p-6 sm:p-10" style={{ borderColor: `${c}18`, background: `${c}05` }}>
          {['Senior Designer at Studio X — 2024', 'Lead Developer at TechCo — 2023', 'Freelance Creative Director — 2022', 'Junior Designer at Agency Y — 2021'].map((exp, i) => (
            <Reveal key={exp} delay={i * 0.05}>
              <motion.div className="flex items-center justify-between py-5 border-b last:border-b-0" style={{ borderColor: `${c}12` }} whileHover={{ x: 8 }} transition={{ duration: 0.2 }}>
                <span className="text-gray-300 text-sm sm:text-base">{exp}</span>
                <ArrowUpRight className="w-4 h-4 flex-shrink-0" style={{ color: `${c}70` }} />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== CONTACT CTA ===== */}
      <section className="px-5 sm:px-10 lg:px-20 py-20 max-w-7xl mx-auto">
        <Reveal>
          <div className="rounded-3xl border p-10 sm:p-20 text-center relative overflow-hidden" style={{ borderColor: `${c}30`, background: `linear-gradient(135deg, ${c}14, ${c}05)` }}>
            <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 30% 50%, ${c}15 0%, transparent 60%)` }} />
            <div className="relative z-10">
              <p className="text-xs uppercase tracking-[0.3em] mb-5" style={{ color: `${c}c0` }}>Let's Connect</p>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white mb-8">Ready to work<br />together?</h2>
              {email && (
                <MagneticBtn className="px-12 py-6 rounded-2xl text-lg font-bold mb-6" style={{ background: c, color: '#04080e' }} onClick={() => { window.location.href = `mailto:${email}`; }}>
                  <Mail className="w-5 h-5 inline mr-2" />{email}
                </MagneticBtn>
              )}
              {phone && <p className="text-gray-500 mb-6">{phone}</p>}
              <div className="flex justify-center gap-4 mt-6">
                {socialLinks.filter((l) => l.url.trim()).map((link, i) => {
                  const Icon = getSocialIcon(link.platform);
                  return (
                    <MagneticBtn key={i} className="w-12 h-12 rounded-xl border flex items-center justify-center" style={{ borderColor: `${c}30`, color: c }} onClick={() => window.open(link.url, '_blank')}>
                      <Icon className="w-5 h-5" />
                    </MagneticBtn>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-center text-xs text-gray-600 mt-12">© {new Date().getFullYear()} {name}. Built with <span style={{ color: c }}>Portaura</span></p>
        </Reveal>
      </section>
    </div>
  );
};

/* ================================================================
   MAIN EXPORT
   ================================================================ */
const PortfolioRenderer = (props: PortfolioProps) => {
  if (props.compact) return <CompactPortfolio {...props} />;
  return <FullPortfolio {...props} />;
};

export default PortfolioRenderer;
