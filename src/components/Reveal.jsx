import React from 'react';
import { motion } from 'framer-motion';

/**
 * Simple scroll-reveal wrapper using Framer Motion
 * Props:
 * - variant: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'zoom'
 * - delay: number (seconds)
 * - className: string
 */
const variantsMap = {
  'fade-up': { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } },
  'fade-in': { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  'slide-left': { hidden: { opacity: 0, x: 32 }, visible: { opacity: 1, x: 0 } },
  'slide-right': { hidden: { opacity: 0, x: -32 }, visible: { opacity: 1, x: 0 } },
  'zoom': { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } },
};

const Reveal = ({ children, variant = 'fade-up', delay = 0, className = '' }) => {
  const selected = variantsMap[variant] ?? variantsMap['fade-up'];
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      variants={selected}
    >
      {children}
    </motion.div>
  );
};

export default Reveal; 