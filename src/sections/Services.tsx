import { motion } from 'motion/react';
import { Code2, ShoppingBag, TrendingUp, Palette, Zap, Smartphone } from 'lucide-react';
import { SERVICES } from '../constants';
import { Link } from 'react-router-dom';

const iconMap: Record<string, any> = {
  Code2, ShoppingBag, TrendingUp, Palette, Zap, Smartphone,
};

const Services = () => {
  return (
    <section className="py-24 px-6 bg-[#162660] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D0E6FD]/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D0E6FD]/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6 text-white"
          >
            Solutions Tailored For Your <span className="text-[#D0E6FD]">Growth</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 max-w-2xl mx-auto text-lg"
          >
            We offer a comprehensive suite of digital services to help your business thrive in the modern landscape.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon];
            if (!Icon) return null;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.25)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.45)] transition-shadow duration-500"
              >
                {/* Image, subtle zoom + slight dim on hover */}
                {service.image && (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-110 group-hover:brightness-[0.4] transition-all duration-700 ease-out"
                  />
                )}

                {/* Constant bottom gradient for legibility, always present, no color shift */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Faint top hairline for glass edge feel */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-white/25 transition-all duration-500" />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-end p-5">
                  <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-3 group-hover:bg-[#D0E6FD] transition-colors duration-300">
                    <Icon size={16} className="text-white group-hover:text-[#162660] transition-colors duration-300" />
                  </div>

                  <h3 className="text-base font-semibold text-white tracking-tight leading-snug">
                    {service.title}
                  </h3>

                  {/* Description hidden by default, fades/slides in on hover */}
                  <p className="text-white/70 text-xs leading-relaxed mt-0 max-h-0 opacity-0 overflow-hidden group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-2 transition-all duration-500 ease-out line-clamp-3">
                    {service.description}
                  </p>

                  <Link
                    to={`/services/${service.slug}`}
                    className="text-[#D0E6FD] text-xs font-medium flex items-center gap-1 mt-0 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:mt-3 transition-all duration-500 delay-100 ease-out"
                  >
                    Learn More <TrendingUp size={12} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;