import { motion } from 'framer-motion';
import { ArrowRight, Eye, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import CustomCursor from '@/components/CustomCursor';
import ScrollToTop from '@/components/ScrollToTop';

import templatePhotographer from '@/assets/template-photographer.jpg';
import templateUiux from '@/assets/template-uiux.jpg';
import templateDeveloper from '@/assets/template-developer.jpg';
import templateArtist from '@/assets/template-artist.jpg';
import templateVideographer from '@/assets/template-videographer.jpg';
import templateModel from '@/assets/template-model.jpg';

const templates = [
  {
    id: 'portfolio-photographer',
    name: 'Photographer Portfolio',
    category: 'Photography',
    price: 109,
    image: templatePhotographer,
    description: 'Dark cinematic portfolio with full-screen galleries, lightbox & client proofing.',
    rating: 4.9,
    sales: 230,
  },
  {
    id: 'portfolio-uiux',
    name: 'UI/UX Designer Portfolio',
    category: 'Design',
    price: 119,
    image: templateUiux,
    description: 'Modern case study layout with interactive prototypes & gradient accents.',
    rating: 4.8,
    sales: 185,
  },
  {
    id: 'portfolio-developer',
    name: 'Developer Portfolio',
    category: 'Development',
    price: 115,
    image: templateDeveloper,
    description: 'Futuristic dark theme with code snippets, project showcases & GitHub integration.',
    rating: 4.9,
    sales: 310,
  },
  {
    id: 'portfolio-artist',
    name: 'Creative Artist Portfolio',
    category: 'Art & Illustration',
    price: 100,
    image: templateArtist,
    description: 'Vibrant gallery portfolio with artwork showcase, exhibitions & commission form.',
    rating: 4.7,
    sales: 145,
  },
  {
    id: 'portfolio-videographer',
    name: 'Videographer Portfolio',
    category: 'Video & Film',
    price: 129,
    image: templateVideographer,
    description: 'Cinematic portfolio with video reels, showreel player & client testimonials.',
    rating: 4.8,
    sales: 198,
  },
  {
    id: 'portfolio-model',
    name: 'Model Portfolio',
    category: 'Fashion & Modeling',
    price: 105,
    image: templateModel,
    description: 'Elegant luxury portfolio with full-screen photos, comp card & booking system.',
    rating: 4.9,
    sales: 167,
  },
];

const Templates = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative">
      <CustomCursor />
      <ParticleBackground />
      <Header />
      <main className="relative z-10 pt-32 pb-20">
        <div className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/30 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-heading font-semibold tracking-wider uppercase">
                Premium Collection
              </span>
            </motion.div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
              Personal Portfolio{' '}
              <span className="text-gradient">Templates</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Handcrafted, production-ready portfolio templates designed for creatives, 
              developers & professionals. Pick your style, customize & launch.
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 mt-8">
              {[
                { label: 'Templates', value: '6+' },
                { label: 'Happy Users', value: '1.2K+' },
                { label: 'Avg Rating', value: '4.8★' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-xl font-heading font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Grid — 2 cols on mobile, 3 on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
            {templates.map((template, i) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group relative rounded-xl sm:rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_hsl(var(--primary)_/_0.15)]"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-80" />

                  {/* Price badge */}
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-heading font-bold shadow-lg">
                    ${template.price}
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-1 sm:px-2.5 rounded-full bg-background/70 backdrop-blur-md text-[10px] sm:text-xs text-foreground font-medium">
                    {template.category}
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-background/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      className="flex flex-col items-center gap-2"
                    >
                      <Button
                        variant="hero"
                        size="sm"
                        className="gap-2 text-xs sm:text-sm"
                        onClick={() => navigate(`/checkout/${template.id}`)}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Preview & Buy
                      </Button>
                    </motion.div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3 sm:p-4 lg:p-5">
                  {/* Rating & sales */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-primary text-primary" />
                    <span className="text-xs sm:text-sm font-semibold text-foreground">{template.rating}</span>
                    <span className="text-[10px] sm:text-xs text-muted-foreground">({template.sales} sales)</span>
                  </div>

                  <h3 className="font-heading text-sm sm:text-base lg:text-lg font-bold mb-1 line-clamp-1">
                    {template.name}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                    {template.description}
                  </p>

                  <Button
                    variant="hero"
                    size="sm"
                    className="w-full gap-1.5 text-xs sm:text-sm h-8 sm:h-9"
                    onClick={() => navigate(`/checkout/${template.id}`)}
                  >
                    Buy Now <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Templates;
