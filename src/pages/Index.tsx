import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import WhyPortfolioSection from '@/components/WhyPortfolioSection';
import FeaturesSection from '@/components/FeaturesSection';
import BeforeAfterSection from '@/components/BeforeAfterSection';
import WorkflowSection from '@/components/WorkflowSection';
import ReviewsSection from '@/components/ReviewsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import ScrollToTop from '@/components/ScrollToTop';

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />
      <Header />
      <main className="relative z-10">
        <HeroSection />
        <WhyPortfolioSection />
        <BeforeAfterSection />
        <FeaturesSection />
        <WorkflowSection />
        <ReviewsSection />
        <CTASection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
