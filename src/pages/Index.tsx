import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import WhyPortfolioSection from '@/components/WhyPortfolioSection';
import FeaturesSection from '@/components/FeaturesSection';
import BeforeAfterSection from '@/components/BeforeAfterSection';
import WorkflowSection from '@/components/WorkflowSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import ScrollToTop from '@/components/ScrollToTop';
import CustomCursor from '@/components/CustomCursor';

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <CustomCursor />
      <ParticleBackground />
      <Header />
      <main className="relative z-10">
        <HeroSection />
        <WhyPortfolioSection />
        <BeforeAfterSection />
        <FeaturesSection />
        <WorkflowSection />
        <CTASection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
