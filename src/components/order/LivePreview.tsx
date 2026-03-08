import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, ArrowUpRight, ChevronDown } from 'lucide-react';
import type { PortfolioData } from '@/pages/OrderWizard';

interface Props {
  data: PortfolioData;
}

const getFontClass = (font: string) => {
  switch (font) {
    case 'Playfair Display': return 'font-serif';
    case 'JetBrains Mono': return 'font-mono';
    default: return 'font-sans';
  }
};

const CyberBentoPreview = ({ data }: Props) => (
  <div className="min-h-full p-4" style={{ background: 'linear-gradient(135deg, #0a0a0f, #0d1117, #0a1628)' }}>
    {/* Scroll progress bar */}
    <div className="w-full h-1 rounded-full mb-4 overflow-hidden" style={{ background: '#1a1a2e' }}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: data.primaryColor, width: '35%' }}
        animate={{ width: ['0%', '35%'] }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </div>

    {/* Hero */}
    <div
      className="rounded-2xl p-6 mb-3 border"
      style={{
        background: `linear-gradient(135deg, ${data.primaryColor}08, ${data.primaryColor}03)`,
        borderColor: `${data.primaryColor}25`,
        boxShadow: `inset 0 1px 0 ${data.primaryColor}15, 0 0 40px ${data.primaryColor}08`,
      }}
    >
      <motion.div
        className="w-14 h-14 rounded-2xl mb-4 flex items-center justify-center text-xl font-bold"
        style={{
          background: `linear-gradient(135deg, ${data.primaryColor}, ${data.primaryColor}80)`,
          color: '#000',
        }}
        animate={{ rotate: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        {data.name ? data.name.charAt(0).toUpperCase() : '?'}
      </motion.div>
      <h1 className={`text-xl font-bold text-white mb-1 ${getFontClass(data.font)}`}>
        {data.name || 'Your Name'}
      </h1>
      <p className="text-sm" style={{ color: data.primaryColor }}>
        {data.title || 'Your Professional Title'}
      </p>
    </div>

    {/* Bento Grid */}
    <div className="grid grid-cols-2 gap-3 mb-3">
      <div
        className="rounded-xl p-4 border"
        style={{
          background: `${data.primaryColor}06`,
          borderColor: `${data.primaryColor}15`,
        }}
      >
        <p className="text-[10px] uppercase tracking-wider mb-2" style={{ color: `${data.primaryColor}90` }}>About</p>
        <p className="text-xs text-gray-400 leading-relaxed">
          {data.bio ? data.bio.slice(0, 60) + (data.bio.length > 60 ? '...' : '') : 'Your bio will appear here with a beautiful fade-in animation.'}
        </p>
      </div>
      <div
        className="rounded-xl p-4 border flex flex-col justify-between"
        style={{
          background: `linear-gradient(135deg, ${data.primaryColor}10, transparent)`,
          borderColor: `${data.primaryColor}15`,
        }}
      >
        <p className="text-[10px] uppercase tracking-wider mb-2" style={{ color: `${data.primaryColor}90` }}>Stats</p>
        <div>
          <p className="text-2xl font-bold text-white">12+</p>
          <p className="text-[10px] text-gray-500">Projects</p>
        </div>
      </div>
    </div>

    {/* Projects */}
    <div
      className="rounded-xl p-4 border mb-3"
      style={{ borderColor: `${data.primaryColor}15`, background: `${data.primaryColor}04` }}
    >
      <p className="text-[10px] uppercase tracking-wider mb-3" style={{ color: `${data.primaryColor}90` }}>Featured Work</p>
      <div className="space-y-2">
        {['Project Alpha', 'Design System', 'Mobile App'].map((p, i) => (
          <motion.div
            key={p}
            className="flex items-center justify-between py-2 px-3 rounded-lg"
            style={{ background: `${data.primaryColor}08` }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.15 }}
          >
            <span className="text-xs text-gray-300">{p}</span>
            <ArrowUpRight className="w-3 h-3" style={{ color: data.primaryColor }} />
          </motion.div>
        ))}
      </div>
    </div>

    {/* Contact */}
    <div className="flex gap-2">
      {data.socialLinks.filter(l => l.platform).slice(0, 3).map((link, i) => (
        <div
          key={i}
          className="flex-1 rounded-lg py-2 text-center text-[10px] border"
          style={{ borderColor: `${data.primaryColor}20`, color: data.primaryColor }}
        >
          {link.platform}
        </div>
      ))}
      {data.socialLinks.filter(l => l.platform).length === 0 && (
        <>
          <div className="flex-1 rounded-lg py-2 text-center text-[10px] border" style={{ borderColor: `${data.primaryColor}20`, color: data.primaryColor }}>GitHub</div>
          <div className="flex-1 rounded-lg py-2 text-center text-[10px] border" style={{ borderColor: `${data.primaryColor}20`, color: data.primaryColor }}>LinkedIn</div>
          <div className="flex-1 rounded-lg py-2 text-center text-[10px] border" style={{ borderColor: `${data.primaryColor}20`, color: data.primaryColor }}>Twitter</div>
        </>
      )}
    </div>
  </div>
);

const MinimalistZenPreview = ({ data }: Props) => (
  <div className="min-h-full p-8" style={{ background: '#fafaf9' }}>
    {/* Scroll progress */}
    <div className="w-full h-[2px] rounded-full mb-8 overflow-hidden bg-stone-200">
      <motion.div
        className="h-full rounded-full bg-stone-800"
        animate={{ width: ['0%', '35%'] }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-8"
    >
      <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 mb-4">Portfolio</p>
      <h1 className={`text-2xl font-bold text-stone-900 mb-2 ${getFontClass(data.font)}`}>
        {data.name || 'Your Name'}
      </h1>
      <div className="w-8 h-[1px] mx-auto mb-3" style={{ background: data.primaryColor }} />
      <p className={`text-sm text-stone-500 ${getFontClass(data.font)}`}>
        {data.title || 'Your Title'}
      </p>
    </motion.div>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className={`text-xs text-stone-500 leading-relaxed text-center mb-8 max-w-[240px] mx-auto ${getFontClass(data.font)}`}
    >
      {data.bio || 'A minimal, zen-inspired space to showcase your finest work with elegance and restraint.'}
    </motion.p>

    {/* Work items */}
    <div className="space-y-4 mb-8">
      {['Selected Work I', 'Selected Work II', 'Selected Work III'].map((item, i) => (
        <motion.div
          key={item}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.15 }}
          className="flex items-center justify-between py-3 border-b border-stone-200"
        >
          <span className={`text-sm text-stone-700 ${getFontClass(data.font)}`}>{item}</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" />
        </motion.div>
      ))}
    </div>

    <div className="text-center">
      <p className="text-[10px] text-stone-400 tracking-wider">
        {data.email || 'hello@yoursite.com'}
      </p>
    </div>
  </div>
);

