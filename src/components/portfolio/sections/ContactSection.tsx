import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { Reveal, MagneticBtn, getSocialIcon } from '../PortfolioHelpers';

interface Props {
  name: string;
  email: string;
  phone: string;
  socialLinks: { platform: string; url: string }[];
  color: string;
}

const ContactSection = ({ name, email, phone, socialLinks, color: c }: Props) => {
  const [focused, setFocused] = useState<string | null>(null);

  const inputStyle = (field: string): React.CSSProperties => ({
    borderColor: focused === field ? c : `${c}20`,
    background: focused === field ? `${c}0a` : `${c}05`,
    boxShadow: focused === field ? `0 0 20px ${c}15` : 'none',
  });

  return (
    <section className="px-6 sm:px-12 lg:px-20 py-24 max-w-7xl mx-auto">
      <Reveal>
        <div className="rounded-3xl border relative overflow-hidden" style={{ borderColor: `${c}25`, background: `linear-gradient(135deg, ${c}0c, ${c}03)` }}>
          {/* Decorative */}
          <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 20% 30%, ${c}15 0%, transparent 50%), radial-gradient(circle at 80% 70%, ${c}10 0%, transparent 50%)` }} />

          <div className="relative z-10 p-8 sm:p-12 md:p-20">
            <div className="grid md:grid-cols-2 gap-12 md:gap-20">
              {/* Left: Info */}
              <div>
                <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: `${c}90` }}>Get In Touch</p>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6">
                  Let's Work<br /><span style={{ color: c }}>Together</span>
                </h2>
                <p className="text-gray-400 mb-10 text-base sm:text-lg leading-relaxed">
                  Have a project in mind? Let's create something extraordinary together.
                </p>

                {email && (
                  <MagneticBtn
                    className="flex items-center gap-3 px-6 py-4 rounded-2xl border mb-4 w-full sm:w-auto"
                    style={{ borderColor: `${c}30`, color: c, background: `${c}08` }}
                    onClick={() => window.location.href = `mailto:${email}`}
                  >
                    <Mail className="w-5 h-5" />
                    <span className="text-sm font-medium">{email}</span>
                  </MagneticBtn>
                )}
                {phone && <p className="text-gray-500 text-sm ml-1 mb-8">{phone}</p>}

                {/* Social links */}
                <div className="flex gap-3 mt-6">
                  {socialLinks.filter(l => l.url?.trim()).map((link, i) => {
                    const Icon = getSocialIcon(link.platform);
                    return (
                      <MagneticBtn
                        key={i}
                        className="w-12 h-12 rounded-xl border flex items-center justify-center backdrop-blur-sm"
                        style={{ borderColor: `${c}30`, color: c, background: `${c}08` }}
                        onClick={() => window.open(link.url, '_blank')}
                      >
                        <Icon className="w-5 h-5" />
                      </MagneticBtn>
                    );
                  })}
                </div>
              </div>

              {/* Right: Form */}
              <div className="space-y-5">
                <div>
                  <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Name</label>
                  <input
                    className="w-full rounded-xl border px-5 py-4 text-white text-sm bg-transparent outline-none transition-all duration-300 placeholder:text-gray-600"
                    style={inputStyle('name')}
                    placeholder="Your Name"
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Email</label>
                  <input
                    className="w-full rounded-xl border px-5 py-4 text-white text-sm bg-transparent outline-none transition-all duration-300 placeholder:text-gray-600"
                    style={inputStyle('email')}
                    placeholder="your@email.com"
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Message</label>
                  <textarea
                    rows={4}
                    className="w-full rounded-xl border px-5 py-4 text-white text-sm bg-transparent outline-none transition-all duration-300 resize-none placeholder:text-gray-600"
                    style={inputStyle('message')}
                    placeholder="Tell me about your project..."
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                  />
                </div>
                <MagneticBtn
                  className="w-full rounded-xl px-8 py-4 font-bold text-sm flex items-center justify-center gap-2"
                  style={{ background: c, color: '#04080e' }}
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </MagneticBtn>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Footer */}
      <Reveal delay={0.1}>
        <p className="text-center text-xs text-gray-600 mt-16">
          © {new Date().getFullYear()} {name}. Built with <span style={{ color: c }}>Portaura</span>
        </p>
      </Reveal>
    </section>
  );
};

export default ContactSection;
