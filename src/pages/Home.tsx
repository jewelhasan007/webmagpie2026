import React from 'react';
import { motion } from 'motion/react';
import Hero from '../sections/Hero';
import Services from '../sections/Services';
import Portfolio from '../sections/Portfolio';
import About from '../sections/About';
import Process from '../sections/Process';
import Testimonials from '../sections/Testimonials';
import BlogPreview from '../sections/BlogPreview';
import CTA from '../sections/CTA';




const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Process />
      <Testimonials />
      <BlogPreview />
      <CTA />

    </motion.div>
  );
};

export default Home;