const DynamicProPreview = ({ data }: Props) => (
  <div className="min-h-full" style={{ background: '#0a0a0a' }}>
    {/* Scroll progress */}
    <div className="w-full h-1.5 overflow-hidden">
      <motion.div
        className="h-full"
        style={{ background: `linear-gradient(90deg, ${data.primaryColor}, ${data.primaryColor}60)` }}
        animate={{ width: ['0%', '35%'] }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </div>

    <div className="p-5">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-6"
      >
        <h1
          className={`text-3xl font-black leading-none mb-2 ${getFontClass(data.font)}`}
          style={{ color: data.primaryColor }}
        >
          {data.name || 'YOUR'}
          <br />
          <span className="text-white">{data.title ? data.title.split(' ')[0]?.toUpperCase() : 'NAME'}</span>
        </h1>
        <div className="w-full h-[2px] my-3" style={{ background: `linear-gradient(90deg, ${data.primaryColor}, transparent)` }} />
        <p className="text-xs text-gray-500">
          {data.bio ? data.bio.slice(0, 80) : 'Bold. Dynamic. Professional.'}
        </p>
      </motion.div>

      {/* Horizontal scroll projects */}
      <div className="mb-6">
        <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-3">Featured Projects →</p>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="flex-shrink-0 w-36 h-24 rounded-xl border flex items-center justify-center"
              style={{
                borderColor: `${data.primaryColor}30`,
                background: `linear-gradient(135deg, ${data.primaryColor}10, transparent)`,
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <span className="text-xs text-gray-500">Project {i}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="rounded-xl p-4 text-center"
        style={{ background: data.primaryColor, color: '#000' }}
      >
        <p className={`text-sm font-bold ${getFontClass(data.font)}`}>Let's Work Together</p>
        <p className="text-[10px] opacity-70">{data.email || 'Get in touch'}</p>
      </motion.div>
    </div>
  </div>
);

const LivePreview = ({ data }: Props) => {
  switch (data.theme) {
    case 'minimalist-zen':
      return <MinimalistZenPreview data={data} />;
    case 'dynamic-pro':
      return <DynamicProPreview data={data} />;
    default:
      return <CyberBentoPreview data={data} />;
  }
};

export default LivePreview;
