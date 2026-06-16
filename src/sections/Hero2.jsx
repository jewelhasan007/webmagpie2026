import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, TrendingUp, Palette, Globe, Layout, Smartphone, ShoppingCart, MousePointer, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

// const PROJECTS = [
//   {
//     id: '1',
//     title: 'Digital Marketing & SEO',
//     category: 'SEO & Marketing',
//     image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
//     icon: TrendingUp,
//   },
//   {
//     id: '2',
//     title: 'Brand Strategy',
//     category: 'Branding',
//     image: 'https://images.unsplash.com/photo-1493421419110-74f4e85ba126?w=1200&q=80',
//     icon: Layers,
//   },
//   {
//     id: '3',
//     title: 'Website Design & Development',
//     category: 'Web Development',
//     image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&q=80',
//     icon: Globe,
//   },
//   {
//     id: '4',
//     title: 'Landing Page Design',
//     category: 'UI/UX Design',
//     image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200&q=80',
//     icon: MousePointer,
//   },
//   {
//     id: '5',
//     title: 'UI/UX Design',
//     category: 'Design',
//     image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80',
//     icon: Palette,
//   },
//   {
//     id: '6',
//     title: 'Mobile Apps',
//     category: 'App Development',
//     image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80',
//     icon: Smartphone,
//   },
//   {
//     id: '7',
//     title: 'E-commerce Solutions',
//     category: 'E-commerce',
//     image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
//     icon: ShoppingCart,
//   },
//     {
//     id: '8',
//     title: 'Logo Design',
//     category: 'Branding',
//     image: 'https://images.pexels.com/photos/6224/hands-people-woman-working.jpg?auto=compress&cs=tinysrgb&w=1200',
//     icon: Layout,
//   },
// ];

const PROJECTS = [
  {
    id: '1',
    title: 'Digital Marketing & SEO',
    category: 'SEO & Marketing',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    icon: TrendingUp,
    card: {
      heading: 'Campaign Live',
      sub: 'Organic traffic up 3x',
      metric: '340%',
      metricLabel: 'ROI Achieved',
      progressLabel: 'Keyword Rankings',
      progressValue: 92,
      badgeNumber: '10K+',
      badgeLabel: 'Leads Generated',
    },
  },
  {
    id: '2',
    title: 'Brand Strategy',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1493421419110-74f4e85ba126?w=1200&q=80',
    icon: Layers,
    card: {
      heading: 'Brand Delivered',
      sub: 'Full identity system',
      metric: '100%',
      metricLabel: 'Client Satisfaction',
      progressLabel: 'Brand Consistency',
      progressValue: 97,
      badgeNumber: '50+',
      badgeLabel: 'Brands Built',
    },
  },
  {
    id: '3',
    title: 'Website Design & Development',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&q=80',
    icon: Globe,
    card: {
      heading: 'Site Launched',
      sub: 'Live in 14 days',
      metric: '98%',
      metricLabel: 'Performance Score',
      progressLabel: 'Load Speed Optimized',
      progressValue: 98,
      badgeNumber: '150+',
      badgeLabel: 'Sites Delivered',
    },
  },
  {
    id: '4',
    title: 'Landing Page Design',
    category: 'UI/UX Design',
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200&q=80',
    icon: MousePointer,
    card: {
      heading: 'Page Published',
      sub: 'Conversion rate boosted',
      metric: '4.8x',
      metricLabel: 'Conversion Lift',
      progressLabel: 'A/B Test Winner',
      progressValue: 88,
      badgeNumber: '200+',
      badgeLabel: 'Pages Launched',
    },
  },
  {
    id: '5',
    title: 'UI/UX Design',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80',
    icon: Palette,
    card: {
      heading: 'Design Approved',
      sub: 'Handoff ready',
      metric: '95%',
      metricLabel: 'User Satisfaction',
      progressLabel: 'Usability Score',
      progressValue: 95,
      badgeNumber: '80+',
      badgeLabel: 'Products Designed',
    },
  },
  {
    id: '6',
    title: 'Mobile Apps',
    category: 'App Development',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80',
    icon: Smartphone,
    card: {
      heading: 'App Submitted',
      sub: 'iOS & Android ready',
      metric: '4.9★',
      metricLabel: 'App Store Rating',
      progressLabel: 'Crash-Free Sessions',
      progressValue: 99,
      badgeNumber: '30+',
      badgeLabel: 'Apps Shipped',
    },
  },
  {
    id: '7',
    title: 'E-commerce Solutions',
    category: 'E-commerce',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
    icon: ShoppingCart,
    card: {
      heading: 'Store Live',
      sub: 'First sale in 48 hours',
      metric: '220%',
      metricLabel: 'Revenue Growth',
      progressLabel: 'Cart Conversion Rate',
      progressValue: 84,
      badgeNumber: '60+',
      badgeLabel: 'Stores Launched',
    },
  },
  {
    id: '8',
    title: 'Logo Design',
    category: 'Branding',
    image: 'https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg?auto=compress&cs=tinysrgb&w=1200',
    icon: Layout,
    card: {
      heading: 'Logo Delivered',
      sub: 'All formats included',
      metric: '100%',
      metricLabel: 'Revision Satisfaction',
      progressLabel: 'Client Approval Rate',
      progressValue: 100,
      badgeNumber: '300+',
      badgeLabel: 'Logos Created',
    },
  },
];

const words = ['Build', 'Design', 'Grow', 'Transform', 'Launch'];

