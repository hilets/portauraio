import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { PortfolioData } from '@/pages/OrderWizard';

interface Props {
  data: PortfolioData;
}

const getFontClass = (font: string) => {
  switch (font) {
    case 'Playfair Display':
      return 'font-serif';
    case 'JetBrains Mono':
      return 'font-mono';
    default:
      return 'font-sans';
  }
};

const AuraInfinityPreview = ({ data }: Props) => (
  <div className="min-h-full p-4" style={{ background: 'linear-gradient(145deg, #060912, #081426, #050811)' }}>
    <div className="sticky top-0 z-20 mb-4 rounded-xl border border-border/40 bg-background/30 px-3 py-2 backdrop-blur">
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.25em]" style={{ color: data.primaryColor }}>Aura Infinity X</p>
        <p className="text-[10px] text-muted-foreground">Live</p>
      </div>
    </div>

    <div className="rounded-2xl border p-5 mb-4" style={{ borderColor: `${data.primaryColor}40`, background: `linear-gradient(135deg, ${data.primaryColor}16, transparent)` }}>
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-2xl font-black text-white mb-2 ${getFontClass(data.font)}`}>
        {data.name || 'Your Name'}
      </motion.h1>
      <p className="text-sm mb-4" style={{ color: data.primaryColor }}>{data.title || 'Interactive Portfolio Website'}</p>
      <p className="text-xs text-gray-400 leading-relaxed mb-5">
        {data.bio || 'Big, modern, interactive portfolio layout with multi-section storytelling and conversion-focused structure.'}
      </p>
      <div className="flex gap-2">
        <div className="rounded-lg px-3 py-1.5 text-[10px] font-semibold" style={{ background: data.primaryColor, color: '#041018' }}>Hire Me</div>
        <div className="rounded-lg border px-3 py-1.5 text-[10px]" style={{ borderColor: `${data.primaryColor}40`, color: data.primaryColor }}>View Projects</div>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-2 mb-4">
      {['Hero', 'Case Studies', 'Services', 'Testimonials'].map((item, i) => (
        <motion.div
          key={item}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="rounded-xl border p-3"
          style={{ borderColor: `${data.primaryColor}24`, background: `${data.primaryColor}08` }}
        >
          <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: `${data.primaryColor}dd` }}>{item}</p>
          <p className="text-[11px] text-gray-400">Interactive content block</p>
        </motion.div>
      ))}
    </div>

    <div className="rounded-xl border p-3" style={{ borderColor: `${data.primaryColor}24`, background: `${data.primaryColor}06` }}>
      <p className="text-[10px] uppercase tracking-wider mb-2" style={{ color: `${data.primaryColor}dd` }}>Project Stream</p>
      <div className="space-y-2">
        {[1, 2, 3].map((project) => (
          <div key={project} className="flex items-center justify-between rounded-lg border px-3 py-2" style={{ borderColor: `${data.primaryColor}16` }}>
            <span className="text-xs text-gray-300">Project {project}</span>
            <ArrowUpRight className="w-3 h-3" style={{ color: data.primaryColor }} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const MinimalistZenPreview = ({ data }: Props) => (
  <div className="min-h-full p-8" style={{ background: '#fafaf9' }}>
    <h1 className={`text-2xl font-bold text-stone-900 mb-2 ${getFontClass(data.font)}`}>{data.name || 'Your Name'}</h1>
    <p className="text-sm text-stone-500 mb-5">{data.title || 'Your Title'}</p>
    <p className="text-xs text-stone-500 leading-relaxed">{data.bio || 'Quiet, clean and elegant minimal showcase.'}</p>
  </div>
);

const DynamicProPreview = ({ data }: Props) => (
  <div className="min-h-full p-5" style={{ background: '#090909' }}>
    <h1 className={`text-3xl font-black mb-2 ${getFontClass(data.font)}`} style={{ color: data.primaryColor }}>
      {data.name || 'YOUR NAME'}
    </h1>
    <p className="text-xs text-gray-500 mb-4">{data.title || 'BOLD PROFESSIONAL'}</p>
    <div className="flex gap-2 overflow-x-auto pb-1">
      {[1, 2, 3].map((item) => (
        <div key={item} className="w-24 h-16 rounded-lg border flex-shrink-0" style={{ borderColor: `${data.primaryColor}30`, background: `${data.primaryColor}10` }} />
      ))}
    </div>
  </div>
);

const CreativeStudioPreview = ({ data }: Props) => (
  <div className="min-h-full p-5" style={{ background: 'linear-gradient(135deg, #160d2e, #23134a)' }}>
    <h1 className={`text-xl font-bold text-white mb-1 ${getFontClass(data.font)}`}>{data.name || 'Your Name'}</h1>
    <p className="text-xs text-purple-200 mb-4">{data.title || 'Creative Professional'}</p>
    <div className="grid grid-cols-2 gap-2">
      {['Brand', 'Motion', 'UI', 'Photo'].map((tag) => (
        <div key={tag} className="rounded-lg p-2 text-[10px] text-center border border-purple-400/30 text-purple-200 bg-purple-300/5">{tag}</div>
      ))}
    </div>
  </div>
);

const ExecutivePreview = ({ data }: Props) => (
  <div className="min-h-full p-6" style={{ background: '#0b121d' }}>
    <h1 className={`text-xl font-bold mb-2 ${getFontClass(data.font)}`} style={{ color: '#e5d8bd' }}>{data.name || 'Your Name'}</h1>
    <p className="text-xs mb-4" style={{ color: '#a89a82' }}>{data.title || 'Executive Professional'}</p>
    <p className="text-xs leading-relaxed" style={{ color: '#8a95a6' }}>{data.bio || 'Luxury profile with premium positioning.'}</p>
  </div>
);

const EditorialFlowPreview = ({ data }: Props) => (
  <div className="min-h-full p-6" style={{ background: '#f8f8f7' }}>
    <p className="text-[10px] uppercase tracking-[0.35em] text-stone-400 mb-3">Editorial</p>
    <h1 className={`text-2xl font-bold text-stone-900 mb-2 ${getFontClass(data.font)}`}>{data.name || 'Your Name'}</h1>
    <p className="text-xs text-stone-600">{data.title || 'Story-first portfolio'}</p>
  </div>
);

const BoldGridPreview = ({ data }: Props) => (
  <div className="min-h-full p-4" style={{ background: '#0b0f1a' }}>
    <h1 className={`text-xl font-black mb-3 ${getFontClass(data.font)}`} style={{ color: data.primaryColor }}>{data.name || 'YOUR NAME'}</h1>
    <div className="grid grid-cols-2 gap-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-16 rounded-lg border" style={{ borderColor: `${data.primaryColor}35`, background: `${data.primaryColor}10` }} />
      ))}
    </div>
  </div>
);

const LivePreview = ({ data }: Props) => {
  switch (data.theme) {
    case 'aura-infinity':
    case 'cyber-bento':
      return <AuraInfinityPreview data={data} />;
    case 'minimalist-zen':
      return <MinimalistZenPreview data={data} />;
    case 'dynamic-pro':
      return <DynamicProPreview data={data} />;
    case 'creative-studio':
      return <CreativeStudioPreview data={data} />;
    case 'executive':
      return <ExecutivePreview data={data} />;
    case 'editorial-flow':
      return <EditorialFlowPreview data={data} />;
    case 'bold-grid':
      return <BoldGridPreview data={data} />;
    default:
      return <AuraInfinityPreview data={data} />;
  }
};

export default LivePreview;
