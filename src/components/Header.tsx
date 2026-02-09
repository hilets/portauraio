import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const navLinks = [
  { name: 'Why Portfolio', href: '#why-portfolio' },
  { name: 'Features', href: '#features' },
  { name: 'Workflow', href: '#workflow' },
  { name: 'Before & After', href: '#before-after' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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

  return (
    <>
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

            {/* Desktop CTA - morphs on scroll */}
            <div className="hidden md:flex items-center gap-4">
              <AnimatePresence mode="wait">
                {!isScrolled ? (
                  <motion.div
                    key="order-btn"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <Button variant="hero" size="lg">
                      Order Now
                    </Button>
                  </motion.div>
                ) : (
                  <motion.button
                    key="menu-btn"
                    initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5, rotate: 90, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center hover:bg-primary/20 transition-colors"
                  >
                    {isMobileMenuOpen ? (
                      <X className="w-5 h-5 text-primary" />
                    ) : (
                      <Menu className="w-5 h-5 text-primary" />
                    )}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile - morphs on scroll */}
            <div className="md:hidden">
              <AnimatePresence mode="wait">
                {!isScrolled ? (
                  <motion.div
                    key="order-mobile"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <Button variant="hero" size="sm" className="rounded-full px-5">
                      Order Now
                    </Button>
                  </motion.div>
                ) : (
                  <motion.button
                    key="menu-mobile"
                    initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5, rotate: 90, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="w-9 h-9 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center"
                  >
                    {isMobileMenuOpen ? (
                      <X className="w-4 h-4 text-primary" />
                    ) : (
                      <Menu className="w-4 h-4 text-primary" />
                    )}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Dropdown menu when scrolled menu button is clicked */}
        <AnimatePresence>
          {isMobileMenuOpen && isScrolled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="overflow-hidden border-t border-border/30"
            >
              <div className="px-6 py-4 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium py-1"
                  >
                    {link.name}
                  </a>
                ))}
                <Button variant="hero" size="sm" className="mt-2 w-full">
                  Order Now
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Header;
