import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const navLinks = [
  { name: 'Why Portfolio', href: '#why-portfolio' },
  { name: 'Features', href: '#features' },
  { name: 'Workflow', href: '#workflow' },
  { name: 'Before & After', href: '#before-after' },
];

const menuPages = [
  { name: 'Home', href: '/' },
  { name: 'Portfolio Design', href: '/portfolio-design' },
  { name: 'Resume Writing', href: '/resume-writing' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        const featuresTop = featuresSection.getBoundingClientRect().top;
        // Show menu button only between hero scroll and features section
        setIsScrolled(window.scrollY > 300 && featuresTop > 200);
      } else {
        setIsScrolled(window.scrollY > 300);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest('header')) {
          setIsMobileMenuOpen(false);
        }
      };
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Full-screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 3rem) 2rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 3rem) 2rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 3rem) 2rem)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] bg-background"
          >
            <div className="absolute top-4 right-4 md:top-6 md:right-8">
              <motion.button
                onClick={() => setIsMenuOpen(false)}
                className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="h-full flex flex-col items-center justify-center px-6">
              <nav className="flex flex-col items-center gap-2">
                {menuPages.map((page, i) => (
                  <motion.div
                    key={page.href}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: 'easeOut' }}
                  >
                    <a
                      href={page.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`group flex items-center gap-3 text-3xl md:text-5xl font-heading font-bold transition-colors duration-300 py-2 ${
                        location.pathname === page.href
                          ? 'text-primary'
                          : 'text-foreground/40 hover:text-foreground'
                      }`}
                    >
                      {page.name}
                      <ArrowUpRight className="w-5 h-5 md:w-7 md:h-7 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </a>
                  </motion.div>
                ))}
              </nav>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-8"
              >
                <a href="/contact">
                  <Button variant="hero" size="xl" onClick={() => setIsMenuOpen(false)}>
                    Order Now
                  </Button>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blur Overlay for mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 backdrop-blur-md bg-background/60"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-card/80 backdrop-blur-xl shadow-lg'
            : 'bg-card/40 backdrop-blur-md'
        } rounded-full border border-border/50`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-18 md:h-22">
            {/* Back Button (mobile) or Logo */}
            {!isHomePage ? (
              <div className="flex items-center gap-3">
                <motion.button
                  onClick={() => navigate('/')}
                  className="md:hidden w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="w-5 h-5 text-primary" />
                </motion.button>
                <Link to="/">
                  <motion.span
                    className="font-heading text-xl md:text-2xl font-bold text-foreground tracking-widest cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    PORT<span className="text-primary">AURA</span>
                  </motion.span>
                </Link>
              </div>
            ) : (
              <motion.a
                href="#"
                className="font-heading text-xl md:text-2xl font-bold text-foreground tracking-widest"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                PORT<span className="text-primary">AURA</span>
              </motion.a>
            )}

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-medium"
                  whileHover={{ y: -2 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>

            {/* Desktop CTA / Menu Button - Morphing Animation */}
            <div className="hidden md:flex items-center gap-4">
              <motion.button
                onClick={() => isScrolled ? setIsMenuOpen(true) : navigate('/contact')}
                className="relative rounded-full bg-primary flex items-center justify-center group overflow-hidden cursor-pointer"
                animate={{
                  width: isScrolled ? 52 : 170,
                  height: isScrolled ? 52 : 48,
                  borderRadius: 9999,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.76, 0, 0.24, 1],
                }}
                whileHover={{ 
                  scale: 1.06,
                  boxShadow: '0 0 25px hsl(185 100% 50% / 0.5)',
                }}
                whileTap={{ scale: 0.94 }}
              >
                {/* Gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-primary via-primary to-accent rounded-full"
                  animate={{ opacity: isScrolled ? 0 : 0.3 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div className="absolute inset-[2px] bg-primary rounded-full" />

                {/* "Order Now" text */}
                <motion.span
                  className="relative z-10 text-primary-foreground font-heading font-semibold tracking-wider text-base whitespace-nowrap"
                  animate={{
                    opacity: isScrolled ? 0 : 1,
                    scale: isScrolled ? 0.3 : 1,
                    filter: isScrolled ? 'blur(8px)' : 'blur(0px)',
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.76, 0, 0.24, 1],
                    delay: isScrolled ? 0 : 0.2,
                  }}
                  style={{ position: isScrolled ? 'absolute' : 'relative' }}
                >
                  Order Now
                </motion.span>

                {/* 2-line menu icon */}
                <motion.div
                  className="absolute z-10 flex flex-col items-end gap-[6px]"
                  animate={{
                    opacity: isScrolled ? 1 : 0,
                    scale: isScrolled ? 1 : 0.3,
                    rotate: isScrolled ? 0 : -180,
                    filter: isScrolled ? 'blur(0px)' : 'blur(8px)',
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.76, 0, 0.24, 1],
                    delay: isScrolled ? 0.15 : 0,
                  }}
                >
                  <motion.span
                    className="block h-[2.5px] bg-primary-foreground rounded-full"
                    animate={{ width: isScrolled ? 20 : 0 }}
                    transition={{ duration: 0.4, delay: isScrolled ? 0.25 : 0, ease: [0.76, 0, 0.24, 1] }}
                  />
                  <motion.span
                    className="block h-[2.5px] bg-primary-foreground/70 rounded-full group-hover:bg-primary-foreground transition-colors duration-300"
                    animate={{ width: isScrolled ? 13 : 0 }}
                    transition={{ duration: 0.4, delay: isScrolled ? 0.32 : 0, ease: [0.76, 0, 0.24, 1] }}
                  />
                </motion.div>
              </motion.button>
            </div>

            {/* Mobile: Morphing Order Now / Menu */}
            <div className="md:hidden">
              <motion.button
                onClick={() => isScrolled ? setIsMenuOpen(true) : navigate('/contact')}
                className="relative rounded-full bg-primary flex items-center justify-center group overflow-hidden"
                animate={{
                  width: isScrolled ? 42 : 120,
                  height: isScrolled ? 42 : 36,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.76, 0, 0.24, 1],
                }}
                whileTap={{ scale: 0.92 }}
              >
                <motion.div className="absolute inset-[1px] bg-primary rounded-full" />

                {/* "Order Now" text */}
                <motion.span
                  className="relative z-10 text-primary-foreground font-heading font-semibold tracking-wider text-sm whitespace-nowrap"
                  animate={{
                    opacity: isScrolled ? 0 : 1,
                    scale: isScrolled ? 0.3 : 1,
                    filter: isScrolled ? 'blur(6px)' : 'blur(0px)',
                  }}
                  transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1], delay: isScrolled ? 0 : 0.15 }}
                  style={{ position: isScrolled ? 'absolute' : 'relative' }}
                >
                  Order Now
                </motion.span>

                {/* 2-line menu icon */}
                <motion.div
                  className="absolute z-10 flex flex-col items-end gap-[4px]"
                  animate={{
                    opacity: isScrolled ? 1 : 0,
                    scale: isScrolled ? 1 : 0.3,
                    rotate: isScrolled ? 0 : -180,
                  }}
                  transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1], delay: isScrolled ? 0.12 : 0 }}
                >
                  <motion.span
                    className="block h-[2px] bg-primary-foreground rounded-full"
                    animate={{ width: isScrolled ? 16 : 0 }}
                    transition={{ duration: 0.35, delay: isScrolled ? 0.2 : 0 }}
                  />
                  <motion.span
                    className="block h-[2px] bg-primary-foreground/70 rounded-full"
                    animate={{ width: isScrolled ? 10 : 0 }}
                    transition={{ duration: 0.35, delay: isScrolled ? 0.26 : 0 }}
                  />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
};

export default Header;
