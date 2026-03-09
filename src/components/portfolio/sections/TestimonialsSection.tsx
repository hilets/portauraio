import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Reveal, MagneticBtn } from '../PortfolioHelpers';

const testimonials = [
  { name: 'Sarah Chen', role: 'CEO, TechVision', text: 'Absolutely incredible work. The attention to detail and creative vision transformed our entire brand. The results exceeded all expectations.', rating: 5 },
  { name: 'James Miller', role: 'Founder, DesignLab', text: 'Working with this team was a game-changer. The portfolio they created doesn\'t just look stunning — it converts visitors into clients.', rating: 5 },
  { name: 'Emily Park', role: 'Director, Artistry Co', text: 'The level of professionalism and creativity is unmatched. Every interaction was smooth, and the final product was beyond what we imagined.', rating: 5 },
];

const TestimonialsSection = ({ color: c }: { color: string }) => {
  const [active, setActive] = useState(0);
  const next = () => setActive((p) => (p + 1) % testimonials.length);
  const prev = () => setActive((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="px-6 sm:px-12 lg:px-20 py-24 max-w-7xl mx-auto">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: `${c}90` }}>Testimonials</p>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-16">
          Client <span style={{ color: c }}>Reviews</span>
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="relative">
          {/* Main testimonial card */}
          <div
            className="rounded-3xl border p-8 sm:p-12 md:p-16 relative overflow-hidden min-h-[300px]"
            style={{ borderColor: `${c}20`, background: `linear-gradient(135deg, ${c}08, ${c}03)`, backdropFilter: 'blur(20px)' }}
          >
            {/* Decorative glow */}
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-[100px] opacity-10" style={{ background: c }} />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-[80px] opacity-10" style={{ background: c }} />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" style={{ color: c }} />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-lg sm:text-2xl md:text-3xl text-white font-medium leading-relaxed mb-10 max-w-3xl">
                  "{testimonials[active].text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold" style={{ background: `${c}20`, color: c }}>
                    {testimonials[active].name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white">{testimonials[active].name}</p>
                    <p className="text-sm text-gray-500">{testimonials[active].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="absolute bottom-8 right-8 flex gap-3">
              <MagneticBtn
                className="w-12 h-12 rounded-full border flex items-center justify-center"
                style={{ borderColor: `${c}30`, color: c }}
                onClick={prev}
              >
                <ChevronLeft className="w-5 h-5" />
              </MagneticBtn>
              <MagneticBtn
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: c, color: '#04080e' }}
                onClick={next}
              >
                <ChevronRight className="w-5 h-5" />
              </MagneticBtn>
            </div>

            {/* Dots */}
            <div className="absolute bottom-8 left-8 flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{ background: i === active ? c : `${c}30`, width: i === active ? 24 : 8 }}
                />
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default TestimonialsSection;
