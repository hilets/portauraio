import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowUpRight, ArrowRight, ArrowUp, Mail, Phone, MapPin, Star } from 'lucide-react';
import { Cursor, ScrollBar, BackToTop, MagneticBtn, getSocialIcon, getFontFamily } from './PortfolioHelpers';

/* ---- Animated text reveal ---- */
const TextReveal = ({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const words = text.split(' ');
  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', rotate: 3 }}
            animate={isInView ? { y: 0, rotate: 0 } : {}}
            transition={{ duration: 0.6, delay: delay + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

/* ---- Horizontal line animation ---- */
const AnimatedLine = ({ color, className = '' }: { color: string; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        className="h-px w-full"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: color, transformOrigin: 'left' }}
      />
    </div>
  );
};

/* ---- Stagger container ---- */
const Stagger = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
    >
      {children}
    </motion.div>
  );
};

const StaggerItem = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    className={className}
    variants={{
      hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
      visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    }}
  >
    {children}
  </motion.div>
);

interface QuantumProps {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  socialLinks: { platform: string; url: string }[];
  primaryColor: string;
  font: string;
}

/* ================================================================
   FULL PORTFOLIO
   ================================================================ */
export const FullQuantum = (props: QuantumProps) => {
  const { name, title, bio, email, phone, socialLinks, primaryColor: c, font } = props;
  const fontFamily = getFontFamily(font);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const projects = [
    { name: 'Nexus Brand Identity', category: 'Branding · Strategy', year: '2024', desc: 'Complete brand overhaul for a tech-forward company' },
    { name: 'Velocity Dashboard', category: 'UI/UX · Development', year: '2024', desc: 'Real-time analytics platform with 3D visualizations' },
    { name: 'Aurora Mobile App', category: 'Mobile · Design', year: '2023', desc: 'Award-winning wellness app with immersive experience' },
    { name: 'Horizon E-Commerce', category: 'Web · Full Stack', year: '2023', desc: 'Luxury fashion platform with AR try-on features' },
  ];

  const experience = [
    { role: 'Lead Creative Director', company: 'Studio Alpha', period: '2022 — Present', desc: 'Leading a team of 12 designers and developers' },
    { role: 'Senior Designer', company: 'Digital Labs', period: '2020 — 2022', desc: 'Crafted digital experiences for Fortune 500 clients' },
    { role: 'UI/UX Designer', company: 'Creative Agency', period: '2018 — 2020', desc: 'Designed award-winning web and mobile applications' },
  ];

  const testimonials = [
    { text: "Working with them was transformative. They don't just design — they craft experiences that elevate brands to an entirely new level.", author: 'Sarah Chen', role: 'CEO, TechVentures' },
    { text: 'The attention to detail is unparalleled. Every pixel, every interaction has been meticulously considered.', author: 'Marcus Webb', role: 'Founder, Horizon Labs' },
    { text: 'They brought a creative vision we didn\'t know we needed. The results exceeded every expectation.', author: 'Elena Rodriguez', role: 'Creative Director, Artisan Co.' },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#080808', color: '#e0e0e0', fontFamily, cursor: 'none' }}>
      <Cursor color={c} />
      <ScrollBar color={c} />
      <BackToTop color={c} />

      {/* ---- Navigation ---- */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ backdropFilter: 'blur(20px)', background: '#08080880' }}
      >
        <div className="flex items-center gap-3">
          <motion.div className="w-3 h-3 rounded-full" style={{ background: c }}
            animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 3 }} />
          <span className="text-sm font-bold tracking-[0.2em] uppercase">{name ? name.split(' ')[0] : 'Studio'}</span>
        </div>
        <div className="hidden md:flex items-center gap-10">
          {['About', 'Work', 'Experience', 'Contact'].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-xs uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors relative group"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300" style={{ background: c }} />
            </motion.a>
          ))}
        </div>
        <MagneticBtn
          className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
          style={{ background: c, color: '#080808' }}
        >
          Hire Me
        </MagneticBtn>
      </motion.nav>

      {/* ---- Hero ---- */}
      <motion.section ref={heroRef} className="relative min-h-screen flex items-center" style={{ opacity: heroOpacity, scale: heroScale }}>
        {/* Background grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(${c}40 1px, transparent 1px), linear-gradient(90deg, ${c}40 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 pt-32 pb-20">
          <motion.p
            className="text-xs uppercase tracking-[0.4em] mb-8"
            style={{ color: c }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Portfolio / 2026
          </motion.p>

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.9] mb-8 tracking-tight">
            <TextReveal text={name || 'Your Name'} delay={0.6} />
          </h1>

          <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
            <motion.div className="max-w-lg"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }}>
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-2">
                {title || 'Creative Professional'}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {bio || 'Crafting exceptional digital experiences that push the boundaries of design and technology.'}
              </p>
            </motion.div>

            <motion.div className="flex gap-4"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
              <MagneticBtn
                className="px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider"
                style={{ background: c, color: '#080808' }}
              >
                View Work <ArrowRight className="inline w-4 h-4 ml-2" />
              </MagneticBtn>
              <MagneticBtn
                className="px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider border"
                style={{ borderColor: `${c}40`, color: c }}
              >
                Contact
              </MagneticBtn>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-600">Scroll</span>
            <motion.div className="w-px h-12" style={{ background: `linear-gradient(180deg, ${c}, transparent)` }}
              animate={{ scaleY: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }} />
          </motion.div>
        </div>
      </motion.section>

      {/* ---- About ---- */}
      <section id="about" className="py-32 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
            <div>
              <motion.p className="text-xs uppercase tracking-[0.4em] mb-6" style={{ color: c }}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                01 — About
              </motion.p>
              <h2 className="text-4xl md:text-5xl font-black leading-[1.1] mb-8">
                <TextReveal text="Designing the future, one pixel at a time." />
              </h2>
              <AnimatedLine color={c} className="mb-8" />
              <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
                <TextReveal text={bio || 'With over a decade of experience in digital design and development, I create immersive experiences that captivate and convert. My approach combines strategic thinking with creative execution.'} delay={0.2} />
              </div>
            </div>

            <Stagger className="space-y-4 pt-4">
              {[
                { label: 'Design Strategy', value: 98 },
                { label: 'UI/UX Design', value: 95 },
                { label: 'Development', value: 90 },
                { label: 'Brand Identity', value: 92 },
              ].map(skill => (
                <StaggerItem key={skill.label}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{skill.label}</span>
                    <span className="text-xs font-mono" style={{ color: c }}>{skill.value}%</span>
                  </div>
                  <div className="h-px w-full bg-gray-800 overflow-hidden rounded-full">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${c}, ${c}60)` }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </StaggerItem>
              ))}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                {[{ v: '50+', l: 'Projects' }, { v: '8+', l: 'Years' }, { v: '30+', l: 'Clients' }].map((s, i) => (
                  <StaggerItem key={i}>
                    <div className="text-center py-4 rounded-xl border" style={{ borderColor: `${c}15` }}>
                      <motion.p className="text-2xl font-black" style={{ color: c }}
                        initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                        transition={{ type: 'spring', delay: 0.5 + i * 0.1 }}>
                        {s.v}
                      </motion.p>
                      <p className="text-[10px] text-gray-600 uppercase tracking-wider mt-1">{s.l}</p>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </Stagger>
          </div>
        </div>
      </section>

      {/* ---- Projects ---- */}
      <section id="work" className="py-32 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.p className="text-xs uppercase tracking-[0.4em] mb-6" style={{ color: c }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            02 — Selected Work
          </motion.p>
          <h2 className="text-4xl md:text-5xl font-black mb-16">
            <TextReveal text="Projects that speak louder than words." />
          </h2>

          <div className="space-y-2">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                className="group relative py-8 md:py-12 border-t cursor-pointer"
                style={{ borderColor: `${c}10` }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 20 }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-xs font-mono text-gray-600">0{i + 1}</span>
                      <h3 className="text-2xl md:text-3xl font-bold group-hover:text-white transition-colors text-gray-300">
                        {project.name}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 pl-10">{project.desc}</p>
                  </div>
                  <div className="flex items-center gap-6 pl-10 md:pl-0">
                    <span className="text-xs uppercase tracking-wider text-gray-600">{project.category}</span>
                    <span className="text-xs font-mono" style={{ color: `${c}80` }}>{project.year}</span>
                    <motion.div
                      className="w-10 h-10 rounded-full border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ borderColor: c, color: c }}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>

                {/* Hover accent line */}
                <motion.div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-700"
                  style={{ background: `linear-gradient(90deg, ${c}, transparent)` }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Experience ---- */}
      <section id="experience" className="py-32 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.p className="text-xs uppercase tracking-[0.4em] mb-6" style={{ color: c }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            03 — Experience
          </motion.p>
          <h2 className="text-4xl md:text-5xl font-black mb-16">
            <TextReveal text="A journey of creative evolution." />
          </h2>

          <Stagger className="space-y-0">
            {experience.map((exp, i) => (
              <StaggerItem key={i}>
                <div className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-8 py-8 border-t" style={{ borderColor: `${c}10` }}>
                  <div>
                    <p className="text-xs font-mono" style={{ color: c }}>{exp.period}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                    <p className="text-sm text-gray-500 mb-2">{exp.company}</p>
                    <p className="text-sm text-gray-600">{exp.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- Testimonials ---- */}
      <section className="py-32 px-8 md:px-16" style={{ background: `linear-gradient(180deg, transparent, ${c}05, transparent)` }}>
        <div className="max-w-7xl mx-auto">
          <motion.p className="text-xs uppercase tracking-[0.4em] mb-6" style={{ color: c }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            04 — Testimonials
          </motion.p>
          <h2 className="text-4xl md:text-5xl font-black mb-16">
            <TextReveal text="Words from collaborators." />
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="rounded-2xl border p-8 relative overflow-hidden group"
                style={{ borderColor: `${c}15`, background: `#0e0e0e` }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute top-0 left-0 w-full h-px opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(90deg, transparent, ${c}, transparent)` }} />
                <Quote className="w-6 h-6 mb-4 opacity-20" style={{ color: c }} />
                <p className="text-sm text-gray-400 leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: `${c}20`, color: c }}>
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.author}</p>
                    <p className="text-xs text-gray-600">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Contact ---- */}
      <section id="contact" className="py-32 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <motion.p className="text-xs uppercase tracking-[0.4em] mb-6" style={{ color: c }}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                05 — Contact
              </motion.p>
              <h2 className="text-4xl md:text-6xl font-black leading-[1.1] mb-8">
                <TextReveal text="Let's create something extraordinary." />
              </h2>
              <AnimatedLine color={c} className="mb-8" />
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Ready to bring your vision to life? Let's discuss your next project.
              </p>

              <div className="space-y-4">
                {email && (
                  <motion.a href={`mailto:${email}`}
                    className="flex items-center gap-4 group"
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                    <div className="w-10 h-10 rounded-full border flex items-center justify-center group-hover:scale-110 transition-transform"
                      style={{ borderColor: `${c}30`, color: c }}>
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{email}</span>
                  </motion.a>
                )}
                {phone && (
                  <motion.a href={`tel:${phone}`}
                    className="flex items-center gap-4 group"
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: 0.1 }}>
                    <div className="w-10 h-10 rounded-full border flex items-center justify-center group-hover:scale-110 transition-transform"
                      style={{ borderColor: `${c}30`, color: c }}>
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{phone}</span>
                  </motion.a>
                )}
              </div>

              {/* Social links */}
              <div className="flex gap-3 mt-8">
                {(socialLinks.filter(l => l.url).length > 0
                  ? socialLinks.filter(l => l.url)
                  : [{ platform: 'GitHub', url: '#' }, { platform: 'LinkedIn', url: '#' }, { platform: 'Twitter', url: '#' }]
                ).map((link, i) => {
                  const Icon = getSocialIcon(link.platform);
                  return (
                    <motion.a key={i} href={link.url || '#'} target="_blank" rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full border flex items-center justify-center hover:scale-110 transition-all"
                      style={{ borderColor: `${c}20`, color: c }}
                      whileHover={{ borderColor: c }}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.05 }}>
                      <Icon className="w-4 h-4" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Contact form */}
            <motion.div
              className="rounded-2xl border p-8"
              style={{ borderColor: `${c}15`, background: '#0e0e0e' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-5">
                {[
                  { label: 'Name', type: 'text', placeholder: 'Your name' },
                  { label: 'Email', type: 'email', placeholder: 'your@email.com' },
                  { label: 'Subject', type: 'text', placeholder: 'Project inquiry' },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="text-xs uppercase tracking-wider text-gray-600 mb-2 block">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full bg-transparent border-b py-3 text-sm text-white placeholder-gray-700 focus:outline-none transition-colors"
                      style={{ borderColor: `${c}20` }}
                      onFocus={(e) => (e.target.style.borderColor = c)}
                      onBlur={(e) => (e.target.style.borderColor = `${c}20`)}
                    />
                  </div>
                ))}
                <div>
                  <label className="text-xs uppercase tracking-wider text-gray-600 mb-2 block">Message</label>
                  <textarea
                    placeholder="Tell me about your project..."
                    rows={4}
                    className="w-full bg-transparent border-b py-3 text-sm text-white placeholder-gray-700 focus:outline-none resize-none transition-colors"
                    style={{ borderColor: `${c}20` }}
                    onFocus={(e) => (e.target.style.borderColor = c)}
                    onBlur={(e) => (e.target.style.borderColor = `${c}20`)}
                  />
                </div>
                <MagneticBtn
                  className="w-full py-4 rounded-full text-sm font-bold uppercase tracking-wider mt-2"
                  style={{ background: c, color: '#080808' }}
                >
                  Send Message <ArrowRight className="inline w-4 h-4 ml-2" />
                </MagneticBtn>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---- Footer ---- */}
      <footer className="py-12 px-8 md:px-16 border-t" style={{ borderColor: `${c}10` }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">© 2026 {name || 'Portfolio'}. All rights reserved.</p>
          <p className="text-xs text-gray-700">Built with <span style={{ color: c }}>Portaura</span></p>
        </div>
      </footer>
    </div>
  );
};
