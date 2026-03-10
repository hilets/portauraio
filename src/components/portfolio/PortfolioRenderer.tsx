import { Cursor, ScrollBar, BackToTop, Reveal, MagneticBtn, TiltCard, GlowDivider, getFontFamily, getSocialIcon } from './PortfolioHelpers';
import HeroSection from './sections/HeroSection';
import StatsSection from './sections/StatsSection';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import ExperienceSection from './sections/ExperienceSection';
import TestimonialsSection from './sections/TestimonialsSection';
import ContactSection from './sections/ContactSection';
import { CompactQuantum, FullQuantum } from './QuantumRenderer';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export interface PortfolioProps {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  socialLinks: { platform: string; url: string }[];
  primaryColor: string;
  font: string;
  compact?: boolean;
  template?: 'aura-infinity' | 'quantum-studio';
}

/* ================================================================
   AURA INFINITY — COMPACT (wizard sidebar)
   ================================================================ */
const CompactAura = ({ name, title, bio, email, socialLinks, primaryColor: c, font }: PortfolioProps) => {
  const fontFamily = getFontFamily(font);
  return (
    <div className="min-h-full" style={{ background: 'linear-gradient(145deg, #060912, #081426, #050811)', fontFamily }}>
      <div className="w-full h-[3px] overflow-hidden" style={{ background: '#111c30' }}>
        <motion.div className="h-full" style={{ background: c }} animate={{ width: ['0%', '30%'] }} transition={{ duration: 1, delay: 0.3 }} />
      </div>

      <div className="p-4 pb-2">
        <div className="rounded-2xl border p-5 mb-3 relative overflow-hidden" style={{ borderColor: `${c}35`, background: `linear-gradient(135deg, ${c}14, transparent)`, boxShadow: `0 0 60px ${c}10` }}>
          <motion.div className="absolute -top-6 -right-6 w-20 h-20 rounded-full blur-xl opacity-30" style={{ background: c }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }} />
          <div className="flex items-center gap-3 mb-3">
            <motion.div className="w-10 h-10 rounded-xl flex items-center justify-center text-base font-black"
              style={{ background: `linear-gradient(135deg, ${c}, ${c}90)`, color: '#050a14' }}
              animate={{ rotate: [0, 3, -3, 0] }} transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}>
              {name ? name.charAt(0).toUpperCase() : '?'}
            </motion.div>
            <div>
              <h1 className="text-lg font-black text-white leading-tight">{name || 'Your Name'}</h1>
              <p className="text-[11px]" style={{ color: c }}>{title || 'Professional Title'}</p>
            </div>
          </div>
          <p className="text-[11px] text-gray-400 leading-relaxed mb-3">
            {bio ? (bio.length > 90 ? bio.slice(0, 90) + '…' : bio) : 'Your bio will appear here with smooth animations.'}
          </p>
          <div className="flex gap-2">
            <div className="rounded-lg px-3 py-1.5 text-[10px] font-bold" style={{ background: c, color: '#050a14' }}>Start a Project</div>
            <div className="rounded-lg border px-3 py-1.5 text-[10px]" style={{ borderColor: `${c}50`, color: c }}>View Work</div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-1.5 mb-3">
          {['50+', '30+', '5+', '99%'].map((v, i) => (
            <div key={i} className="rounded-xl border p-2 text-center" style={{ borderColor: `${c}20`, background: `${c}06` }}>
              <motion.p className="text-sm font-black" style={{ color: c }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 + i * 0.05 }}>{v}</motion.p>
              <p className="text-[7px] text-gray-500 uppercase">{['Projects', 'Clients', 'Years', 'Rating'][i]}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="col-span-2 rounded-xl border p-3" style={{ borderColor: `${c}20`, background: `${c}06` }}>
            <p className="text-[9px] uppercase tracking-wider mb-1" style={{ color: `${c}b0` }}>About</p>
            <p className="text-[10px] text-gray-400 leading-relaxed">{bio ? bio.slice(0, 50) + '…' : 'Brief introduction section.'}</p>
          </div>
          <div className="rounded-xl border p-3 flex flex-col items-center justify-center" style={{ borderColor: `${c}20`, background: `linear-gradient(135deg, ${c}12, ${c}04)` }}>
            <motion.p className="text-xl font-black text-white" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.4 }}>∞</motion.p>
            <p className="text-[8px] text-gray-500 uppercase">Possibilities</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {['Design', 'Dev', 'Strategy', 'Brand', 'UI/UX', 'Mobile'].map(s => (
            <span key={s} className="px-2 py-1 rounded-full text-[9px] border" style={{ borderColor: `${c}25`, color: `${c}cc` }}>{s}</span>
          ))}
        </div>

        <div className="rounded-xl border p-3 mb-3" style={{ borderColor: `${c}20`, background: `${c}06` }}>
          <p className="text-[9px] uppercase tracking-wider mb-2" style={{ color: `${c}b0` }}>Featured Work</p>
          <div className="space-y-1.5">
            {['Project Alpha', 'Platform Beta', 'Studio Gamma'].map((p, i) => (
              <motion.div key={p} className="flex items-center justify-between py-1.5 px-2 rounded-lg" style={{ background: `${c}08` }}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
                <span className="text-[10px] text-gray-300">{p}</span>
                <ArrowUpRight className="w-2.5 h-2.5" style={{ color: c }} />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border p-3 mb-3" style={{ borderColor: `${c}20`, background: `linear-gradient(135deg, ${c}08, ${c}03)` }}>
          <p className="text-[9px] uppercase tracking-wider mb-1.5" style={{ color: `${c}b0` }}>Testimonials</p>
          <p className="text-[10px] text-gray-400 italic">"Incredible work. Exceeded all expectations."</p>
          <p className="text-[8px] text-gray-600 mt-1">— Sarah Chen, CEO</p>
        </div>

        <div className="flex gap-1.5 mb-3">
          {(socialLinks.filter(l => l.platform).length > 0
            ? socialLinks.filter(l => l.platform).slice(0, 3)
            : [{ platform: 'GitHub' }, { platform: 'LinkedIn' }, { platform: 'Twitter' }]
          ).map((link, i) => (
            <div key={i} className="flex-1 rounded-lg py-1.5 text-center text-[9px] border" style={{ borderColor: `${c}25`, color: c }}>{link.platform}</div>
          ))}
        </div>

        <div className="rounded-xl border p-3 text-center" style={{ borderColor: `${c}25`, background: `linear-gradient(135deg, ${c}12, ${c}04)` }}>
          <p className="text-[9px] uppercase tracking-wider mb-1.5" style={{ color: `${c}b0` }}>Get In Touch</p>
          <p className="text-[10px] text-gray-400">{email || 'your@email.com'}</p>
        </div>
      </div>
    </div>
  );
};

/* ================================================================
   AURA INFINITY — FULL (published)
   ================================================================ */
const FullAura = (props: PortfolioProps) => {
  const { name, title, bio, email, phone, socialLinks, primaryColor: c, font } = props;
  const fontFamily = getFontFamily(font);
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(145deg, #04060b 0%, #071120 50%, #04060c 100%)', fontFamily, cursor: 'none' }}>
      <Cursor color={c} />
      <ScrollBar color={c} />
      <BackToTop color={c} />
      <HeroSection name={name} title={title} bio={bio} color={c} email={email} />
      <GlowDivider color={c} />
      <StatsSection color={c} />
      <GlowDivider color={c} />
      <AboutSection bio={bio} color={c} />
      <GlowDivider color={c} />
      <ProjectsSection color={c} />
      <GlowDivider color={c} />
      <ExperienceSection color={c} />
      <GlowDivider color={c} />
      <TestimonialsSection color={c} />
      <GlowDivider color={c} />
      <ContactSection name={name} email={email} phone={phone} socialLinks={socialLinks} color={c} />
    </div>
  );
};

/* ================================================================
   MAIN EXPORT
   ================================================================ */
const PortfolioRenderer = (props: PortfolioProps) => {
  const template = props.template || 'aura-infinity';

  if (template === 'quantum-studio') {
    if (props.compact) return <CompactQuantum {...props} />;
    return <FullQuantum {...props} />;
  }

  // Default: Aura Infinity
  if (props.compact) return <CompactAura {...props} />;
  return <FullAura {...props} />;
};

export default PortfolioRenderer;
