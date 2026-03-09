import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../PortfolioHelpers';

const skills = ['UI/UX Design', 'Web Development', 'Brand Strategy', 'Motion Design', 'Photography', 'Consulting', 'Mobile Apps', 'Art Direction'];

const experience = [
  { role: 'Senior Designer', company: 'Studio X', period: '2023 — Present' },
  { role: 'Lead Developer', company: 'TechCo', period: '2021 — 2023' },
  { role: 'Creative Director', company: 'Freelance', period: '2019 — 2021' },
  { role: 'Junior Designer', company: 'Agency Y', period: '2017 — 2019' },
];

const ExperienceSection = ({ color: c }: { color: string }) => (
  <section className="px-6 sm:px-12 lg:px-20 py-24 max-w-7xl mx-auto">
    {/* Skills */}
    <Reveal>
      <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: `${c}90` }}>Skills & Expertise</p>
      <h2 className="text-3xl sm:text-5xl font-black text-white mb-12">
        What I <span style={{ color: c }}>Do</span>
      </h2>
    </Reveal>

    <div className="flex flex-wrap gap-3 mb-20">
      {skills.map((skill, i) => (
        <Reveal key={skill} delay={i * 0.04}>
          <motion.span
            className="px-6 py-3 rounded-2xl border text-sm font-medium cursor-default backdrop-blur-sm"
            style={{ borderColor: `${c}30`, color: `${c}e0`, background: `${c}08` }}
            whileHover={{ scale: 1.08, background: `${c}20`, borderColor: `${c}60`, boxShadow: `0 0 20px ${c}20` }}
            transition={{ duration: 0.2 }}
          >
            {skill}
          </motion.span>
        </Reveal>
      ))}
    </div>

    {/* Experience Timeline */}
    <Reveal>
      <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: `${c}90` }}>Experience</p>
      <h2 className="text-3xl sm:text-5xl font-black text-white mb-12">
        Career <span style={{ color: c }}>Timeline</span>
      </h2>
    </Reveal>

    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px" style={{ background: `linear-gradient(to bottom, transparent, ${c}40, transparent)` }} />

      <div className="space-y-2">
        {experience.map((exp, i) => (
          <Reveal key={exp.role} delay={i * 0.08}>
            <motion.div
              className="group rounded-2xl border p-6 sm:p-8 ml-4 md:ml-16 relative overflow-hidden"
              style={{ borderColor: `${c}12`, background: `${c}04` }}
              whileHover={{ x: 8, borderColor: `${c}40` }}
              transition={{ duration: 0.25 }}
            >
              {/* Timeline dot */}
              <div className="absolute -left-[21px] md:-left-[53px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2" style={{ borderColor: c, background: '#04060b' }} />

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(135deg, ${c}08, transparent)` }} />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 relative">
                <div>
                  <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                  <p className="text-sm" style={{ color: `${c}b0` }}>{exp.company}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">{exp.period}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: c }} />
                </div>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default ExperienceSection;
