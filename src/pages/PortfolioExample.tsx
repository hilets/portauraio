import { motion } from 'framer-motion';
import { Instagram, MessageCircle, Camera, Heart, Star, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Import images
import heroImage from '@/assets/portfolio-hero.jpg';
import weddingImage from '@/assets/portfolio-wedding.jpg';
import lifestyleImage from '@/assets/portfolio-lifestyle.jpg';
import portraitImage from '@/assets/portfolio-portrait.jpg';
import brandImage from '@/assets/portfolio-brand.jpg';

const categories = ['All', 'Wedding', 'Lifestyle', 'Portraits', 'Brands'];

const portfolioItems = [
  { id: 1, category: 'Wedding', image: weddingImage, title: 'Sarah & James Wedding' },
  { id: 2, category: 'Lifestyle', image: lifestyleImage, title: 'Coffee Date Story' },
  { id: 3, category: 'Portraits', image: portraitImage, title: 'Editorial Portrait' },
  { id: 4, category: 'Brands', image: brandImage, title: 'Skincare Collection' },
  { id: 5, category: 'Wedding', image: weddingImage, title: 'Beach Wedding' },
  { id: 6, category: 'Lifestyle', image: lifestyleImage, title: 'Urban Adventures' },
];

const packages = [
  {
    name: 'Basic',
    price: '₹15,000',
    features: ['2 Hours Session', '50 Edited Photos', 'Online Gallery', '1 Location'],
  },
  {
    name: 'Standard',
    price: '₹35,000',
    features: ['4 Hours Session', '150 Edited Photos', 'Online Gallery', '2 Locations', 'Outfit Changes'],
    popular: true,
  },
  {
    name: 'Premium',
    price: '₹75,000',
    features: ['Full Day Coverage', '500+ Edited Photos', 'Premium Album', 'Multiple Locations', 'Video Highlights'],
  },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    text: 'Absolutely stunning photos! He captured our wedding perfectly. Highly recommend!',
    rating: 5,
  },
  {
    name: 'Rahul Verma',
    text: 'Professional, creative, and so easy to work with. The brand photos exceeded expectations.',
    rating: 5,
  },
  {
    name: 'Ananya Patel',
    text: 'My Instagram has never looked better! The lifestyle shoot was amazing.',
    rating: 5,
  },
];

