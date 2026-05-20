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
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#D0E6FD] font-bold uppercase tracking-widest text-sm"
          >
            Our Expertise
          </motion.span>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon];
            if (!Icon) return null;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white/5 border border-[#D0E6FD]/15 p-10 rounded-3xl group hover:border-[#D0E6FD]/40 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-[#D0E6FD]/15 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#D0E6FD] transition-colors">
                  <Icon size={32} className="text-[#D0E6FD] group-hover:text-[#162660] transition-colors" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
                <p className="text-white/60 leading-relaxed mb-8">
                  {service.description}
                </p>
                <Link
                  to={`/services/${service.slug}`}
                  className="text-[#D0E6FD] font-bold flex items-center gap-2 group-hover:gap-3 transition-all"
                >
                  Learn More <TrendingUp size={16} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
