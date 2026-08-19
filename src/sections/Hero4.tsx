import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, TrendingUp, Palette, Globe, Layout, Smartphone, ShoppingCart, MousePointer, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

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

const QUICK_ACTIONS = [
  { id: 'web', label: 'Web Development', icon: Globe, to: '/portfolio?category=Web Development', category: 'Web Development' },
  { id: 'brand', label: 'Branding', icon: Layers, to: '/portfolio?category=Branding', category: 'Branding' },
  { id: 'marketing', label: 'SEO & Marketing', icon: TrendingUp, to: '/portfolio?category=SEO & Marketing', category: 'SEO & Marketing' },
  { id: 'ecom', label: 'E-commerce', icon: ShoppingCart, to: '/portfolio?category=E-commerce', category: 'E-commerce' },
];

const words = ['Build', 'Design', 'Grow', 'Transform', 'Launch'];

const Hero4 = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);
  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = right-to-left, -1 = left-to-right

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
      setDirection(1);
      setSlideIndex((prev) => (prev + 1) % PROJECTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (n) => {
    const newIndex = (n + PROJECTS.length) % PROJECTS.length;
    setDirection(newIndex > slideIndex ? 1 : -1);
    setSlideIndex(newIndex);
  };

  const currentProject = PROJECTS[slideIndex];
  const IconComponent = currentProject.icon;

  // Horizontal slide variants
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#F7FAFF] via-white to-[#FBF6EE]">
      {/* Ambient background glow */}
      <div className="absolute -top-24 -left-24 w-[28rem] h-[28rem] bg-[#D0E6FD]/50 blur-[110px] rounded-full pointer-events-none z-0" />
      <div className="absolute -bottom-24 -right-10 w-[26rem] h-[26rem] bg-[#F1E4D1]/60 blur-[110px] rounded-full pointer-events-none z-0" />
      <div className="absolute inset-0 bg-grid opacity-20 z-0" />

      <div className="max-w-7xl mx-auto px-6 pt-8 pb-16 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24 grid lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
        {/* ── Left column ── */}
        <div>
          <motion.span
            key={currentProject.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-white border border-[#162660]/10 rounded-full px-4 py-1.5 text-sm font-semibold text-[#162660] shadow-sm mb-6"
          >
            <IconComponent size={14} strokeWidth={2.4} />
            {currentProject.category}
          </motion.span>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-3xl md:text-5xl lg:text-6xl font-display font-extrabold leading-[1.15] mb-6 text-[#162660]"
          >
            We{' '}
            <span
              className="inline-block transition-opacity duration-300"
              style={{ opacity: wordVisible ? 1 : 0 }}
            >
              {/* Underline only under "Websites" */}
              <span className="relative">
                 {words[wordIndex]}
                <svg
                  className="absolute left-0 -bottom-5 w-full h-10 pointer-events-none"
                  viewBox="0 0 140 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8 C 25 2, 50 11, 70 6 C 90 2, 115 10, 138 5"
                    stroke="#22C55E"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                    className="opacity-100"
                  />
                </svg>
              </span>   
            </span>{' '}
            High-
            <br />
            Converting
            <br />
            <span className="relative inline-block">
              {/* Underline only under "Websites" */}
              <span className="relative">
                Websites
                <svg
                  className="absolute left-0 -bottom-5 w-full h-10 pointer-events-none"
                  viewBox="0 0 140 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8 C 25 2, 50 11, 70 6 C 90 2, 115 10, 138 5"
                    stroke="#22C55E"
                    strokeWidth="2.0"
                    strokeLinecap="round"
                    className="opacity-100"
                  />
                </svg>
              </span>{' '}
              and
              <br />
              <span className="text-[#4A90E2]">
                Marketing{' '}
                <span className="text-[#A8C9F0]">Systems</span>
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-[#475569] mb-8 max-w-2xl leading-relaxed"
          >
            We blend strategy and technology to create high-performance digital products that drive business growth.
          </motion.p>

          {/* CTA pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="flex items-stretch bg-white rounded-full shadow-lg shadow-slate-200/70 border border-slate-100 p-2 mb-8 max-w-lg"
          >
            <Link
              to="/contact"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#162660] text-white rounded-full font-bold hover:bg-[#162660]/90 hover:scale-[1.02] transition-all"
            >
              Start Your Project <ArrowRight size={18} />
            </Link>
            <Link
              to="/portfolio"
              className="flex-1 flex items-center justify-center px-6 py-3 text-[#162660] rounded-full font-bold hover:bg-[#D0E6FD]/50 transition-all"
            >
              View Portfolio
            </Link>
          </motion.div>

          {/* Quick actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="grid grid-cols-4 gap-3 max-w-lg"
          >
            {QUICK_ACTIONS.map(({ id, label, icon: Icon, to, category }) => (
              <Link
                key={id}
                to={to}
                onClick={() => {
                  const matchIndex = PROJECTS.findIndex((p) => p.category === category);
                  if (matchIndex !== -1) goTo(matchIndex);
                }}
                className="flex flex-col items-center justify-center gap-2 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all py-5 px-2"
              >
                <Icon size={22} className="text-[#162660]" strokeWidth={2} />
                <span className="text-[11px] font-semibold text-[#475569] text-center leading-tight">
                  {label}
                </span>
              </Link>
            ))}
          </motion.div>
        </div>

        {/* ── Right column — project showcase card ── */}
        <div className="relative flex flex-col items-center lg:items-end lg:justify-end lg:min-h-[30rem]">
          {/* Background project image – horizontal slide */}
          <div className="absolute inset-0 -m-6 rounded-[32px] overflow-hidden opacity-90 -z-10 hidden lg:block">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.img
                key={currentProject.id}
                src={currentProject.image}
                alt={currentProject.title}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: 'easeInOut' }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-white/70" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative w-full max-w-md lg:max-w-[250px] rounded-[28px] lg:rounded-xl border-[3px] lg:border-2 border-[#162660]/15 shadow-2xl shadow-slate-300/50 overflow-hidden bg-white lg:mr-1 lg:mb-1"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(22,38,96,0.08) 1.5px, transparent 1.5px)',
              backgroundSize: '16px 16px',
            }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentProject.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className="relative px-8 py-9 sm:px-10 sm:py-10 lg:px-3.5 lg:py-3.5"
              >
                <div className="flex items-center gap-3 mb-6 lg:gap-2 lg:mb-2.5">
                  <div className="w-11 h-11 lg:w-7 lg:h-7 rounded-xl lg:rounded-lg bg-[#D0E6FD] flex items-center justify-center flex-shrink-0">
                    <IconComponent size={20} className="text-[#162660] lg:hidden" strokeWidth={2} />
                    <IconComponent size={13} className="text-[#162660] hidden lg:block" strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[#162660] text-base lg:text-xs font-bold leading-tight truncate">
                      {currentProject.title}
                    </div>
                    <div className="text-[#475569] text-xs lg:text-[10px] truncate">{currentProject.card.heading}</div>
                  </div>
                  <div className="flex-shrink-0 bg-[#F1E4D1] rounded-lg lg:rounded-md px-3 py-1.5 lg:px-2 lg:py-0.5">
                    <div className="text-[#162660] text-xs lg:text-[10px] font-bold whitespace-nowrap">
                      {currentProject.card.badgeNumber}
                    </div>
                  </div>
                </div>

                <p className="text-sm lg:text-[10px] text-[#475569] mb-5 lg:mb-2">{currentProject.card.sub}</p>

                <div className="flex justify-between text-[11px] lg:text-[9px] text-[#475569] mb-1.5 lg:mb-1">
                  <span className="truncate mr-2">{currentProject.card.progressLabel}</span>
                  <span className="font-semibold text-[#162660] flex-shrink-0">
                    {currentProject.card.progressValue}%
                  </span>
                </div>
                <div className="h-1.5 lg:h-[3px] w-full bg-[#F1E4D1] rounded-full overflow-hidden mb-6 lg:mb-2.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${currentProject.card.progressValue}%` }}
                    transition={{ duration: 1.2, delay: 0.15, ease: 'easeOut' }}
                    className="h-full bg-[#162660] rounded-full"
                  />
                </div>

                <p className="text-4xl sm:text-5xl lg:text-lg font-extrabold text-[#162660] tracking-tight mb-1 lg:mb-0.5">
                  {currentProject.card.metric}
                </p>
                <p className="text-sm lg:text-[10px] font-semibold text-[#475569]">
                  {currentProject.card.metricLabel}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="absolute -bottom-6 -right-10 w-40 h-40 rotate-45 pointer-events-none lg:hidden">
              <div
                className="w-full h-full"
                style={{
                  background:
                    'repeating-linear-gradient(90deg, #162660 0 10px, transparent 10px 14px)',
                  opacity: 0.12,
                  clipPath: 'polygon(40% 0, 60% 0, 100% 100%, 80% 100%)',
                }}
              />
            </div>
            <div className="hidden lg:block absolute -bottom-3 -right-5 w-20 h-20 rotate-45 pointer-events-none">
              <div
                className="w-full h-full"
                style={{
                  background:
                    'repeating-linear-gradient(90deg, #162660 0 6px, transparent 6px 9px)',
                  opacity: 0.12,
                  clipPath: 'polygon(40% 0, 60% 0, 100% 100%, 80% 100%)',
                }}
              />
            </div>
          </motion.div>

          {/* Arrows + dots */}
          <div className="hidden lg:flex items-center justify-center gap-2.5 mt-4 lg:mt-0 lg:absolute lg:top-2 lg:right-2 z-20">
            <button
              onClick={() => goTo(slideIndex - 1)}
              aria-label="Previous project"
              className="w-7 h-7 rounded-full bg-white border border-[#162660]/15 text-[#162660] flex items-center justify-center hover:bg-[#D0E6FD]/40 transition-all shadow-sm"
            >
              <ChevronLeft size={14} />
            </button>

            <div className="flex items-center gap-1.5">
              {PROJECTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`rounded-full border-none cursor-pointer transition-all duration-300 ${
                    i === slideIndex
                      ? 'bg-[#162660] w-4 h-1.5'
                      : 'bg-[#162660]/25 w-1.5 h-1.5 hover:bg-[#162660]/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => goTo(slideIndex + 1)}
              aria-label="Next project"
              className="w-7 h-7 rounded-full bg-white border border-[#162660]/15 text-[#162660] flex items-center justify-center hover:bg-[#D0E6FD]/40 transition-all shadow-sm"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero4;