import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PROJECTS = [
  {
    id: '1',
    title: 'Website Design & Development',
    category: 'Web Development',
    image: 'https://static.vecteezy.com/system/resources/previews/034/342/883/non_2x/html-css-programming-data-analysis-concept-flat-illustration-vector.jpg',
  },
  {
    id: '2',
    title: 'Landing Page Design',
    category: 'UI/UX Design',
    image: 'https://venngage-wordpress.s3.amazonaws.com/uploads/2018/04/Landing-Page-Examples.png',
  },
  {
    id: '3',
    title: 'Logo Design',
    category: 'Branding',
    image: 'https://optimusclick.com.au/wp-content/uploads/2020/03/Logo-Design-OptimusClick.jpg',
  },
  {
    id: '4',
    title: 'Digital Marketing & SEO',
    category: 'Marketing',
    image: 'https://cms-media.bartleby.com/wp-content/uploads/sites/2/2022/04/08102245/image-54.png',
  },
  {
    id: '5',
    title: 'Shopify Store Development',
    category: 'E-commerce',
    image: 'https://cdn.shopify.com/s/files/1/0070/7032/files/Blog_-_1848x970_433f73d9-ad0f-46fa-8475-6fe0ec1abb74.png?format=jpg&quality=90&v=1674559633&width=1024',
  },
  {
    id: '6',
    title: 'Amazon FBA',
    category: 'E-commerce',
    image: 'https://i.pinimg.com/736x/2c/d5/f0/2cd5f0b64c42a4daef66e72b168dbf6f.jpg',
  },
];

const words = ['Build', 'Design', 'Grow', 'Transform', 'Launch'];

const Hero = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);
  const [slideIndex, setSlideIndex] = useState(0);

  // Rotating word with fade (matches original 2000ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % words.length);
        setWordVisible(true);
      }, 300);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Auto-advance carousel every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % PROJECTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (n) => {
    setSlideIndex((n + PROJECTS.length) % PROJECTS.length);
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white">

      {/* ── Background Carousel (replaces plain bg-white) ── */}
      <div className="absolute inset-0 z-0">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${slideIndex * 100}%)` }}
        >
          {PROJECTS.map((project, i) => (
            <div key={project.id} className="relative min-w-full h-full flex-shrink-0">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
              {/* Overlay: heavy white on left to keep original text colors, fades to transparent right */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/30" />

              {/* Slide label */}
              <div className="absolute bottom-16 right-6 bg-white/80 border border-[#162660]/10 backdrop-blur-sm rounded-xl px-4 py-2 pointer-events-none shadow-sm">
                <span className="block text-[10px] uppercase tracking-widest text-[#475569] mb-0.5 font-medium">
                  {project.category}
                </span>
                <span className="text-[#162660] text-sm font-semibold">{project.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Original background elements — kept exactly as-is */}
      <div className="absolute inset-0 bg-grid opacity-30 z-[1]" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#D0E6FD]/40 blur-[120px] rounded-full z-[1]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#F1E4D1]/60 blur-[120px] rounded-full z-[1]" />

      {/* Original content — zero changes to padding, margin, classes */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#D0E6FD] border border-[#162660]/20 text-[#162660] text-sm font-bold mb-6">
              NEXT GEN DIGITAL AGENCY
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-display font-extrabold leading-[1.1] mb-8 text-[#162660]"
          >
            We{' '}
            <span
              className="text-[#162660] inline-block transition-opacity duration-300"
              style={{ opacity: wordVisible ? 1 : 0 }}
            >
              {words[wordIndex]}
            </span>{' '}
            High-Converting <br />
            <span className="text-gradient">Websites and Marketing Systems</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-[#475569] mb-10 max-w-2xl leading-relaxed"
          >
            We blend strategy and technology to create high-performance digital products that drive business growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-6"
          >
            <Link
              to="/contact"
              className="px-8 py-4 bg-[#162660] text-white rounded-full font-bold flex items-center gap-2 hover:bg-[#162660]/90 hover:scale-105 transition-all shadow-lg shadow-[#162660]/20"
            >
              Start Your Project <ArrowRight size={20} />
            </Link>
            <Link
              to="/portfolio"
              className="px-8 py-4 bg-[#D0E6FD] border border-[#162660]/20 text-[#162660] rounded-full font-bold flex items-center gap-2 hover:bg-[#D0E6FD]/80 transition-all"
            >
              View Portfolio
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Original Floating Card — kept exactly as-is */}
      <div className="hidden lg:block absolute right-20 top-1/2 -translate-y-1/2 w-1/3 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative"
        >
          <div className="bg-white border border-[#162660]/10 shadow-2xl p-8 rounded-3xl relative z-10 animate-float">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#D0E6FD] flex items-center justify-center">
                <RocketIcon className="text-[#162660]" />
              </div>
              <div>
                <div className="text-[#162660] font-bold">Project Launched</div>
                <div className="text-[#475569] text-sm">24 hours ago</div>
              </div>
            </div>
            <div className="h-2 w-full bg-[#F1E4D1] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ duration: 2, delay: 1 }}
                className="h-full bg-[#162660]"
              />
            </div>
            <div className="mt-4 flex justify-between text-sm">
              <span className="text-[#475569]">Success Rate</span>
              <span className="text-[#162660] font-bold">98%</span>
            </div>
          </div>

          <div
            className="absolute -top-10 -right-10 bg-[#F1E4D1] border border-[#162660]/10 shadow-xl p-6 rounded-2xl z-20 animate-float"
            style={{ animationDelay: '1s' }}
          >
            <div className="text-3xl font-bold text-[#162660] mb-1">150+</div>
            <div className="text-[#475569] text-xs uppercase tracking-wider font-bold">Clients Served</div>
          </div>
        </motion.div>
      </div>

      {/* ── Carousel Dot Indicators ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {PROJECTS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full border-none cursor-pointer transition-all duration-300 ${
              i === slideIndex
                ? 'bg-[#162660] w-6 h-2'
                : 'bg-[#162660]/30 w-2 h-2 hover:bg-[#162660]/60'
            }`}
          />
        ))}
      </div>

      {/* ── Prev / Next Arrows ── */}
      <button
        onClick={() => goTo(slideIndex - 1)}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 border border-[#162660]/20 text-[#162660] flex items-center justify-center hover:bg-white transition-all shadow-sm"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => goTo(slideIndex + 1)}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 border border-[#162660]/20 text-[#162660] flex items-center justify-center hover:bg-white transition-all shadow-sm"
      >
        <ChevronRight size={20} />
      </button>

    </section>
  );
};

const RocketIcon = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3" />
    <path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5" />
  </svg>
);

export default Hero;