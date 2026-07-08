import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  Rocket,
  ChevronDown,
  Phone,
  ArrowRight,
  TrendingUp,
  Palette,
  Globe,
  Layout,
  Figma,
  Smartphone,
  ShoppingCart,
} from 'lucide-react';
import { cn } from '../lib/utils';

export const navLinks = [
  { name: 'Home', path: '/' },
  {
    name: 'Services',
    path: '/services',
    megaMenu: true,
    groups: [
      {
        title: 'Strategy & Growth',
        items: [
          {
            name: 'Digital Marketing',
            path: '/services/seo-marketing',
            icon: TrendingUp,
            desc: 'Data-driven campaigns that drive traffic',
          },
          {
            name: 'Brand Strategy',
            path: '/services/branding',
            icon: Palette,
            desc: 'Positioning and identity that stand out',
          },
        ],
      },
      {
        title: 'Web & Design',
        items: [
          {
            name: 'Website Design',
            path: '/services/web-development',
            icon: Globe,
            desc: 'Custom sites built to convert',
          },
          {
            name: 'Landing Page Design',
            path: '/services/landing-page',
            icon: Layout,
            desc: 'High-converting pages for your campaigns',
          },
          {
            name: 'UI/UX Design',
            path: '/services/ui-ux-design',
            icon: Figma,
            desc: 'Intuitive interfaces users love',
          },
        ],
      },
      {
        title: 'Support & Scaling',
        items: [
          {
            name: 'Mobile Apps',
            path: '/services/mobile-apps',
            icon: Smartphone,
            desc: 'Native and cross-platform app builds',
          },
          {
            name: 'E-commerce',
            path: '/services/ecommerce',
            icon: ShoppingCart,
            desc: 'Online stores that sell around the clock',
          },
        ],
      },
    ],
    cta: {
      heading: 'Need Help Choosing a Service?',
      sub: 'Talk with our expert team and get a free consultation.',
      label: 'Schedule A Call',
      path: '/contact',
    },
  },
  {
    name: 'Why WebMagpie',
    path: '/why',
    megaMenu: true,
    layout: 'two-col',
    heading: 'Why WebMagpie',
    description:
      'We help businesses grow online through strategic web design and digital marketing. Whether you need a new website or a full rebrand, we re here to guide the process.',
    links: [
      { name: 'About Us', path: '/about', desc: 'Meet the team behind WebMagpie' },
      { name: 'Case Studies', path: '/portfolio', desc: 'Real results from real clients' },
    ],
    cta: {
      heading: 'Ready To Take The First Step?',
      sub: 'Contact us today to schedule a free consultation.',
      label: 'Schedule A Call',
      path: '/contact',
    },
  },
  {
    name: 'How We Help',
    path: '/how',
    megaMenu: true,
    layout: 'two-col',
    heading: 'How We Help',
    description:
      'From driving traffic to converting visitors and keeping your site running 24/7 — we cover every stage of your digital growth journey.',
    links: [
      { name: 'Marketing', path: '/how/marketing', desc: 'Get found by the right audience' },
      {
        name: 'Website Development',
        path: '/how/build-website',
        desc: 'Launch a site built to perform',
      },
      {
        name: 'Convertion Optimization',
        path: '/how/convert-leads',
        desc: 'Turn visitors into paying customers',
      },
      {
        name: 'Support & Maintenance',
        path: '/how/website-support',
        desc: 'Keep your site fast and secure',
      },
    ],
    cta: {
      heading: 'Not Sure Where To Start?',
      sub: 'Let our team walk you through the right solution for your goals.',
      label: 'Schedule A Call',
      path: '/contact',
    },
  },
  {
    name: 'Who We Help',
    path: '/who',
    megaMenu: true,
    layout: 'two-col',
    heading: 'Who We Help',
    description:
      'We work with organizations of all sizes — from ambitious small businesses to established B2B companies ready to scale their digital presence.',
    links: [
      { name: 'B2B Organizations', path: '/who/b2b', desc: 'Scalable solutions for growing companies' },
      {
        name: 'Small Business',
        path: '/who/small-business',
        desc: 'Affordable growth for local businesses',
      },
    ],
    cta: {
      heading: 'Is This You?',
      sub: "Tell us about your business and we'll tailor the perfect plan.",
      label: 'Get Started',
      path: '/contact',
    },
  },
  {
    name: 'Resources',
    path: '/portfolio',
    megaMenu: true,
    layout: 'two-col',
    heading: 'Resources',
    description:
      'Stay informed with the latest insights, success stories, and industry news from the WebMagpie team.',
    links: [
      { name: 'Blogs', path: '/blog', desc: 'Tips, trends, and industry insights' },
      { name: 'Case Studies', path: '/portfolio', desc: "See how we've helped clients grow" },
      { name: 'News', path: '/resources/news', desc: 'Latest updates from WebMagpie' },
    ],
    cta: {
      heading: 'Want Fresh Insights?',
      sub: 'Subscribe to our newsletter and never miss an update.',
      label: 'Subscribe Now',
      path: '/contact',
    },
  },
  { name: 'Contact', path: '/contact' },
];

