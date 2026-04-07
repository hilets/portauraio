import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
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
  | { step: 'gallery'; name: string }
  | { step: 'preview'; name: string; templateId: 'aura-infinity' | 'quantum-studio' };

const Index = () => {
  const [flow, setFlow] = useState<FlowState>({ step: 'landing' });

  const handleCreatePreview = (name: string) => {
    setFlow({ step: 'gallery', name });
    // Scroll to gallery after a tick
    setTimeout(() => {
      document.getElementById('preview-gallery')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSelectTemplate = (templateId: 'aura-infinity' | 'quantum-studio') => {
    if (flow.step === 'gallery') {
      setFlow({ step: 'preview', name: flow.name, templateId });
    }
  };

  const handleBackFromPreview = () => {
    if (flow.step === 'preview') {
      setFlow({ step: 'gallery', name: flow.name });
    }
  };

  const handlePayment = () => {
    // TODO: Integrate Stripe Express Checkout
    alert('Stripe checkout will be integrated here. Redirecting to order page for now.');
    if (flow.step === 'preview') {
      window.location.href = `/order?name=${encodeURIComponent(flow.name)}&template=${flow.templateId}`;
    }
  };

  // Full-screen template preview mode
  if (flow.step === 'preview') {
    return (
      <TemplateFullPreview
        userName={flow.name}
        templateId={flow.templateId}
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

        {/* Preview Gallery - shown after name entry */}
        {flow.step === 'gallery' && (
          <div id="preview-gallery">
            <PreviewGallery
              userName={flow.name}
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
