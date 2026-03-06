import { useState, useRef, useEffect } from 'react';
import { Play, Pause, ExternalLink, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import portfolioHero from '@/assets/portfolio-hero.jpg';
import portfolioLifestyle from '@/assets/portfolio-lifestyle.jpg';
import portfolioWedding from '@/assets/portfolio-wedding.jpg';
import portfolioPortrait from '@/assets/portfolio-portrait.jpg';
import beforePortfolio from '@/assets/before-portfolio.jpg';
import portfolioBrand from '@/assets/portfolio-brand.jpg';
import videoPhoto from '@/assets/portfolio-video-photo.mp4';
import videoBrand from '@/assets/portfolio-video-brand.mp4';
import videoWedding from '@/assets/portfolio-video-wedding.mp4';
import videoPortrait from '@/assets/portfolio-video-portrait.mp4';
import videoUiux from '@/assets/portfolio-video-uiux.mp4';
import videoPhotographer from '@/assets/portfolio-video-photographer.mp4';
import videoSkills from '@/assets/portfolio-video-skills.mp4';
import videoDev from '@/assets/portfolio-video-dev.mp4';

const allPortfolios = [
  {
    title: 'Photographer Portfolio',
    category: 'Editorial & Wedding Photography',
    image: portfolioLifestyle,
    video: videoPhotographer,
    gradient: 'from-amber-500/20 to-orange-500/20',
    accent: 'bg-amber-500',
    link: '/portfolio-example',
  },
  {
    title: 'Personal Skills Portfolio',
    category: 'Skills & Gaming Portfolio',
    image: portfolioHero,
    video: videoSkills,
    gradient: 'from-violet-500/20 to-purple-500/20',
    accent: 'bg-violet-500',
    link: '/portfolio-skills',
  },
  {
    title: 'Visual Storyteller',
    category: 'Photography',
    image: portfolioLifestyle,
    video: videoPhoto,
    gradient: 'from-purple-500/20 to-violet-500/20',
    accent: 'bg-purple-500',
  },
  {
    title: 'Elegant Portraits',
    category: 'Portrait Photography',
    image: portfolioPortrait,
    video: videoPortrait,
    gradient: 'from-orange-500/20 to-amber-500/20',
    accent: 'bg-orange-500',
  },
  {
    title: 'Wedding Dreams',
    category: 'Wedding Photography',
    image: portfolioWedding,
    video: videoWedding,
    gradient: 'from-teal-500/20 to-cyan-500/20',
    accent: 'bg-teal-500',
  },
  {
    title: 'Minimalist Design',
    category: 'UI/UX Design',
    image: beforePortfolio,
    video: videoUiux,
    gradient: 'from-primary/20 to-lime-glow/20',
    accent: 'bg-primary',
  },
];

const PortfolioShowcase = () => {
  const topRow = allPortfolios.slice(0, 3);
  const bottomRow = allPortfolios.slice(3, 6);

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

        {/* Top row - 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          {topRow.map((item, index) => (
            <PortfolioCard key={`top-${index}`} item={item} index={index} />
          ))}
        </div>

        {/* Bottom row - 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {bottomRow.map((item, index) => (
            <PortfolioCard key={`bottom-${index}`} item={item} index={index + 3} />
          ))}
        </div>

        {/* Stats */}
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

const PortfolioCard = ({ item, index }: { item: typeof allPortfolios[0]; index: number }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const navigate = useNavigate();

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      progressInterval.current = setInterval(() => {
        if (videoRef.current) {
          const pct = (videoRef.current.currentTime / videoRef.current.duration) * 100;
          setProgress(isNaN(pct) ? 0 : pct);
        }
      }, 100);
    } else {
      if (progressInterval.current) clearInterval(progressInterval.current);
    }
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [isPlaying]);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isHovered && !isPlaying) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, [isHovered]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div
        className="rounded-2xl bg-card border border-border/50 relative overflow-hidden hover:border-primary/30 transition-all duration-300 group cursor-pointer hover:shadow-lg hover:shadow-primary/5"
        onClick={toggleVideo}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          if (isPlaying && videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
            setProgress(0);
          }
        }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

        <div className="relative z-10 w-full aspect-video overflow-hidden rounded-t-2xl">
          <div className={`absolute inset-0 bg-muted animate-pulse ${thumbnailLoaded ? 'hidden' : 'block'}`} />
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            onLoad={() => setThumbnailLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 ${isPlaying ? 'opacity-0 scale-110' : 'opacity-100 group-hover:scale-105'}`}
          />
          <video
            ref={videoRef}
            src={item.video}
            loop
            muted={isMuted}
            playsInline
            preload="metadata"
            onEnded={() => {
              setIsPlaying(false);
              setProgress(0);
            }}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent" />

          <div className="absolute top-3 left-3 z-20">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-background/70 backdrop-blur-md text-foreground border border-border/30">
              <span className={`w-1.5 h-1.5 rounded-full ${item.accent}`} />
              {item.category}
            </span>
          </div>

          <AnimatePresence>
            {isPlaying && (
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                onClick={toggleMute}
                className="absolute top-3 right-3 z-20 w-7 h-7 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center hover:bg-background/80 transition-colors"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-foreground" /> : <Volume2 className="w-3.5 h-3.5 text-foreground" />}
              </motion.button>
            )}
          </AnimatePresence>

          <div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.div
              animate={{
                scale: isHovered ? 1 : 0.8,
                opacity: isPlaying ? (isHovered ? 0.9 : 0) : (isHovered ? 1 : 0.7),
              }}
              transition={{ duration: 0.3 }}
              className="w-12 h-12 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-primary/20"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-primary-foreground" />
              ) : (
                <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
              )}
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-border/30 z-20">
            <motion.div className="h-full bg-primary" style={{ width: `${progress}%` }} transition={{ duration: 0.1 }} />
          </div>
        </div>

        <div className="relative z-10 p-4 flex items-center justify-between">
          <div>
            <h3 className="font-heading font-semibold text-foreground text-sm md:text-base">{item.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{item.category}</p>
          </div>
          {item.link && (
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                navigate(item.link!);
              }}
              className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/30 flex items-center justify-center transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-primary" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioShowcase;
