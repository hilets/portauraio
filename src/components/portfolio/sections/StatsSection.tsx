import { motion } from 'framer-motion';
import { Reveal } from '../PortfolioHelpers';

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '30+', label: 'Happy Clients' },
  { value: '5+', label: 'Years Experience' },
  { value: '99%', label: 'Client Satisfaction' },
];

const StatsSection = ({ color: c }: { color: string }) => (
  <section className="px-6 sm:px-12 lg:px-20 py-20 max-w-7xl mx-auto">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.08}>
          <motion.div
            className="rounded-2xl border p-6 sm:p-8 text-center backdrop-blur-sm relative overflow-hidden group"
            style={{ borderColor: `${c}20`, background: `${c}06` }}
            whileHover={{ borderColor: `${c}50`, y: -4 }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at center, ${c}12, transparent)` }} />
            <motion.p
              className="text-4xl sm:text-5xl font-black mb-2 relative"
              style={{ color: c }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', delay: 0.1 + i * 0.08 }}
              viewport={{ once: true }}
            >
              {s.value}
            </motion.p>
            <p className="text-xs text-gray-500 uppercase tracking-widest relative">{s.label}</p>
          </motion.div>
        </Reveal>
      ))}
    </div>
  </section>
);

export default StatsSection;
