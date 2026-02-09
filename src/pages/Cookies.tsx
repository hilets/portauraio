import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';

const Cookies = () => {
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
              Cookie <span className="text-gradient">Policy</span>
            </h1>
            
            <div className="prose prose-invert max-w-none space-y-8">
              <p className="text-muted-foreground text-lg">
                Last updated: January 2024
              </p>

              <section>
                <h2 className="font-heading text-2xl font-bold mb-4">What Are Cookies?</h2>
                <p className="text-muted-foreground">
                  Cookies are small text files that are stored on your computer or mobile device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-bold mb-4">Types of Cookies We Use</h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-card/50 border border-border/50">
                    <h3 className="font-heading text-lg font-bold text-primary mb-2">Essential Cookies</h3>
                    <p className="text-muted-foreground text-sm">Required for the website to function properly. Cannot be disabled.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-card/50 border border-border/50">
                    <h3 className="font-heading text-lg font-bold text-primary mb-2">Analytics Cookies</h3>
                    <p className="text-muted-foreground text-sm">Help us understand how visitors interact with our website.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-card/50 border border-border/50">
                    <h3 className="font-heading text-lg font-bold text-primary mb-2">Marketing Cookies</h3>
                    <p className="text-muted-foreground text-sm">Used to deliver relevant advertisements and track their effectiveness.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-bold mb-4">Managing Cookies</h2>
                <p className="text-muted-foreground">
                  You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-bold mb-4">Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have questions about our Cookie Policy, please contact us at privacy@portaura.com.
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

export default Cookies;
