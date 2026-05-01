import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection, { type PersonalData } from '@/components/HeroSection';
import PreviewGallery from '@/components/PreviewGallery';
import TemplateFullPreview from '@/components/TemplateFullPreview';
import WhyPortfolioSection from '@/components/WhyPortfolioSection';
import FeaturesSection from '@/components/FeaturesSection';
import BeforeAfterSection from '@/components/BeforeAfterSection';
import WorkflowSection from '@/components/WorkflowSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import ScrollToTop from '@/components/ScrollToTop';

type FlowState =
  | { step: 'landing' }
  | { step: 'gallery'; data: PersonalData }
  | { step: 'preview'; data: PersonalData };

const Index = () => {
  const [flow, setFlow] = useState<FlowState>({ step: 'landing' });

  const handleCreatePreview = (data: PersonalData) => {
    setFlow({ step: 'gallery', data });
    setTimeout(() => {
      document.getElementById('preview-gallery')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSelectTemplate = () => {
    if (flow.step === 'gallery') {
      setFlow({ step: 'preview', data: flow.data });
    }
  };

  const handleBackFromPreview = () => {
    if (flow.step === 'preview') {
      setFlow({ step: 'gallery', data: flow.data });
    }
  };

  const handlePayment = () => {
    alert('Stripe checkout will be integrated here. Redirecting to order page for now.');
    if (flow.step === 'preview') {
      window.location.href = `/order?name=${encodeURIComponent(flow.data.name)}`;
    }
  };

  if (flow.step === 'preview') {
    return (
      <TemplateFullPreview
        personalData={flow.data}
        onBack={handleBackFromPreview}
        onPayment={handlePayment}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />
      <Header />
      <main className="relative z-10">
        <HeroSection onCreatePreview={handleCreatePreview} />

        {flow.step === 'gallery' && (
          <div id="preview-gallery">
            <PreviewGallery
              personalData={flow.data}
              onSelectTemplate={handleSelectTemplate}
            />
          </div>
        )}

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
