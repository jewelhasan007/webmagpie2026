import React from 'react';
import { motion } from 'motion/react';
import ServicesSection from '../sections/Services';
import Process from '../sections/Process';
import CTA from '../sections/CTA';

const Services = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32"
    >
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="max-w-3xl">
          <span className="text-[#162660] font-bold uppercase tracking-widest text-sm">What We Do</span>
          <h1 className="text-5xl md:text-7xl font-display font-extrabold mt-4 mb-8">
            Comprehensive <span className="text-gradient">Digital</span> Solutions.
          </h1>
          <p className="text-xl text-[#475569] leading-relaxed">
            From initial concept to final launch and beyond, we provide the expertise and tools needed to build successful digital products.
          </p>
        </div>
      </div>

      <ServicesSection />
      <Process />
      <CTA />
    </motion.div>
  );
};

export default Services;
