import { Cursor, ScrollBar, BackToTop, Reveal, MagneticBtn, TiltCard, GlowDivider, getFontFamily, getSocialIcon } from './PortfolioHelpers';
import HeroSection from './sections/HeroSection';
import StatsSection from './sections/StatsSection';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import ExperienceSection from './sections/ExperienceSection';
import TestimonialsSection from './sections/TestimonialsSection';
import ContactSection from './sections/ContactSection';
import { FullQuantum } from './QuantumRenderer';

export interface PortfolioProps {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  socialLinks: { platform: string; url: string }[];
  primaryColor: string;
  font: string;
  template?: 'aura-infinity' | 'quantum-studio';
}

/* ================================================================
   AURA INFINITY — FULL
   ================================================================ */
const FullAura = (props: PortfolioProps) => {
  const { name, title, bio, email, phone, socialLinks, primaryColor: c, font } = props;
  const fontFamily = getFontFamily(font);
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(145deg, #04060b 0%, #071120 50%, #04060c 100%)', fontFamily, cursor: 'none' }}>
      <Cursor color={c} />
      <ScrollBar color={c} />
      <BackToTop color={c} />
      <HeroSection name={name} title={title} bio={bio} color={c} email={email} />
      <GlowDivider color={c} />
      <StatsSection color={c} />
      <GlowDivider color={c} />
      <AboutSection bio={bio} color={c} />
      <GlowDivider color={c} />
      <ProjectsSection color={c} />
      <GlowDivider color={c} />
      <ExperienceSection color={c} />
      <GlowDivider color={c} />
      <TestimonialsSection color={c} />
      <GlowDivider color={c} />
      <ContactSection name={name} email={email} phone={phone} socialLinks={socialLinks} color={c} />
    </div>
  );
};

/* ================================================================
   MAIN EXPORT
   ================================================================ */
const PortfolioRenderer = (props: PortfolioProps) => {
  const template = props.template || 'aura-infinity';

  if (template === 'quantum-studio') {
    return <FullQuantum {...props} />;
  }

  return <FullAura {...props} />;
};

export default PortfolioRenderer;
