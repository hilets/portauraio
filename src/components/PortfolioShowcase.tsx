import { useState, useRef } from 'react';
import { Play, Pause, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import portfolioHero from '@/assets/portfolio-hero.jpg';
import portfolioBrand from '@/assets/portfolio-brand.jpg';
import portfolioLifestyle from '@/assets/portfolio-lifestyle.jpg';
import portfolioWedding from '@/assets/portfolio-wedding.jpg';
import portfolioPortrait from '@/assets/portfolio-portrait.jpg';
import beforePortfolio from '@/assets/before-portfolio.jpg';
import videoDev from '@/assets/portfolio-video-dev.mp4';
import videoPhoto from '@/assets/portfolio-video-photo.mp4';
import videoBrand from '@/assets/portfolio-video-brand.mp4';
import videoWedding from '@/assets/portfolio-video-wedding.mp4';
import videoPortrait from '@/assets/portfolio-video-portrait.mp4';
import videoUiux from '@/assets/portfolio-video-uiux.mp4';

const portfolios = [
  {
    title: 'Modern Developer',
    category: 'Web Development',
    image: portfolioHero,
    video: videoDev,
    gradient: 'from-pink-500/20 to-rose-500/20',
  },
  {
    title: 'Creative Studio',
    category: 'Brand Design',
    image: portfolioBrand,
    video: videoBrand,
    gradient: 'from-blue-500/20 to-indigo-500/20',
  },
  {
    title: 'Visual Storyteller',
    category: 'Photography',
    image: portfolioLifestyle,
    video: videoPhoto,
    gradient: 'from-purple-500/20 to-violet-500/20',
  },
  {
    title: 'Elegant Portraits',
    category: 'Portrait Photography',
    image: portfolioPortrait,
    video: videoPortrait,
    gradient: 'from-orange-500/20 to-amber-500/20',
  },
  {
    title: 'Wedding Dreams',
    category: 'Wedding Photography',
    image: portfolioWedding,
    video: videoWedding,
    gradient: 'from-teal-500/20 to-cyan-500/20',
  },
  {
    title: 'Minimalist Design',
    category: 'UI/UX Design',
    image: beforePortfolio,
    video: videoUiux,
    gradient: 'from-primary/20 to-lime-glow/20',
  },
];

const PortfolioShowcase = () => {
  const topRow = portfolios.slice(0, 3);
  const bottomRow = portfolios.slice(3);

  return (
    <section id="portfolio-examples" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="text-primary font-medium text-sm tracking-widest uppercase mb-4 block">
            Our Work
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            PORTFOLIO <span className="text-gradient">EXAMPLES</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Explore some of our stunning portfolio designs crafted for our clients.
          </p>
        </div>
      </div>

      {/* Row 1 */}
      <div className="relative mb-8 ml-4 md:ml-8 lg:mx-0">
        <div
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory justify-start lg:justify-center lg:px-16"
          style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
        >
          {topRow.map((item, index) => (
            <PortfolioCard key={`row1-${index}`} item={item} />
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div className="relative ml-8 md:ml-16 lg:mx-0">
        <div
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory justify-start lg:justify-center lg:px-16"
          style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
        >
          {bottomRow.map((item, index) => (
            <PortfolioCard key={`row2-${index}`} item={item} />
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="container-custom">
        <div className="flex flex-wrap justify-center items-center gap-8 mt-12 pt-8 border-t border-border/30">
          {[
            { value: '200+', label: 'Portfolios Delivered' },
            { value: '50+', label: 'Industries Covered' },
            { value: '100%', label: 'Client Satisfaction' },
          ].map((stat, index) => (
            <div key={index} className="text-center px-8 hover:scale-105 transition-transform duration-200">
              <div className="font-heading text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PortfolioCard = ({ item }: { item: typeof portfolios[0] }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex-shrink-0 w-[280px] md:w-[320px] snap-start">
      <div
        className="rounded-2xl bg-card border border-border/50 h-full relative overflow-hidden hover:border-primary/30 transition-colors duration-200 group cursor-pointer"
        onClick={toggleVideo}
      >
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-10`} />

        {/* Image / Video */}
        <div className="relative z-10 w-full h-[180px] md:h-[200px] overflow-hidden rounded-t-2xl">
          <img
            src={item.image}
            alt={item.title}
            className={`w-full h-full object-cover transition-all duration-500 ${isPlaying ? 'opacity-0' : 'opacity-100 group-hover:scale-105'}`}
          />
          <video
            ref={videoRef}
            src={item.video}
            loop
            muted
            playsInline
            onEnded={() => setIsPlaying(false)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />

          {/* Play/Pause overlay */}
          <AnimatePresence>
            <motion.div
              key={isPlaying ? 'pause' : 'play'}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className={`w-12 h-12 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-80 group-hover:opacity-100'}`}>
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-primary-foreground" />
                ) : (
                  <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Info */}
        <div className="relative z-10 p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-heading font-semibold text-foreground text-sm md:text-base">{item.title}</h3>
            <ExternalLink className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <p className="text-xs text-muted-foreground">{item.category}</p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioShowcase;
