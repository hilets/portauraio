import { motion } from 'framer-motion';
import { Sparkles, Check, MessageCircle, Palette, Code2, Zap, Crown, Rocket, Shield, Headphones } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const FB_URL = 'https://facebook.com/portaura';
const WA_URL = 'https://wa.me/8801000000000';
const LI_URL = 'https://linkedin.com/company/portaura';

const features = [
  { icon: Palette, title: 'Bespoke Visual Identity', desc: 'A one-of-a-kind design system built around your brand — typography, color, motion, the works.' },
  { icon: Code2, title: 'Hand-Crafted Code', desc: 'Pixel-perfect, blazing fast, fully responsive — written by senior engineers, not templates.' },
  { icon: Zap, title: 'Premium Animations', desc: 'Cinematic scroll experiences, micro-interactions, and 3D touches that make jaws drop.' },
  { icon: Crown, title: 'Unlimited Revisions', desc: 'We iterate with you until every pixel feels right. No revision caps, no rush.' },
  { icon: Rocket, title: 'Launch & Hosting Setup', desc: 'Custom domain, lightning-fast hosting, SEO, analytics — all configured for you.' },
  { icon: Shield, title: 'Lifetime Source Code', desc: 'You own everything. Full source code, design files, and assets — yours forever.' },
];

const included = [
  'Strategy & discovery call (60 min)',
  'Custom brand-aligned design system',
  'Up to 8 fully bespoke pages/sections',
  'Premium animations & 3D elements',
  'Mobile, tablet & desktop perfection',
  'On-page SEO + analytics setup',
  'Custom domain + hosting setup',
  'Unlimited design revisions',
  '30 days post-launch support',
  'Full source code ownership',
];

const process = [
  { step: '01', title: 'Reach Out', desc: 'Message us on Facebook, WhatsApp or LinkedIn. We reply within hours.' },
  { step: '02', title: 'Discovery Call', desc: 'A free 60-minute call to understand your story, goals & vision.' },
  { step: '03', title: 'Custom Proposal', desc: 'You receive a tailored proposal — scope, timeline, mockups direction.' },
  { step: '04', title: 'Design & Build', desc: 'We craft your portfolio over 2–4 weeks with weekly progress reviews.' },
  { step: '05', title: 'Launch', desc: 'We deploy, polish, and hand over the keys. Your brand is now live.' },
];

const faqs = [
  { q: 'Why is there no instant payment?', a: 'A custom portfolio is a creative partnership. We talk first to make sure we are the right fit, scope your vision properly, and only then accept the project. No surprises, no pressure.' },
  { q: 'What does the $1200 cover?', a: 'Everything listed in "What\u2019s Included" — design, development, animations, hosting setup, and unlimited revisions until launch. There are no hidden fees.' },
  { q: 'How long does it take?', a: 'Most custom portfolios ship within 2 to 4 weeks from kickoff, depending on scope and how quickly you provide feedback.' },
  { q: 'Can I request anything?', a: 'Yes. Custom 3D scenes, interactive case studies, multilingual support, blog, CMS — if you can dream it, we will build it.' },
];

