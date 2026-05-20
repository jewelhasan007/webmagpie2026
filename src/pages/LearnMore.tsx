import React from 'react';
import { motion } from 'motion/react';
import PortfolioSection from '../sections/Portfolio';
import CTA from '../sections/CTA';
import { Link, useParams } from 'react-router-dom';
import {
  Code2,
  ShoppingBag,
  TrendingUp,
  Palette,
  Zap,
  Smartphone,
} from 'lucide-react';
import { SERVICES } from '../constants';

const iconMap: Record<string, any> = {
  Code2,
  ShoppingBag,
  TrendingUp,
  Palette,
  Zap,
  Smartphone,
};

const LearnMore = () => {
  const { slug } = useParams();

  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="pt-32 text-center text-xl font-semibold">
        Service not found
      </div>
    );
  }

  const Icon =
    service.icon && iconMap[service.icon] ? iconMap[service.icon] : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32"
    >
      <div className="max-w-7xl mx-auto px-6 mb-24">
        {/* HEADER */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-[#D0E6FD] rounded-2xl flex items-center justify-center">
              {Icon && <Icon size={32} className="text-[#162660]" />}
            </div>

            <span className="text-[#162660] font-bold uppercase tracking-widest text-sm">
              {service.title} Page
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-extrabold mt-6 mb-8">
            Crafting{' '}
            <span className="text-gradient">{service.title}</span> Results.
          </h1>

          <p className="text-xl text-[#475569] leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* PACKAGES */}
        <div className="w-full mx-auto mb-24 px-4 md:px-6 mt-16">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Our <span className="text-gradient">Packages</span>
          </h2>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.packages.map((pkg, index) => {
              const isPremium = pkg.name === 'Premium';

              return (
                <div
                  key={index}
                  className={`w-full p-8 rounded-2xl border transition flex flex-col shadow-sm hover:shadow-xl ${
                    isPremium
                      ? 'lg:scale-105 bg-[#162660] border-[#162660] text-[#D0E6FD] shadow-2xl ring-2 ring-[#D0E6FD]'
                      : 'bg-white border-[#162660]/20 text-[#0f172a]'
                  }`}
                >
                  <h3
                    className={`text-2xl font-bold mb-4 ${
                      isPremium ? 'text-[#D0E6FD]' : 'text-[#0f172a]'
                    }`}
                  >
                    {pkg.name}
                  </h3>

                  <p
                    className={`text-4xl font-extrabold mb-6 ${
                      isPremium ? 'text-[#D0E6FD]' : 'text-[#162660]'
                    }`}
                  >
                    {pkg.price}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, i) => (
                      <li
                        key={i}
                        className={
                          isPremium
                            ? 'text-[#D0E6FD]/90'
                            : 'text-[#475569]'
                        }
                      >
                        ✓ {feature}
                      </li>
                    ))}
                  </ul>

                  {/* BUTTON */}
                  <div className="mt-auto">
                    <Link
                      to={`/contact?service=${service.slug}&package=${pkg.name}`}
                    >
                      <button
                        className={`w-full py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer ${
                          isPremium
                            ? 'bg-[#D0E6FD] text-[#162660]'
                            : 'bg-[#162660] text-white'
                        }`}
                      >
                        Get Started
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <CTA />
    </motion.div>
  );
};

export default LearnMore;