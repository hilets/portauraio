import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Reveal, TiltCard } from '../PortfolioHelpers';

const projects = [
  { name: 'Project Alpha', desc: 'Complete brand identity & immersive web experience', tag: 'Design', year: '2024', gradient: '135deg' },
  { name: 'Platform Beta', desc: 'Full-stack SaaS application with real-time features', tag: 'Development', year: '2024', gradient: '225deg' },
  { name: 'Studio Gamma', desc: 'Art direction & creative campaign for luxury brand', tag: 'Creative', year: '2023', gradient: '315deg' },
  { name: 'App Delta', desc: 'Cross-platform mobile experience with 100K+ users', tag: 'Mobile', year: '2023', gradient: '45deg' },
];

const ProjectsSection = ({ color: c }: { color: string }) => (
  <section id="projects" className="px-6 sm:px-12 lg:px-20 py-24 max-w-7xl mx-auto">
    <Reveal>
      <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: `${c}90` }}>Featured Work</p>
      <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-16">
        Selected<br /><span style={{ color: c }}>Projects</span>
      </h2>
    </Reveal>

    <div className="grid md:grid-cols-2 gap-6">
      {projects.map((p, i) => (
        <Reveal key={p.name} delay={i * 0.1}>
          <TiltCard
            className="group rounded-3xl border relative overflow-hidden"
            style={{ borderColor: `${c}15`, background: `${c}05` }}
          >
            {/* Top glow line */}
            <div className="absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(90deg, transparent, ${c}, transparent)` }} />

            {/* Project visual */}
            <div className="aspect-[16/10] relative overflow-hidden flex items-center justify-center" style={{ background: `linear-gradient(${p.gradient}, ${c}15, ${c}05, transparent)` }}>
              <motion.span
                className="text-[120px] sm:text-[160px] font-black select-none"
                style={{ color: `${c}12` }}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
              >
                {String(i + 1).padStart(2, '0')}
              </motion.span>

              {/* Hover overlay */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm"
                style={{ background: `${c}18` }}
              >
                <motion.span
                  className="px-8 py-3 rounded-full text-sm font-bold flex items-center gap-2"
                  style={{ background: c, color: '#04080e' }}
                  whileHover={{ scale: 1.05 }}
                >
                  View Project <ArrowUpRight className="w-4 h-4" />
                </motion.span>
              </motion.div>
            </div>

            {/* Info */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ background: `${c}18`, color: c }}>{p.tag}</span>
                <span className="text-xs text-gray-600">{p.year}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:translate-x-1 transition-transform">{p.name}</h3>
              <p className="text-sm text-gray-500">{p.desc}</p>
            </div>
          </TiltCard>
        </Reveal>
      ))}
    </div>
  </section>
);

export default ProjectsSection;