const CustomPortfolioDesign = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <Header />
      <main className="relative z-10 pt-32 md:pt-44 pb-20">
        {/* Hero */}
        <section className="px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8"
            >
              <Crown className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-primary">Custom Portfolio Design • Made for the 1%</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            >
              A Portfolio as Unique
              <br />
              as <span className="text-gradient">Your Story.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              No templates. No limits. A fully bespoke portfolio designed and engineered by our senior team — built around your brand, your goals, your vision.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex flex-col items-center gap-2 mb-10"
            >
              <div className="flex items-baseline gap-2">
                <span className="text-6xl sm:text-7xl font-heading font-black text-foreground">$1,200</span>
                <span className="text-base text-muted-foreground">USD</span>
              </div>
              <span className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">One-time • Everything included</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <a href={WA_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="hero" size="xl" className="w-full sm:w-auto gap-2">
                  <MessageCircle className="w-5 h-5" /> Talk to us on WhatsApp
                </Button>
              </a>
              <a href="#contact">
                <Button variant="heroOutline" size="xl" className="w-full sm:w-auto">
                  See all contact options
                </Button>
              </a>
            </motion.div>

            <p className="mt-6 text-xs text-muted-foreground/60">
              No instant payment. We chat first, scope your project, then begin.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="px-4 sm:px-6 md:px-10 lg:px-16 mt-32">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                What makes this <span className="text-gradient">different</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                You are not getting a template with your name on it. You are getting a senior design + engineering team for the price of one freelancer.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm p-6 hover:border-primary/40 hover:bg-card/60 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-bold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Included */}
        <section className="px-4 sm:px-6 md:px-10 lg:px-16 mt-32">
          <div className="max-w-5xl mx-auto rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-card/40 to-primary/5 backdrop-blur-sm p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-medium text-primary">Everything included</span>
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                  One price. Zero surprises.
                </h2>
                <p className="text-muted-foreground mb-6">
                  $1,200 covers strategy, design, development, launch and 30 days of support. No upsells, no add-ons, no nasty invoices.
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-heading font-black">$1,200</span>
                  <span className="text-sm text-muted-foreground">USD • one-time</span>
                </div>
              </div>
              <ul className="space-y-3">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </span>
                    <span className="text-sm text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="px-4 sm:px-6 md:px-10 lg:px-16 mt-32">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                How it <span className="text-gradient">works</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A calm, collaborative process designed for busy creators and founders.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {process.map((p, i) => (
                <motion.div
                  key={p.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border border-border/50 bg-card/40 p-5"
                >
                  <span className="text-xs font-mono text-primary">{p.step}</span>
                  <h3 className="font-heading text-lg font-bold mt-2 mb-2">{p.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="px-4 sm:px-6 md:px-10 lg:px-16 mt-32 scroll-mt-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-6">
              <Headphones className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">Let's talk</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Reach out — we'll handle the rest.
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10">
              Pick the channel you prefer. We typically reply within a few hours and book your discovery call the same day.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <a
                href={FB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-border/50 bg-card/40 hover:bg-card/60 hover:border-primary/40 backdrop-blur-sm p-6 flex flex-col items-center gap-3 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-[#1877F2]/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#1877F2]"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
                </div>
                <span className="font-semibold text-sm">Facebook</span>
                <span className="text-xs text-muted-foreground">Message us</span>
              </a>

              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-border/50 bg-card/40 hover:bg-card/60 hover:border-primary/40 backdrop-blur-sm p-6 flex flex-col items-center gap-3 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-[#25D366]/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#25D366]"><path d="M20.52 3.48A11.94 11.94 0 0 0 12.06 0C5.5 0 .15 5.34.15 11.91c0 2.1.55 4.15 1.6 5.96L0 24l6.32-1.66a11.9 11.9 0 0 0 5.74 1.46h.01c6.56 0 11.91-5.34 11.91-11.91 0-3.18-1.24-6.17-3.46-8.41zM12.07 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.75.98 1-3.65-.23-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.46 4.45-9.91 9.92-9.91 2.65 0 5.13 1.03 7 2.9a9.85 9.85 0 0 1 2.9 7c-.01 5.47-4.46 9.9-9.92 9.9zm5.43-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01a1.1 1.1 0 0 0-.8.37c-.27.3-1.05 1.02-1.05 2.49s1.07 2.89 1.22 3.09c.15.2 2.11 3.22 5.11 4.51.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z"/></svg>
                </div>
                <span className="font-semibold text-sm">WhatsApp</span>
                <span className="text-xs text-muted-foreground">Chat now</span>
              </a>

              <a
                href={LI_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-border/50 bg-card/40 hover:bg-card/60 hover:border-primary/40 backdrop-blur-sm p-6 flex flex-col items-center gap-3 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-[#0A66C2]/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#0A66C2]"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.65-1.85 3.39-1.85 3.62 0 4.29 2.38 4.29 5.48v6.26zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45z"/></svg>
                </div>
                <span className="font-semibold text-sm">LinkedIn</span>
                <span className="text-xs text-muted-foreground">Connect</span>
              </a>
            </div>

            <p className="mt-8 text-xs text-muted-foreground/60">
              No payment processed online. We invoice you after the discovery call & proposal.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 sm:px-6 md:px-10 lg:px-16 mt-32">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-center mb-10">
              Common <span className="text-gradient">questions</span>
            </h2>
            <div className="space-y-3">
              {faqs.map((f) => (
                <details key={f.q} className="group rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm p-5">
                  <summary className="cursor-pointer font-semibold flex items-center justify-between gap-4">
                    {f.q}
                    <span className="text-primary transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CustomPortfolioDesign;