const Hero2 = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);
  const [slideIndex, setSlideIndex] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % PROJECTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (n) => {
    setSlideIndex((n + PROJECTS.length) % PROJECTS.length);
  };

  const currentProject = PROJECTS[slideIndex];
  const IconComponent = currentProject.icon;

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white">

      {/* ── Background Carousel ── */}
      <div className="absolute inset-0 z-0">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${slideIndex * 100}%)` }}
        >
          {PROJECTS.map((project, i) => {
            const Icon = project.icon;
            return (
              <div key={project.id} className="relative min-w-full h-full flex-shrink-0">
                {/* Background image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/96 via-white/85 to-white/40" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Original background elements */}
      <div className="absolute inset-0 bg-grid opacity-30 z-[1]" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#D0E6FD]/40 blur-[120px] rounded-full z-[1]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#F1E4D1]/60 blur-[120px] rounded-full z-[1]" />

      {/* ── Slide Label (current slide, shown outside carousel track so it's always on top) ── */}
      <div className="hidden lg:flex absolute bottom-10 right-6 z-30 items-center gap-3 bg-white/90 border border-[#162660]/10 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-md pointer-events-none">
        <div className="w-9 h-9 rounded-xl bg-[#D0E6FD] flex items-center justify-center flex-shrink-0">
          <IconComponent size={18} className="text-[#162660]" strokeWidth={2} />
        </div>
        <div>
          <span className="block text-[10px] uppercase tracking-widest text-[#475569] font-medium">
            {currentProject.category}
          </span>
          <span className="text-[#162660] text-sm font-semibold leading-tight">{currentProject.title}</span>
        </div>
      </div>

      {/* Dots — bottom center */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {PROJECTS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full border-none cursor-pointer transition-all duration-300 ${
              i === slideIndex
                ? 'bg-[#162660] w-6 h-2'
                : 'bg-[#162660]/25 w-2 h-2 hover:bg-[#162660]/50'
            }`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() => goTo(slideIndex - 1)}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/90 border border-[#162660]/15 text-[#162660] flex items-center justify-center hover:bg-white transition-all shadow-sm"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => goTo(slideIndex + 1)}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/90 border border-[#162660]/15 text-[#162660] flex items-center justify-center hover:bg-white transition-all shadow-sm"
      >
        <ChevronRight size={20} />
      </button>

      {/* ── Hero Content ── */}
      <div className="max-w-7xl mx-auto px-6 relative z-30">
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
{/* ── Floating Card — Option C, synced with carousel ── */}
<div className="hidden lg:block absolute right-20 top-1/2 -translate-y-1/2 w-72 z-20">
  <motion.div
    key={slideIndex}
    initial={{ opacity: 0, y: 12, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.45, ease: 'easeOut' }}
    className="relative animate-float"
  >
    {/* Main card */}
    <div className="bg-white border border-[#162660]/10 shadow-2xl rounded-2xl p-5">

      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-9 h-9 rounded-lg bg-[#D0E6FD] flex items-center justify-center flex-shrink-0">
          <IconComponent size={18} className="text-[#162660]" strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[#162660] text-sm font-bold leading-tight truncate">
            {currentProject.title}
          </div>
          <div className="text-[#475569] text-[11px] truncate">
            {currentProject.card.heading}
          </div>
        </div>
        <div className="flex-shrink-0 bg-[#F1E4D1] rounded-lg px-2.5 py-1">
          <div className="text-[#162660] text-[11px] font-bold whitespace-nowrap">
            {currentProject.card.badgeNumber}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex justify-between text-[10px] text-[#475569] mb-1.5">
        <span className="truncate mr-2">{currentProject.card.progressLabel}</span>
        <span className="font-semibold text-[#162660] flex-shrink-0">
          {currentProject.card.progressValue}%
        </span>
      </div>
      <div className="h-1.5 w-full bg-[#F1E4D1] rounded-full overflow-hidden mb-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${currentProject.card.progressValue}%` }}
          transition={{ duration: 1.2, delay: 0.15, ease: 'easeOut' }}
          className="h-full bg-[#162660] rounded-full"
        />
      </div>

      {/* Chips row */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-[#F8FAFF] border border-[#162660]/08 rounded-lg py-2 px-1 text-center">
          <div className="text-[#162660] text-sm font-extrabold leading-tight">
            {currentProject.card.metric}
          </div>
          <div className="text-[#475569] text-[9px] mt-0.5 leading-tight">
            {currentProject.card.metricLabel.split(' ').slice(0, 2).join(' ')}
          </div>
        </div>
        <div className="bg-[#F8FAFF] border border-[#162660]/08 rounded-lg py-2 px-1 text-center">
          <div className="text-[#162660] text-sm font-extrabold leading-tight">
            {currentProject.card.progressValue}%
          </div>
          <div className="text-[#475569] text-[9px] mt-0.5 leading-tight">
            {currentProject.card.progressLabel.split(' ').slice(0, 2).join(' ')}
          </div>
        </div>
        <div className="bg-[#F1E4D1] border border-[#162660]/08 rounded-lg py-2 px-1 text-center">
          <div className="text-[#162660] text-sm font-extrabold leading-tight">
            {currentProject.card.badgeNumber}
          </div>
          <div className="text-[#475569] text-[9px] mt-0.5 leading-tight">
            {currentProject.card.badgeLabel.split(' ').slice(0, 2).join(' ')}
          </div>
        </div>
      </div>
    </div>

    {/* Floating bubble — top right */}
    <div
      className="absolute -top-8 -right-8 bg-[#F1E4D1] border border-[#162660]/10 shadow-xl rounded-2xl px-4 py-3 animate-float z-20"
      style={{ animationDelay: '1s' }}
    >
      <div className="text-xl font-extrabold text-[#162660] leading-tight">
        {currentProject.card.badgeNumber}
      </div>
      <div className="text-[#475569] text-[10px] uppercase tracking-wider font-bold mt-0.5">
        {currentProject.card.badgeLabel}
      </div>
    </div>
  </motion.div>
</div>

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

export default Hero2;