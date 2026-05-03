import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Reveal, MagneticBtn } from '../PortfolioHelpers';

interface Props {
  name: string;
  title: string;
  bio: string;
  color: string;
  email: string;
}

const HeroSection = ({ name, title, bio, color: c, email }: Props) => (
  <section className="min-h-screen flex items-center relative overflow-hidden">
    <div
      className="absolute inset-0 z-0"
      style={{
        background: `radial-gradient(circle at 50% 30%, ${c}22 0%, ${c}10 18%, transparent 38%), linear-gradient(145deg, #04060b 0%, #071120 50%, #04060c 100%)`,
      }}
    />

    <motion.div
      className="absolute left-1/2 top-[22%] z-0 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full blur-3xl"
      style={{ background: `${c}22` }}
      animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.7, 0.45] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />

    <motion.div
      className="absolute inset-x-0 bottom-0 z-0 h-56"
      style={{ background: `linear-gradient(180deg, transparent 0%, ${c}12 45%, transparent 100%)` }}
      animate={{ opacity: [0.35, 0.55, 0.35] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    />

    {/* Gradient overlay for text readability */}
    <div className="absolute inset-0 z-[1]" style={{ background: `radial-gradient(ellipse at center, transparent 30%, #04060b 75%)` }} />

    {/* Grid pattern */}
    <div className="absolute inset-0 z-[1] opacity-20" style={{ backgroundImage: `linear-gradient(${c}08 1px, transparent 1px), linear-gradient(90deg, ${c}08 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />

    <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
      <Reveal>
        <motion.div
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border backdrop-blur-xl mb-8"
          style={{ borderColor: `${c}40`, background: `${c}10` }}
          animate={{ boxShadow: [`0 0 0px ${c}00`, `0 0 30px ${c}25`, `0 0 0px ${c}00`] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: c }} />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: c }} />
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: c }}>Available for projects</span>
        </motion.div>
      </Reveal>

      <Reveal delay={0.1}>
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black text-white leading-[0.85] mb-6 tracking-tight">
          <motion.span
            className="inline-block"
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 8, repeat: Infinity }}
            style={{
              backgroundImage: `linear-gradient(90deg, #ffffff, ${c}, #ffffff)`,
              backgroundSize: '200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {name || 'Your Name'}
          </motion.span>
        </h1>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="text-xl sm:text-3xl md:text-4xl font-semibold mb-6" style={{ color: c }}>
          {title || 'Creative Professional'}
        </p>
      </Reveal>

      <Reveal delay={0.3}>
        <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mb-12">
          {bio || 'Crafting exceptional digital experiences through thoughtful design, clean code, and strategic thinking.'}
        </p>
      </Reveal>

      <Reveal delay={0.4}>
        <div className="flex flex-wrap gap-4">
          <MagneticBtn
            className="group relative px-10 py-5 rounded-2xl font-bold text-base overflow-hidden"
            style={{ background: c, color: '#04080e' }}
            onClick={() => email && (window.location.href = `mailto:${email}`)}
          >
            <span className="relative z-10">Start a Project</span>
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: `linear-gradient(135deg, ${c}, #fff)` }}
            />
          </MagneticBtn>
          <MagneticBtn
            className="px-10 py-5 rounded-2xl border font-bold text-base backdrop-blur-sm"
            style={{ borderColor: `${c}50`, color: c, background: `${c}0c` }}
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Work ↓
          </MagneticBtn>
        </div>
      </Reveal>
    </div>

    {/* Scroll indicator */}
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      animate={{ y: [0, 12, 0] }}
      transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
    >
      <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">Scroll</span>
      <ChevronDown className="w-4 h-4 text-gray-500" />
    </motion.div>
  </section>
);

export default HeroSection;
