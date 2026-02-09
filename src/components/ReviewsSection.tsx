import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Sarah Chen',
    role: 'UX Designer',
    avatar: 'SC',
    rating: 5,
    review: 'Portaura transformed my career. Within a week of launching my new portfolio, I received 3 job offers. The design is absolutely stunning!',
    gradient: 'from-pink-500/20 to-rose-500/20',
  },
  {
    name: 'Michael Torres',
    role: 'Software Engineer',
    avatar: 'MT',
    rating: 5,
    review: 'The team understood exactly what I needed. My portfolio now perfectly showcases my projects and skills. Worth every penny!',
    gradient: 'from-blue-500/20 to-indigo-500/20',
  },
  {
    name: 'Emily Johnson',
    role: 'Marketing Manager',
    avatar: 'EJ',
    rating: 5,
    review: 'I was amazed by the quick turnaround and the quality. The animations and design details are incredible. Highly recommend!',
    gradient: 'from-purple-500/20 to-violet-500/20',
  },
  {
    name: 'David Kim',
    role: 'Product Designer',
    avatar: 'DK',
    rating: 5,
    review: 'As a designer myself, I had high expectations. Portaura exceeded all of them. The attention to detail is phenomenal.',
    gradient: 'from-orange-500/20 to-amber-500/20',
  },
  {
    name: 'Lisa Wang',
    role: 'Data Scientist',
    avatar: 'LW',
    rating: 5,
    review: 'My portfolio now tells my story in a way I never could with a traditional resume. The team was incredibly responsive and creative.',
    gradient: 'from-teal-500/20 to-cyan-500/20',
  },
  {
    name: 'James Miller',
    role: 'Frontend Developer',
    avatar: 'JM',
    rating: 5,
    review: 'The code quality is top-notch. Fast, responsive, and beautifully designed. This is exactly what I needed to stand out.',
    gradient: 'from-primary/20 to-lime-glow/20',
  },
];

const ReviewsSection = () => {
  const topRowReviews = reviews.slice(0, 3);
  const bottomRowReviews = reviews.slice(3);

  return (
    <section id="reviews" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-medium text-sm tracking-widest uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            CLIENT <span className="text-gradient">REVIEWS</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Don't just take our word for it. Here's what our clients have to say.
          </p>
        </div>
      </div>

      {/* Row 1 - Scrollable */}
      <div className="relative mb-8 ml-4 md:ml-8 lg:mx-0">
        <div 
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory justify-start lg:justify-center lg:px-16"
          style={{ 
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {topRowReviews.map((review, index) => (
            <ReviewCard key={`row1-${index}`} review={review} />
          ))}
        </div>
      </div>

      {/* Row 2 - Scrollable with more left padding */}
      <div className="relative ml-8 md:ml-16 lg:mx-0">
        <div 
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory justify-start lg:justify-center lg:px-16"
          style={{ 
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {bottomRowReviews.map((review, index) => (
            <ReviewCard key={`row2-${index}`} review={review} />
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="container-custom">
        <div className="flex flex-wrap justify-center items-center gap-8 mt-12 pt-8 border-t border-border/30">
          {[
            { value: '4.9/5', label: 'Average Rating' },
            { value: '500+', label: 'Happy Clients' },
            { value: '100%', label: 'Success Rate' },
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

const ReviewCard = ({ review }: { review: typeof reviews[0] }) => (
  <div className="flex-shrink-0 w-[280px] md:w-[320px] snap-start">
    <div className="p-5 md:p-6 rounded-2xl bg-card border border-border/50 h-full relative overflow-hidden hover:border-primary/30 transition-colors duration-200">
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${review.gradient} opacity-10`} />
      
      {/* Quote Icon */}
      <div className="relative z-10">
        <Quote className="w-8 h-8 text-primary mb-4" />
      </div>

      {/* Review Text */}
      <p className="text-foreground/90 mb-5 leading-relaxed relative z-10 text-sm md:text-base min-h-[100px]">
        "{review.review}"
      </p>

      {/* Rating */}
      <div className="flex gap-1 mb-4 relative z-10">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
        ))}
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 relative z-10">
        <div 
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-heading font-bold text-primary text-sm"
        >
          {review.avatar}
        </div>
        <div>
          <div className="font-heading font-semibold text-foreground text-sm">
            {review.name}
          </div>
          <div className="text-xs text-muted-foreground">
            {review.role}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ReviewsSection;
