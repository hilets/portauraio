import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Camera, Code, Languages, Gamepad2, Trophy, User, Mail, Phone, MapPin,
  Instagram, Github, Linkedin, Twitter, ExternalLink,
  type LucideIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Animated skill bar component
const SkillBar = ({ name, percentage, delay, color }: { name: string; percentage: number; delay: number; color: string }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="mb-4"
  >
    <div className="flex justify-between mb-2">
      <span className="text-sm font-medium text-white/90">{name}</span>
      <motion.span 
        className="text-sm font-bold"
        style={{ color }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.5 }}
      >
        {percentage}%
      </motion.span>
    </div>
    <div className="h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
      <motion.div
        className="h-full rounded-full relative overflow-hidden"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: delay + 0.3, ease: "easeOut" }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 2, repeat: Infinity, delay: delay + 1.3 }}
        />
      </motion.div>
    </div>
  </motion.div>
);

// Circular progress for gaming skills
const CircularSkill = ({ name, percentage, icon: Icon, delay, color }: { 
  name: string; 
  percentage: number; 
  icon: React.ElementType; 
  delay: number;
  color: string;
}) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, type: "spring" }}
      whileHover={{ scale: 1.1, y: -10 }}
      className="flex flex-col items-center group cursor-pointer"
    >
      <div className="relative w-28 h-28 sm:w-32 sm:h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
          />
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: delay + 0.2, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 10px ${color})` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <Icon className="w-6 h-6 mb-1" style={{ color }} />
          <motion.span 
            className="text-lg font-bold text-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 1 }}
          >
            {percentage}%
          </motion.span>
        </div>
      </div>
      <span className="mt-3 text-sm font-medium text-white/80 group-hover:text-white transition-colors text-center">
        {name}
      </span>
    </motion.div>
  );
};

const programmingSkills = [
  { name: 'JavaScript / TypeScript', percentage: 92, color: '#f7df1e' },
  { name: 'Python', percentage: 88, color: '#3776ab' },
  { name: 'React / Next.js', percentage: 95, color: '#61dafb' },
  { name: 'Node.js', percentage: 85, color: '#339933' },
  { name: 'HTML / CSS / Tailwind', percentage: 98, color: '#38bdf8' },
  { name: 'Database (SQL / MongoDB)', percentage: 82, color: '#47a248' },
];

const creativeSkills = [
  { name: 'Photography', percentage: 90, color: '#ff6b6b' },
  { name: 'Video Editing', percentage: 85, color: '#9b59b6' },
  { name: 'Photo Editing (Lightroom)', percentage: 88, color: '#1a73e8' },
  { name: 'UI/UX Design', percentage: 80, color: '#f39c12' },
];

const languageSkills = [
  { name: 'Bengali (Native)', percentage: 100, color: '#00c853' },
  { name: 'English', percentage: 90, color: '#2196f3' },
  { name: 'Hindi', percentage: 85, color: '#ff9800' },
];

const gamingSkills = [
  { name: 'Free Fire', percentage: 95, icon: Gamepad2, color: '#ff6b35' },
  { name: 'PUBG Mobile', percentage: 88, icon: Gamepad2, color: '#f5c518' },
  { name: 'Football', percentage: 85, icon: Trophy, color: '#00e676' },
  { name: 'Cricket', percentage: 80, icon: Trophy, color: '#42a5f5' },
  { name: 'Basketball', percentage: 75, icon: Trophy, color: '#ff7043' },
  { name: 'Badminton', percentage: 82, icon: Trophy, color: '#ab47bc' },
  { name: 'Arm Wrestling', percentage: 78, icon: Trophy, color: '#ef5350' },
];

const PortfolioSkills = () => {
  const [activeSection, setActiveSection] = useState('about');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#16213e] text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/5"
      >
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <motion.span 
            className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            Portfolio
          </motion.span>
          <div className="hidden md:flex items-center gap-6">
            {['About', 'Skills', 'Gaming', 'Contact'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-white/70 hover:text-cyan-400 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: '#' },
              { icon: Linkedin, href: '#' },
              { icon: Instagram, href: '#' },
            ].map(({ icon: Icon, href }, i) => (
              <motion.a
                key={i}
                href={href}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all"
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="about" className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4 sm:px-6 relative">
        <div className="container mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center order-2 lg:order-1"
          >
            <div className="relative">
              {/* Glowing rings */}
              <motion.div 
                className="absolute -inset-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 opacity-30 blur-xl"
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div 
                className="absolute -inset-8 rounded-full border-2 border-cyan-500/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute -inset-12 rounded-full border border-purple-500/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Profile image placeholder */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-cyan-500/50 bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-32 h-32 text-white/50" />
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                className="absolute -top-4 -right-4 px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full shadow-lg shadow-cyan-500/30"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-sm font-bold">Pro Gamer</span>
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/30"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <span className="text-sm font-bold">Developer</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center lg:text-left order-1 lg:order-2"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-cyan-300">Available for work</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Your Name
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-white/70 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              A passionate developer, photographer, and competitive gamer. I create stunning digital experiences 
              and dominate in esports. Let me show you what I can do!
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-6 rounded-full text-base font-semibold shadow-lg shadow-cyan-500/25">
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Me
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="border-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 px-8 py-6 rounded-full text-base font-semibold">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View Projects
                </Button>
              </motion.div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              {[
                { value: '50+', label: 'Projects' },
                { value: '5+', label: 'Years Exp' },
                { value: '1K+', label: 'Matches Won' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="text-center p-4 rounded-2xl bg-white/5 border border-white/10"
                >
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 relative">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              My <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Skills</span>
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              A diverse set of technical and creative abilities that I've honed over the years
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Programming Skills */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
                  <Code className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">Programming</h3>
              </div>
              {programmingSkills.map((skill, index) => (
                <SkillBar key={skill.name} {...skill} delay={index * 0.1} />
              ))}
            </motion.div>

            {/* Creative Skills */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                  <Camera className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">Creative</h3>
              </div>
              {creativeSkills.map((skill, index) => (
                <SkillBar key={skill.name} {...skill} delay={index * 0.1} />
              ))}

              {/* Languages */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                    <Languages className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold">Languages</h4>
                </div>
                {languageSkills.map((skill, index) => (
                  <SkillBar key={skill.name} {...skill} delay={index * 0.1 + 0.5} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gaming Skills Section */}
      <section id="gaming" className="py-20 px-4 sm:px-6 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 mb-6"
            >
              <Gamepad2 className="w-5 h-5 text-orange-400" />
              <span className="text-orange-300 font-medium">Gaming & Sports</span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Playing <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Skills</span>
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Competitive gaming and sports abilities - I play to win!
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6 sm:gap-8 justify-items-center">
            {gamingSkills.map((skill, index) => (
              <CircularSkill key={skill.name} {...skill} delay={index * 0.1} />
            ))}
          </div>

          {/* Gaming achievements */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {[
              { label: 'Free Fire Rank', value: 'Heroic', color: '#ff6b35' },
              { label: 'PUBG Tier', value: 'Crown', color: '#f5c518' },
              { label: 'Total Matches', value: '5000+', color: '#00e676' },
              { label: 'Win Rate', value: '68%', color: '#42a5f5' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 text-center"
              >
                <div className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Let's <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Connect</span>
            </h2>
            <p className="text-white/60 mb-12">
              Want to collaborate or just say hi? Feel free to reach out!
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              {[
                { icon: Mail, label: 'Email', value: 'hello@example.com', color: '#00bcd4' },
                { icon: Phone, label: 'Phone', value: '+91 98765 43210', color: '#4caf50' },
                { icon: MapPin, label: 'Location', value: 'Kolkata, India', color: '#ff9800' },
              ].map(({ icon: Icon, label, value, color }, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
                    <Icon className="w-6 h-6" style={{ color }} />
                  </div>
                  <div className="text-sm text-white/60 mb-1">{label}</div>
                  <div className="font-medium">{value}</div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4">
              {[
                { icon: Instagram, color: '#e1306c', label: 'Instagram' },
                { icon: Github, color: '#fff', label: 'GitHub' },
                { icon: Linkedin, color: '#0077b5', label: 'LinkedIn' },
                { icon: Twitter, color: '#1da1f2', label: 'Twitter' },
              ].map(({ icon: Icon, color, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-white/30 transition-all"
                  style={{ '--hover-color': color } as React.CSSProperties}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p className="text-white/40 text-sm">
            © 2024 Portfolio. Designed with{' '}
            <span className="text-red-400">❤</span> by PortAura
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioSkills;
