import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';

const Privacy = () => {
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
              Privacy <span className="text-gradient">Policy</span>
            </h1>
            
            <div className="prose prose-invert max-w-none space-y-8">
              <p className="text-muted-foreground text-lg">
                Last updated: January 2024
              </p>

              <section>
                <h2 className="font-heading text-2xl font-bold mb-4">1. Information We Collect</h2>
                <p className="text-muted-foreground">
                  We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This may include your name, email address, phone number, and payment information.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-bold mb-4">2. How We Use Your Information</h2>
                <p className="text-muted-foreground">
                  We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and respond to your comments and questions.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-bold mb-4">3. Information Sharing</h2>
                <p className="text-muted-foreground">
                  We do not share your personal information with third parties except as described in this policy. We may share information with service providers who perform services on our behalf, or when required by law.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-bold mb-4">4. Data Security</h2>
                <p className="text-muted-foreground">
                  We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-bold mb-4">5. Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have any questions about this Privacy Policy, please contact us at privacy@portaura.com.
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

export default Privacy;
