import { motion } from 'framer-motion';
import { Reveal, TiltCard } from '../PortfolioHelpers';
import { Briefcase, Code, Palette, Star } from 'lucide-react';

interface Props {
  bio: string;
  color: string;
}

const highlights = [
  { icon: Code, label: 'Clean Code', desc: 'Scalable & maintainable' },
  { icon: Palette, label: 'Design-First', desc: 'Pixel-perfect execution' },
  { icon: Briefcase, label: 'Strategy', desc: 'Business-oriented approach' },
  { icon: Star, label: 'Quality', desc: 'Award-winning work' },
];

const AboutSection = ({ bio, color: c }: Props) => (
  <section className="px-6 sm:px-12 lg:px-20 py-24 max-w-7xl mx-auto">
    <Reveal>
      <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: `${c}90` }}>About Me</p>
      <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-16">
        Crafting Digital<br />
        <span style={{ color: c }}>Experiences</span>
      </h2>
    </Reveal>

    <div className="grid md:grid-cols-5 gap-5">
      {/* Bio card */}
      <Reveal delay={0.1} className="md:col-span-3">
        <TiltCard
          className="rounded-3xl border p-8 sm:p-10 h-full relative overflow-hidden group"
          style={{ borderColor: `${c}18`, background: `linear-gradient(135deg, ${c}08, ${c}03)` }}
        >
          <div className="absolute top-0 left-0 w-full h-1" style={{ background: `linear-gradient(90deg, ${c}, transparent)` }} />
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity" style={{ background: c }} />
          <p className="text-xs uppercase tracking-widest mb-6" style={{ color: `${c}80` }}>Story</p>
          <p className="text-gray-300 leading-relaxed text-base sm:text-lg md:text-xl relative z-10">
            {bio || 'A passionate creator dedicated to building innovative digital solutions. With an eye for design and a love for clean code, I bring ideas to life through thoughtful craftsmanship and strategic thinking.'}
          </p>
        </TiltCard>
      </Reveal>

      {/* Infinity card */}
      <Reveal delay={0.2} className="md:col-span-2">
        <TiltCard
          className="rounded-3xl border p-8 flex flex-col items-center justify-center text-center h-full min-h-[200px] relative overflow-hidden"
          style={{ borderColor: `${c}18`, background: `linear-gradient(135deg, ${c}14, ${c}06)` }}
        >
          <motion.p
            className="text-8xl font-black text-white mb-3"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', delay: 0.3, duration: 1 }}
            viewport={{ once: true }}
          >
            ∞
          </motion.p>
          <p className="text-sm text-gray-400 uppercase tracking-widest">Possibilities</p>
        </TiltCard>
      </Reveal>
    </div>

    {/* Highlight cards */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
      {highlights.map((h, i) => (
        <Reveal key={h.label} delay={0.1 + i * 0.05}>
          <TiltCard
            className="rounded-2xl border p-6 text-center group relative overflow-hidden"
            style={{ borderColor: `${c}15`, background: `${c}05` }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `radial-gradient(circle at center, ${c}10, transparent)` }} />
            <motion.div
              className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center relative"
              style={{ background: `${c}15` }}
              whileHover={{ rotate: 5, scale: 1.1 }}
            >
              <h.icon className="w-5 h-5" style={{ color: c }} />
            </motion.div>
            <p className="font-bold text-white text-sm mb-1">{h.label}</p>
            <p className="text-xs text-gray-500">{h.desc}</p>
          </TiltCard>
        </Reveal>
      ))}
    </div>
  </section>
);

export default AboutSection;
