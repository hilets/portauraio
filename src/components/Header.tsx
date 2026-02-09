import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Menu, X, ArrowUpRight } from 'lucide-react';
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
  { name: 'Career Consulting', href: '/career-consulting' },
  { name: 'About Us', href: '/about' },
  { name: 'Careers', href: '/careers' },
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
      setIsScrolled(window.scrollY > 300);
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
                    <Link
                      to={page.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`group flex items-center gap-3 text-3xl md:text-5xl font-heading font-bold transition-colors duration-300 py-2 ${
                        location.pathname === page.href
                          ? 'text-primary'
                          : 'text-foreground/40 hover:text-foreground'
                      }`}
                    >
                      {page.name}
                      <ArrowUpRight className="w-5 h-5 md:w-7 md:h-7 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                  </motion.div>
                ))}
              </nav>
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

            {/* Desktop CTA / Menu Button */}
            <div className="hidden md:flex items-center gap-4">
              <AnimatePresence mode="wait">
                {isScrolled ? (
                  <motion.button
                    key="menu-btn"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    onClick={() => setIsMenuOpen(true)}
                    className="relative w-12 h-12 rounded-full bg-primary flex items-center justify-center group overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-tr from-primary via-primary to-accent rounded-full"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.div
                      className="absolute inset-[2px] bg-primary rounded-full"
                    />
                    <Menu className="w-5 h-5 text-primary-foreground relative z-10 group-hover:scale-110 transition-transform" />
                    {/* Pulse ring */}
                    <motion.span
                      className="absolute inset-0 rounded-full border-2 border-primary"
                      animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </motion.button>
                ) : (
                  <motion.div
                    key="order-btn"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Button variant="hero" size="lg">
                      Order Now
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile: Order Now or Menu */}
            <div className="md:hidden">
              <AnimatePresence mode="wait">
                {isScrolled ? (
                  <motion.button
                    key="mobile-menu"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    onClick={() => setIsMenuOpen(true)}
                    className="relative w-10 h-10 rounded-full bg-primary flex items-center justify-center"
                  >
                    <Menu className="w-4 h-4 text-primary-foreground relative z-10" />
                    <motion.span
                      className="absolute inset-0 rounded-full border-2 border-primary"
                      animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </motion.button>
                ) : (
                  <motion.div
                    key="mobile-order"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Button variant="hero" size="sm" className="rounded-full px-5">
                      Order Now
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
};

export default Header;
