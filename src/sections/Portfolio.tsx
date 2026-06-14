import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { ExternalLink, Plus } from 'lucide-react';

const Portfolio = () => {
  return (
    <section className="py-24 px-6 lg:px-16 xl:px-24 bg-[#F1E4D1]/40 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#D0E6FD]/30 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#162660]/5 blur-[140px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#162660] font-semibold uppercase tracking-wider text-sm"
            >
              Selected Works
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold mt-4 text-[#162660]"
            >
              Case Studies of <span className="text-gradient">Success</span>
            </motion.h2>
          </div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Link
              to="/portfolio"
              className="px-8 py-4 bg-[#162660] text-white rounded-2xl font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 inline-block"
            >
              View All Projects
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/portfolio/${project.id}`}
                className="group relative block overflow-hidden rounded-2xl aspect-square bg-white border border-[#162660]/10 shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#162660]/85 via-[#162660]/30 to-transparent opacity-70 group-hover:opacity-95 transition-opacity duration-300" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <span className="text-[#D0E6FD] font-semibold text-xs mb-1 uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2 leading-tight">{project.title}</h3>
                  <p className="text-white/80 opacity-0 group-hover:opacity-100 transition-all duration-500 mb-4 max-h-0 group-hover:max-h-24 overflow-hidden text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <span className="w-10 h-10 rounded-xl bg-[#D0E6FD] flex items-center justify-center text-[#162660] shadow-lg">
                      <ExternalLink size={16} />
                    </span>
                    <span className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white">
                      <Plus size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;