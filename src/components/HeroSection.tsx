import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, User, Briefcase, FileText, MapPin, Wrench, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface PersonalData {
  name: string;
  title: string;
  bio: string;
  location: string;
  skills: string[];
}

interface Props {
  onCreatePreview: (data: PersonalData) => void;
}

const skillSuggestions = [
  'React', 'TypeScript', 'Node.js', 'Python', 'UI/UX Design', 'Figma',
  'Next.js', 'GraphQL', 'AWS', 'Docker', 'Machine Learning', 'Flutter',
  'Java', 'Go', 'Rust', 'Swift', 'Photoshop', 'Illustration',
  'SEO', 'Marketing', 'Copywriting', 'Photography', 'Video Editing', 'Blender',
];

const HeroSection = ({ onCreatePreview }: Props) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [data, setData] = useState<PersonalData>({
    name: '',
    title: '',
    bio: '',
    location: '',
    skills: [],
  });

  const handleSubmit = () => {
    if (data.name.trim()) {
      onCreatePreview(data);
    }
  };

  const toggleSkill = (skill: string) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const addCustomSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const val = (e.target as HTMLInputElement).value.trim();
      if (val && !data.skills.includes(val)) {
        setData(prev => ({ ...prev, skills: [...prev.skills, val] }));
        (e.target as HTMLInputElement).value = '';
      }
    }
  };

  const canGoNext = data.name.trim().length > 0;
  const canSubmit = data.name.trim().length > 0;

  return (
    <section className="relative pt-32 md:pt-44 pb-20 md:pb-32 px-4 sm:px-6 md:px-10 lg:px-16">
      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-primary">Free Preview • No Sign Up Required</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-center"
        >
          Visualize Your
          <br />
          <span className="text-gradient">Personal Brand</span>
          <br />
          in 10 Seconds
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed text-center"
        >
          Tell us about yourself and see a premium portfolio built just for you — instantly.
        </motion.p>

        {/* Step indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          {[1, 2].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step === s ? 'bg-primary text-primary-foreground scale-110' : step > s ? 'bg-primary/30 text-primary' : 'bg-muted/30 text-muted-foreground'
              }`}>
                {s}
              </div>
              <span className={`text-xs font-medium hidden sm:inline ${step === s ? 'text-primary' : 'text-muted-foreground'}`}>
                {s === 1 ? 'Who You Are' : 'Your Expertise'}
              </span>
              {s === 1 && <div className="w-8 h-px bg-border/50 mx-1" />}
            </div>
          ))}
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-2xl border-2 border-border/30 bg-card/60 backdrop-blur-sm p-6 sm:p-8"
        >
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <h3 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" /> Tell Us About Yourself
                </h3>

                {/* Name */}
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">
                    Full Name <span className="text-primary text-[10px]">Required</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={data.name}
                      onChange={(e) => setData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Ibrahim Khalil"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-border/50 bg-background/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-muted-foreground/40"
                    />
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">
                    Professional Title <span className="text-muted-foreground/50 text-[10px]">Optional</span>
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={data.title}
                      onChange={(e) => setData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., Full Stack Developer, UI/UX Designer"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-border/50 bg-background/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-muted-foreground/40"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">
                    Short Bio <span className="text-muted-foreground/50 text-[10px]">Optional</span>
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3.5 top-3 w-4 h-4 text-muted-foreground" />
                    <textarea
                      value={data.bio}
                      onChange={(e) => setData(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell the world about yourself in 2-3 sentences..."
                      rows={3}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-border/50 bg-background/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none placeholder:text-muted-foreground/40"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">
                    Location <span className="text-muted-foreground/50 text-[10px]">Optional</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={data.location}
                      onChange={(e) => setData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="e.g., Dhaka, Bangladesh"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-border/50 bg-background/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-muted-foreground/40"
                    />
                  </div>
                </div>

                {/* Next Button */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="hero"
                    size="xl"
                    className="w-full group text-base py-5"
                    onClick={() => setStep(2)}
                    disabled={!canGoNext}
                  >
                    <span className="flex items-center gap-2">
                      Next: Your Skills
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </span>
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-primary" /> Your Skills & Expertise
                  </h3>
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                </div>

                <p className="text-xs text-muted-foreground">
                  Pick your skills or type custom ones. These will be featured on your portfolio.
                </p>

                {/* Skill chips */}
                <div className="flex flex-wrap gap-2">
                  {skillSuggestions.map(skill => {
                    const isSelected = data.skills.includes(skill);
                    return (
                      <motion.button
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                          isSelected
                            ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20'
                            : 'bg-muted/20 text-muted-foreground border-border/50 hover:border-primary/40 hover:text-foreground'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isSelected && '✓ '}{skill}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Custom skill input */}
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Add Custom Skill (press Enter)</label>
                  <input
                    type="text"
                    onKeyDown={addCustomSkill}
                    placeholder="e.g., Three.js, Premiere Pro..."
                    className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-muted-foreground/40"
                  />
                </div>

                {/* Selected skills display */}
                {data.skills.length > 0 && (
                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-3">
                    <p className="text-[10px] text-primary font-medium mb-2 uppercase tracking-wider">Selected ({data.skills.length})</p>
                    <div className="flex flex-wrap gap-1.5">
                      {data.skills.map(skill => (
                        <span key={skill} className="px-2.5 py-1 rounded-full bg-primary/20 text-primary text-[11px] font-medium flex items-center gap-1">
                          {skill}
                          <button onClick={() => toggleSkill(skill)} className="hover:text-primary-foreground">×</button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="hero"
                    size="xl"
                    className="w-full group text-base py-5"
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Create My Free Preview
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </span>
                  </Button>
                </motion.div>

                <p className="text-xs text-muted-foreground/60 text-center">
                  No sign up • No credit card • See results instantly
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