const PortfolioExample = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const filteredItems = activeCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#faf9f6]/90 backdrop-blur-md"
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="w-24"></div>
          <motion.span 
            className="font-serif text-2xl font-bold text-neutral-900 tracking-tight"
            whileHover={{ scale: 1.05 }}
          >
            Arjun<span className="text-amber-500">.</span>
          </motion.span>
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm text-neutral-600 hover:text-amber-600 transition-colors">About</a>
            <a href="#portfolio" className="text-sm text-neutral-600 hover:text-amber-600 transition-colors">Portfolio</a>
            <a href="#services" className="text-sm text-neutral-600 hover:text-amber-600 transition-colors">Services</a>
            <a href="#contact" className="text-sm text-neutral-600 hover:text-amber-600 transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-amber-500 transition-colors">
              <Instagram className="w-4 h-4 text-white" />
            </a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center hover:bg-amber-600 transition-colors">
              <MessageCircle className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-6"
            >
              <Camera className="w-4 h-4" />
              <span>Available for Bookings</span>
            </motion.div>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 leading-tight mb-6">
              Lifestyle &<br />
              <span className="text-amber-500">Wedding</span><br />
              Photographer
            </h1>

            <p className="text-lg text-neutral-600 max-w-md mb-8 leading-relaxed">
              Helping people and brands tell real stories through photos. Based in Mumbai, available worldwide.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-6 rounded-full text-base font-medium">
                  Book a Shoot
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="border-2 border-amber-500 text-amber-600 hover:bg-amber-50 px-8 py-6 rounded-full text-base font-medium">
                  <Instagram className="w-4 h-4 mr-2" />
                  Instagram DM
                </Button>
              </motion.div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {['yt', 'ig', 'fb', 'x'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-amber-500 hover:text-amber-500 transition-colors text-xs font-medium"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right - Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative">
              {/* Golden background card */}
              <motion.div 
                className="absolute top-10 right-0 w-[90%] h-[95%] bg-gradient-to-br from-amber-400 to-amber-500 rounded-[3rem]"
                animate={{ rotate: [0, 1, 0, -1, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
              
              {/* Main image */}
              <div className="relative z-10 overflow-hidden rounded-[3rem]">
                <img 
                  src={heroImage} 
                  alt="Photographer" 
                  className="w-full h-[600px] object-cover"
                />
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center z-20"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
              </motion.div>

              <motion.div
                className="absolute bottom-8 left-8 px-4 py-2 bg-white rounded-full shadow-lg flex items-center gap-2 z-20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
              >
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img src={heroImage} alt="" className="w-full h-full object-cover" />
                </div>
                <span className="text-sm font-medium text-neutral-900">@arjun.captures</span>
              </motion.div>

              <motion.div
                className="absolute bottom-24 right-4 w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center z-20"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <ArrowRight className="w-6 h-6 text-neutral-900 rotate-[-45deg]" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="absolute bottom-12 left-6 right-6">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-3 gap-8 max-w-2xl"
            >
              {[
                { value: '+120', label: 'Happy clients with memorable photos' },
                { value: '+5 yrs', label: 'Experience capturing real moments' },
                { value: '+50k', label: 'Instagram followers and growing' },
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl font-bold text-neutral-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-neutral-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-neutral-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-8">
              Hey, I'm <span className="text-amber-400">Arjun</span>
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed mb-8">
              I'm a lifestyle and wedding photographer based in Mumbai with over 5 years of experience. 
              I believe every photo should tell a story — your story. My approach is candid, warm, and 
              focused on capturing genuine emotions. Whether it's your wedding day, a brand campaign, 
              or just everyday moments, I'm here to make them timeless.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-center">
              {[
                { value: '120+', label: 'Clients' },
                { value: '5+', label: 'Years Exp' },
                { value: '50k+', label: 'IG Reach' },
              ].map((stat, index) => (
                <div key={index} className="px-6">
                  <div className="text-3xl font-bold text-amber-400">{stat.value}</div>
                  <div className="text-sm text-neutral-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl md:text-5xl text-neutral-900 mb-4">My Work</h2>
            <p className="text-neutral-600 max-w-xl mx-auto">
              A collection of my favorite shots across weddings, lifestyle, portraits, and brand photography.
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-amber-500 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Gallery Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <span className="text-amber-400 text-sm font-medium">{item.category}</span>
                    <h3 className="text-white text-lg font-semibold mt-1">{item.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-amber-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl md:text-5xl text-neutral-900 mb-4">Client Love</h2>
            <div className="flex items-center justify-center gap-2 text-amber-500">
              <Instagram className="w-5 h-5" />
              <span className="text-neutral-600">50k+ followers</span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-neutral-600 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <span className="text-amber-600 font-medium text-sm">{testimonial.name[0]}</span>
                  </div>
                  <span className="font-medium text-neutral-900">{testimonial.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl md:text-5xl text-neutral-900 mb-4">Packages</h2>
            <p className="text-neutral-600 max-w-xl mx-auto">
              Choose the perfect package for your needs. Custom quotes available for larger projects.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl p-8 ${
                  pkg.popular 
                    ? 'bg-neutral-900 text-white' 
                    : 'bg-white border border-neutral-200'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-500 text-white text-xs font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className={`text-xl font-semibold mb-2 ${pkg.popular ? 'text-white' : 'text-neutral-900'}`}>
                  {pkg.name}
                </h3>
                <div className={`text-3xl font-bold mb-6 ${pkg.popular ? 'text-amber-400' : 'text-amber-500'}`}>
                  {pkg.price}
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className={`flex items-center gap-2 text-sm ${pkg.popular ? 'text-neutral-300' : 'text-neutral-600'}`}>
                      <Heart className={`w-4 h-4 ${pkg.popular ? 'text-amber-400' : 'text-amber-500'}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full rounded-full ${
                    pkg.popular 
                      ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                      : 'bg-neutral-900 hover:bg-neutral-800 text-white'
                  }`}
                >
                  Book Now
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-neutral-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Let's Create Together</h2>
            <p className="text-neutral-400 mb-8">
              Ready to capture your moments? Get in touch through your preferred channel.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <motion.a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-full font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram className="w-5 h-5" />
                Instagram DM
              </motion.a>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-3">
                  <Phone className="w-5 h-5 text-amber-400" />
                </div>
                <span className="text-neutral-400 text-sm">+91 98765 43210</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-3">
                  <Mail className="w-5 h-5 text-amber-400" />
                </div>
                <span className="text-neutral-400 text-sm">arjun@captures.com</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-3">
                  <MapPin className="w-5 h-5 text-amber-400" />
                </div>
                <span className="text-neutral-400 text-sm">Mumbai, India</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-neutral-950">
        <div className="container mx-auto px-6 text-center">
          <p className="text-neutral-500 text-sm">
            © 2024 Arjun Captures. Portfolio designed by{' '}
            <Link to="/" className="text-amber-500 hover:underline">PortAura</Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioExample;