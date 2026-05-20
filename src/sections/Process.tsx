import { motion } from 'motion/react';
import { Search, Lightbulb, PenTool, Code, Rocket, BarChart3, ArrowRight, ArrowLeft, ArrowDown } from 'lucide-react';
import React from "react";
import { useNavigate } from 'react-router-dom';

const steps = [
  { sl: 1, title: 'Discovery', description: 'We dive deep into your business goals, target audience, and market landscape.', icon: Search, color: 'from-[#162660] to-[#2563eb]' },
  { sl: 2, title: 'Strategy', description: 'Developing a comprehensive roadmap tailored to your specific objectives.', icon: Lightbulb, color: 'from-[#2563eb] to-[#D0E6FD]' },
  { sl: 3, title: 'Design', description: 'Creating intuitive and visually stunning interfaces that engage users.', icon: PenTool, color: 'from-[#D0E6FD] to-[#162660]' },
  { sl: 6, title: 'Growth', description: 'Continuous optimization and support to ensure long-term success.', icon: BarChart3, color: 'from-[#162660] to-[#2563eb]' },
  { sl: 5, title: 'Launch', description: 'Deploying your product with meticulous attention to detail and performance.', icon: Rocket, color: 'from-[#2563eb] to-[#162660]' },
  { sl: 4, title: 'Development', description: 'Building robust, scalable solutions using the latest technologies.', icon: Code, color: 'from-[#162660] to-[#D0E6FD]' },
];

const Process = () => {
   const navigate = useNavigate();
  return (
    <section className="py-24 px-6 bg-[#F1E4D1] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D0E6FD]/40 blur-[120px] rounded-full" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#162660] font-bold uppercase tracking-widest text-sm"
          >
            Our Workflow
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6 text-[#162660]">
            How We Bring Your <span className="text-gradient">Vision</span> To Life
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-[#162660]/10 -translate-y-1/2 z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative z-10 group"
            >
              <div  onClick={() => navigate(`/process/${step.sl}`)} 
              className="bg-white border border-[#162660]/10 shadow-md p-10 rounded-3xl hover:shadow-xl hover:border-[#162660]/25 transition-all duration-300 h-full flex flex-col items-center text-center cursor-pointer "
              
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} p-0.5 mb-8 group-hover:scale-110 transition-transform`}>
                  <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                    <step.icon className="text-[#162660]" size={32} />
                  </div>
                </div>
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-[#162660] border border-[#D0E6FD]/30 flex items-center justify-center font-display font-bold text-white">
                  0{step.sl}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#162660]">{step.title}</h3>
                <p className="text-[#475569] leading-relaxed">{step.description}</p>
              </div>

              <div className="hidden lg:block">
                {index === 0 && <ArrowRight className="absolute -right-10 top-1/2 -translate-y-1/2 text-[#162660]/30" size={32} />}
                {index === 1 && <ArrowRight className="absolute -right-10 top-1/2 -translate-y-1/2 text-[#162660]/30" size={32} />}
                {index === 2 && <ArrowDown className="absolute left-1/2 -bottom-10 -translate-x-1/2 text-[#162660]/30" size={32} />}
                {index === 4 && <ArrowLeft className="absolute -left-10 top-1/2 -translate-y-1/2 text-[#162660]/30" size={32} />}
                {index === 5 && <ArrowLeft className="absolute -left-10 top-1/2 -translate-y-1/2 text-[#162660]/30" size={32} />}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
