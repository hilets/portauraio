import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const cursorX = useSpring(0, { stiffness: 300, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 300, damping: 28 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024 || 'ontouchstart' in window);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]');
      setHovered(!!interactive);
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);

    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
      window.removeEventListener('resize', checkMobile);
    };
  }, [visible, cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>
      {/* Main dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: hovered ? 48 : 10,
            height: hovered ? 48 : 10,
            opacity: visible ? 1 : 0,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="rounded-full bg-primary"
        />
      </motion.div>
      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: hovered ? 64 : 36,
            height: hovered ? 64 : 36,
            opacity: visible ? 0.4 : 0,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="rounded-full border-2 border-primary/50"
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
