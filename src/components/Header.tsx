import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, ArrowUpRight, Sun, Moon, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Templates', href: '/templates' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const menuPages = [
  { name: 'Home', href: '/' },
  { name: 'Templates', href: '/templates' },
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
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        const featuresTop = featuresSection.getBoundingClientRect().top;
        setIsScrolled(window.scrollY > 80 && featuresTop > 200);
      } else {
        setIsScrolled(window.scrollY > 80);
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
            <div className="absolute top-4 right-4 md:top-6 md:right-8 flex items-center gap-3">
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={theme === 'lime' ? 'Switch to Minimal' : 'Switch to Cyber'}
              >
                {theme === 'lime' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>

              {/* Close */}
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
                      {page.name === 'Templates' && <LayoutGrid className="w-6 h-6 md:w-8 md:h-8" />}
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
                <a href="/order">
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
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-medium"
                >
                  <motion.span whileHover={{ y: -2 }} className="inline-block">
                    {link.name}
                  </motion.span>
                </Link>
              ))}
            </nav>

            {/* Desktop CTA / Menu Button - Morphing Animation (BLUR FIXED) */}
            <div className="hidden md:flex items-center gap-4">
              <motion.button
                onClick={() => isScrolled ? setIsMenuOpen(true) : navigate('/order')}
                className="relative rounded-full bg-primary flex items-center justify-center group cursor-pointer"
                animate={{
                  width: isScrolled ? 52 : 170,
                  height: isScrolled ? 52 : 48,
                  borderRadius: 9999,
                }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
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

                {/* "Order Now" text - NO BLUR */}
                <motion.span
                  className="relative z-10 text-primary-foreground font-heading font-semibold tracking-wider text-base whitespace-nowrap"
                  animate={{
                    opacity: isScrolled ? 0 : 1,
                    scale: isScrolled ? 0.5 : 1,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: isScrolled ? 0 : 0.4,
                  }}
                  style={{ position: isScrolled ? 'absolute' : 'relative' }}
                >
                  Order Now
                </motion.span>

                {/* Interactive 3-line hamburger icon */}
                <motion.div
                  className="absolute z-10 flex flex-col items-center justify-center gap-[5px] w-6 h-6"
                  animate={{
                    opacity: isScrolled ? 1 : 0,
                    scale: isScrolled ? 1 : 0.3,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                    delay: isScrolled ? 0.3 : 0,
                  }}
                >
                  <motion.span
                    className="block w-5 h-[2px] bg-primary-foreground rounded-full origin-center"
                    animate={{
                      rotate: isMenuOpen ? 45 : 0,
                      y: isMenuOpen ? 7 : 0,
                      width: isScrolled ? 20 : 0,
                    }}
                    transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                  />
                  <motion.span
                    className="block w-3.5 h-[2px] bg-primary-foreground rounded-full"
                    animate={{
                      opacity: isMenuOpen ? 0 : 1,
                      scaleX: isMenuOpen ? 0 : 1,
                      width: isScrolled ? 14 : 0,
                    }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  />
                  <motion.span
                    className="block w-5 h-[2px] bg-primary-foreground rounded-full origin-center"
                    animate={{
                      rotate: isMenuOpen ? -45 : 0,
                      y: isMenuOpen ? -7 : 0,
                      width: isScrolled ? 20 : 0,
                    }}
                    transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                  />
                </motion.div>
              </motion.button>
            </div>

            {/* Mobile: Morphing Order Now / Menu */}
            <div className="md:hidden">
              <motion.button
                onClick={() => isScrolled ? setIsMenuOpen(true) : navigate('/order')}
                className="relative rounded-full bg-primary flex items-center justify-center group"
                animate={{
                  width: isScrolled ? 42 : 120,
                  height: isScrolled ? 42 : 36,
                }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileTap={{ scale: 0.92 }}
              >
                <motion.div className="absolute inset-[1px] bg-primary rounded-full" />

                {/* "Order Now" text - NO BLUR */}
                <motion.span
                  className="relative z-10 text-primary-foreground font-heading font-semibold tracking-wider text-sm whitespace-nowrap"
                  animate={{
                    opacity: isScrolled ? 0 : 1,
                    scale: isScrolled ? 0.5 : 1,
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: isScrolled ? 0 : 0.4 }}
                  style={{ position: isScrolled ? 'absolute' : 'relative' }}
                >
                  Order Now
                </motion.span>

                {/* Interactive 3-line hamburger icon */}
                <motion.div
                  className="absolute z-10 flex flex-col items-center justify-center gap-[4px] w-5 h-5"
                  animate={{
                    opacity: isScrolled ? 1 : 0,
                    scale: isScrolled ? 1 : 0.3,
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: isScrolled ? 0.3 : 0 }}
                >
                  <motion.span
                    className="block w-4 h-[2px] bg-primary-foreground rounded-full origin-center"
                    animate={{
                      rotate: isMenuOpen ? 45 : 0,
                      y: isMenuOpen ? 6 : 0,
                      width: isScrolled ? 16 : 0,
                    }}
                    transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                  />
                  <motion.span
                    className="block w-3 h-[2px] bg-primary-foreground rounded-full"
                    animate={{
                      opacity: isMenuOpen ? 0 : 1,
                      scaleX: isMenuOpen ? 0 : 1,
                      width: isScrolled ? 12 : 0,
                    }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  />
                  <motion.span
                    className="block w-4 h-[2px] bg-primary-foreground rounded-full origin-center"
                    animate={{
                      rotate: isMenuOpen ? -45 : 0,
                      y: isMenuOpen ? -6 : 0,
                      width: isScrolled ? 16 : 0,
                    }}
                    transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
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
