import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  Rocket,
  ChevronDown,
  Phone,
} from 'lucide-react';
import { cn } from '../lib/utils';

export const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Why ZOZOIT', path: '/why' },
  {
    name: 'Services',
    path: '/services',
    megaMenu: true,
    subMenu: [
      { name: 'Digital Marketing', path: '/services/seo-marketing' },
      { name: 'Brand Strategy', path: '/services/branding' },
      { name: 'Website Design', path: '/services/web-development' },
      { name: 'Landing Page Design', path: '/services/landing-page' },
      { name: 'UI/UX Design', path: '/services/ui-ux-design' },
      { name: 'Mobile Apps', path: '/services/mobile-apps' },
      { name: 'E-commerce', path: '/services/ecommerce' },
    ],
    groups: [
      {
        title: 'Strategy & Growth',
        items: [
          { name: 'Digital Marketing', path: '/services/seo-marketing' },
          { name: 'Brand Strategy', path: '/services/branding' },
        ],
      },
      {
        title: 'Web & Design',
        items: [
          { name: 'Website Design', path: '/services/web-development' },
          { name: 'Landing Page Design', path: '/services/landing-page' },
          { name: 'UI/UX Design', path: '/services/ui-ux-design' },
        ],
      },
      {
        title: 'Support & Scaling',
        items: [
          { name: 'Mobile Apps', path: '/services/mobile-apps' },
          { name: 'E-commerce', path: '/services/ecommerce' },
        ],
      },
    ],
  },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'About', path: '/about' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

const brandTitles = [
  'Creative Agency',
  'Web Development',
  'Digital Marketing',
  'UI/UX Experience',
  'SEO Optimization',
  'Brand Strategy',
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3 whitespace-nowrap group"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-[#22C55E]/30 blur-xl rounded-full" />

            {/* ROTATING LOGO */}
            <div className="relative w-11 h-11 bg-[#22C55E]/15 rounded-2xl flex items-center justify-center border border-[#22C55E]/20 transition-transform duration-500 group-hover:rotate-180">
              <Rocket className="text-[#22C55E] w-6 h-6" />
            </div>
          </div>

          <div className="flex flex-col leading-none">
            <span className="text-2xl font-extrabold text-white tracking-wide">
              ZOZOIT
            </span>

            <div className="relative h-[14px] overflow-hidden mt-1">
              <motion.div
                animate={{ y: ['0%', '-100%'] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'linear',
                }}
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

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              {link.megaMenu ? (
                <>
                  <div
                    className={cn(
                      'flex items-center gap-1 cursor-pointer text-sm transition-all duration-300',
                      location.pathname.startsWith('/services')
                        ? 'text-[#22C55E] font-bold'
                        : 'text-white/90 font-medium hover:text-[#22C55E]'
                    )}
                  >
                    {link.name}
                    <ChevronDown size={15} />
                  </div>

                  {/* MEGA MENU */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="bg-[#162660] border border-white/10 shadow-2xl rounded-3xl p-8 w-[780px] backdrop-blur-xl">
                      <div className="grid grid-cols-3 gap-8">
                        {link.groups.map((group, i) => (
                          <div key={i}>
                            <h4 className="text-[#22C55E] font-bold text-sm uppercase mb-4">
                              {group.title}
                            </h4>

                            <div className="space-y-3">
                              {group.items.map((item) => (
                                <Link
                                  key={item.name}
                                  to={item.path}
                                  className={cn(
                                    'block text-sm transition-all duration-300 hover:translate-x-1',
                                    isActive(item.path)
                                      ? 'text-[#22C55E] font-bold'
                                      : 'text-white/70 hover:text-[#22C55E]'
                                  )}
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                        <div>
                          <p className="text-white font-semibold text-sm">
                            Need help choosing a service?
                          </p>
                          <p className="text-white/50 text-xs">
                            Talk with our expert team instantly
                          </p>
                        </div>

                        <a
                          href="tel:+8801XXXXXXXXX"
                          className="flex items-center gap-2 px-5 py-3 bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-full font-semibold transition-all"
                        >
                          <Phone size={16} />
                          Call Now
                        </a>
                      </div>
                    </div>
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

          {/* CTA */}
          <Link
            to="/contact"
            className="px-6 py-3 bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-full text-sm font-bold transition-all shadow-lg hover:scale-105"
          >
            Get Started
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-[#162660] border-t border-white/10 mt-4 p-6 rounded-2xl flex flex-col gap-3"
          >
            {navLinks.map((link) => (
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
            ))}

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
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;