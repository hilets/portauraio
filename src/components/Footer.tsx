import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  services: [
    { name: 'Custom Portfolio Design', href: '/custom-portfolio-design' },
    { name: 'Resume Writing', href: '/resume-writing' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
};

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

const Footer = () => {
  return (
    <footer className="relative bg-card/50 border-t border-border/50 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px]"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="container-custom py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.a
              href="#"
              className="font-heading text-3xl font-bold text-foreground tracking-widest inline-block mb-6"
              whileHover={{ scale: 1.05 }}
            >
              PORT<span className="text-primary">AURA</span>
            </motion.a>
            <p className="text-muted-foreground mb-8 max-w-sm leading-relaxed">
              Transforming careers through stunning portfolio designs. Our engineers
              are ready to bring your story to life.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="w-12 h-12 rounded-2xl bg-secondary/50 backdrop-blur-sm border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries({ Company: footerLinks.company, Services: footerLinks.services, Legal: footerLinks.legal }).map(
            ([title, links], sectionIndex) => (
              <div key={title}>
                <h4 className="font-heading font-bold text-foreground mb-6 text-lg">{title}</h4>
                <ul className="space-y-4">
                  {links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * (sectionIndex * 3 + linkIndex) }}
                    >
                      <Link
                        to={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                      >
                        {link.name}
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>


        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.p 
            className="text-muted-foreground text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            © 2024 Portaura. All rights reserved.
          </motion.p>
          <motion.p 
            className="text-muted-foreground text-sm flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Crafted with 
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-primary"
            >
              ❤️
            </motion.span>
            by our engineering team
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