const brandTitles = [
  'E-Commerce Product Research',
  'Web Development',
  'Digital Marketing',
  'UI/UX Experience',
  'SEO Optimization',
  'Brand Strategy',
];

/* ─────────────────────────────────────────────
   Desktop Mega Menu — Services
   3-col links grid + full-width dark CTA bar at bottom
───────────────────────────────────────────── */
const ServicesMegaMenu = ({ link, isActive }) => (
  <div className="bg-white border border-gray-200 shadow-2xl rounded-2xl overflow-hidden w-[780px]">

    {/* TOP — 3 groups */}
    <div className="p-8">
      <div className="grid grid-cols-3 gap-10">
        {link.groups.map((group, i) => (
          <div key={i}>
            <h4 className="text-[#1e2d50] font-semibold text-xs uppercase tracking-widest mb-4 whitespace-nowrap">
              {group.title}
            </h4>
            <div className="flex flex-col gap-3">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.name}>
                    <Link
                      to={item.path}
                      className={cn(
                        'flex items-center gap-2.5 group/item transition-all duration-200 hover:translate-x-1',
                        isActive(item.path)
                          ? 'text-[#22C55E]'
                          : 'text-gray-800 hover:text-[#22C55E]'
                      )}
                    >
                      {/* Icon badge */}
                      {Icon && (
                        <span
                          className={cn(
                            'flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200',
                            isActive(item.path)
                              ? 'bg-[#22C55E]/15 text-[#22C55E]'
                              : 'bg-gray-100 text-gray-500 group-hover/item:bg-[#22C55E]/15 group-hover/item:text-[#22C55E]'
                          )}
                        >
                          <Icon size={15} />
                        </span>
                      )}

                      {/* Label + arrow */}
                      <span className="text-sm font-semibold leading-tight">{item.name}</span>
                      <ArrowRight
                        size={12}
                        className="opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200 ml-auto flex-shrink-0"
                      />
                    </Link>

                    {/* Small description under the title */}
                    {item.desc && (
                      <p className="text-xs text-gray-500 mt-1 ml-10 leading-relaxed">{item.desc}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* BOTTOM — full-width dark CTA bar */}
    <div className="relative bg-[#1e2d50] flex items-center justify-between px-8 py-5 overflow-hidden">
      <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-[#22C55E]/10 blur-3xl pointer-events-none" />
      <p className="relative z-10 text-white font-extrabold text-base">
        {link.cta.heading}
      </p>
      <Link
        to={link.cta.path}
        className="relative z-10 px-6 py-2.5 bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-lg text-sm font-bold transition-all duration-300 hover:scale-105 shadow-lg whitespace-nowrap ml-6"
      >
        {link.cta.label}
      </Link>
    </div>

  </div>
);

/* ─────────────────────────────────────────────
   Desktop Mega Menu — Why WebMagpie (2-col)
───────────────────────────────────────────── */
const WhyMegaMenu = ({ link, isActive }) => (
  <div className="bg-white border border-gray-200 shadow-2xl rounded-2xl overflow-hidden w-[600px]">
    <div className="grid grid-cols-2">

      {/* LEFT — text + arrow links */}
      <div className="p-8 bg-white">
        <h3 className="text-gray-900 font-bold text-base mb-3">
          {link.heading}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          {link.description}
        </p>

        <div className="flex flex-col gap-4">
          {link.links.map((item) => (
            <div key={item.name}>
              <Link
                to={item.path}
                className={cn(
                  'inline-flex items-center gap-1.5 text-sm font-semibold border-b-2 border-dashed pb-1 w-fit transition-all duration-200 hover:gap-2.5',
                  isActive(item.path)
                    ? 'text-[#22C55E] border-[#22C55E]'
                    : 'text-gray-800 border-gray-400 hover:text-[#22C55E] hover:border-[#22C55E]'
                )}
              >
                {item.name}
                <ArrowRight size={14} />
              </Link>

              {/* Small description under the title */}
              {item.desc && (
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — dark CTA card */}
      <div className="relative bg-[#1e2d50] flex flex-col items-center justify-center text-center p-8 overflow-hidden">
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-[#22C55E]/10 blur-2xl pointer-events-none" />
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/5 blur-xl pointer-events-none" />

        <h3 className="relative z-10 text-white font-extrabold text-lg leading-snug mb-3">
          {link.cta.heading}
        </h3>
        <p className="relative z-10 text-white/60 text-sm leading-relaxed mb-6">
          {link.cta.sub}
        </p>
        <Link
          to={link.cta.path}
          className="relative z-10 px-6 py-3 bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-lg text-sm font-bold transition-all duration-300 hover:scale-105 shadow-lg"
        >
          {link.cta.label}
        </Link>
      </div>

    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Mobile accordion
───────────────────────────────────────────── */
const MobileAccordion = ({ link, isActive, onClose }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'w-full flex items-center justify-between py-3 px-4 rounded-xl transition-all',
          open
            ? 'text-[#22C55E] font-bold bg-[#22C55E]/10'
            : 'text-white/80 hover:text-[#22C55E]'
        )}
      >
        <span>{link.name}</span>
        <ChevronDown
          size={16}
          className={cn('transition-transform duration-300', open && 'rotate-180')}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-2">

              {/* Services — groups */}
              {link.groups ? (
                <>
                  {link.groups.map((group, i) => (
                    <div key={i} className="px-4 pb-1">
                      <p className="text-white/40 text-[10px] uppercase tracking-[2px] font-semibold mt-3 mb-2">
                        {group.title}
                      </p>
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            to={item.path}
                            onClick={onClose}
                            className={cn(
                              'flex items-start gap-2.5 py-2 pl-2 text-sm border-l-2 transition-all duration-200 hover:pl-3',
                              isActive(item.path)
                                ? 'text-[#22C55E] font-bold border-[#22C55E]'
                                : 'text-white/60 hover:text-[#22C55E] border-white/10 hover:border-[#22C55E]'
                            )}
                          >
                            {Icon && (
                              <span
                                className={cn(
                                  'flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-md transition-colors duration-200 mt-0.5',
                                  isActive(item.path)
                                    ? 'bg-[#22C55E]/20 text-[#22C55E]'
                                    : 'bg-white/10 text-white/50'
                                )}
                              >
                                <Icon size={12} />
                              </span>
                            )}
                            <span className="flex flex-col">
                              <span>{item.name}</span>
                              {/* Small description under the title */}
                              {item.desc && (
                                <span className="text-white/35 text-xs font-normal mt-0.5">
                                  {item.desc}
                                </span>
                              )}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  ))}

                  {/* Services mobile CTA */}
                  <div className="mx-4 mt-3 rounded-2xl bg-[#1e2d50] border border-white/10 p-4 text-center">
                    <p className="text-white font-bold text-sm leading-snug mb-1">
                      {link.cta.heading}
                    </p>
                    <p className="text-white/50 text-xs mb-3">{link.cta.sub}</p>
                    <Link
                      to={link.cta.path}
                      onClick={onClose}
                      className="inline-flex items-center justify-center w-full bg-[#22C55E] hover:bg-[#16A34A] text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all"
                    >
                      {link.cta.label}
                    </Link>
                  </div>
                </>
              ) : (
                /* Why WebMagpie — description + links + CTA */
                <div className="px-4 pb-2">
                  <p className="text-white/50 text-xs leading-relaxed mb-4">
                    {link.description}
                  </p>
                  <div className="flex flex-col gap-3 mb-4">
                    {link.links.map((item) => (
                      <div key={item.name}>
                        <Link
                          to={item.path}
                          onClick={onClose}
                          className={cn(
                            'inline-flex items-center gap-1.5 text-sm font-semibold border-b border-dashed pb-1 w-fit transition-all duration-200',
                            isActive(item.path)
                              ? 'text-[#22C55E] border-[#22C55E]'
                              : 'text-white/70 border-white/30 hover:text-[#22C55E] hover:border-[#22C55E]'
                          )}
                        >
                          {item.name}
                          <ArrowRight size={13} />
                        </Link>

                        {/* Small description under the title */}
                        {item.desc && (
                          <p className="text-white/35 text-xs mt-1 leading-relaxed">{item.desc}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl bg-[#1e2d50] border border-white/10 p-4 text-center">
                    <p className="text-white font-bold text-sm leading-snug mb-1">
                      {link.cta.heading}
                    </p>
                    <p className="text-white/50 text-xs mb-3">{link.cta.sub}</p>
                    <Link
                      to={link.cta.path}
                      onClick={onClose}
                      className="inline-flex items-center justify-center w-full bg-[#22C55E] hover:bg-[#16A34A] text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all"
                    >
                      {link.cta.label}
                    </Link>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main Navbar
───────────────────────────────────────────── */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        scrolled
          ? 'bg-[#162660]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-xl'
          : 'bg-[#162660]'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* ── LOGO ── */}
        <Link to="/" className="flex items-center gap-3 whitespace-nowrap group">
          <div className="relative">
            <div className="absolute inset-0 bg-[#22C55E]/30 blur-xl rounded-full" />
            <div className="relative w-11 h-11 bg-[#22C55E]/15 rounded-2xl flex items-center justify-center border border-[#22C55E]/20 transition-transform duration-500 group-hover:rotate-180">
              <Rocket className="text-[#22C55E] w-6 h-6" />
            </div>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-extrabold text-white tracking-wide">
              Web <span className='text-[#22C55E]'>Magpie</span>
            </span>
            <div className="relative h-[14px] overflow-hidden mt-1">
              <motion.div
                animate={{ y: ['0%', '-100%'] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="flex flex-col"
              >
                {[...brandTitles, ...brandTitles].map((title, index) => (
                  <span
                    key={index}
                    className="text-[10px] uppercase tracking-[3px] h-[14px] leading-[14px] text-[#22C55E]"
                  >
                    {title}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </Link>

        {/* ── DESKTOP MENU ── */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              {link.megaMenu ? (
                <>
                  <div
                    className={cn(
                      'flex items-center gap-1 cursor-pointer text-sm transition-all duration-300',
                      (link.links
                        ? link.links.some((i) => isActive(i.path)) || isActive(link.path)
                        : link.groups?.flatMap((g) => g.items).some((i) => isActive(i.path)) ||
                          isActive(link.path))
                        ? 'text-[#22C55E] font-bold'
                        : 'text-white/90 font-medium hover:text-[#22C55E]'
                    )}
                  >
                    {link.name}
                    <ChevronDown size={15} />
                  </div>

                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    {link.layout === 'two-col' ? (
                      <WhyMegaMenu link={link} isActive={isActive} />
                    ) : (
                      <ServicesMegaMenu link={link} isActive={isActive} />
                    )}
                  </div>
                </>
              ) : (
                <Link
                  to={link.path}
                  className={cn(
                    'text-sm transition-all duration-300',
                    isActive(link.path)
                      ? 'text-[#22C55E] font-bold'
                      : 'text-white/90 hover:text-[#22C55E]'
                  )}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}

          <Link
            to="/contact"
            className="px-6 py-3 bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-full text-sm font-bold transition-all shadow-lg hover:scale-105"
          >
            Get Started
          </Link>
        </div>

        {/* ── MOBILE HAMBURGER ── */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-[#162660] border-t border-white/10 mt-4 p-4 rounded-2xl flex flex-col gap-1"
          >
            {navLinks.map((link) =>
              link.megaMenu ? (
                <MobileAccordion
                  key={link.name}
                  link={link}
                  isActive={isActive}
                  onClose={() => setIsOpen(false)}
                />
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'py-3 px-4 rounded-xl transition-all',
                    isActive(link.path)
                      ? 'text-[#22C55E] font-bold bg-[#22C55E]/10'
                      : 'text-white/80 hover:text-[#22C55E]'
                  )}
                >
                  {link.name}
                </Link>
              )
            )}

            <div className="flex flex-col gap-3 mt-3 pt-3 border-t border-white/10">
              <a
                href="tel:+8801XXXXXXXXX"
                className="flex items-center justify-center gap-2 bg-[#22C55E] text-white py-3 rounded-xl font-bold"
              >
                <Phone size={16} />
                Call Now
              </a>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="bg-white text-[#162660] py-3 rounded-xl text-center font-bold"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;