import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />
      <Header />
      <main className="relative z-10 pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-medium text-sm tracking-widest uppercase mb-4 block text-center">
              Legal
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-8 text-center">
              Terms of <span className="text-gradient">Service</span>
            </h1>
            
            <div className="prose prose-invert max-w-none space-y-8">
              <p className="text-muted-foreground text-lg">
                Last updated: January 2024
              </p>

              <section>
                <h2 className="font-heading text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing and using Portaura's services, you accept and agree to be bound by the terms and provisions of this agreement.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-bold mb-4">2. Services</h2>
                <p className="text-muted-foreground">
                  Portaura provides portfolio design, resume writing, and career consulting services. We reserve the right to modify, suspend, or discontinue any part of our services at any time.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-bold mb-4">3. Payment Terms</h2>
                <p className="text-muted-foreground">
                  Payment is required before work begins. All fees are non-refundable unless otherwise specified. We accept major credit cards and other payment methods as indicated during checkout.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-bold mb-4">4. Intellectual Property</h2>
                <p className="text-muted-foreground">
                  Upon full payment, you own the rights to your completed portfolio. However, we reserve the right to use anonymized versions of our work for promotional purposes.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-bold mb-4">5. Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  Portaura shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-bold mb-4">6. Contact</h2>
                <p className="text-muted-foreground">
                  For questions about these Terms, please contact us at legal@portaura.com.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
