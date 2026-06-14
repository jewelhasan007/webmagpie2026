import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { PROJECTS } from '../constants';
import { ArrowLeft, Calendar, User, Tag, ExternalLink, CheckCircle2 } from 'lucide-react';
import CTA from '../sections/CTA';

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const project = PROJECTS.find((p) => p.id === id);

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32"
    >
      <div className="max-w-7xl mx-auto px-6">
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 text-[#475569] hover:text-[#162660] transition-colors mb-12 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#162660] font-bold uppercase tracking-widest text-sm">
              {project.category}
            </span>
            <h1 className="text-5xl md:text-6xl font-display font-extrabold mt-4 mb-8">
              {project.title}
            </h1>
            <p className="text-xl text-[#475569] leading-relaxed mb-10">
              {project.description} We delivered a comprehensive solution that exceeded client expectations and set new industry standards for performance and design.
            </p>

            <div className="grid grid-cols-2 gap-8 mb-12">
              <div className="space-y-1">
                <div className="text-[#475569] text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <User size={14} /> Client
                </div>
                <div className=" font-bold">{project.client}</div>
              </div>
              <div className="space-y-1">
                <div className="text-[#475569] text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <Calendar size={14} /> Year
                </div>
                <div className="font-bold">{project.year}</div>
              </div>
              <div className="space-y-1">
                <div className="text-[#475569] text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <Tag size={14} /> Category
                </div>
                <div className=" font-bold">{project.category}</div>
              </div>
              <div className="space-y-1">
                <div className="text-[#475569] text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <ExternalLink size={14} /> Live Link
                </div>
                <a href="#" className="text-[#162660] font-bold hover:underline">View Project</a>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
              {project.features?.map((feature) => (
                <div key={feature} className="flex items-center gap-3 text-black/80">
                  <CheckCircle2 size={18} className="text-[#162660]" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-[40px] overflow-hidden shadow-2xl border border-[#162660]/10">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#D0E6FD]/50 blur-[100px] rounded-full -z-10" />
          </motion.div>
        </div>

        <div className="mb-24">
          <h2 className="text-3xl font-display font-bold mb-12">Project Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white border border-[#162660]/10 shadow-md p-10 rounded-3xl">
              <h4 className="text-[#162660] font-bold mb-4">The Challenge</h4>
              <p className="text-[#475569] leading-relaxed">
                The client needed a way to consolidate complex data streams into a single, intuitive interface that could be used by both technical and non-technical team members.
              </p>
            </div>
            <div className="bg-white border border-[#162660]/10 shadow-md p-10 rounded-3xl">
              <h4 className="text-[#162660] font-bold mb-4">The Solution</h4>
              <p className="text-[#475569] leading-relaxed">
                We developed a custom React-based dashboard with a modular architecture, allowing for real-time updates and personalized views for different user roles.
              </p>
            </div>
            <div className="bg-white border border-[#162660]/10 shadow-md p-10 rounded-3xl">
              <h4 className="text-[#162660] font-bold mb-4">The Result</h4>
              <p className="text-[#475569] leading-relaxed">
                A 40% increase in operational efficiency and a significant reduction in data reporting errors across the entire organization.
              </p>
            </div>
          </div>
        </div>
      </div>
      <CTA />
    </motion.div>
  );
};

export default ProjectDetails;
