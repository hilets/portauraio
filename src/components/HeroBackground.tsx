import { useRef, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
}

const HeroBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const isMobile = useMemo(() => window.innerWidth < 768, []);

  const createParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    // Reduce particles on mobile for better performance
    const count = isMobile 
      ? Math.min(30, Math.floor((width * height) / 40000))
      : Math.min(60, Math.floor((width * height) / 20000));
    
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3, // Slower movement
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.4 + 0.1, // Softer opacity
        hue: 185 + Math.random() * 15 - 7,
      });
    }
    return particles;
  }, [isMobile]);

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    
    const particles = particlesRef.current;
    const mouse = mouseRef.current;
    const connectionDistance = isMobile ? 100 : 120;

    // Draw connections with smooth gradients
    ctx.lineWidth = 0.3;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * 0.2;
          ctx.strokeStyle = `hsla(185, 100%, 50%, ${opacity})`;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw particles with smooth movement
    for (const particle of particles) {
      // Gentle mouse interaction (reduced force)
      if (!isMobile) {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150 && distance > 0) {
          const force = (150 - distance) / 150;
          particle.vx += (dx / distance) * force * 0.008; // Much gentler
          particle.vy += (dy / distance) * force * 0.008;
        }
      }

      // Smooth position update
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Higher friction for smoother movement
      particle.vx *= 0.995;
      particle.vy *= 0.995;

      // Wrap around edges smoothly
      if (particle.x < 0) particle.x = width;
      if (particle.x > width) particle.x = 0;
      if (particle.y < 0) particle.y = height;
      if (particle.y > height) particle.y = 0;

      // Draw soft glow
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 3
      );
      gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 55%, ${particle.opacity})`);
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
      ctx.fill();

      // Draw core
      ctx.fillStyle = `hsla(${particle.hue}, 100%, 70%, ${particle.opacity + 0.2})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [isMobile]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawParticles(ctx, canvas.width, canvas.height);
    animationRef.current = requestAnimationFrame(animate);
  }, [drawParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = createParticles(canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, createParticles, isMobile]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Canvas for interactive particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ background: 'transparent' }}
      />

      {/* Smooth animated gradient orbs - slower, smoother transitions */}
      <motion.div
        className="absolute top-0 left-0 w-[500px] h-[500px] md:w-[600px] md:h-[600px] rounded-full blur-[100px] md:blur-[120px] opacity-20"
        style={{ background: 'radial-gradient(circle, hsl(185 100% 50% / 0.3), transparent 70%)' }}
        animate={{
          x: [0, 60, 30, 0],
          y: [0, 30, 60, 0],
          scale: [1, 1.1, 1.05, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <motion.div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full blur-[80px] md:blur-[100px] opacity-15"
        style={{ background: 'radial-gradient(circle, hsl(195 100% 45% / 0.4), transparent 70%)' }}
        animate={{
          x: [0, -50, -25, 0],
          y: [0, -40, -80, 0],
          scale: [1, 1.05, 1.1, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full blur-[120px] md:blur-[150px] opacity-15"
        style={{ background: 'radial-gradient(circle, hsl(185 100% 50% / 0.25), transparent 60%)' }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.18, 0.1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(hsl(185 100% 50% / 0.02) 1px, transparent 1px),
            linear-gradient(90deg, hsl(185 100% 50% / 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Radial vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 20%, hsl(0 0% 4%) 100%)',
        }}
      />

      {/* Smooth floating circles - only on desktop */}
      {!isMobile && [...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute border border-primary/10 rounded-full"
          style={{
            width: `${100 + i * 50}px`,
            height: `${100 + i * 50}px`,
            left: `${20 + i * 25}%`,
            top: `${25 + (i % 2) * 30}%`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.05, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            rotate: { duration: 40 + i * 10, repeat: Infinity, ease: 'linear' },
            scale: { duration: 10 + i * 3, repeat: Infinity, ease: 'easeInOut' },
            opacity: { duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
      ))}
    </div>
  );
};

export default HeroBackground;
