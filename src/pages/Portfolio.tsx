import React from 'react';
import { motion } from 'motion/react';
import PortfolioSection from '../sections/Portfolio';
import CTA from '../sections/CTA';

const Portfolio = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32"
    >
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="max-w-3xl">
          <span className="text-[#162660] font-bold uppercase tracking-widest text-sm">Our Work</span>
          <h1 className="text-5xl md:text-7xl font-display font-extrabold mt-4 mb-8">
            Crafting <span className="text-gradient">Impactful</span> Results.
          </h1>
          <p className="text-xl text-[#475569] leading-relaxed">
            A showcase of our recent projects where we've helped our clients achieve their digital goals through innovation and design.
          </p>
        </div>
      </div>

      <PortfolioSection />
      <CTA />
    </motion.div>
  );
};

export default Portfolio;
