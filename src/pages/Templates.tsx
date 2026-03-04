import { motion } from 'framer-motion';
import { ArrowRight, Eye, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import CustomCursor from '@/components/CustomCursor';
import ScrollToTop from '@/components/ScrollToTop';

const templates = [
  {
    id: 'ecom-fashion',
    name: 'Fashion Store',
    category: 'E-Commerce',
    price: 109,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
    description: 'Modern fashion e-commerce with cart, wishlist & checkout flow.',
  },
  {
    id: 'ecom-electronics',
    name: 'Tech Hub',
    category: 'E-Commerce',
    price: 119,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop',
    description: 'Electronics store with product comparison & review system.',
  },
  {
    id: 'ecom-food',
    name: 'Fresh Market',
    category: 'E-Commerce',
    price: 100,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    description: 'Food delivery platform with menu builder & order tracking.',
  },
  {
    id: 'ecom-beauty',
    name: 'Glow Studio',
    category: 'E-Commerce',
    price: 115,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop',
    description: 'Beauty & skincare store with shade finder & subscription box.',
  },
  {
    id: 'ecom-furniture',
    name: 'Home Craft',
    category: 'E-Commerce',
    price: 129,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop',
    description: 'Furniture store with 3D preview & room planner.',
  },
  {
    id: 'ecom-sports',
    name: 'Active Gear',
    category: 'E-Commerce',
    price: 105,
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&h=400&fit=crop',
    description: 'Sports equipment store with size guide & team ordering.',
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
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6 text-sm text-primary font-medium">
              <ShoppingCart className="w-4 h-4" />
              Premium Templates
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              E-Commerce <span className="text-gradient">Templates</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Production-ready e-commerce templates. Pick one, customize it, launch your store.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template, i) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden hover:border-primary/40 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
                  
                  {/* Price badge */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-heading font-bold">
                    ${template.price}
                  </div>

                  {/* Preview overlay */}
                  <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => navigate(`/checkout/${template.id}`)}
                    >
                      <Eye className="w-4 h-4" />
                      Preview & Buy
                    </Button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-primary font-medium uppercase tracking-wider">{template.category}</span>
                  </div>
                  <h3 className="font-heading text-lg font-bold mb-1">{template.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{template.description}</p>
                  <Button
                    variant="hero"
                    size="sm"
                    className="w-full gap-2"
                    onClick={() => navigate(`/checkout/${template.id}`)}
                  >
                    Buy Now <ArrowRight className="w-4 h-4" />
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
