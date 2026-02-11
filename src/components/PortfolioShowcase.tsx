import { ExternalLink } from 'lucide-react';
import portfolioHero from '@/assets/portfolio-hero.jpg';
import portfolioBrand from '@/assets/portfolio-brand.jpg';
import portfolioLifestyle from '@/assets/portfolio-lifestyle.jpg';
import portfolioWedding from '@/assets/portfolio-wedding.jpg';
import portfolioPortrait from '@/assets/portfolio-portrait.jpg';
import beforePortfolio from '@/assets/before-portfolio.jpg';

const portfolios = [
  {
    title: 'Modern Developer',
    category: 'Web Development',
    image: portfolioHero,
    gradient: 'from-pink-500/20 to-rose-500/20',
  },
  {
    title: 'Creative Studio',
    category: 'Brand Design',
    image: portfolioBrand,
    gradient: 'from-blue-500/20 to-indigo-500/20',
  },
  {
    title: 'Visual Storyteller',
    category: 'Photography',
    image: portfolioLifestyle,
    gradient: 'from-purple-500/20 to-violet-500/20',
  },
  {
    title: 'Elegant Portraits',
    category: 'Portrait Photography',
    image: portfolioPortrait,
    gradient: 'from-orange-500/20 to-amber-500/20',
  },
  {
    title: 'Wedding Dreams',
    category: 'Wedding Photography',
    image: portfolioWedding,
    gradient: 'from-teal-500/20 to-cyan-500/20',
  },
  {
    title: 'Minimalist Design',
    category: 'UI/UX Design',
    image: beforePortfolio,
    gradient: 'from-primary/20 to-lime-glow/20',
  },
];

const PortfolioShowcase = () => {
  const topRow = portfolios.slice(0, 3);
  const bottomRow = portfolios.slice(3);

  return (
    <section id="portfolio-examples" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
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
            <div
              key={index}
              className="text-center px-8 hover:scale-105 transition-transform duration-200"
            >
              <div className="font-heading text-2xl md:text-3xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PortfolioCard = ({ item }: { item: typeof portfolios[0] }) => (
  <div className="flex-shrink-0 w-[280px] md:w-[320px] snap-start">
    <div className="rounded-2xl bg-card border border-border/50 h-full relative overflow-hidden hover:border-primary/30 transition-colors duration-200 group">
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-10`} />

      {/* Image */}
      <div className="relative z-10 w-full h-[180px] md:h-[200px] overflow-hidden rounded-t-2xl">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
      </div>

      {/* Info */}
      <div className="relative z-10 p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-heading font-semibold text-foreground text-sm md:text-base">
            {item.title}
          </h3>
          <ExternalLink className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <p className="text-xs text-muted-foreground">{item.category}</p>
      </div>
    </div>
  </div>
);

export default PortfolioShowcase;
